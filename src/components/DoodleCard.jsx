import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiComment, BiHeart } from "react-icons/bi";

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
        <CardFooter>
          <ButtonGroup gap={4}>
            <Button
              colorScheme="white"
              leftIcon={<Icon boxSize={6} as={BiHeart} />}
              variant="ghost"
            >
              {doodle.likes}
            </Button>
            <Button
              colorScheme="white"
              leftIcon={<Icon boxSize={6} as={BiComment} />}
              variant="ghost"
            >
              {doodle.numComments}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
