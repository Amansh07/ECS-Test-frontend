import React, { useEffect, useRef } from "react";
import captcha from "../assets/captcha.jpeg";

export default function Captcha({ a = 0, b = 0 }) {
  const canvasRef = useRef(null);
  const bgImageRef = useRef(null);

  // Load background image once
  useEffect(() => {
    const img = new Image();
    img.src = captcha;
    img.onload = () => {
      bgImageRef.current = img;
    };
  }, []);

  // Draw only when a or b change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background (top crop)
    if (bgImageRef.current) {
      const img = bgImageRef.current;
      const sourceHeight = img.height * 0.4;

      ctx.drawImage(
        img,
        0, 0,
        img.width,
        sourceHeight,
        0, 0,
        width,
        height
      );
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }

    // Overlay
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, width, height);

    // Noise
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = "#ffffff33";
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    const text = `${a}+${b}=?`;
    ctx.font = "bold 22px Arial";

    let totalWidth = 0;
    const gaps = [];

    for (let i = 0; i < text.length; i++) {
      const gap = 6 + Math.random() * 16;
      gaps.push(gap);
      totalWidth += ctx.measureText(text[i]).width + gap;
    }

    let currentX = (width - totalWidth) / 2;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const isOperator = char === "+" || char === "=" || char === "?";

      const fontSize = isOperator
        ? 20 + Math.random() * 4
        : 16 + Math.random() * 14;

      const y = isOperator
        ? height / 2
        : height / 2 + (Math.random() * 18 - 9);

      const rotation = isOperator ? 0 : (Math.random() - 0.5) * 0.7;

      ctx.save();
      ctx.translate(currentX, y);
      ctx.rotate(rotation);

      ctx.font = `400 ${fontSize}px Arial`;
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "middle";

      if (!isOperator) {
        ctx.filter = "blur(0.5px)";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 2;
      }

      ctx.fillText(char, 0, 0);

      ctx.filter = "none";
      ctx.shadowBlur = 0;
      ctx.restore();

      currentX += ctx.measureText(char).width + gaps[i];
    }
  }, [a, b]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg"
      width={303}
      height={43}
    />
  );
}
