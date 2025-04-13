import { useRef, useState } from "react";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { BiEraser, BiSave } from "react-icons/bi";
import Toolbar from "./Toolbar.jsx";

function Canvas({ onSave, prompt, disabled }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [penSize, setPenSize] = useState(10);
  const [penColor, setPenColor] = useState("black");
  const [tool, setTool] = useState("pencil");

  function startDrawing() {
    if (disabled) return;
    setDrawing(true);
  }

  function stopDrawing() {
    setDrawing(false);
    setLastPos(null);
  }

  function drawPoint(ctx, x, y) {
    switch (tool) {
      case "pencil":
        ctx.beginPath();
        ctx.arc(x, y, penSize / 2.0, 0, 2 * Math.PI);
        ctx.fillStyle = penColor;
        ctx.fill();
        break;
      case "eraser":
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, penSize / 2.0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        break;
    }
  }

  function drawLine(ctx, x0, y0, x1, y1, sz = 10) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? sz : -sz;
    let sy = y0 < y1 ? sz : -sz;
    let err = dx - dy;
    while (true) {
      drawPoint(ctx, x0, y0);
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
    if (disabled) {
      stopDrawing();
      return;
    }
    const res = 1;
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const x = Math.floor((e.clientX - rect.left) / res) * res;
    const y = Math.floor((e.clientY - rect.top) / res) * res;
    ctx.fillStyle = "black";
    if (lastPos) drawLine(ctx, lastPos.x, lastPos.y, x, y, res);
    else drawPoint(ctx, x, y);
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
      <HStack spacing={6} align="top">
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
        <Toolbar onChange={setTool} />
      </HStack>
    </VStack>
  );
}

export default Canvas;
