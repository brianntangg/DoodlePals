import { Box, useRadio } from "@chakra-ui/react";
import ToolbarIcon from "./ToolbarIcon.jsx";

export default function ToolbarButton(props) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();
  return (
    <Box as="label">
      <input {...input} />
      <ToolbarIcon {...checkbox} icon={props.icon} />
    </Box>
  );
}
