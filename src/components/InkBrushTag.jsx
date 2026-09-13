import React from 'react';

export const InkBrushTag = ({
  children,
  isActive = false,
  className = "",
  tagText = "",
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex items-center group select-none min-h-[48px] py-1.5 px-3 transition-transform duration-150 ease-out interactive-cursor ${className}`}
    >
      {/* Jagged, frayed ink-brush backdrop (SVG path) */}
      <div
        className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-150 origin-left ${
          isActive
            ? 'opacity-100 scale-x-100 scale-y-100'
            : 'opacity-0 scale-x-75 scale-y-90'
        }`}
      >
        <svg
          viewBox="0 0 340 70"
          preserveAspectRatio="none"
          className="w-full h-full fill-parchment drop-shadow-[0_4px_12px_rgba(209,35,58,0.45)]"
        >
          {/* Rough, dynamic ink brush shape with jagged bristles and razor cuts */}
          <path d="M 12 8 Q 80 4, 170 6 Q 260 7, 328 14 C 336 20, 338 32, 332 44 C 326 56, 335 60, 318 64 Q 220 66, 120 63 Q 40 65, 8 56 C -2 46, 2 28, 12 8 Z" />
          {/* Subtle splinter cuts */}
          <path d="M 320 22 L 338 24 L 325 28 Z" fill="#d1233a" />
          <path d="M 6 42 L -6 46 L 8 49 Z" fill="#3a49c9" />
        </svg>
      </div>

      {/* Red/Indigo accent tick on left */}
      <div
        className={`w-1.5 h-5 mr-2 transition-all duration-150 ${
          isActive
            ? 'bg-emperor-crimson scale-y-125'
            : 'bg-indigo-bright/40 scale-y-75'
        }`}
      />

      {/* Tag prefix if supplied (e.g. "01.", "02.") */}
      {tagText && (
        <span
          className={`font-mono text-xs mr-2 transition-colors duration-100 tracking-wider font-bold ${
            isActive ? 'text-emperor-crimson' : 'text-indigo-bright'
          }`}
        >
          {tagText}
        </span>
      )}

      {/* Main Text string: Snap inverts from Bone White to Solid Black */}
      <span
        className={`font-metaphor text-lg sm:text-xl md:text-2xl uppercase tracking-wider transition-colors duration-100 ${
          isActive
            ? 'text-bg-ink font-black'
            : 'text-parchment group-hover:text-parchment font-extrabold text-outline-dark'
        }`}
      >
        {children}
      </span>
    </div>
  );
};
