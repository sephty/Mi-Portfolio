import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { ExternalLink, ChevronLeft, ChevronRight, Sparkles, Award } from 'lucide-react';
import { GithubIcon } from '../Icons';

export const ProjectsPanel = ({ currentLang, translations }) => {
  const t = translations[currentLang];
  const { projects } = portfolioData;

  const [activeImageIndices, setActiveImageIndices] = useState(() => {
    const initial = {};
    projects.forEach(p => { initial[p.id] = 0; });
    return initial;
  });

  const nextImage = (e, projectId, totalImages) => {
    e.stopPropagation();
    setActiveImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % totalImages
    }));
  };

  const prevImage = (e, projectId, totalImages) => {
    e.stopPropagation();
    setActiveImageIndices(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="w-full space-y-10 pb-16">
      {/* ── METAPHOR "QUEST START" BANNER (Directly matching Reference Image 1) ── */}
      <div className="relative py-4 select-none">
        {/* Layered Authentic Metaphor Paint Splatters */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-2xl h-28 pointer-events-none -z-10">
          {/* Cerulean / Cyan Paint Swash */}
          <div
            className="absolute inset-0 bg-[#23c2db] opacity-90"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "rotate(-2deg) scale(1.06)",
              filter: "drop-shadow(0 0 16px rgba(35, 194, 219, 0.5))"
            }}
          />
          {/* Rose / Emperor Crimson Slash */}
          <div
            className="absolute inset-0 bg-[#d1233a] opacity-95"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "rotate(1.5deg) scale(0.98)",
              filter: "drop-shadow(0 8px 25px rgba(209, 35, 58, 0.6))"
            }}
          />
        </div>

        {/* Big Display Title: "CODEX / QUEST DISPATCH" */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-metaphor text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              {t.projects_title}
            </h2>
            <span className="hidden sm:inline-block px-3 py-0.5 bg-bg-ink text-cyan-300 border border-cyan-400 font-mono text-xs uppercase tracking-widest">
              {currentLang === 'es' ? 'PORTAFOLIO ACTIVO' : 'ACTIVE PORTFOLIO'}
            </span>
          </div>

          {/* Subtitle Banner Strip */}
          <div className="mt-2 inline-flex items-center bg-white text-bg-ink px-4 py-1 max-w-xl shadow-lg">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-emperor-crimson mr-2">
              {t.projects_header_tag || (currentLang === 'es' ? '[DISPATCH DE MISIONES]' : '[MISSION DISPATCH]')}
            </span>
            <span className="font-sans text-xs font-semibold text-bg-ink">
              {t.projects_subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID: STYLED LIKE METAPHOR BOUNTY / QUEST CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => {
          const currentImgIndex = activeImageIndices[project.id] || 0;
          const currentImage = project.images[currentImgIndex];
          const hasMultipleImages = project.images.length > 1;
          const desc = currentLang === 'es' ? project.desc_es : project.desc_en;

          return (
            <div
              key={project.id}
              className="group relative bg-bg-ink/95 border-2 border-parchment/25 clip-atlus-card hover:border-cyan-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Card Header Strip */}
              <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-cyan-950/60 via-bg-ink to-bg-ink border-b border-parchment/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 bg-cyan-400 rotate-45" />
                  <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">
                    SYSTEM #{idx + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 font-mono text-xs bg-emperor-crimson text-parchment font-bold rounded-sm shadow">
                    ¢ {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Stamped Price Banner */}
              <div className="px-5 pt-4 pb-2">
                <h3 className="font-metaphor text-2xl sm:text-3xl uppercase text-parchment tracking-wide group-hover:text-cyan-300 transition-colors text-outline-dark">
                  {project.title}
                </h3>
              </div>

              {/* Image Screenshot Frame */}
              <div className="relative w-full h-56 sm:h-64 bg-black/80 overflow-hidden select-none border-y border-parchment/10">
                <img
                  src={currentImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    if (e.target.src.endsWith('.webp')) {
                      e.target.src = e.target.src.replace('.webp', '.gif');
                    }
                  }}
                />

                {/* Gallery Navigation Buttons */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={(e) => prevImage(e, project.id, project.images.length)}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-bg-ink/80 text-parchment flex items-center justify-center hover:bg-cyan-500 hover:text-bg-ink transition-colors border border-parchment/30"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => nextImage(e, project.id, project.images.length)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-bg-ink/80 text-parchment flex items-center justify-center hover:bg-cyan-500 hover:text-bg-ink transition-colors border border-parchment/30"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-2 right-3 px-2 py-0.5 font-mono text-[10px] bg-bg-ink/90 text-cyan-300 border border-cyan-500/30 rounded">
                      IMG {currentImgIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Quest Details & Info Block (NO RANK METER) */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-5 bg-gradient-to-b from-transparent to-bg-ink">
                <p className="font-sans text-sm text-parchment/90 leading-relaxed">
                  {desc}
                </p>

                {/* Clean Metadata Info Bar */}
                <div className="flex items-center justify-between py-2.5 px-4 bg-bg-ink/90 border border-parchment/15 rounded text-xs font-mono">
                  <span className="text-parchment-dim">
                    {currentLang === 'es' ? 'ESTADO' : 'STATUS'}: <strong className="text-cyan-300 font-bold">{currentLang === 'es' ? 'COMPLETADO' : 'COMPLETED'}</strong>
                  </span>
                  <span className="text-parchment-dim">
                    {currentLang === 'es' ? 'AÑO' : 'YEAR'}: <strong className="text-parchment font-bold">{project.year}</strong>
                  </span>
                </div>

                {/* Tech Stack Tags & GitHub Action Button */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 font-mono text-xs bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 font-metaphor text-xs uppercase tracking-wider bg-parchment text-bg-ink hover:bg-cyan-400 hover:text-bg-ink transition-all duration-200 rounded-sm font-black shadow-lg"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.btn_github}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Coming Soon Teaser Bounty Card */}
        <div className="relative bg-bg-ink/80 border-2 border-dashed border-parchment/20 clip-atlus-card p-8 flex flex-col justify-center items-center text-center gap-4 min-h-[340px]">
          <div className="w-14 h-14 rounded-full bg-cyan-950/40 flex items-center justify-center text-cyan-300 border border-cyan-400/40">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>
          <h3 className="font-metaphor text-2xl uppercase text-parchment tracking-wide">
            {t.coming_soon_title}
          </h3>
          <p className="font-sans text-sm text-parchment-dim max-w-sm">
            {t.coming_soon_desc}
          </p>
        </div>
      </div>
    </div>
  );
};
