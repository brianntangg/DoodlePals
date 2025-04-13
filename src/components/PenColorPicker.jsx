import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { BiFontColor, BiFontSize } from "react-icons/bi";
import ToolbarIcon from "./ToolbarIcon.jsx";
import { HexColorPicker } from "react-colorful";

export default function PenColorPicker({ penColor, setPenColor }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
    >
      <PopoverTrigger>
        <ToolbarIcon icon={BiFontColor} />
      </PopoverTrigger>
      <PopoverContent width="fit-content" p={2}>
        <PopoverBody>
          <HexColorPicker color={penColor} onChange={setPenColor} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
