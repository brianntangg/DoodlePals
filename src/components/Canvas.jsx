import { useRef, useState } from "react";
import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { BiEraser, BiSave } from "react-icons/bi";
import Toolbar from "./Toolbar.jsx";

function Canvas({ onSave, prompt, disabled }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const [penSize, setPenSize] = useState(10);
  const [penColor, setPenColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");

  function getPixelColor(data, x, y, width) {
    const i = (y * width + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  }

  function setPixelColor(data, x, y, rgba, width) {
    const i = (y * width + x) * 4;
    [data[i], data[i + 1], data[i + 2], data[i + 3]] = rgba;
  }

  function hexToRgba(hex) {
    const x = parseInt(hex.replace("#", ""), 16);
    const r = (x >> 16) & 255;
    const g = (x >> 8) & 255;
    const b = x & 255;
    return [r, g, b, 255];
  }

  function sameColor(c1, c2, tol) {
    return (
      Math.abs(c1[0] - c2[0]) <= tol &&
      Math.abs(c1[1] - c2[1]) <= tol &&
      Math.abs(c1[2] - c2[2]) <= tol &&
      Math.abs(c1[3] - c2[3]) <= tol
    );
  }

  function fill(e, tol = 30, res = 2) {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const x = Math.floor((e.clientX - rect.left) / res) * res;
    const y = Math.floor((e.clientY - rect.top) / res) * res;
    const img = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = img.data;
    const tc = getPixelColor(data, x, y, ctx.canvas.width);
    const rc = hexToRgba(penColor);
    if (sameColor(tc, rc, tol)) return;
    let st = [[x, y]];
    let vis = Array.from({ length: ctx.canvas.width }, () =>
      Array(ctx.canvas.height).fill(false),
    );
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    while (st.length) {
      const [r, c] = st.pop();
      if (vis[r][c]) continue;
      vis[r][c] = true;
      setPixelColor(data, r, c, rc, ctx.canvas.width);
      for (let d = 0; d < 4; d++) {
        const nx = r + dx[d],
          ny = c + dy[d];
        if (
          nx >= 0 &&
          nx < ctx.canvas.width &&
          ny >= 0 &&
          ny < ctx.canvas.height &&
          sameColor(tc, getPixelColor(data, nx, ny, ctx.canvas.width), tol)
        ) {
          st.push([nx, ny]);
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function startDrawing(e) {
    if (disabled) return;
    if (tool === "bucket") fill(e);
    else setDrawing(true);
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
        <Toolbar
          setTool={setTool}
          penSize={penSize}
          setPenSize={setPenSize}
          penColor={penColor}
          setPenColor={setPenColor}
        />
      </HStack>
    </VStack>
  );
}

export default Canvas;
