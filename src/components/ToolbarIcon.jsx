import { Box, Icon } from "@chakra-ui/react";

export default function ToolbarIcon(props) {
  return (
    <Box
      {...props}
      cursor="pointer"
      borderRadius="md"
      borderWidth={1}
      borderColor="white"
      _hover={{ bg: "gray.100" }}
      _active={{ bg: "gray.400" }}
      _checked={{ bg: "gray.300" }}
      _focus={{ boxShadow: "outline" }}
      transition="all 0.1s ease"
      w={10}
      h={10}
      p={2}
    >
      <Icon boxSize={6} as={props.icon} />
    </Box>
  );
}
