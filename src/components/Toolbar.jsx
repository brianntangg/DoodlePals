import { useRadioGroup, VStack } from "@chakra-ui/react";
import ToolbarButton from "./ToolbarButton.jsx";
import { BiColorFill, BiEraser, BiPencil } from "react-icons/bi";
import PenSizePicker from "./PenSizePicker.jsx";
import PenColorPicker from "./PenColorPicker.jsx";

export default function Toolbar(props) {
  const options = [
    ["pencil", BiPencil],
    ["eraser", BiEraser],
    ["bucket", BiColorFill],
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "tool",
    defaultValue: "pencil",
    onChange: props.setTool,
  });
  const group = getRootProps();
  return (
    <VStack {...group}>
      {options.map(([value, icon]) => {
        const radio = getRadioProps({ value });
        return <ToolbarButton key={value} {...radio} icon={icon} {...props} />;
      })}
      <PenSizePicker {...props} />
      <PenColorPicker {...props} />
    </VStack>
  );
}
