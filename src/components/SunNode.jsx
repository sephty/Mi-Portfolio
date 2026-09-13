import React from 'react';

export const SunNode = React.memo(({
  avatarSrc,
  isActive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  sizeClass = "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44",
  showAura = true,
  className = ""
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex items-center justify-center select-none interactive-cursor group ${sizeClass} ${className}`}
    >
      {/* Authentic Metaphor Painted Astrolabe Ring */}
      <img
        src="./assets/refantazio/panels/Ring.png"
        alt=""
        className={`absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] object-contain pointer-events-none transition-all duration-500 animate-spin-slow ${
          isActive
            ? 'opacity-85 scale-110'
            : 'opacity-35 group-hover:opacity-70 scale-100'
        }`}
        style={{
          filter: isActive
            ? 'drop-shadow(0 0 12px rgba(209,35,58,0.7))'
            : 'drop-shadow(0 0 6px rgba(240,236,224,0.3))'
        }}
      />

      {/* Outer Rotating Ink Sunburst / Astrolabe Ring */}
      {showAura && (
        <div
          className={`absolute -inset-4 rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
            isActive
              ? 'border-emperor-crimson opacity-90 scale-110 animate-spin-slow'
              : 'border-indigo-bright/30 opacity-40 group-hover:opacity-75 group-hover:scale-105'
          }`}
        />
      )}

      {/* Sun Glow Flare Radial Layer */}
      <div
        className={`absolute -inset-6 rounded-full transition-all duration-300 blur-xl pointer-events-none ${
          isActive
            ? 'bg-gradient-to-tr from-emperor-crimson/50 via-amber-500/40 to-indigo-bright/50 scale-125 opacity-100'
            : 'bg-gradient-to-tr from-indigo-core/30 via-amber-500/20 to-transparent scale-100 opacity-60 group-hover:opacity-85'
        }`}
      />

      {/* Inner Metallic Bezel Ring */}
      <div
        className={`absolute inset-0 rounded-full transition-transform duration-200 p-1 ${
          isActive
            ? 'bg-gradient-to-br from-parchment via-gold-accent to-emperor-crimson scale-105 shadow-[0_0_25px_rgba(242,193,78,0.5)]'
            : 'bg-gradient-to-br from-parchment/70 via-indigo-bright/50 to-bg-ink group-hover:scale-105'
        }`}
      >
        {/* Core Container with Avatar */}
        <div className="w-full h-full rounded-full overflow-hidden relative bg-bg-ink border border-bg-ink">
          <img
            src={avatarSrc}
            alt="Joseph García Jiménez"
            className={`w-full h-full object-cover object-center transition-all duration-300 ${
              isActive
                ? 'grayscale-0 contrast-110 brightness-105 scale-105'
                : 'grayscale-[35%] contrast-125 group-hover:grayscale-0 group-hover:scale-105'
            }`}
          />
          {/* Subtle Atlus ink gradient overlay on photo */}
          <div
            className={`absolute inset-0 mix-blend-overlay transition-opacity duration-200 ${
              isActive
                ? 'bg-gradient-to-t from-emperor-crimson/50 to-transparent opacity-60'
                : 'bg-gradient-to-t from-indigo-core/50 to-transparent opacity-40 group-hover:opacity-20'
            }`}
          />
        </div>
      </div>

      {/* Pulsing Sun Core Badge Label */}
      <div
        className={`absolute -bottom-3 px-3 py-0.5 font-metaphor text-[11px] tracking-widest uppercase rounded-sm transition-all duration-150 shadow-md ${
          isActive
            ? 'bg-emperor-crimson text-parchment scale-110'
            : 'bg-bg-ink text-gold-accent border border-gold-accent/50 group-hover:border-gold-accent'
        }`}
      >
        CORE / ABOUT
      </div>
    </div>
  );
});

SunNode.displayName = 'SunNode';
