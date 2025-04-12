import { Flex, Heading, HStack } from "@chakra-ui/react";
import Canvas from "../components/Canvas.jsx";
import { useState } from "react";
import PublishDoodleForm from "../components/PublishDoodleForm.jsx";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { useNavigate } from "react-router-dom";

function NewDoodlePage() {
  const db = useDb();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  async function publish(title) {
    await db.createDoodle({ title, data: preview });
    navigate("/doodles");
  }

  return (
    <Flex flexDir="column" align="stretch" h="100%" gap={12} p={10}>
      <Heading size="lg">{preview ? "Publish" : "Create"} Doodle</Heading>
      {preview ? (
        <PublishDoodleForm onPublish={publish} url={preview} />
      ) : (
        <HStack justify="center">
          <Canvas onSave={(url) => setPreview(url)} />
        </HStack>
      )}
    </Flex>
  );
}

export default NewDoodlePage;
