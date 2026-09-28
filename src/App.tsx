import { useState, useEffect } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { TopRunningTelemetry } from './components/TopRunningTelemetry';
import { HeroSection } from './components/HeroSection';
import { LiveTelemetryStrip } from './components/LiveTelemetryStrip';
import { MarqueeStrip } from './components/MarqueeStrip';
import { FieldReportSection } from './components/FieldReportSection';
import { ArcadeGameSection } from './components/ArcadeGameSection';
import { SpecimenArchiveSection } from './components/SpecimenArchiveSection';
import { NeuralSensorSection } from './components/NeuralSensorSection';
import { RoadmapSection } from './components/RoadmapSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { AcquireSpecimenModal } from './components/AcquireSpecimenModal';
import { SPECIMENS } from './data/specimens';
import { SpecimenModal } from './components/SpecimenModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('origin');
  const [acquireModalOpen, setAcquireModalOpen] = useState(false);
  const [inspectedSpecimen, setInspectedSpecimen] = useState<typeof SPECIMENS[0] | null>(null);

  // Smooth scroll to target section when tab changes
  const handleTabChange = (tab: NavigationTab) => {
    setCurrentTab(tab);
    let elementId = '';
    switch (tab) {
      case 'origin':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      case 'specimen':
        elementId = 'specimens';
        break;
      case 'game':
        elementId = 'simulator';
        break;
      case 'lab':
        elementId = 'sensor';
        break;
      case 'community':
        elementId = 'community';
        break;
    }

    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlayClick = () => {
    setCurrentTab('game');
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observe scroll position to highlight active tab dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const gameEl = document.getElementById('simulator');
      const specEl = document.getElementById('specimens');
      const sensorEl = document.getElementById('sensor');
      const commEl = document.getElementById('community');

      if (commEl && scrollY >= commEl.offsetTop - 300) {
        setCurrentTab('community');
      } else if (sensorEl && scrollY >= sensorEl.offsetTop - 300) {
        setCurrentTab('lab');
      } else if (specEl && scrollY >= specEl.offsetTop - 300) {
        setCurrentTab('specimen');
      } else if (gameEl && scrollY >= gameEl.offsetTop - 300) {
        setCurrentTab('game');
      } else {
        setCurrentTab('origin');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7EE] text-[#1c1c17] font-grotesk relative selection:bg-[#cbf230] selection:text-[#171e00]">
      {/* Background Watermark Stamps */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        <div className="absolute top-1/3 -right-16 text-[#FF2A2A]/5 font-syne text-6xl sm:text-8xl border-4 border-[#FF2A2A]/5 px-8 py-2 rotate-[-12deg] tracking-widest uppercase select-none">
          RESTRICTED // SPEC-04
        </div>
        <div className="absolute bottom-16 -left-12 text-black/[0.03] font-syne text-5xl sm:text-7xl rotate-12 select-none tracking-widest uppercase">
          FOMO_CORPUS_LAB
        </div>
      </div>

      {/* Persistent Classified Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenContract={() => setInspectedSpecimen(SPECIMENS[0])}
        onPlayClick={handlePlayClick}
      />

      {/* Main Content Body */}
      <main className="w-full pt-16 relative z-10 bg-[#FAF7EE] min-h-[calc(100vh-140px)]">
        {/* Top Running Coordinate Strip */}
        <TopRunningTelemetry />

        {/* Hero Specimen Observation Chamber */}
        <HeroSection
          onPlayClick={handlePlayClick}
          onAcquireClick={() => setAcquireModalOpen(true)}
        />

        {/* Dynamic Telemetry Strip */}
        <LiveTelemetryStrip />

        {/* Dual Speed Running Marquees */}
        <MarqueeStrip />

        {/* "SO... WHAT IS THIS?" Field Note Section */}
        <FieldReportSection
          onPlayClick={handlePlayClick}
          onExploreSpecimens={() => handleTabChange('specimen')}
        />

        {/* The Experiment is Playable: CRT Arcade Game Simulator */}
        <ArcadeGameSection />

        {/* Specimen Archive // Bio-Containment Level 4 */}
        <SpecimenArchiveSection />

        {/* Interactive FOMO / Neural Sensor Section */}
        <NeuralSensorSection />

        {/* Temporal Trajectory // Uncharted Expedition (Roadmap) */}
        <RoadmapSection />

        {/* Collective Dispersal Grid / Community & Interactive Terminal */}
        <CommunitySection />
      </main>

      {/* Archival Classified Footer */}
      <Footer />

      {/* Modals */}
      <AcquireSpecimenModal
        isOpen={acquireModalOpen}
        onClose={() => setAcquireModalOpen(false)}
      />

      <SpecimenModal
        specimen={inspectedSpecimen}
        onClose={() => setInspectedSpecimen(null)}
      />

      {/* Quick Floating Action Bar with Specimen Emblem & Controls */}
      <div className="fixed bottom-3 sm:bottom-4 right-3 sm:right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            sound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#FAF7EE] hover:bg-black hover:text-white text-black font-mono text-[10px] sm:text-xs font-bold w-8 h-8 sm:w-10 sm:h-10 border-2 border-black brutalist-shadow active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Back to Top / Dossier"
        >
          ▲
        </button>

        <button
          onClick={() => {
            sound.playClick();
            handlePlayClick();
          }}
          className="bg-[#cbf230] text-[#171e00] hover:bg-[#FF5100] hover:text-black font-mono text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 border-2 border-black brutalist-shadow active:scale-95 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer uppercase group"
          title="Launch Game Simulator"
        >
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden border border-black shrink-0 bg-[#FAF7EE] flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJdrmly_8Pf7BSidH_UsACNZmQA8KntHGKjgB6lz1BeOVltx0MF6HqYxoHdpRl8duQoApRPRMrtqEl37VUV07ygsexKWNu-7_4qiTzf7fZOdRJdtyTr3cMSTUIRa42PpmhgluD8D8d6zMVuoPE97K0feClxtx_jgpr59Ut31N9U6eiGRxgP7eCLnmFMQZyIjxiV6LuluaVa_OBUoC-7dyNVY9TCjalExbvOd-iN8eJP9Tso6jPQQS"
              alt="Mascot"
              className="w-full h-full object-contain"
            />
          </span>
          <span className="font-syne font-extrabold tracking-tight hidden sm:inline">ARCADE RUNNER</span>
          <span className="text-[#FF5100] font-bold">▶</span>
        </button>
      </div>
    </div>
  );
}
