"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const initParticles = () => {
      particles = [];
      // Menos partículas no celular para garantir que rode liso (60fps)
      const particleCount = window.innerWidth < 768 ? 40 : 100;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.7, // velocidade
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 1.5 + 0.5, // tamanho do ponto
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cor neon: #00f2fe
      ctx.fillStyle = "rgba(0, 242, 254, 0.6)";
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        // Rebater nas bordas da tela
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interação com o mouse (atração ou repulsão)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        // Se o mouse estiver perto, as partículas abrem espaço levemente (repulsão)
        // e aceleram um pouco criando um efeito fluido.
        if (distMouse < 120) {
          p.x -= dxMouse * 0.03;
          p.y -= dyMouse * 0.03;
        }

        // Desenha a "estrela" (partícula)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Conecta com as linhas formando a constelação
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          // Distância limite para conectar os pontos
          const connectDist = window.innerWidth < 768 ? 100 : 150;
          if (dist < connectDist) {
            ctx.beginPath();
            // A opacidade da linha diminui conforme a distância aumenta (fade)
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.25 * (1 - dist / connectDist)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    // Event Listeners
    const handleResize = () => resize();
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    const handleTouchMove = (e: TouchEvent) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
    />
  );
}
