import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  Wrap,
  WrapItem,
  Select,
  HStack,
  Spacer,
  Spinner,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import DoodleCard from "../components/DoodleCard.jsx";
import { BiRefresh, BiChevronDown } from "react-icons/bi";

function CommunityDoodlesPage() {
  const db = useDb();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [doodles, setDoodles] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [dailyPrompts, setDailyPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const PAGE_SIZE = 12;

  const fetchDoodles = async (reset = true) => {
    if (reset) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const allDoodles = await db.getAllDoodles();

      if (!allDoodles || allDoodles.length === 0) {
        setDoodles([]);
        setDailyPrompts([]);
        return;
      }

      const processedDoodles = allDoodles
        .map((doodle) => {
          if (!doodle) return null;

          return {
            ...doodle,
            prompt: doodle.prompt || "No prompt",
          };
        })
        .filter(Boolean);

      let sorted = [...processedDoodles];
      sorted.sort((a, b) => {
        switch (sortBy) {
          case "mostCommented":
            return (
              Object.keys(b.comments || {}).length -
              Object.keys(a.comments || {}).length
            );
          case "mostActive": {
            const aActivity =
              (a.likes?.length || 0) + Object.keys(a.comments || {}).length;
            const bActivity =
              (b.likes?.length || 0) + Object.keys(b.comments || {}).length;
            return bActivity - aActivity;
          }
          case "mostLiked":
            return (b.likes?.length || 0) - (a.likes?.length || 0);
          case "oldest":
            { const aTimeOld = a.createTime?.toMillis ? a.createTime.toMillis() : a.createTime;
            const bTimeOld = b.createTime?.toMillis ? b.createTime.toMillis() : b.createTime;
            return aTimeOld - bTimeOld; }
          case "newest":
            { const aTime = a.createTime?.toMillis ? a.createTime.toMillis() : a.createTime;
              const bTime = b.createTime?.toMillis ? b.createTime.toMillis() : b.createTime;
              return bTime - aTime;
            }
          default:
            return 0;
        }
      });

      setDoodles(sorted);

      const prompts = new Set();
      sorted.forEach((doodle) => {
        if (doodle.prompt) {
          prompts.add(doodle.prompt);
        }
      });
      setDailyPrompts(Array.from(prompts));
    } catch (err) {
      console.error("Error fetching doodles:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchDoodles();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchDoodles();
    }
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handlePromptChange = (e) => {
    setSelectedPrompt(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const getFilteredDoodles = () => {
    if (selectedPrompt === "all") {
      return doodles;
    }

    return doodles.filter((doodle) => doodle.prompt === selectedPrompt);
  };

  const filteredDoodles = getFilteredDoodles();
  const visibleDoodles = filteredDoodles.slice(0, visibleCount);

  function toggleLike(id) {
    setDoodles((prevDoodles) =>
      prevDoodles.map((d) => {
        if (d.id !== id) return d;

        const liked = d.likes.includes(auth.user.uid);
        const newLikes = liked
          ? d.likes.filter((uid) => uid !== auth.user.uid)
          : [...d.likes, auth.user.uid];

        try {
          db.updateDoodle(id, { likes: newLikes });
        } catch (err) {
          console.error("Could not update likes:", err);
        }

        return {
          ...d,
          likes: newLikes,
        };
      }),
    );
  }

  const loadMore = () => {
    if (loadingMore) return;
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const shouldShowLoadMore =
    !loading && !loadingMore && filteredDoodles.length > visibleCount;

  return (
    <Box p={10}>
      <Heading size="lg" mb={6}>
        Community Doodles
      </Heading>

      <HStack spacing={4} mb={8}>
        <Box>
          <Text fontSize="sm" mb={1}>
            Filter by prompt:
          </Text>
          <Select
            value={selectedPrompt}
            onChange={handlePromptChange}
            minW="240px"
            isDisabled={loading}
          >
            <option value="all">All Prompts</option>
            {dailyPrompts.map((prompt, idx) => (
              <option key={idx} value={prompt}>
                {prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt}
              </option>
            ))}
          </Select>
        </Box>

        <Spacer />

        <Box>
          <Text fontSize="sm" mb={1}>
            Sort by:
          </Text>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            minW="150px"
            isDisabled={loading}
          >
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest Liked</option>
            <option value="mostLiked">Most Liked</option>
            <option value="mostCommented">Most Commented First</option>
            <option value="mostActive">Most Active First</option>
          </Select>
        </Box>

        <Button
          leftIcon={<Icon as={BiRefresh} />}
          colorScheme="blue"
          variant="outline"
          onClick={() => fetchDoodles()}
          isDisabled={loading || loadingMore}
        >
          Refresh
        </Button>
      </HStack>

      {loading ? (
        <Center py={12}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      ) : visibleDoodles.length > 0 ? (
        <>
          <Wrap spacing={6}>
            {visibleDoodles.map(({ id, ...doodle }) => (
              <WrapItem key={id}>
                <DoodleCard
                  id={id}
                  doodle={doodle}
                  toggleLike={() => toggleLike(id)}
                  uid={auth.user.uid}
                />
              </WrapItem>
            ))}
          </Wrap>

          {shouldShowLoadMore && (
            <Flex justify="center" mt={8}>
              <Button
                onClick={loadMore}
                isLoading={loadingMore}
                rightIcon={<Icon as={BiChevronDown} />}
                colorScheme="blue"
                variant="ghost"
                size="lg"
              >
                Load More
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <Center py={12}>
          <Box textAlign="center">
            <Heading size="md" mb={2}>
              No doodles found
            </Heading>
            <Text color="gray.600">
              {selectedPrompt !== "all"
                ? "Try selecting a different prompt filter"
                : "The community hasn't created any doodles yet"}
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
}

export default CommunityDoodlesPage;
