import React from 'react';

export const PencilOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 w-full h-full z-0 overflow-hidden select-none">
      <svg
        className="w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Hand-drawn graphite pencil turbulence filter */}
          <filter id="pencil-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.95"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Radial mask to fade out lines at the extreme corners */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        <g filter="url(#pencil-texture)" mask="url(#vignette)">
          {/* Main Perspective Center Crosshairs */}
          <line
            x1="0"
            y1="540"
            x2="1920"
            y2="540"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="6 8"
            opacity="0.25"
          />
          <line
            x1="960"
            y1="0"
            x2="960"
            y2="1080"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="6 8"
            opacity="0.25"
          />

          {/* Dynamic Diagonal Skewed Guidelines */}
          <line
            x1="0"
            y1="220"
            x2="1920"
            y2="860"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="4 12"
            opacity="0.2"
          />
          <line
            x1="0"
            y1="860"
            x2="1920"
            y2="220"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="4 12"
            opacity="0.15"
          />

          {/* Concentric Hand-Drawn Orbital Rings (Centered on right-desktop focal node) */}
          <ellipse
            cx="1280"
            cy="540"
            rx="210"
            ry="90"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.6"
            opacity="0.35"
            transform="rotate(-8 1280 540)"
          />
          <ellipse
            cx="1280"
            cy="540"
            rx="330"
            ry="140"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="8 6"
            opacity="0.28"
            transform="rotate(-8 1280 540)"
          />
          <ellipse
            cx="1280"
            cy="540"
            rx="460"
            ry="195"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.5"
            opacity="0.22"
            transform="rotate(-8 1280 540)"
          />
          <ellipse
            cx="1280"
            cy="540"
            rx="610"
            ry="255"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.5"
            strokeDasharray="12 10"
            opacity="0.18"
            transform="rotate(-8 1280 540)"
          />
          <ellipse
            cx="1280"
            cy="540"
            rx="780"
            ry="330"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.5"
            opacity="0.12"
            transform="rotate(-8 1280 540)"
          />

          {/* Decorative Atlus Astrological Ticks & Coordinate Marks */}
          <circle cx="1280" cy="540" r="1.5" fill="#f0ece0" opacity="0.6" />
          <circle cx="1280" cy="450" r="2" fill="#f0ece0" opacity="0.4" />
          <circle cx="1280" cy="630" r="2" fill="#f0ece0" opacity="0.4" />
          <circle cx="1070" cy="540" r="2" fill="#f0ece0" opacity="0.4" />
          <circle cx="1490" cy="540" r="2" fill="#f0ece0" opacity="0.4" />

          {/* Astrolabe quadrant markings */}
          <path
            d="M 1240 540 L 1320 540 M 1280 500 L 1280 580"
            stroke="#f0ece0"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <rect
            x="1265"
            y="525"
            width="30"
            height="30"
            fill="none"
            stroke="#f0ece0"
            strokeWidth="0.5"
            opacity="0.2"
            transform="rotate(45 1280 540)"
          />
        </g>
      </svg>
    </div>
  );
};
