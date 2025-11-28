"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  particleColors?: string[];
  vx?: number;
  vy?: number;
}

export default function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  particleColors,
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    setIsReady(true);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    createParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const getRandomColor = () => {
    if (particleColors && particleColors.length > 0) {
      return particleColors[Math.floor(Math.random() * particleColors.length)];
    }
    return color;
  };

  const createParticles = () => {
    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      particles.current.push({
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        vx: (Math.random() - 0.5) * 0.5 + vx,
        vy: (Math.random() - 0.5) * 0.5 + vy,
        size: Math.random() * 2 + 0.5,
        color: getRandomColor(),
        alpha: Math.random() * 0.5 + 0.2,
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const animate = () => {
    if (!context.current) return;

    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    particles.current.forEach((particle, i) => {
      // Calculate distance from mouse
      const dx = mouse.current.x - particle.x;
      const dy = mouse.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.vx -= (dx / distance) * force * (ease / 1000);
        particle.vy -= (dy / distance) * force * (ease / 1000);
      }

      // Apply staticity (return to original velocity)
      particle.vx *= 1 - staticity / 1000;
      particle.vy *= 1 - staticity / 1000;

      // Add small random movement
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = canvasSize.current.w;
      if (particle.x > canvasSize.current.w) particle.x = 0;
      if (particle.y < 0) particle.y = canvasSize.current.h;
      if (particle.y > canvasSize.current.h) particle.y = 0;

      // Draw particle
      if (context.current) {
        context.current.beginPath();
        context.current.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.current.fillStyle = particle.color;
        context.current.globalAlpha = particle.alpha;
        context.current.fill();
      }

      // Draw connections
      particles.current.slice(i + 1).forEach((particle2) => {
        const dx2 = particle.x - particle2.x;
        const dy2 = particle.y - particle2.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (distance2 < 100 && context.current) {
          context.current.beginPath();
          context.current.moveTo(particle.x, particle.y);
          context.current.lineTo(particle2.x, particle2.y);
          context.current.strokeStyle = particle.color;
          context.current.globalAlpha = (1 - distance2 / 100) * 0.2;
          context.current.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  };

  return (
    <div
      ref={canvasContainerRef}
      onMouseMove={onMouseMove}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className={cn("opacity-0 transition-opacity duration-1000", isReady && "opacity-100")}
      />
    </div>
  );
}
