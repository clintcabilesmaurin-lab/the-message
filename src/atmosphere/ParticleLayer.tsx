import React, { useEffect, useRef } from 'react';
import { Atmosphere } from '../types';

interface ParticleLayerProps {
  atmosphere: Atmosphere;
}

interface DustMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  swaySpeed: number;
  swayRadius: number;
  swayPhase: number;
  warmth: number; // 0 for pure white, 1 for soft warm-white
}

export const ParticleLayer: React.FC<ParticleLayerProps> = ({ atmosphere }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dust motes density: higher count for rich atmospheric immersion
    const isMobile = width < 768;
    const count = isMobile ? 48 : 80;
    const motes: DustMote[] = [];

    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Extremely gentle, organic wandering speed
        vx: (Math.random() - 0.46) * 0.18,
        vy: -0.06 - Math.random() * 0.16, // gentle rising convection draft
        size: Math.random() * 1.5 + 0.7, // 0.7px to 2.2px small dots
        baseAlpha: Math.random() * 0.35 + 0.18, // 0.18 to 0.53
        swaySpeed: 0.0008 + Math.random() * 0.0016,
        swayRadius: 0.4 + Math.random() * 0.8,
        swayPhase: Math.random() * Math.PI * 2,
        warmth: Math.random(),
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Light beam geometry: angled shaft from top-left toward center/bottom-right
      // Line from P1(x1, y1) to P2(x2, y2)
      const x1 = width * 0.15;
      const y1 = -50;
      const x2 = width * 0.75;
      const y2 = height + 50;

      // Beam direction vector
      const dx = x2 - x1;
      const dy = y2 - y1;
      const beamLengthSq = dx * dx + dy * dy;
      const beamWidth = Math.max(220, width * 0.38); // width of the light beam band

      for (let i = 0; i < count; i++) {
        const m = motes[i];

        // Organic sinusoidal sway like dust motes floating in still air
        const swayX = Math.sin(time * m.swaySpeed + m.swayPhase) * m.swayRadius;
        const swayY = Math.cos(time * m.swaySpeed * 0.7 + m.swayPhase) * (m.swayRadius * 0.5);

        m.x += m.vx + swayX;
        m.y += m.vy + swayY;

        // Wrap boundaries smoothly
        const pad = 30;
        if (m.x < -pad) m.x = width + pad;
        if (m.x > width + pad) m.x = -pad;
        if (m.y < -pad) m.y = height + pad;
        if (m.y > height + pad) m.y = -pad;

        // Distance from point to the light beam center line
        const t = Math.max(0, Math.min(1, ((m.x - x1) * dx + (m.y - y1) * dy) / beamLengthSq));
        const projX = x1 + t * dx;
        const projY = y1 + t * dy;
        const distSq = (m.x - projX) * (m.x - projX) + (m.y - projY) * (m.y - projY);
        const dist = Math.sqrt(distSq);

        // Light beam illumination factor: 0 when outside beam, up to 1.0 at center of beam
        const inBeamIntensity = Math.max(0, 1 - dist / (beamWidth / 2));

        // When in light beam, dust mote illuminates and catches the light
        const effectiveAlpha = Math.min(
          0.92,
          m.baseAlpha + inBeamIntensity * 0.45 + Math.sin(time * 0.02 + m.swayPhase) * 0.08
        );

        // Soft dust particle color: subtle warm tints in warm/golden atmospheres, crisp white in beam
        let r = 255;
        let g = 255;
        let b = 255;

        if (atmosphere === 'golden') {
          r = 255;
          g = Math.floor(238 + m.warmth * 12);
          b = Math.floor(190 + m.warmth * 45);
        } else if (atmosphere === 'warm') {
          r = 252;
          g = Math.floor(245 + m.warmth * 8);
          b = Math.floor(220 + m.warmth * 25);
        } else {
          // Delicate pure white and soft off-white
          r = Math.floor(248 + m.warmth * 7);
          g = Math.floor(248 + m.warmth * 7);
          b = Math.floor(250 + m.warmth * 5);
        }

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size + inBeamIntensity * 0.35, 0, Math.PI * 2);

        // Soft atmospheric halo for motes caught in the light beam
        if (inBeamIntensity > 0.05) {
          ctx.shadowBlur = 3 + inBeamIntensity * 7;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${inBeamIntensity * 0.75})`;
        } else {
          ctx.shadowBlur = 1.5;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${effectiveAlpha})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrame);
    };
  }, [atmosphere]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-90 transition-opacity duration-1000"
    />
  );
};
