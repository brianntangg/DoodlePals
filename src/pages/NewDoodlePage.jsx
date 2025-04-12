import { Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Canvas from "../components/Canvas.jsx";

function NewDoodlePage() {
  return (
    <Flex flexDir="column" align="stretch" h="100%" p={10}>
      <Heading size="lg">Create Doodle</Heading>
      <HStack mt={8} spacing={12} justify="center">
        <Canvas />
        <Text>hi</Text>
      </HStack>
    </Flex>
  );
}

export default NewDoodlePage;
