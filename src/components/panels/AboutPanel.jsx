import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Target, Eye, Flame, UserCheck } from 'lucide-react';

export const AboutPanel = ({ currentLang, translations }) => {
  const t = translations[currentLang];
  const { profile } = portfolioData;

  const [motivationIndex, setMotivationIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMotivationIndex(prev => (prev + 1) % t.motivations.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [t.motivations.length]);

  return (
    <div className="w-full space-y-10 pb-16">
      {/* ── METAPHOR HEADER BANNER ── */}
      <div className="relative py-4 select-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-xl h-20 pointer-events-none -z-10">
          <div
            className="absolute inset-0 bg-emperor-crimson opacity-80"
            style={{
              clipPath: 'polygon(4% 12%, 96% 0%, 90% 88%, 0% 92%)',
              transform: 'rotate(1deg)'
            }}
          />
          <div
            className="absolute inset-0 bg-cyan-400 opacity-90"
            style={{
              clipPath: 'polygon(1% 8%, 98% 18%, 86% 85%, 3% 80%)',
              transform: 'rotate(-1.5deg)'
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-metaphor text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              {currentLang === 'es' ? 'NÚCLEO // SOBRE MÍ' : 'IDENTITY // ABOUT ME'}
            </h2>
          </div>
          <div className="mt-2 inline-flex items-center bg-white text-bg-ink px-4 py-1 max-w-md shadow-lg">
            <span className="font-mono text-xs font-black uppercase text-emperor-crimson mr-2">
              {t.about_header_tag || '[DEVELOPER DOSSIER]'}
            </span>
            <span className="font-sans text-xs font-semibold text-bg-ink">
              {t.about_subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Photo & Motivational Badge (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="relative w-full aspect-square max-w-sm mx-auto bg-bg-ink border-2 border-parchment/30 clip-atlus-card overflow-hidden shadow-2xl">
            <img
              src={profile.avatar}
              alt="Joseph García Jiménez"
              className="w-full h-full object-cover object-center grayscale-[15%] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-ink via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs text-cyan-300 bg-bg-ink/90 px-3 py-1 border border-cyan-400/50 shadow">
                JOSEPH GARCÍA JIMÉNEZ
              </span>
            </div>
          </div>

          {/* Motivational Dynamic Cycle Card */}
          <div className="p-4 bg-gradient-to-r from-emperor-crimson/30 via-bg-ink to-bg-ink border-2 border-emperor-crimson/50 clip-slanted-item flex items-center gap-3 shadow-lg">
            <Flame className="w-6 h-6 text-emperor-crimson animate-pulse flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider block font-bold">
                {currentLang === 'es' ? 'IMPERATIVO // FILOSOFÍA' : 'CORE PRINCIPLE // FOCUS'}
              </span>
              <p className="font-metaphor text-sm uppercase text-parchment font-bold tracking-wide transition-all duration-300">
                "{t.motivations[motivationIndex]}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Biography, Mission & Vision (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Narrative Card */}
          <div className="p-6 bg-bg-ink/95 border-2 border-parchment/20 clip-atlus-card space-y-3 shadow-xl">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="font-metaphor text-xl uppercase text-parchment tracking-wide">
                {currentLang === 'es' ? 'Desarrollador Backend & Ingeniero de Software' : 'Backend Developer & Software Engineer'}
              </h3>
            </div>
            <p className="font-sans text-sm sm:text-base text-parchment/90 leading-relaxed">
              {t.about_text}
            </p>
          </div>

          {/* Mission & Vision Twin Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mission */}
            <div className="p-5 bg-bg-ink/90 border-l-4 border-cyan-400 border-y border-r border-parchment/15 clip-atlus-card flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-metaphor text-lg uppercase text-parchment">
                    {t.mission_title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-parchment/80 leading-relaxed">
                  {t.mission_text}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="p-5 bg-bg-ink/90 border-l-4 border-gold-accent border-y border-r border-parchment/15 clip-atlus-card flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-gold-accent" />
                  <h4 className="font-metaphor text-lg uppercase text-parchment">
                    {t.vision_title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-parchment/80 leading-relaxed">
                  {t.vision_text}
                </p>
              </div>
            </div>
          </div>

          {/* Campuslands Image Frame */}
          {profile.statImage && (
            <div className="relative rounded bg-bg-ink border-2 border-parchment/15 overflow-hidden h-40 shadow-lg">
              <img
                src={profile.statImage}
                alt="Campuslands Development Team"
                className="w-full h-full object-cover grayscale-[25%] opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-ink via-transparent to-bg-ink" />
              <div className="absolute bottom-3 left-4">
                <span className="font-mono text-xs bg-bg-ink/90 text-cyan-300 px-3 py-1 border border-cyan-500/40">
                  {t.campuslands_label || 'CAMPUSLANDS // COLLABORATIVE ENGINEERING COHORT'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
