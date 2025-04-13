import {
  Image,
  HStack,
  Heading,
  Container,
  VStack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useDb } from "../providers/DatabaseProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DoodlePage() {
  const [doodle, setDoodle] = useState(null);
  const db = useDb();
  const navigate = useNavigate();
  const { id } = useParams();

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
  });

  if (!doodle) {
    return null;
  }
  return (
    <Container maxW="container.md" p={10}>
      <Heading size="lg">{doodle.title}</Heading>
      <HStack mt={12} spacing={20} justify="center">
        <Image w={500} h={500} src={doodle.data} className="border" />
        <VStack w={600} h={500} py={6} px={20} spacing={6} shadow="md">
          <Heading size="sm">Comments</Heading>
          {Object.entries(doodle.comments).map(([uid, msg]) => (
            <Card>
              <CardHeader>{uid}</CardHeader>
              <CardBody>{msg}</CardBody>
            </Card>
          ))}
        </VStack>
      </HStack>
    </Container>
  );
}

export default DoodlePage;
