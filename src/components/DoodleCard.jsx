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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiComment, BiHeart, BiSolidHeart } from "react-icons/bi";

export default function DoodleCard({ id, doodle, toggleLike, uid }) {
  const navigate = useNavigate();

  function timeSince(date) {
    date = new Date(date.seconds * 1000);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  return (
    <Card w={360} cursor="pointer">
      <CardHeader onClick={() => navigate(`/doodle/${id}`)}>
        <Heading size="md">{doodle.title}</Heading>
      </CardHeader>
      <CardBody onClick={() => navigate(`/doodle/${id}`)}>
        <Image src={doodle.data} className="border" />
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap" alignItems="center">
        <ButtonGroup isAttached={true}>
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
        </ButtonGroup>
        <Text fontStyle="italic" color="gray.600">
          {timeSince(doodle.createTime)}
        </Text>
      </CardFooter>
    </Card>
  );
}
