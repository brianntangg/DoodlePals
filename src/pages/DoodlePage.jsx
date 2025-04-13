import {
  Image,
  HStack,
  Heading,
  VStack,
  Flex,
  Box,
  Textarea,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

function DoodlePage() {
  const [doodle, setDoodle] = useState(null);
  const auth = useAuth();
  const db = useDb();
  const navigate = useNavigate();
  const { id } = useParams();
  const [usernames, setUsernames] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!id) {
      return navigate("/doodles");
    }
    db.getDoodle(id).then((doodle) => {
      if (!doodle) {
        return navigate("/doodles");
      }
      setDoodle(doodle);
    });
  }, [id, navigate, db]);

  useEffect(() => {
    if (!doodle) return;
    let u = {};
    Promise.all(
      Object.keys(doodle.comments || {}).map(async (uid) => {
        const user = await db.getUser(uid);
        u[uid] = user?.username || "Anonymous";
      }),
    ).then(() => setUsernames(u));
  }, [doodle]);


  async function post() {
    if (comment.trim() === "") return;
    let comments = { ...doodle.comments };
    comments[auth.user.uid] = comment;
    await db.updateDoodle(id, { comments });
    setDoodle({ ...doodle, comments });
    setComment("");
  }

  async function toggleLike() {
    const liked = doodle.likes.includes(auth.user.uid);
    const newLikes = liked
      ? doodle.likes.filter((id) => id !== auth.user.uid)
      : [...doodle.likes, auth.user.uid];
    await db.updateDoodle(id, { likes: newLikes });
    setDoodle({ ...doodle, likes: newLikes });
  }

  if (!doodle || !usernames) {
    return null;
  }

  return (
      <>
        <Heading size="lg" textAlign="center" mt={12}>
          {doodle.title}
        </Heading>
        <HStack mt={12} spacing={20} justify="center">
          <Image w={500} h={500} src={doodle.data} className="border" />
          <Flex direction="column" w={400} h={500} p={6} shadow="md">
            <VStack
              w="100%"
              spacing={4}
              align="stretch"
              overflowY="auto"
              flex={1}
              pr={2}
            >
              <Box>
                <Button
                  leftIcon={
                    <Icon
                      boxSize={6}
                      as={
                        doodle.likes.includes(auth.user.uid)
                          ? BiSolidHeart
                          : BiHeart
                      }
                      color="red"
                    />
                  }
                  variant="ghost"
                  onClick={toggleLike}
                >
                  {doodle.likes.length}
                </Button>
              </Box>
              <Heading size="sm" px={2}>
                Comments
              </Heading>
              {Object.entries(doodle.comments).map(([uid, msg]) => (
                <Box
                  key={uid}
                  w="100%"
                  borderRadius={8}
                  borderColor="gray.400"
                  borderWidth={1}
                  p={3}
                >
                  <Heading size="sm" mb={3}>
                    {usernames[uid]}
                  </Heading>
                  {msg}
                </Box>
              ))}
            </VStack>
            <Box mt={4}>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                resize="none"
                h="80px"
              />
              <Button size="sm" mt={3} float="right" onClick={post}>
                Post
              </Button>
            </Box>
          </Flex>
        </HStack></>
  );
}

export default DoodlePage;
