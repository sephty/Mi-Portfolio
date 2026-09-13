import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Calibrated timer: takes ~3.2 seconds to reach 100% smoothly
    const interval = 35;
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth progression that flows naturally to ~3.2s
        let inc = 1;
        if (prev < 45) {
          inc = Math.random() < 0.65 ? 1 : 2;
        } else if (prev < 78) {
          inc = Math.random() < 0.6 ? 1 : 2;
        } else if (prev < 92) {
          inc = Math.random() < 0.8 ? 1 : 0;
        } else {
          inc = 1;
        }

        return Math.min(100, prev + inc);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }, 450);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  // Click anywhere to dismiss/skip
  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 280);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 bg-[#05050a] flex flex-col items-center justify-center select-none cursor-pointer transition-all duration-700 overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── 1. BACKGROUND CHALK BLUEPRINTS (High prominence & authentic layering) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-65 mix-blend-screen bg-repeat bg-center"
        style={{
          backgroundImage: "url('./assets/refantazio/main/ChalkLines_Background.png')",
          backgroundSize: '1100px auto'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen bg-repeat bg-center"
        style={{
          backgroundImage: "url('./assets/refantazio/main/ChalkLines_Foreground.png')",
          backgroundSize: '950px auto',
          transform: 'rotate(180deg)'
        }}
      />

      {/* ── 2. CELESTIAL ASTROLABE DRAFTING GRID (SVG Rings & Coordinate Crosshairs) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="draftingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#23c2db" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#23c2db" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#23c2db" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Luminous Aura */}
        <circle cx="500" cy="500" r="420" fill="url(#draftingGlow)" />

        {/* Concentric Drafting Calibration Rings */}
        <circle cx="500" cy="500" r="440" fill="none" stroke="#23c2db" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
        <circle cx="500" cy="500" r="380" fill="none" stroke="#f0ece0" strokeWidth="1.2" opacity="0.35" />
        <circle cx="500" cy="500" r="320" fill="none" stroke="#23c2db" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
        <circle cx="500" cy="500" r="260" fill="none" stroke="#f0ece0" strokeWidth="1" opacity="0.4" />
        <circle cx="500" cy="500" r="200" fill="none" stroke="#23c2db" strokeWidth="1.5" strokeDasharray="10 4" opacity="0.6" />
        <circle cx="500" cy="500" r="140" fill="none" stroke="#f2c14e" strokeWidth="1" opacity="0.45" />

        {/* Major Orthogonal Crosshairs */}
        <line x1="0" y1="500" x2="1000" y2="500" stroke="#23c2db" strokeWidth="1" strokeDasharray="8 6" opacity="0.4" />
        <line x1="500" y1="0" x2="500" y2="1000" stroke="#23c2db" strokeWidth="1" strokeDasharray="8 6" opacity="0.4" />

        {/* Diagonal 45-degree Astrolabe Axes */}
        <line x1="146" y1="146" x2="854" y2="854" stroke="#f0ece0" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.3" />
        <line x1="854" y1="146" x2="146" y2="854" stroke="#f0ece0" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.3" />

        {/* Celestial Coordinate Degree Markers */}
        <text x="500" y="70" fill="#23c2db" fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">000° // NORTH VERTEX</text>
        <text x="940" y="505" fill="#23c2db" fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">090° // EAST</text>
        <text x="500" y="945" fill="#23c2db" fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">180° // SOUTH VERTEX</text>
        <text x="60" y="505" fill="#23c2db" fontSize="13" fontFamily="monospace" textAnchor="middle" opacity="0.7">270° // WEST</text>

        {/* Quadrant Corner Drafting Brackets */}
        <path d="M 60 100 L 60 60 L 100 60" fill="none" stroke="#23c2db" strokeWidth="2" opacity="0.8" />
        <path d="M 940 100 L 940 60 L 900 60" fill="none" stroke="#23c2db" strokeWidth="2" opacity="0.8" />
        <path d="M 60 900 L 60 940 L 100 940" fill="none" stroke="#23c2db" strokeWidth="2" opacity="0.8" />
        <path d="M 940 900 L 940 940 L 900 940" fill="none" stroke="#23c2db" strokeWidth="2" opacity="0.8" />
      </svg>

      {/* ── 3. CENTER ASTROLABE MOTIF ── */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Concentric Rotating Astrolabe Rings */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Cyan Glow Pulse */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-3xl animate-pulse" />

          {/* Clockwise Outer Ring */}
          <img
            src="./assets/refantazio/panels/Ring.png"
            alt="Astrolabe Ring"
            className="absolute inset-0 w-full h-full object-contain opacity-80 animate-[spin_26s_linear_infinite]"
          />

          {/* Counter-Clockwise Solid Ring */}
          <img
            src="./assets/refantazio/panels/SolidRing.png"
            alt="Inner Ring"
            className="absolute w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-60 animate-[spin_18s_linear_infinite_reverse]"
          />

          {/* Central Persona Phantom Hat Glyph */}
          <div className="relative z-10 flex items-center justify-center">
            <img
              src="./assets/game/glyphs/hat.png"
              alt="Persona Hat"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_25px_rgba(35,194,219,0.9)] animate-bounce"
              style={{ animationDuration: '2.4s' }}
            />
          </div>

          {/* Radar Scanner Radial Sweep */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 overflow-hidden pointer-events-none">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/15 to-cyan-400/35 origin-right animate-[spin_3.2s_linear_infinite]" />
          </div>
        </div>

        {/* ── 4. AUTHENTIC METAPHOR "NOW LOADING" DISPLAY TITLE ── */}
        <div className="relative mt-8 text-center px-6">
          {/* Authentic paint splash banner behind typography */}
          <div
            className="absolute inset-0 -inset-x-10 bg-emperor-crimson opacity-90 pointer-events-none"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              transform: 'rotate(-1.5deg) scale(1.12)',
              filter: 'drop-shadow(0 4px 18px rgba(209, 35, 58, 0.7))'
            }}
          />

          <h1 className="relative font-metaphor text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] px-4">
            NOW LOADING
          </h1>
        </div>

        {/* ── 5. SLEEK CLEAN PROGRESS BAR & PERCENTAGE (NO CLUTTER / NO MINI TEXTS) ── */}
        <div className="mt-7 w-72 sm:w-96 flex flex-col gap-2">
          {/* Angled High-Contrast Bar */}
          <div className="relative h-3.5 w-full bg-bg-ink border-2 border-parchment/50 overflow-hidden p-0.5 shadow-[0_0_20px_rgba(0,0,0,0.9)]">
            <div
              className="h-full bg-gradient-to-r from-emperor-crimson via-cyan-400 to-parchment transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Clean Percentage Display */}
          <div className="flex items-center justify-end font-mono text-xs text-parchment">
            <span className="font-black text-parchment tracking-widest text-sm">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
