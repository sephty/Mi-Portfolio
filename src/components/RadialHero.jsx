import React, { useEffect, useRef, useState } from 'react';
import { SunNode } from './SunNode';
import { MetaphorCascadeMenu } from './MetaphorCascadeMenu';
import { portfolioData } from '../data/portfolioData';

// Generously spaced orbits stepping up by ~75px so planets NEVER bunch or overlap
const orbitConfig = {
  projects:   { a: 230, b: 135, speed: 0.0040, startAngle: 20  },  // Quadrant 1 (Top-Right)
  skills:     { a: 305, b: 180, speed: 0.0030, startAngle: 110 },  // Quadrant 2 (Bottom-Right)
  experience: { a: 380, b: 225, speed: 0.0022, startAngle: 200 },  // Quadrant 3 (Bottom-Left)
  contact:    { a: 455, b: 270, speed: 0.0016, startAngle: 290 },  // Quadrant 4 (Top-Left)
};

const ORBIT_TILT = -9; // subtle orbital plane inclination

export const RadialHero = ({
  activeKey,
  setActiveKey,
  onSelectNode,
  currentLang
}) => {
  const { orbitalNodes, profile } = portfolioData;
  const planets = orbitalNodes.filter(n => n.key !== 'about');
  const animRef = useRef(null);
  const anglesRef = useRef({});
  const [positions, setPositions] = useState({});

  // Initialize spaced quadrant angles
  useEffect(() => {
    planets.forEach(p => {
      const cfg = orbitConfig[p.key];
      if (cfg) {
        anglesRef.current[p.key] = (cfg.startAngle * Math.PI) / 180;
      }
    });
  }, []);

  // Smooth parametric orbital motion
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const next = {};
      planets.forEach(p => {
        const cfg = orbitConfig[p.key];
        if (!cfg) return;
        anglesRef.current[p.key] += cfg.speed;
        const angle = anglesRef.current[p.key];
        next[p.key] = {
          x: Math.cos(angle) * cfg.a,
          y: Math.sin(angle) * cfg.b,
        };
      });
      setPositions({ ...next });
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-between px-6 lg:px-14 xl:px-20 overflow-hidden select-none">
      {/* ── LEFT: CASCADING METAPHOR MENU ── */}
      <div className="w-full md:w-5/12 z-30 flex flex-col justify-center">
        <MetaphorCascadeMenu
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          onSelectNode={onSelectNode}
          currentLang={currentLang}
        />
      </div>

      {/* ── RIGHT: CELESTIAL ORBITAL ORRERY ── */}
      <div className="hidden md:flex w-7/12 relative items-center justify-center z-20" style={{ height: '760px' }}>

        {/* SVG orbit track ellipses */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="-550 -350 1100 700"
          style={{ overflow: 'visible' }}
        >
          <g transform={`rotate(${ORBIT_TILT})`}>
            {planets.map(planet => {
              const cfg = orbitConfig[planet.key];
              if (!cfg) return null;
              return (
                <ellipse
                  key={`track-${planet.key}`}
                  cx="0" cy="0"
                  rx={cfg.a} ry={cfg.b}
                  fill="none"
                  stroke={planet.color}
                  strokeWidth="1"
                  opacity="0.22"
                  strokeDasharray={planet.key === 'experience' ? '8 10' : 'none'}
                />
              );
            })}
          </g>
        </svg>

        {/* Central Sun Node (Joseph's Portrait) */}
        <div className="relative z-20">
          <SunNode
            avatarSrc={profile.avatar}
            isActive={activeKey === 'about'}
            onClick={() => onSelectNode('about')}
            onMouseEnter={() => setActiveKey('about')}
            onMouseLeave={() => setActiveKey(null)}
            sizeClass="w-44 h-44 lg:w-56 lg:h-56"
          />
        </div>

        {/* ── 4 ORBITING SPHERICAL PLANETS ── */}
        {planets.map((planet) => {
          const cfg = orbitConfig[planet.key];
          if (!cfg) return null;
          const pos = positions[planet.key] || { x: cfg.a, y: 0 };
          const isFocus = activeKey === planet.key;
          const isDim = activeKey !== null && !isFocus;
          const label = currentLang === 'es' ? planet.label_es : planet.label_en;
          const planetSize = planet.size + 24;

          // Orbit inclination transformation
          const tiltRad = (ORBIT_TILT * Math.PI) / 180;
          const rx = pos.x * Math.cos(tiltRad) - pos.y * Math.sin(tiltRad);
          const ry = pos.x * Math.sin(tiltRad) + pos.y * Math.cos(tiltRad);

          // Depth illusion: scale slightly when in front vs behind Sun
          const depthScale = 0.90 + 0.15 * ((pos.y + cfg.b) / (2 * cfg.b));
          const depthZ = pos.y < 0 ? 12 : 28;

          return (
            <div
              key={planet.key}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px)) scale(${depthScale})`,
                zIndex: isFocus ? 35 : depthZ,
                willChange: 'transform',
                transition: 'opacity 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => onSelectNode(planet.key)}
                onMouseEnter={() => setActiveKey(planet.key)}
                onMouseLeave={() => setActiveKey(null)}
                className={`relative flex flex-col items-center group interactive-cursor outline-none transition-all duration-200 ${
                  isDim ? 'opacity-80' : 'opacity-100'
                }`}
                style={{ transform: isFocus ? 'scale(1.22)' : 'scale(1.0)' }}
                aria-label={label}
              >
                {/* Volumetric Atmospheric Glow Flare */}
                <div
                  className={`absolute rounded-full transition-all duration-300 blur-2xl pointer-events-none ${
                    isFocus ? 'opacity-100 scale-[2.0]' : 'opacity-50 group-hover:opacity-85'
                  }`}
                  style={{
                    inset: '-20px',
                    background: `radial-gradient(circle, ${planet.color}cc 0%, ${planet.color}40 45%, transparent 75%)`,
                  }}
                />

                {/* ── GORGEOUS SPHERICAL PLANET BODY (100% OPAQUE, TRUE SPHERE) ── */}
                <div
                  className="rounded-full relative"
                  style={{
                    width: `${planetSize}px`,
                    height: `${planetSize}px`,
                    backgroundColor: '#0a0a14',
                    background: `
                      radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 20%, transparent 42%),
                      radial-gradient(circle at 75% 75%, rgba(0,0,0,0.92) 0%, rgba(5,5,15,0.5) 45%, transparent 70%),
                      radial-gradient(circle at 45% 42%, ${planet.color} 0%, ${planet.color} 55%, #050510 100%)
                    `,
                    boxShadow: `
                      inset -8px -8px 18px rgba(0,0,0,0.95),
                      inset 4px 4px 12px rgba(255,255,255,0.4),
                      0 0 ${isFocus ? '36' : '22'}px ${planet.color},
                      0 0 ${isFocus ? '70' : '45'}px ${planet.color}60
                    `,
                    border: '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Specular Highlight Crescent */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      top: '10%', left: '14%',
                      width: '40%', height: '30%',
                      background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 80%)',
                      filter: 'blur(1px)',
                    }}
                  />

                  {/* Pinpoint Glint */}
                  <div
                    className="absolute rounded-full bg-white blur-[0.2px] pointer-events-none"
                    style={{ top: '16%', left: '22%', width: '5px', height: '5px' }}
                  />

                  {/* Subtle Curved Planetary Cloud Swirls */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-30 mix-blend-overlay"
                    style={{
                      background: `
                        radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.5) 0%, transparent 60%),
                        radial-gradient(ellipse at 40% 65%, rgba(255,255,255,0.3) 0%, transparent 50%)
                      `
                    }}
                  />

                  {/* Saturn Ring (for Experience planet) */}
                  {planet.ringColor && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        width: '230%', height: '55%',
                        top: '22%', left: '-65%',
                        borderRadius: '50%',
                        border: `2px solid ${planet.ringColor}`,
                        transform: 'rotateX(72deg) rotateZ(-15deg)',
                        boxShadow: `0 0 14px ${planet.ringColor}`,
                        background: `linear-gradient(90deg, transparent 4%, ${planet.ringColor}50 25%, ${planet.ringColor}20 75%, transparent 96%)`,
                      }}
                    />
                  )}
                </div>

                {/* Planet Typographic Label Badge */}
                <div
                  className={`mt-2.5 px-3 py-0.5 font-metaphor text-[10px] uppercase tracking-wider rounded transition-all duration-150 whitespace-nowrap shadow-xl border ${
                    isFocus
                      ? 'bg-parchment text-bg-ink font-black scale-110 border-parchment'
                      : 'bg-bg-ink/95 text-parchment border-parchment/30 group-hover:border-cyan-400'
                  }`}
                  style={{
                    boxShadow: isFocus ? `0 0 14px ${planet.color}` : '0 2px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  {label}
                </div>
              </button>
            </div>
          );
        })}

        {/* ── METAPHOR CORNER HUD PLATE ── */}
        <div className="absolute bottom-4 right-2 font-mono text-xs select-none pointer-events-none z-30">
          <div className="relative px-5 py-1.5 flex items-center justify-between gap-8 min-w-[210px]">
            <img
              src="./assets/refantazio/main/ControlsPanel.png"
              alt=""
              className="absolute inset-0 w-full h-full object-fill drop-shadow-md -z-10"
            />
            <span className="text-[10px] tracking-widest uppercase text-cyan-700 font-black">CORE // STACK</span>
            <span className="font-metaphor text-sm text-bg-ink font-black">JAVA / SPRING</span>
          </div>
        </div>
      </div>
    </section>
  );
};
