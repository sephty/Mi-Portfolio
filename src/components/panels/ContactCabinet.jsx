import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Lock, Unlock, FileText, Mail, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';

export const ContactCabinet = ({ currentLang, translations }) => {
  const t = translations[currentLang];
  const { profile } = portfolioData;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const developerEmail = "garciajimenezjosephguilliani@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full space-y-10 pb-16">
      {/* ── METAPHOR HEADER BANNER ── */}
      <div className="relative py-4 select-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full max-w-xl h-20 pointer-events-none -z-10">
          <div
            className="absolute inset-0 bg-emperor-crimson opacity-80"
            style={{
              clipPath: 'polygon(2% 14%, 96% 0%, 90% 88%, 0% 95%)',
              transform: 'rotate(1deg)'
            }}
          />
          <div
            className="absolute inset-0 bg-cyan-400 opacity-90"
            style={{
              clipPath: 'polygon(0% 5%, 98% 18%, 88% 85%, 2% 75%)',
              transform: 'rotate(-1.5deg)'
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="font-metaphor text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
              {currentLang === 'es' ? 'DISPACHO // CONTACTO' : 'DISPATCH // CONTACT'}
            </h2>
          </div>
          <div className="mt-2 inline-flex items-center bg-white text-bg-ink px-4 py-1 max-w-md shadow-lg">
            <span className="font-mono text-xs font-black uppercase text-emperor-crimson mr-2">
              {t.contact_header_tag || (currentLang === 'es' ? '[CANALES DIRECTOS]' : '[DIRECT CHANNELS]')}
            </span>
            <span className="font-sans text-xs font-semibold text-bg-ink">
              {t.contact_subtitle}
            </span>
          </div>
        </div>
      </div>

      <p className="font-sans text-base text-parchment/90 max-w-xl leading-relaxed">
        {t.contact_desc}
      </p>

      {/* Interactive Metaphor Cabinet Container */}
      <div className="max-w-2xl bg-bg-ink/95 border-2 border-parchment/20 clip-atlus-card overflow-hidden shadow-2xl transition-all duration-300">
        {/* Cabinet Toggle Handle */}
        <button
          onClick={() => setIsUnlocked(!isUnlocked)}
          className={`w-full p-4 sm:p-5 flex items-center justify-between transition-colors border-b select-none interactive-cursor outline-none ${
            isUnlocked
              ? 'bg-emperor-crimson/25 border-emperor-crimson/40 text-parchment'
              : 'bg-cyan-950/40 hover:bg-cyan-900/40 border-parchment/10 text-cyan-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {isUnlocked ? (
              <Unlock className="w-5 h-5 text-emperor-crimson animate-bounce" />
            ) : (
              <Lock className="w-5 h-5 text-cyan-400" />
            )}
            <span className="font-metaphor text-base sm:text-xl uppercase tracking-wider">
              {isUnlocked ? t.cabinet_unlocked : t.cabinet_locked}
            </span>
          </div>

          <span className="font-mono text-xs text-parchment-dim font-bold">
            {isUnlocked
              ? (currentLang === 'es' ? '/// PLEGAR GABINETE ///' : '/// COLLAPSE CODEX ///')
              : (currentLang === 'es' ? '/// DESPLEGAR ACCESO ///' : '/// UNLOCK ACCESS ///')}
          </span>
        </button>

        {/* Drawer Content */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isUnlocked ? 'max-h-[550px] opacity-100 p-6' : 'max-h-0 opacity-0 p-0'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <ShieldAlert className="w-4 h-4 text-gold-accent" />
              <span>
                {currentLang === 'es'
                  ? 'EXPEDIENTE AUTENTICADO & CANALES DIRECTOS'
                  : 'AUTHENTICATED DOSSIER & DIRECT CHANNELS'}
              </span>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Canva CV Link */}
              <a
                href={profile.canvaCvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-bg-ink border-2 border-parchment/20 clip-slanted-item hover:border-cyan-400 hover:bg-parchment hover:text-bg-ink transition-all flex flex-col items-center justify-center gap-2 group text-center shadow-lg"
              >
                <FileText className="w-6 h-6 text-emperor-crimson group-hover:text-bg-ink transition-colors" />
                <span className="font-metaphor text-xs uppercase tracking-wider font-bold">
                  {t.btn_cv}
                </span>
                <span className="font-mono text-[9px] text-parchment-dim group-hover:text-bg-ink/70">
                  {currentLang === 'es' ? 'CV Interactivo Canva' : 'Canva Interactive CV'}
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-bg-ink border-2 border-parchment/20 clip-slanted-item hover:border-cyan-400 hover:bg-parchment hover:text-bg-ink transition-all flex flex-col items-center justify-center gap-2 group text-center shadow-lg"
              >
                <LinkedinIcon className="w-6 h-6 text-cyan-400 group-hover:text-bg-ink transition-colors" />
                <span className="font-metaphor text-xs uppercase tracking-wider font-bold">
                  LinkedIn
                </span>
                <span className="font-mono text-[9px] text-parchment-dim group-hover:text-bg-ink/70">
                  {currentLang === 'es' ? 'Red Profesional' : 'Connect & Network'}
                </span>
              </a>

              {/* GitHub */}
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-bg-ink border-2 border-parchment/20 clip-slanted-item hover:border-cyan-400 hover:bg-parchment hover:text-bg-ink transition-all flex flex-col items-center justify-center gap-2 group text-center shadow-lg"
              >
                <GithubIcon className="w-6 h-6 text-parchment group-hover:text-bg-ink transition-colors" />
                <span className="font-metaphor text-xs uppercase tracking-wider font-bold">
                  GitHub
                </span>
                <span className="font-mono text-[9px] text-parchment-dim group-hover:text-bg-ink/70">
                  {currentLang === 'es' ? 'Repositorios @sephty' : '@sephty Repositories'}
                </span>
              </a>
            </div>

            {/* Direct Email Clipboard Row */}
            <div className="pt-4 border-t border-parchment/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-bg-ink/70 p-3.5 rounded border border-parchment/10">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-parchment select-all">
                  {developerEmail}
                </span>
              </div>

              <button
                onClick={copyEmail}
                className="px-3.5 py-1.5 font-metaphor text-xs uppercase tracking-wider bg-cyan-500 hover:bg-emperor-crimson text-bg-ink hover:text-parchment font-bold rounded-sm transition-colors flex items-center gap-1.5 select-none"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-parchment" />
                    <span>{currentLang === 'es' ? 'COPIADO' : 'COPIED'}</span>
                  </>
                ) : (
                  <span>{currentLang === 'es' ? 'COPIAR CORREO' : 'COPY EMAIL'}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Closed Hint Footer */}
        {!isUnlocked && (
          <div className="p-3 bg-bg-ink/50 text-center font-mono text-[11px] text-parchment-dim">
            {t.cabinet_hint}
          </div>
        )}
      </div>
    </div>
  );
};
