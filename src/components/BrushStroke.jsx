import React from 'react';

export const BrushStroke = ({
  children,
  isActive = false,
  tag = "01",
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = ""
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex items-center min-h-[54px] px-4 py-2 select-none interactive-cursor group transition-transform duration-200 ${
        isActive ? 'translate-x-3 scale-[1.03]' : 'hover:translate-x-1.5'
      } ${className}`}
    >
      {/* Dynamic Layered Paint Strokes Backdrop (Matching Metaphor Quest Start Screen) */}
      <div
        className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-200 origin-left ${
          isActive
            ? 'opacity-100 scale-x-100 scale-y-105'
            : 'opacity-0 scale-x-0 scale-y-90'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.18, 0.89, 0.32, 1.25)'
        }}
      >
        <svg
          viewBox="0 0 420 80"
          preserveAspectRatio="none"
          className="w-full h-full drop-shadow-[0_8px_20px_rgba(35,194,219,0.35)]"
        >
          {/* Layer 1: Crimson Dry-Brush Slash (Secondary Accent) */}
          <path
            d="M 15 20 C 70 8, 160 5, 260 9 C 340 12, 395 18, 412 28 C 400 38, 380 44, 320 48 C 220 52, 120 50, 40 46 C 18 44, 8 32, 15 20 Z"
            fill="#d1233a"
            opacity="0.9"
            transform="rotate(1.5 210 40)"
          />

          {/* Layer 2: Vibrant Cerulean / Cyan Paint Swash (Primary Metaphor Color) */}
          <path
            d="M 6 12 C 90 2, 210 4, 320 10 C 380 14, 410 24, 416 36 C 405 52, 360 62, 280 66 C 180 70, 80 68, 12 58 C -2 46, -1 26, 6 12 Z"
            fill="#23c2db"
          />

          {/* Layer 3: Aged Bone / White Splatter Core for Crisp Text Legibility */}
          <path
            d="M 22 18 C 100 12, 220 14, 310 20 C 370 24, 395 32, 390 42 C 375 54, 340 58, 260 60 C 170 62, 80 60, 26 52 C 14 44, 15 28, 22 18 Z"
            fill="#f0ece0"
          />

          {/* Acrylic Bristle Splatters & Streaks */}
          <path d="M 405 16 L 418 12 L 410 22 Z" fill="#23c2db" />
          <path d="M 412 42 L 424 48 L 414 54 Z" fill="#d1233a" />
          <path d="M 8 60 L -4 66 L 12 68 Z" fill="#23c2db" />
          <circle cx="418" cy="28" r="2.5" fill="#23c2db" />
          <circle cx="426" cy="38" r="1.5" fill="#d1233a" />
          <circle cx="4" cy="22" r="2" fill="#d1233a" />
        </svg>
      </div>

      {/* Torn Parchment Number Badge (e.g. "01", "02") */}
      <div
        className={`px-2 py-0.5 mr-3 font-mono text-xs font-black tracking-widest transition-all duration-150 clip-slanted-item ${
          isActive
            ? 'bg-emperor-crimson text-parchment scale-110 shadow-md'
            : 'bg-bg-ink/80 text-cyan-400 border border-cyan-500/40 group-hover:border-cyan-400'
        }`}
      >
        {tag}
      </div>

      {/* Main Heading Text: Snap-inverts from Bone White to Solid Deep Ink Black */}
      <span
        className={`font-metaphor text-lg sm:text-xl md:text-2xl uppercase tracking-wider transition-colors duration-100 ${
          isActive
            ? 'text-bg-ink font-black'
            : 'text-parchment group-hover:text-parchment font-black text-outline-dark'
        }`}
      >
        {children}
      </span>

      {/* Trailing Metaphor Diamond Indicator */}
      <div
        className={`ml-3 w-2 h-2 rotate-45 transition-all duration-150 ${
          isActive
            ? 'bg-emperor-crimson scale-125 opacity-100'
            : 'bg-parchment/20 scale-75 opacity-0 group-hover:opacity-60'
        }`}
      />
    </div>
  );
};
