import React, { useState, useEffect } from 'react';
import { Globe, ArrowLeft } from 'lucide-react';

export const Navbar = ({
  currentLang,
  toggleLang,
  activePanel,
  onBackToOrbit,
  translations
}) => {
  const t = translations[currentLang];

  // Dynamic Typewriter Roles
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = t.roles;
    const currentRole = roles[roleIndex % roles.length];

    let timeout;
    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.substring(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex(r => (r + 1) % roles.length);
        timeout = setTimeout(() => {}, 350);
      }
    } else {
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.substring(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, t.roles]);

  return (
    <header className="w-full h-16 sm:h-20 bg-bg-ink/90 backdrop-blur-md border-b border-parchment/10 sticky top-0 z-40 px-4 sm:px-8 lg:px-14 flex items-center justify-between select-none">
      {/* Left Brand & Persona Hat Glyph */}
      <div className="flex items-center gap-3">
        <img
          src="./assets/game/glyphs/hat.png"
          alt="Persona Hat"
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 hover:rotate-12 hover:scale-110 interactive-cursor"
          onClick={onBackToOrbit}
        />

        <div className="flex flex-col cursor-pointer" onClick={onBackToOrbit}>
          <div className="flex items-center gap-2">
            <h1 className="font-metaphor text-lg sm:text-xl uppercase tracking-wider text-parchment font-black">
              {t.hero_name}
            </h1>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <span className="font-mono text-xs text-cyan-300 font-semibold">
              {roleText}
            </span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right Actions: Back & Lang Toggle */}
      <div className="flex items-center gap-3">
        {/* Simple Clean Back Button */}
        {activePanel && (
          <button
            onClick={onBackToOrbit}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-950/40 hover:bg-cyan-400 text-cyan-300 hover:text-bg-ink border border-cyan-400/50 font-metaphor text-xs uppercase tracking-wider transition-all rounded-sm shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.btn_back}</span>
          </button>
        )}

        {/* Language Toggle Button */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-ink hover:bg-parchment hover:text-bg-ink text-parchment border border-parchment/30 font-mono text-xs uppercase tracking-widest font-bold transition-all rounded-sm interactive-cursor shadow"
          aria-label="Toggle language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{currentLang === 'es' ? 'EN' : 'ES'}</span>
        </button>
      </div>
    </header>
  );
};
