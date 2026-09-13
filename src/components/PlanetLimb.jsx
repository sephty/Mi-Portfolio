import React from 'react';

export const PlanetLimb = ({
  activePlanetKey = 'projects',
  isDocked = false,
  className = ""
}) => {
  // Planet visual configuration based on archetype
  const planetThemes = {
    about: {
      name: "SOLIS // CORE",
      glowColor: "rgba(242, 193, 78, 0.7)",
      atmosphereColor: "#ffd15c",
      rimGradient: "from-amber-200 via-amber-400 to-amber-700",
      deepOcean: "#421800",
      cloudColor: "rgba(255, 235, 170, 0.45)",
      moonColor: "#e6c387"
    },
    projects: {
      name: "ARCHETYPE // GAIA",
      glowColor: "rgba(35, 194, 219, 0.8)",
      atmosphereColor: "#38bdf8",
      rimGradient: "from-cyan-200 via-sky-400 to-indigo-800",
      deepOcean: "#0a1f44",
      cloudColor: "rgba(220, 245, 255, 0.55)",
      moonColor: "#93c5fd"
    },
    skills: {
      name: "ARCHETYPE // ARES",
      glowColor: "rgba(245, 158, 11, 0.75)",
      atmosphereColor: "#fbbf24",
      rimGradient: "from-amber-200 via-orange-500 to-amber-900",
      deepOcean: "#381900",
      cloudColor: "rgba(254, 215, 170, 0.4)",
      moonColor: "#fde68a"
    },
    experience: {
      name: "ARCHETYPE // CHRONOS",
      glowColor: "rgba(77, 204, 160, 0.75)",
      atmosphereColor: "#34d399",
      rimGradient: "from-emerald-200 via-emerald-500 to-emerald-950",
      deepOcean: "#062817",
      cloudColor: "rgba(209, 250, 229, 0.45)",
      moonColor: "#a7f3d0"
    },
    contact: {
      name: "ARCHETYPE // HERMES",
      glowColor: "rgba(209, 35, 58, 0.8)",
      atmosphereColor: "#f43f5e",
      rimGradient: "from-rose-200 via-red-500 to-rose-950",
      deepOcean: "#2b060d",
      cloudColor: "rgba(254, 205, 211, 0.4)",
      moonColor: "#fecdd3"
    }
  };

  const theme = planetThemes[activePlanetKey] || planetThemes.projects;

  return (
    <div
      className={`fixed pointer-events-none z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isDocked
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : 'opacity-0 translate-x-40 translate-y-20 scale-90'
      } ${className}`}
      style={{
        right: '-18vw',
        top: '-10vh',
        width: '78vw',
        maxWidth: '920px',
        aspectRatio: '1 / 1'
      }}
    >
      {/* 1. Volumetric Atmospheric Glow Flare (NASA Rim Glow - Image 2) */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-80"
        style={{
          background: `radial-gradient(circle at 25% 25%, ${theme.glowColor} 0%, rgba(35, 194, 219, 0.3) 40%, transparent 70%)`
        }}
      />

      {/* 2. Main Spherical Planet Body */}
      <div
        className="w-full h-full rounded-full relative overflow-hidden shadow-2xl"
        style={{
          background: `radial-gradient(circle at 28% 28%, ${theme.atmosphereColor} 0%, #1e3a8a 35%, ${theme.deepOcean} 70%, #02040a 100%)`,
          boxShadow: `inset -40px -40px 100px rgba(0, 0, 0, 0.95), 0 0 60px ${theme.glowColor}`
        }}
      >
        {/* Swirling Planetary Clouds / Continental Brush Bands */}
        <div
          className="absolute inset-0 opacity-65 mix-blend-screen"
          style={{
            background: `radial-gradient(ellipse at 40% 30%, ${theme.cloudColor} 0%, transparent 60%),
                         radial-gradient(ellipse at 70% 60%, ${theme.cloudColor} 0%, transparent 50%),
                         radial-gradient(ellipse at 20% 70%, ${theme.cloudColor} 0%, transparent 40%)`,
            filter: 'blur(12px)'
          }}
        />

        {/* Luminous Atmospheric Horizon Limb (Razor-sharp bright arc along edge - Image 2) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 12px 12px 28px 4px #ffffff, inset 24px 24px 60px 8px ${theme.atmosphereColor}`
          }}
        />

        {/* Terminator Darkness Shadow (Crossing the body) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(0, 0, 0, 0.6) 65%, #020205 90%)'
          }}
        />
      </div>

      {/* 3. Orbiting Deep Space Micro-Moon (Matching Image 2) */}
      <div
        className="absolute -left-12 bottom-1/3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center animate-pulse"
        style={{
          background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${theme.moonColor} 50%, #050b14 100%)`,
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)'
        }}
      >
        {/* Moon shadow crescent */}
        <div className="w-full h-full rounded-full border border-white/40" />
      </div>
    </div>
  );
};
