import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiComment, BiHeart, BiSolidHeart } from "react-icons/bi";

export default function DoodleCard({ id, doodle, toggleLike, uid }) {
  const navigate = useNavigate();
  return (
    <Card w={360} cursor="pointer">
      <CardHeader onClick={() => navigate(`/doodle/${id}`)}>
        <Heading size="md">{doodle.title}</Heading>
      </CardHeader>
      <CardBody onClick={() => navigate(`/doodle/${id}`)}>
        <Image src={doodle.data} className="border" />
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <Button
          leftIcon={
            <Icon
              boxSize={6}
              as={doodle.likes.includes(uid) ? BiSolidHeart : BiHeart}
              color="red"
            />
          }
          variant="ghost"
          onClick={toggleLike}
        >
          {doodle.likes.length}
        </Button>
        <Button
          leftIcon={<Icon boxSize={6} as={BiComment} />}
          variant="ghost"
          onClick={() => navigate(`/doodle/${id}`)}
        >
          {Object.keys(doodle.comments).length}
        </Button>
      </CardFooter>
    </Card>
  );
}
