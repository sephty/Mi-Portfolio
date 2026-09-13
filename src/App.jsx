import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import { portfolioData } from './data/portfolioData';
import { SpaceCanvas } from './components/SpaceCanvas';
import { BlueprintOverlay } from './components/BlueprintOverlay';
import { PlanetLimb } from './components/PlanetLimb';
import { Navbar } from './components/Navbar';
import { RadialHero } from './components/RadialHero';
import { MobileHero } from './components/MobileHero';
import { AboutPanel } from './components/panels/AboutPanel';
import { ProjectsPanel } from './components/panels/ProjectsPanel';
import { SkillsPanel } from './components/panels/SkillsPanel';
import { ExperiencePanel } from './components/panels/ExperiencePanel';
import { ContactCabinet } from './components/panels/ContactCabinet';
import { X, ArrowLeft, Disc } from 'lucide-react';

// Dynamic Registry of Panels: allows effortlessly registering new sections
const PANEL_COMPONENTS = {
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  contact: ContactCabinet
};

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('lang') || 'es';
  });

  const [activeKey, setActiveKey] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Viewport resize watcher
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Language switcher
  const toggleLang = () => {
    const nextLang = currentLang === 'es' ? 'en' : 'es';
    setCurrentLang(nextLang);
    localStorage.setItem('lang', nextLang);
  };

  // Cinematic Camera Zoom into targeted planet
  const handleSelectNode = (nodeKey) => {
    setIsZooming(true);
    setActiveKey(nodeKey);

    // Smooth camera fly-in into the planet (~350ms to switch content view)
    setTimeout(() => {
      setActivePanel(nodeKey);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsZooming(false);
    }, 380);
  };

  // Smooth Camera Zoom back out to Orbit
  const handleClosePanel = () => {
    setIsZooming(true);
    setTimeout(() => {
      setActivePanel(null);
      setActiveKey(null);
      setIsZooming(false);
    }, 380);
  };

  // ESC shortcut to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePanel) {
        handleClosePanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel]);

  const targetPlanetKey = activePanel || activeKey || 'projects';

  return (
    <div className="relative min-h-screen bg-bg-ink text-parchment flex flex-col justify-between overflow-x-hidden selection:bg-cyan-500 selection:text-bg-ink">
      {/* 1. Deep Cosmic Void with Nebula Clouds & Sparkling Star Cluster (NASA Image 2) */}
      <SpaceCanvas isZoomed={!!activePanel} activePlanetKey={targetPlanetKey} />

      {/* 2. Metaphor Astrolabe Blueprint Drafting Layer (Metaphor Image 1) */}
      <BlueprintOverlay isZoomed={!!activePanel} />

      {/* 3. Docked Curved NASA Planetary Limb Horizon (NASA Image 2) */}
      <PlanetLimb
        activePlanetKey={targetPlanetKey}
        isDocked={!!activePanel}
      />

      {/* 4. Global Navbar with Metaphor Typewriter & Language Switcher */}
      <Navbar
        currentLang={currentLang}
        toggleLang={toggleLang}
        activePanel={activePanel}
        onBackToOrbit={handleClosePanel}
        translations={translations}
      />

      {/* 5. MAIN STAGE WITH SMOOTH CAMERA ZOOM DYNAMICS */}
      <main
        className={`relative flex-1 flex flex-col items-center justify-center z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isZooming ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {!activePanel ? (
          // FULL SOLAR SYSTEM OVERVIEW (HERO)
          isMobile ? (
            <MobileHero
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              onSelectNode={handleSelectNode}
              currentLang={currentLang}
              translations={translations}
            />
          ) : (
            <RadialHero
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              onSelectNode={handleSelectNode}
              currentLang={currentLang}
              translations={translations}
            />
          )
        ) : (
          // DOCKED METAPHOR CODEX PANEL (Left Flank UI with NASA Planet Limb on Right)
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 z-20">
            {/* Top Codex Navigation Strip */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleClosePanel}
                className="inline-flex items-center gap-2.5 px-4 py-2 font-metaphor text-xs uppercase tracking-wider bg-bg-ink/90 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-bg-ink rounded transition-all duration-200 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{translations[currentLang].btn_back}</span>
              </button>

              <button
                onClick={handleClosePanel}
                className="w-9 h-9 rounded bg-bg-ink/90 border border-parchment/30 flex items-center justify-center text-parchment hover:bg-emperor-crimson transition-colors shadow"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Page Content Container (Aligned to allow NASA planet limb visible on right flank) */}
            <div className="max-w-4xl">
              {(() => {
                const ActiveComponent = PANEL_COMPONENTS[activePanel];
                return ActiveComponent ? (
                  <ActiveComponent currentLang={currentLang} translations={translations} />
                ) : null;
              })()}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 px-6 border-t border-parchment/15 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-parchment-dim z-30 bg-bg-ink/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span>JOSEPH GARCÍA JIMÉNEZ · 2026</span>
          <span className="mx-1 text-parchment/20">|</span>
          <span className="text-cyan-300 font-semibold">JAVA & BACKEND DEVELOPER</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <a
            href="https://github.com/sephty"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            GITHUB: @sephty
          </a>
        </div>
      </footer>
    </div>
  );
}
