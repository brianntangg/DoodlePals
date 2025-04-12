import { useRef, useState } from "react";
import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
import { BiSave, BiTrash } from "react-icons/bi";

function Canvas({ onSave }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);

  function startDrawing() {
    setDrawing(true);
  }

  function stopDrawing() {
    setDrawing(false);
  }

  function mouseMove(e) {
    if (!drawing) return;
    const pixelSize = 10;
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const x = Math.floor((e.clientX - rect.left) / pixelSize) * pixelSize;
    const y = Math.floor((e.clientY - rect.top) / pixelSize) * pixelSize;
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, pixelSize, pixelSize);
  }

  function save() {
    const canvas = ref.current;
    const url = canvas.toDataURL("image/png");
    onSave(url);
  }

  function clear() {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <VStack spacing={8}>
      <HStack mt={6} spacing={8}>
        <Button
          leftIcon={<Icon boxSize={6} as={BiSave} />}
          colorScheme="green"
          onClick={save}
        >
          Save
        </Button>
        <Button leftIcon={<Icon boxSize={6} as={BiTrash} />} colorScheme="red" onClick={clear}>
          Clear
        </Button>
      </HStack>
      <canvas
        ref={ref}
        width={600}
        height={600}
        className="doodle-canvas"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={mouseMove}
      />
    </VStack>
  );
}

export default Canvas;
