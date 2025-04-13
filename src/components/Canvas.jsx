import { useRef, useState } from "react";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { BiEraser, BiSave } from "react-icons/bi";

function Canvas({ onSave, prompt }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);

  function startDrawing() {
    setDrawing(true);
  }

  function stopDrawing() {
    setDrawing(false);
    setLastPos(null);
  }

  function drawLine(ctx, x0, y0, x1, y1, sz = 1) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? sz : -sz;
    let sy = y0 < y1 ? sz : -sz;
    let err = dx - dy;
    while (true) {
      ctx.fillRect(x0, y0, sz, sz);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
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
    if (lastPos) drawLine(ctx, lastPos.x, lastPos.y, x, y, pixelSize);
    else ctx.fillRect(x, y, pixelSize, pixelSize);
    setLastPos({ x, y });
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
    <VStack spacing={8} mb={20}>
      {prompt && <Heading size="md">{prompt}</Heading>}
      <HStack mt={6} spacing={8}>
        <Button
          leftIcon={<Icon boxSize={6} as={BiSave} />}
          colorScheme="green"
          onClick={save}
        >
          Save
        </Button>
        <Button
          leftIcon={<Icon boxSize={6} as={BiEraser} />}
          colorScheme="red"
          onClick={clear}
        >
          Clear
        </Button>
      </HStack>
      <canvas
        ref={ref}
        width={600}
        height={600}
        className="border"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={mouseMove}
      />
    </VStack>
  );
}

export default Canvas;
