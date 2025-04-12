import { Card, CardBody, CardHeader, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function DoodleCard({ id, doodle }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        _hover={{ bgColor: "gray.100" }}
        w={360}
        cursor="pointer"
        onClick={() => navigate(`/doodle/${id}`)}
      >
        <CardHeader>
          <Heading size="md">{doodle.title}</Heading>
        </CardHeader>
        <CardBody>
          <Image src={doodle.data} className="border" />
        </CardBody>
      </Card>
    </>
  );
}
