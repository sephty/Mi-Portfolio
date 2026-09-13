import React from 'react';
import { Briefcase, Calendar, Building, CheckCircle2 } from 'lucide-react';

export const ExperiencePanel = ({ currentLang, translations }) => {
  const t = translations[currentLang];
  const items = t.experience_items || [];

  return (
    <div className="w-full space-y-10 pb-16 select-none">
      {/* ── METAPHOR HEADER BANNER ── */}
      <div className="relative py-4 select-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-xl h-24 pointer-events-none -z-10">
          <div
            className="absolute inset-0 bg-emerald-400 opacity-90"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "rotate(-1.5deg) scale(1.05)",
              filter: "drop-shadow(0 0 14px rgba(52, 211, 153, 0.5))"
            }}
          />
          <div
            className="absolute inset-0 bg-[#d1233a] opacity-95"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "rotate(1deg) scale(0.98)",
              filter: "drop-shadow(0 8px 25px rgba(209, 35, 58, 0.6))"
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-metaphor text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              {t.experience_header_title}
            </h2>
          </div>
          <div className="mt-2 inline-flex items-center bg-white text-bg-ink px-4 py-1 max-w-md shadow-lg">
            <span className="font-mono text-xs font-black uppercase text-emperor-crimson mr-2">
              {t.experience_header_tag}
            </span>
            <span className="font-sans text-xs font-semibold text-bg-ink">
              {t.experience_subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* ── TIMELINE MILESTONE LIST ── */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-400/40 space-y-8 max-w-3xl">
        {items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-bg-ink border-2 border-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-300 transition-transform shadow-[0_0_10px_rgba(52,211,153,0.5)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            {/* Content Card */}
            <div className="p-6 bg-bg-ink/90 border border-parchment/20 hover:border-emerald-400/80 clip-atlus-card transition-all duration-300 shadow-xl space-y-3 hover:translate-x-1">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-parchment/10 pb-2">
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/30 rounded">
                  <Building className="w-3 h-3 inline mr-1" />
                  {item.org}
                </span>
              </div>

              <h3 className="font-metaphor text-2xl uppercase text-parchment group-hover:text-emerald-300 tracking-wide transition-colors">
                {item.role}
              </h3>

              <p className="font-sans text-sm text-parchment/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
