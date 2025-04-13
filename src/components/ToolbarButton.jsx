import { Box, Icon, useRadio } from "@chakra-ui/react";

export default function ToolbarButton(props) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        borderWidth={1}
        borderColor="white"
        _checked={{ bg: "gray.300" }}
        _focus={{ boxShadow: "outline" }}
        w={10}
        h={10}
        p={2}
      >
        <Icon boxSize={6} as={props.icon} />
      </Box>
    </Box>
  );
}
