import React, { useEffect, useRef } from 'react';

export const SpaceCanvas = ({ isZoomed = false, activePlanetKey = null }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      renderBackgroundCache();
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Cached offscreen background canvas for maximum 60/120fps performance
    let bgCanvas = document.createElement('canvas');
    let bgCtx = bgCanvas.getContext('2d');

    const renderBackgroundCache = () => {
      bgCanvas.width = width;
      bgCanvas.height = height;

      // Deep cosmic gradient
      const bgGrad = bgCtx.createRadialGradient(
        width * 0.65,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#0d1127'); // deep indigo core
      bgGrad.addColorStop(0.35, '#070918'); // midnight void
      bgGrad.addColorStop(0.7, '#05060f');
      bgGrad.addColorStop(1, '#020205'); // outer void
      bgCtx.fillStyle = bgGrad;
      bgCtx.fillRect(0, 0, width, height);

      // Nebula 1: Ethereal Violet Dust
      const neb1 = bgCtx.createRadialGradient(
        width * 0.75,
        height * 0.35,
        20,
        width * 0.75,
        height * 0.35,
        width * 0.45
      );
      neb1.addColorStop(0, 'rgba(120, 60, 180, 0.14)');
      neb1.addColorStop(0.5, 'rgba(60, 30, 110, 0.06)');
      neb1.addColorStop(1, 'transparent');
      bgCtx.fillStyle = neb1;
      bgCtx.fillRect(0, 0, width, height);

      // Nebula 2: Cerulean / Cyan Atmospheric Haze
      const neb2 = bgCtx.createRadialGradient(
        width * 0.85,
        height * 0.15,
        10,
        width * 0.85,
        height * 0.15,
        width * 0.55
      );
      neb2.addColorStop(0, 'rgba(35, 194, 219, 0.12)');
      neb2.addColorStop(0.4, 'rgba(58, 73, 201, 0.08)');
      neb2.addColorStop(1, 'transparent');
      bgCtx.fillStyle = neb2;
      bgCtx.fillRect(0, 0, width, height);

      // Nebula 3: Crimson Atlus Rim
      const neb3 = bgCtx.createRadialGradient(
        width * 0.25,
        height * 0.8,
        10,
        width * 0.25,
        height * 0.8,
        width * 0.4
      );
      neb3.addColorStop(0, 'rgba(209, 35, 58, 0.07)');
      neb3.addColorStop(1, 'transparent');
      bgCtx.fillStyle = neb3;
      bgCtx.fillRect(0, 0, width, height);

      // Distant Sparkling Star Cluster
      const clusterX = width * 0.78;
      const clusterY = height * 0.72;
      const clusterGlow = bgCtx.createRadialGradient(clusterX, clusterY, 0, clusterX, clusterY, 65);
      clusterGlow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      clusterGlow.addColorStop(0.3, 'rgba(180, 220, 255, 0.15)');
      clusterGlow.addColorStop(1, 'transparent');
      bgCtx.fillStyle = clusterGlow;
      bgCtx.beginPath();
      bgCtx.arc(clusterX, clusterY, 65, 0, Math.PI * 2);
      bgCtx.fill();
    };

    renderBackgroundCache();

    // Star data with depth layers
    let stars = [];
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 4200);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.85 ? Math.random() * 1.2 + 0.3 : Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: Math.random() < 0.2 ? '#b8d8ff' : Math.random() < 0.35 ? '#ffd4b8' : '#ffffff'
        });
      }
    };
    initStars();

    // Render loop (Optimized: single drawImage + star dots)
    let tick = 0;
    const render = () => {
      tick++;

      // Blit cached background & nebulae in a single draw operation
      ctx.drawImage(bgCanvas, 0, 0);

      // Render Stars with subtle twinkle
      stars.forEach(star => {
        const twinkle = Math.sin(tick * star.twinkleSpeed + star.twinkleOffset);
        const currentAlpha = Math.max(0.1, star.alpha + twinkle * 0.25);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow for brighter stars
        if (star.size > 2.0) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.15;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      animFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 ${
        isZoomed ? 'opacity-85' : 'opacity-100'
      }`}
    />
  );
};
