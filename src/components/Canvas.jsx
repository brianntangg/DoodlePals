import { useRef, useState } from "react";

function Canvas() {
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

  return (
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
  );
}

export default Canvas;
