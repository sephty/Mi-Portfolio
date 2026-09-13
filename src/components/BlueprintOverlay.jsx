import React from 'react';

export const BlueprintOverlay = ({ isZoomed = false }) => {
  const cx = 1380;
  const cy = 540;

  // 36 ticks (every 10°)
  const ticks = Array.from({ length: 36 }).map((_, i) => {
    const deg = i * 10;
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 30 === 0;
    const isCardinal = deg % 90 === 0;
    const r1 = 280;
    const r2 = isCardinal ? 340 : isMajor ? 320 : 298;
    return {
      x1: cx + Math.cos(rad) * r1, y1: cy + Math.sin(rad) * r1,
      x2: cx + Math.cos(rad) * r2, y2: cy + Math.sin(rad) * r2,
      isMajor, isCardinal, deg,
    };
  });

  // Inner fine ticks (every 5°)
  const fineTicks = Array.from({ length: 72 }).map((_, i) => {
    const deg = i * 5;
    const rad = (deg * Math.PI) / 180;
    if (deg % 10 === 0) return null;
    const r1 = 278;
    const r2 = 288;
    return {
      x1: cx + Math.cos(rad) * r1, y1: cy + Math.sin(rad) * r1,
      x2: cx + Math.cos(rad) * r2, y2: cy + Math.sin(rad) * r2,
    };
  }).filter(Boolean);

  // Degree labels
  const labels = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const r = 355;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, label: `${deg}°` };
  });

  // Roman numeral markers at cardinals
  const romanMarkers = [
    { deg: 0, text: 'I' }, { deg: 90, text: 'II' },
    { deg: 180, text: 'III' }, { deg: 270, text: 'IV' },
  ].map(m => {
    const rad = (m.deg * Math.PI) / 180;
    const r = 370;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, text: m.text };
  });

  return (
    <div className="pointer-events-none fixed inset-0 w-full h-full z-0 overflow-hidden select-none">
      {/* ── AUTHENTIC REFANTAZIO CHALK DRAFTING TEXTURES (HIGHLY VISIBLE IN ALL SECTIONS) ── */}
      <img
        src="./assets/refantazio/main/ChalkLines_Background.png"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-700 pointer-events-none ${
          isZoomed ? 'opacity-45' : 'opacity-65'
        }`}
      />
      <img
        src="./assets/refantazio/main/ChalkLines_Foreground.png"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-700 pointer-events-none ${
          isZoomed ? 'opacity-50' : 'opacity-70'
        }`}
      />

      {/* ── METAPHOR ASTROLABE DRAFTING SVG LAYER ── */}
      <svg
        className={`relative w-full h-full transition-opacity duration-700 ${
          isZoomed ? 'opacity-45' : 'opacity-60'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="bp-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#f0ece0" strokeWidth="0.4" strokeOpacity="0.12" />
          </pattern>
          <pattern id="bp-sub" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0ece0" strokeWidth="0.2" strokeOpacity="0.05" />
          </pattern>
          <animateTransform
            xlinkHref="#astrolabe-inner"
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="240s"
            repeatCount="indefinite"
          />
          <animateTransform
            xlinkHref="#astrolabe-outer"
            attributeName="transform"
            type="rotate"
            from={`360 ${cx} ${cy}`}
            to={`0 ${cx} ${cy}`}
            dur="360s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Global drafting grid */}
        <rect width="1920" height="1080" fill="url(#bp-sub)" />
        <rect width="1920" height="1080" fill="url(#bp-grid)" />

        {/* Major drafting axes */}
        <g opacity="0.4">
          <line x1="40" y1={cy} x2="1880" y2={cy} stroke="#f0ece0" strokeWidth="0.6" strokeDasharray="14 6 2 6" />
          <line x1={cx} y1="40" x2={cx} y2="1040" stroke="#f0ece0" strokeWidth="0.6" strokeDasharray="14 6 2 6" />
          {/* Secondary drafting axes for codex panel alignment */}
          <line x1="280" y1="40" x2="280" y2="1040" stroke="#23c2db" strokeWidth="0.3" strokeDasharray="4 12" opacity="0.3" />
          <line x1="680" y1="40" x2="680" y2="1040" stroke="#23c2db" strokeWidth="0.3" strokeDasharray="4 12" opacity="0.3" />
          {/* Diagonals */}
          <line x1={cx - 500} y1={cy - 500} x2={cx + 500} y2={cy + 500} stroke="#f0ece0" strokeWidth="0.2" strokeDasharray="4 16" />
          <line x1={cx - 500} y1={cy + 500} x2={cx + 500} y2={cy - 500} stroke="#f0ece0" strokeWidth="0.2" strokeDasharray="4 16" />
        </g>

        {/* Center crosshair */}
        <g opacity="0.75">
          <line x1={cx - 24} y1={cy} x2={cx - 8} y2={cy} stroke="#23c2db" strokeWidth="1.2" />
          <line x1={cx + 8} y1={cy} x2={cx + 24} y2={cy} stroke="#23c2db" strokeWidth="1.2" />
          <line x1={cx} y1={cy - 24} x2={cx} y2={cy - 8} stroke="#23c2db" strokeWidth="1.2" />
          <line x1={cx} y1={cy + 8} x2={cx} y2={cy + 24} stroke="#23c2db" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="4" fill="none" stroke="#23c2db" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r="1.5" fill="#23c2db" />
        </g>

        {/* ══════ INNER ASTROLABE RING (rotating) ══════ */}
        <g id="astrolabe-inner" opacity="0.6">
          <circle cx={cx} cy={cy} r="60" fill="none" stroke="#f0ece0" strokeWidth="0.4" />
          <circle cx={cx} cy={cy} r="90" fill="none" stroke="#f0ece0" strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r="120" fill="none" stroke="#23c2db" strokeWidth="0.4" strokeDasharray="4 8" />
          <circle cx={cx} cy={cy} r="160" fill="none" stroke="#f0ece0" strokeWidth="0.4" />
          
          {Array.from({ length: 12 }).map((_, i) => {
            const rad = ((i * 30) * Math.PI) / 180;
            return (
              <line
                key={`spoke-${i}`}
                x1={cx + Math.cos(rad) * 62}
                y1={cy + Math.sin(rad) * 62}
                x2={cx + Math.cos(rad) * 88}
                y2={cy + Math.sin(rad) * 88}
                stroke="#f0ece0"
                strokeWidth="0.4"
                opacity="0.65"
              />
            );
          })}
        </g>

        {/* ══════ ASTROLABE MAIN CONCENTRIC RINGS ══════ */}
        <g transform={`rotate(-6 ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="230" ry="135" fill="none" stroke="#7c87ea" strokeWidth="0.6" opacity="0.25" />
          <ellipse cx={cx} cy={cy} rx="305" ry="180" fill="none" stroke="#f59e0b" strokeWidth="0.6" opacity="0.22" />
          <ellipse cx={cx} cy={cy} rx="380" ry="225" fill="none" stroke="#4dcca0" strokeWidth="0.5" opacity="0.20" strokeDasharray="6 8" />
          <ellipse cx={cx} cy={cy} rx="455" ry="270" fill="none" stroke="#d1233a" strokeWidth="0.5" opacity="0.18" strokeDasharray="4 10" />
          <ellipse cx={cx} cy={cy} rx="530" ry="315" fill="none" stroke="#f0ece0" strokeWidth="0.3" opacity="0.12" strokeDasharray="2 8" />
        </g>

        {/* ══════ OUTER ASTROLABE RING (counter-rotating) ══════ */}
        <g id="astrolabe-outer" opacity="0.65">
          <circle cx={cx} cy={cy} r="280" fill="none" stroke="#f0ece0" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r="283" fill="none" stroke="#f0ece0" strokeWidth="0.3" opacity="0.4" />

          {/* Fine ticks */}
          {fineTicks.map((t, i) => (
            <line key={`ft-${i}`} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#f0ece0" strokeWidth="0.3" opacity="0.3" />
          ))}

          {/* Main ticks */}
          {ticks.map((t, i) => (
            <line
              key={`t-${i}`}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.isCardinal ? '#23c2db' : '#f0ece0'}
              strokeWidth={t.isCardinal ? '1.2' : t.isMajor ? '0.8' : '0.4'}
              opacity={t.isCardinal ? '0.85' : t.isMajor ? '0.6' : '0.35'}
            />
          ))}

          {/* Degree labels */}
          {labels.map((dl, i) => (
            <text
              key={`dl-${i}`}
              x={dl.x} y={dl.y}
              fill="#f0ece0"
              fontSize="7.5"
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity="0.45"
            >
              {dl.label}
            </text>
          ))}

          {/* Roman numeral markers */}
          {romanMarkers.map((rm, i) => (
            <text
              key={`rm-${i}`}
              x={rm.x} y={rm.y}
              fill="#23c2db"
              fontSize="11"
              fontFamily="serif"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity="0.55"
              fontWeight="bold"
            >
              {rm.text}
            </text>
          ))}

          {/* Quadrant arc accents */}
          <path
            d={`M ${cx} ${cy - 280} A 280 280 0 0 1 ${cx + 280} ${cy}`}
            fill="none" stroke="#23c2db" strokeWidth="1" opacity="0.3"
          />
          <path
            d={`M ${cx - 280} ${cy} A 280 280 0 0 1 ${cx} ${cy + 280}`}
            fill="none" stroke="#d1233a" strokeWidth="0.8" opacity="0.25"
          />
        </g>

        {/* Vertical "COMMAND" style text */}
        <text
          x={cx + 440}
          y={cy - 180}
          fill="#f0ece0"
          fontSize="15"
          fontFamily="monospace"
          letterSpacing="8"
          opacity="0.2"
          writingMode="vertical-lr"
          fontWeight="bold"
        >
          ORBITAL SYSTEM
        </text>

        {/* Corner drafting brackets */}
        <g opacity="0.3" fill="none" stroke="#f0ece0" strokeWidth="0.7">
          <polyline points="55,95 55,55 95,55" />
          <polyline points="1825,95 1825,55 1865,55" />
          <polyline points="55,985 55,1025 95,1025" />
          <polyline points="1825,985 1825,1025 1865,1025" />
        </g>
        <text x="60" y="50" fill="#f0ece0" fontSize="6.5" fontFamily="monospace" opacity="0.3">0,0</text>
        <text x="1830" y="1040" fill="#f0ece0" fontSize="6.5" fontFamily="monospace" opacity="0.3">1920,1080</text>

        {/* Technical drafting rulers along top and bottom */}
        <g opacity="0.25">
          {Array.from({ length: 19 }).map((_, i) => (
            <g key={`ruler-top-${i}`} transform={`translate(${100 + i * 90}, 50)`}>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#23c2db" strokeWidth="0.6" />
              <text x="0" y="-3" fill="#23c2db" fontSize="5" fontFamily="monospace" textAnchor="middle">
                {String(i * 100).padStart(4, '0')}
              </text>
            </g>
          ))}
          {Array.from({ length: 19 }).map((_, i) => (
            <g key={`ruler-bot-${i}`} transform={`translate(${100 + i * 90}, 1030)`}>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#23c2db" strokeWidth="0.6" />
              <text x="0" y="15" fill="#23c2db" fontSize="5" fontFamily="monospace" textAnchor="middle">
                {String(i * 100).padStart(4, '0')}
              </text>
            </g>
          ))}
        </g>

        {/* Bottom tech label */}
        <text x="80" y="1058" fill="#23c2db" fontSize="7" fontFamily="monospace" opacity="0.25" letterSpacing="5">
          METAPHOR ASTROLABE DRAFTING OVERLAY // SYS.2026 // CELESTIAL BLUEPRINT MATRIX
        </text>
      </svg>
    </div>
  );
};
