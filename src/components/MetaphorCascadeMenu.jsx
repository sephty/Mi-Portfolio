import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const MetaphorCascadeMenu = ({
  activeKey,
  setActiveKey,
  onSelectNode,
  currentLang
}) => {
  const { orbitalNodes } = portfolioData;

  // Authentic Metaphor ReFantazio cascading typography wave styles
  const defaultStyles = {
    about: {
      size: 'text-3xl sm:text-4xl lg:text-[3.4rem]',
      indent: 16,
      rotation: -5,
      splotch: 'SelectionSplotch3.png',
      color: '#f2c14e',
      underColor: '#fef08a',
      shadow: 'rgba(242, 193, 78, 0.8)',
    },
    projects: {
      size: 'text-5xl sm:text-6xl lg:text-[5.6rem]',
      indent: 48,
      rotation: -2,
      splotch: 'SelectionSplotch2.png',
      color: '#7c87ea',
      underColor: '#23c2db',
      shadow: 'rgba(124, 135, 234, 0.8)',
    },
    skills: {
      size: 'text-4xl sm:text-5xl lg:text-[4.4rem]',
      indent: 8,
      rotation: -4,
      splotch: 'SelectionSplotch1.png',
      color: '#f59e0b',
      underColor: '#fbbf24',
      shadow: 'rgba(245, 158, 11, 0.8)',
    },
    experience: {
      size: 'text-3xl sm:text-4xl lg:text-[3.9rem]',
      indent: 56,
      rotation: -1.2,
      splotch: 'SelectionSplotch3.png',
      color: '#4dcca0',
      underColor: '#2dd4bf',
      shadow: 'rgba(77, 204, 160, 0.8)',
    },
    contact: {
      size: 'text-3xl sm:text-4xl lg:text-[3.4rem]',
      indent: 28,
      rotation: -3.5,
      splotch: 'SelectionSplotch1.png',
      color: '#d1233a',
      underColor: '#23c2db',
      shadow: 'rgba(209, 35, 58, 0.8)',
    },
  };

  return (
    <div className="w-full flex flex-col items-start select-none py-2 z-30">
      <div className="flex flex-col gap-0 w-full max-w-2xl">
        {orbitalNodes.map((node, idx) => {
          const conf = defaultStyles[node.key] || {
            size: 'text-3xl sm:text-4xl lg:text-[3.6rem]',
            indent: (idx % 4) * 16 + 12,
            rotation: -((idx % 3) * 1.5 + 1.2),
            splotch: idx % 2 === 0 ? 'SelectionSplotch1.png' : 'SelectionSplotch3.png',
            color: node.color || '#23c2db',
            underColor: '#23c2db',
            shadow: `${node.color || '#23c2db'}cc`,
          };
          const isSelected = activeKey === node.key;
          const label = currentLang === 'es' ? node.label_es : node.label_en;
          const subLabel = currentLang === 'es' ? (node.sub_es || '') : (node.sub_en || '');
          const splotchUrl = `./assets/refantazio/brush/${conf.splotch}`;

          return (
            <div
              key={node.key}
              className="relative flex items-center my-0"
              style={{
                marginLeft: `${conf.indent}px`,
                transform: `rotate(${conf.rotation}deg)`,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <button
                type="button"
                onClick={() => onSelectNode(node.key)}
                onMouseEnter={() => setActiveKey(node.key)}
                onMouseLeave={() => setActiveKey(null)}
                className="relative text-left outline-none interactive-cursor group py-1.5 px-4 sm:px-6 flex items-center"
              >
                {/* ── AUTHENTIC REFANTAZIO BRUSH STROKE MATCHING PLANET COLOR ── */}
                <div
                  className={`absolute -inset-y-3 -left-4 -right-12 -z-10 pointer-events-none transition-all duration-200 origin-left ${
                    isSelected
                      ? 'opacity-100 scale-x-100 scale-y-110'
                      : 'opacity-0 scale-x-0 scale-y-90'
                  }`}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                  }}
                >
                  {/* Layer 1: Undercoat Splatter Wash */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: conf.underColor,
                      maskImage: `url('${splotchUrl}')`,
                      WebkitMaskImage: `url('${splotchUrl}')`,
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      transform: 'translate(-6px, 3px) scale(1.04) rotate(-1.5deg)',
                      opacity: 0.85,
                      filter: `drop-shadow(0 0 10px ${conf.shadow})`,
                    }}
                  />

                  {/* Layer 2: Primary Brush Slash matching Planet Color */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: conf.color,
                      maskImage: `url('${splotchUrl}')`,
                      WebkitMaskImage: `url('${splotchUrl}')`,
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      filter: `drop-shadow(0 8px 25px ${conf.shadow})`,
                    }}
                  />
                </div>

                {/* Main Heading Text: High-contrast Butler serif typography */}
                <div className="flex flex-col">
                  <span
                    className={`font-metaphor tracking-tighter uppercase transition-all duration-150 leading-[0.82] ${conf.size} ${
                      isSelected
                        ? 'text-bg-ink font-black scale-[1.03] drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]'
                        : 'text-parchment group-hover:text-parchment font-black text-outline-dark'
                    }`}
                  >
                    {label}
                  </span>

                  {/* Sub-label banner strip */}
                  <div
                    className={`transition-all duration-200 mt-1 origin-left ${
                      isSelected
                        ? 'opacity-100 max-h-6 scale-x-100 translate-y-0'
                        : 'opacity-0 max-h-0 scale-x-50 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <span
                      className="inline-block bg-bg-ink text-parchment px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow"
                      style={{ borderLeft: `3px solid ${conf.color}` }}
                    >
                      {subLabel}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
