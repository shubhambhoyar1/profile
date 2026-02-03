"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function GlassmorphismPhotoCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 400;

    const bubbles: Array<{
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      opacity: number;
    }> = [];

    // Create bubbles
    for (let i = 0; i < 8; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        // Update position
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Bounce off edges
        if (bubble.x <= bubble.radius || bubble.x >= canvas.width - bubble.radius) {
          bubble.dx *= -1;
        }
        if (bubble.y <= bubble.radius || bubble.y >= canvas.height - bubble.radius) {
          bubble.dy *= -1;
        }

        // Draw bubble
        const gradient = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, bubble.radius);

        if (theme === "dark") {
          gradient.addColorStop(0, `rgba(147, 197, 253, ${bubble.opacity})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, ${bubble.opacity * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${bubble.opacity})`);
          gradient.addColorStop(1, `rgba(147, 197, 253, ${bubble.opacity * 0.3})`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [theme]);

  return (
    <div className="relative w-72 h-96 rounded-2xl overflow-hidden group">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl"></div>

      {/* Animated bubbles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" style={{ mixBlendMode: theme === "dark" ? "screen" : "multiply" }} />

      {/* Photo */}
      <div className="absolute inset-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <img src="/profile.jpg" alt="Shubham Bhoyar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
