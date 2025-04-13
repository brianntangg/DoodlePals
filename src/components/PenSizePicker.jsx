import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { BiFontSize } from "react-icons/bi";
import ToolbarIcon from "./ToolbarIcon.jsx";

export default function PenSizePicker({ penSize, setPenSize }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
    >
      <PopoverTrigger>
        <ToolbarIcon icon={BiFontSize} />
      </PopoverTrigger>
      <PopoverContent width="fit-content" p={2}>
        <PopoverBody>
          <Box display="flex" alignItems="center" gap={2}>
            <NumberInput
              value={penSize}
              onChange={(val) => setPenSize(Number(val))}
              min={2}
              max={128}
              size="sm"
              width="80px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            px
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
