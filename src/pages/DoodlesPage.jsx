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

function DoodlesPage() {
  const db = useDb();
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  function update() {
    setLoading(true);
    db.getAllDoodles().then((plans) => {
      setPlans(plans);
      setLoading(false);
    });
  }

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      ) : plans.length ? (
        <Wrap spacing={6}>
          {plans.map(({ id, ...doodle }) => (
            <WrapItem key={id}>
              <DoodleCard id={id} doodle={doodle} />
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
