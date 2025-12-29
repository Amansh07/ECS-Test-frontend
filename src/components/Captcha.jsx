import React, { useEffect, useState, useRef } from "react";

export default function Captcha({
  onVerify,
  refreshTrigger = 0,
}) {
  const canvasRef = useRef(null);

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  // Generate new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setA(num1);
    setB(num2);
  };

  useEffect(() => {
    generateCaptcha();
  }, [refreshTrigger]);

  // Draw captcha
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Noise lines
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = "#ffffff33";
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Text
    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${a} + ${b} = ?`, width / 2, height / 2);
  }, [a, b]);

  // Expose correct answer
  useEffect(() => {
    onVerify?.(a + b);
  }, [a, b, onVerify]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg"
      width={303}
      height={43}
    />
  );
}
