import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Terminal, Code, Server, Database, Workflow, Layout, ListChecks, Network, Cpu, Zap, Heart, Shield, Award } from 'lucide-react';

export const SkillsPanel = ({ currentLang, translations }) => {
  const t = translations[currentLang];
  const { skills } = portfolioData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Network': return <Network className="w-4 h-4" />;
      case 'Workflow': return <Workflow className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'ListChecks': return <ListChecks className="w-4 h-4" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-10 pb-16">
      {/* ── METAPHOR HEADER BANNER ── */}
      <div className="relative py-4 select-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-xl h-24 pointer-events-none -z-10">
          <div
            className="absolute inset-0 bg-cyan-400 opacity-90"
            style={{
              maskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              WebkitMaskImage: "url('./assets/refantazio/panels/memo_completionBg.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              transform: "rotate(-1.5deg) scale(1.05)",
              filter: "drop-shadow(0 0 14px rgba(34, 211, 238, 0.5))"
            }}
          />
          <div
            className="absolute inset-0 bg-emperor-crimson opacity-95"
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
              {t.skills_header_title || (currentLang === 'es' ? 'MATRIZ // HABILIDADES' : 'CAPABILITIES // MATRIX')}
            </h2>
          </div>
          <div className="mt-2 inline-flex items-center bg-white text-bg-ink px-4 py-1 max-w-md shadow-lg">
            <span className="font-mono text-xs font-black uppercase text-emperor-crimson mr-2">
              {t.skills_header_tag || '[SYSTEM CODEX]'}
            </span>
            <span className="font-sans text-xs font-semibold text-bg-ink">
              {t.skills_subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* ── METAPHOR TECHNICAL PROFILE OVERVIEW ── */}
      <div className="relative p-6 bg-bg-ink/90 border-2 border-parchment/20 clip-atlus-card flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden">
        {/* Slanted metallic plate header */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-accent" />
            <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
              {t.skills_summary_tag || (currentLang === 'es' ? 'PERFIL TÉCNICO // ENFOQUE PRINCIPAL' : 'TECHNICAL PROFILE // CORE FOCUS')}
            </span>
          </div>
          <h3 className="font-metaphor text-3xl sm:text-4xl text-parchment uppercase tracking-wide">
            {t.skills_summary_title || 'JAVA & BACKEND DEVELOPER'}
          </h3>
          <p className="font-sans text-sm text-parchment/80 leading-relaxed max-w-lg">
            {t.skills_summary_desc || (currentLang === 'es'
              ? 'Especialista en desarrollo backend de alta disponibilidad con Java y Spring Boot. Arquitectura desacoplada, microservicios resilientes y automatizaciones con IA.'
              : 'High-availability backend engineering specialist anchored in Java and Spring Boot. Decoupled modular architectures, resilient microservices, and AI-driven workflow automations.')}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {(t.skills_summary_badges || ['JAVA 21', 'SPRING BOOT 3', 'REST ARCHITECTURE', 'MYSQL / NOSQL', 'AI AUTOMATION']).map((badge) => (
              <span key={badge} className="px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase bg-bg-ink border border-cyan-400/40 text-cyan-300 shadow">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Metaphor Octagonal Radar Chart Visual */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center">
          <img
            src="./assets/refantazio/panels/rankChart.png"
            alt="Archetype Radar Chart"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(35,194,219,0.3)] opacity-90"
          />
          {/* Overlay radar polygon glowing web */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
            {/* Custom filled radar shape */}
            <polygon
              points="100,28 152,48 168,100 150,152 100,166 48,150 32,100 48,48"
              fill="rgba(35, 194, 219, 0.25)"
              stroke="#23c2db"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Core center dot */}
            <circle cx="100" cy="100" r="3" fill="#f2c14e" />
          </svg>
        </div>
      </div>

      {/* SECTION 1: PRIMARY CORE STACK (Java, Spring Boot, JavaScript) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 border-b-2 border-cyan-400/50 pb-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="font-metaphor text-2xl sm:text-3xl uppercase tracking-wide text-parchment">
            {t.skills_primary}
          </h3>
          <span className="ml-auto font-mono text-[10px] text-cyan-300 uppercase tracking-widest px-2.5 py-0.5 bg-cyan-950/80 border border-cyan-500/40 rounded-sm font-bold">
            PRIORITY // 01
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(skills.primary || []).map((tech) => (
            <div
              key={tech.name}
              className="p-5 bg-gradient-to-br from-bg-ink via-bg-ink to-cyan-950/40 border-2 border-cyan-400/60 hover:border-cyan-300 clip-atlus-card transition-all duration-300 flex flex-col justify-between gap-4 group hover:translate-y-[-3px] shadow-[0_4px_20px_rgba(35,194,219,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 group-hover:text-emperor-crimson group-hover:border-emperor-crimson transition-colors">
                  {getIcon(tech.icon)}
                </span>
                <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-widest font-black">
                  {tech.category}
                </span>
              </div>

              <div>
                <h4 className="font-metaphor text-2xl sm:text-3xl uppercase text-parchment group-hover:text-cyan-300 tracking-tight transition-colors">
                  {tech.name}
                </h4>
                {tech.highlight && (
                  <p className="mt-1 font-mono text-xs text-parchment/70 uppercase tracking-wider">
                    // {tech.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: ECOSYSTEM & COMPLEMENTARY TECHNOLOGIES */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2.5 border-b border-parchment/15 pb-2">
          <Cpu className="w-5 h-5 text-parchment-dim" />
          <h3 className="font-metaphor text-xl sm:text-2xl uppercase tracking-wide text-parchment">
            {t.skills_secondary}
          </h3>
          <span className="ml-auto font-mono text-[10px] text-parchment-dim uppercase tracking-widest">
            STACK // 02
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {(skills.secondary || []).map((tech) => (
            <div
              key={tech.name}
              className="p-4 bg-bg-ink/90 border border-parchment/20 hover:border-cyan-400/80 clip-atlus-card transition-all duration-200 flex flex-col justify-between gap-3 group hover:translate-y-[-2px] shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 group-hover:text-emperor-crimson transition-colors">
                  {getIcon(tech.icon)}
                </span>
                <span className="font-mono text-[10px] text-parchment-dim uppercase tracking-widest font-bold">
                  {tech.category}
                </span>
              </div>

              <div>
                <h4 className="font-metaphor text-base sm:text-lg uppercase text-parchment group-hover:text-cyan-300 tracking-wide transition-colors">
                  {tech.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Soft Attributes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-parchment/15 pb-2">
          <Heart className="w-5 h-5 text-emperor-crimson" />
          <h3 className="font-metaphor text-2xl uppercase tracking-wide text-parchment">
            {t.skills_soft}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.soft.map((soft) => {
            const title = currentLang === 'es' ? soft.es : soft.en;
            const desc = currentLang === 'es' ? soft.desc_es : soft.desc_en;

            return (
              <div
                key={soft.key}
                className="p-4 bg-bg-ink/90 border-l-4 border-emperor-crimson border-y border-r border-parchment/15 clip-slanted-item hover:bg-bg-ink transition-all shadow-md"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-emperor-crimson" />
                  <h4 className="font-metaphor text-base uppercase text-parchment">
                    {title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-parchment/80 leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
