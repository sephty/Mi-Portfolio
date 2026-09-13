import React, { useState, useEffect, Suspense, lazy } from 'react';
import { translations } from './data/translations';
import { portfolioData } from './data/portfolioData';
import { SpaceCanvas } from './components/SpaceCanvas';
import { BlueprintOverlay } from './components/BlueprintOverlay';
import { PlanetLimb } from './components/PlanetLimb';
import { Navbar } from './components/Navbar';
import { RadialHero } from './components/RadialHero';
import { MobileHero } from './components/MobileHero';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy-loaded panel components for high performance and minimal initial bundle size
const AboutPanel = lazy(() => import('./components/panels/AboutPanel').then(m => ({ default: m.AboutPanel })));
const ProjectsPanel = lazy(() => import('./components/panels/ProjectsPanel').then(m => ({ default: m.ProjectsPanel })));
const SkillsPanel = lazy(() => import('./components/panels/SkillsPanel').then(m => ({ default: m.SkillsPanel })));
const ContactCabinet = lazy(() => import('./components/panels/ContactCabinet').then(m => ({ default: m.ContactCabinet })));

// Dynamic Registry of Panels: allows effortlessly registering new sections
const PANEL_COMPONENTS = {
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  contact: ContactCabinet
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
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
      {/* 0. Authentic Metaphor Loading Screen */}
      {isLoading && (
        <LoadingScreen
          onComplete={() => setIsLoading(false)}
          currentLang={currentLang}
        />
      )}

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
            {/* Sub-Page Content Container (Aligned to allow NASA planet limb visible on right flank) */}
            <div className="max-w-4xl">
              <Suspense
                fallback={
                  <div className="p-12 flex items-center justify-center font-mono text-xs text-cyan-300">
                    <span className="animate-pulse tracking-widest">[CODEX // ACCESSING ARCHIVE...]</span>
                  </div>
                }
              >
                {(() => {
                  const ActiveComponent = PANEL_COMPONENTS[activePanel];
                  return ActiveComponent ? (
                    <ActiveComponent currentLang={currentLang} translations={translations} />
                  ) : null;
                })()}
              </Suspense>
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
