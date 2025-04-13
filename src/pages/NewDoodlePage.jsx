import { Flex, Heading, HStack } from "@chakra-ui/react";
import Canvas from "../components/Canvas.jsx";
import { useState } from "react";
import PublishDoodleForm from "../components/PublishDoodleForm.jsx";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; //Derrick's circular timer
import { Text } from "@chakra-ui/react"; // derrick's new code


function NewDoodlePage() {
  const db = useDb();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [preview, setPreview] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false); //Derrick useState
  const isDaily = searchParams.get("daily") === "true"; // Derrick's timer code

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  async function publish(title) {
    await db.createDoodle({
      title,
      data: preview,
      prompt,
      likes: [],
      comments: {},
    });
    navigate("/doodles");
  }

  return (
    <Flex flexDir="column" align="stretch" h="100%" gap={12} p={10}>
      <Heading size="lg">{preview ? "Publish" : "Create"} Doodle</Heading>


      {isDaily && !preview && ( //Derrick's text and timer
          <>
            <Text fontSize="xl" fontWeight="semibold" textAlign="center" mb={4}>
              {prompt}
            </Text>

            <HStack spacing={8} justify="center">
              <CountdownCircleTimer
                  isPlaying
                  duration={60}
                  colors={["#73f16a", "#ffe270", "#f16565"]}
                  colorsTime={[60, 20, 0]}
                  size={100}
                  strokeWidth={6}
                  onComplete={() => {
                    setTimerExpired(true);
                    return { shouldRepeat: false };
                  }}

              >
                {({ remainingTime }) => (
                    <Text fontSize="lg" fontWeight="bold">
                      {remainingTime}s
                    </Text>
                )}
              </CountdownCircleTimer>
            </HStack>
          </>
      )}


      {preview ? (
        <PublishDoodleForm onPublish={publish} url={preview} />
      ) : (
        <HStack justify="center">
          <Canvas onSave={(url) => setPreview(url)} prompt={prompt}
                  disabled={isDaily && timerExpired} // Derrick's disabler!
          />
        </HStack>
      )}
    </Flex>
  );
}

export default NewDoodlePage;
