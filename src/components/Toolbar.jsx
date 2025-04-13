import { useRadioGroup, VStack } from "@chakra-ui/react";
import ToolbarButton from "./ToolbarButton.jsx";
import { BiEraser, BiPencil } from "react-icons/bi";

export default function Toolbar({ onChange }) {
  const options = [
    ["pencil", BiPencil],
    ["eraser", BiEraser],
  ];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "tool",
    defaultValue: "pencil",
    onChange,
  });
  const group = getRootProps();
  return (
    <VStack {...group}>
      {options.map(([value, icon]) => {
        const radio = getRadioProps({ value });
        return <ToolbarButton key={value} {...radio} icon={icon} />;
      })}
    </VStack>
  );
}
