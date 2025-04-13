import {
  Box,
  Button,
  Heading,
  Icon,
  Link as ChakraLink,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { Link as ReactRouterLink } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import DoodleCard from "../components/DoodleCard.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";

function DoodlesPage() {
  const db = useDb();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [doodles, setDoodles] = useState([]);

  function update() {
    setLoading(true);
    db.getAllDoodles().then((doodles) => {
      setDoodles(doodles);
      setLoading(false);
    });
  }

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleLike(id) {
    Promise.all(
      doodles.map(async (d) => {
        if (d.id !== id) return d;
        const liked = d.likes.includes(auth.user.uid);
        const newLikes = liked
          ? d.likes.filter((id) => id !== auth.user.uid)
          : [...d.likes, auth.user.uid];
        await db.updateDoodle(id, { likes: newLikes });
        return {
          ...d,
          likes: newLikes,
        };
      }),
    ).then((res) => setDoodles(res));
  }

  return (
    <Box p={10}>
      <Heading size="lg">My Doodles</Heading>
      <Button
        as={ReactRouterLink}
        to="/new"
        mt={8}
        mb={12}
        leftIcon={<Icon boxSize={6} as={BiPencil} />}
        colorScheme="green"
        isDisabled={loading}
      >
        Create Doodle
      </Button>
      {loading ? (
        <Heading size="md" color="gray">
          Loading&hellip;
        </Heading>
      ) : doodles.length ? (
        <Wrap spacing={6}>
          {doodles.map(({ id, ...doodle }) => (
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
      ) : (
        <Heading size="md">
          No doodles yet!{" "}
          <ChakraLink as={ReactRouterLink} to="/new" color="green">
            Create a doodle
          </ChakraLink>{" "}
          to get started.
        </Heading>
      )}
    </Box>
  );
}

export default DoodlesPage;
