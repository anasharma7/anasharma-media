'use client';

import { useEffect, useRef } from 'react';

export default function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawGrain() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const shade = (Math.random() * 255) | 0;
        buffer[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    function loop() {
      drawGrain();
      timeoutId = setTimeout(() => {
        frameId = requestAnimationFrame(loop);
      }, 90);
    }
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
