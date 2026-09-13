import React from 'react';
import { SunNode } from './SunNode';
import { portfolioData } from '../data/portfolioData';

export const MobileHero = ({
  activeKey,
  setActiveKey,
  onSelectNode,
  currentLang
}) => {
  const { orbitalNodes, profile } = portfolioData;

  const itemStyles = {
    about: { size: "text-2xl", rotate: "-rotate-2", sub_es: "PERFIL & FILOSOFÍA", sub_en: "PROFILE & PHILOSOPHY" },
    projects: { size: "text-3xl", rotate: "rotate-1", sub_es: "SISTEMAS JAVA & APIS", sub_en: "JAVA SYSTEMS & APIS" },
    skills: { size: "text-2xl", rotate: "-rotate-1", sub_es: "SPRING BOOT & STACK", sub_en: "SPRING BOOT & STACK" },
    experience: { size: "text-2xl", rotate: "rotate-2", sub_es: "TRAYECTORIA", sub_en: "TRACK RECORD" },
    contact: { size: "text-2xl", rotate: "-rotate-1", sub_es: "CANALES DIRECTOS", sub_en: "DIRECT CHANNELS" }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-70px)] flex flex-col items-center justify-between px-4 py-6 select-none">
      {/* Top Anchor: Luminous Sun Node & Developer Headline */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 z-10">
        <SunNode
          avatarSrc={profile.avatar}
          isActive={activeKey === 'about'}
          onClick={() => onSelectNode('about')}
          sizeClass="w-32 h-32"
          className="mb-3"
        />

        <div className="text-center">
          <h2 className="font-metaphor text-2xl sm:text-3xl uppercase tracking-wider text-parchment text-outline-dark">
            {profile.name}
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-bold">
              JAVA & BACKEND DEVELOPER
            </span>
          </div>
        </div>
      </div>

      {/* Cascading Mobile Menu List with Metaphor Paint Slashes */}
      <div className="w-full max-w-sm flex flex-col gap-2 z-10 my-auto">
        {orbitalNodes.map((node) => {
          const isSelected = activeKey === node.key;
          const conf = itemStyles[node.key] || itemStyles.projects;
          const label = currentLang === 'es' ? node.label_es : node.label_en;
          const subLabel = currentLang === 'es' ? conf.sub_es : conf.sub_en;

          return (
            <button
              key={node.key}
              type="button"
              onClick={() => onSelectNode(node.key)}
              onTouchStart={() => setActiveKey(node.key)}
              className={`relative text-left outline-none min-h-[52px] py-1.5 px-4 flex flex-col justify-center transform ${conf.rotate} transition-transform`}
            >
              {/* Paint slash backdrop */}
              <div
                className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-200 origin-left ${
                  isSelected ? 'opacity-100 scale-x-100 scale-y-105' : 'opacity-0 scale-x-0'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-r from-emperor-crimson to-cyan-500 rounded-sm" />
              </div>

              <span
                className={`font-metaphor tracking-tighter uppercase transition-colors ${conf.size} ${
                  isSelected ? 'text-bg-ink font-black' : 'text-parchment font-black text-outline-dark'
                }`}
              >
                {label}
              </span>

              {isSelected && (
                <span className="font-mono text-[10px] text-bg-ink font-bold uppercase tracking-wider">
                  {subLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtle indicator */}
      <div className="mt-auto pt-4 text-center font-mono text-[10px] text-parchment-dim tracking-wider uppercase z-10">
        /// METAPHOR PORTFOLIO ///
      </div>
    </section>
  );
};
