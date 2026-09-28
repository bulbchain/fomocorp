import React, { useState, useRef } from 'react';
import { sound } from '../utils/audio';
import { SpecimenLogo } from './SpecimenLogo';

interface HeroSectionProps {
  onPlayClick: () => void;
  onAcquireClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlayClick,
  onAcquireClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [tankState, setTankState] = useState<'QUIESCENT' | 'AGITATED [TRACKING]'>('QUIESCENT');
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const [pokeCount, setPokeCount] = useState(0);
  const tankRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tankRef.current) return;
    const rect = tankRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -14;
    const tiltY = (x / (rect.width / 2)) * 14;

    setTilt({ x: tiltX, y: tiltY, scale: 1.06 });
    setTankState('AGITATED [TRACKING]');
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
    setTankState('QUIESCENT');
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText('0x98A47F23E90b1c9F7c3d18B47890AA40F4E9b83C');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePokeSpecimen = () => {
    sound.playJump();
    setPokeCount((prev) => prev + 1);
    setTilt({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20, scale: 1.15 });
    setTimeout(() => {
      setTilt({ x: 0, y: 0, scale: 1 });
    }, 300);
  };

  return (
    <section className="relative w-full border-b border-[#111111] bg-[#FAF7EE] px-4 sm:px-6 lg:px-12 py-10 lg:py-16 overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-tech-grid"></div>

      {/* Watermark stamps */}
      <div className="pointer-events-none absolute -top-12 -right-12 text-[#FF2A2A]/5 font-syne text-[80px] sm:text-[110px] font-black uppercase tracking-widest select-none rotate-[-6deg]">
        SPEC-001
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#111111] pb-3 mb-8">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#525252]">
            <span className="px-2 py-0.5 bg-black text-white uppercase font-bold tracking-widest">
              DOSSIER
            </span>
            <span className="uppercase">REF // EXP-8820-X</span>
            <span>•</span>
            <span className="uppercase text-[#FF5100] font-bold">
              REVISION: UNSTABLE-04
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs">
            <span className="border border-[#111111] px-2 py-0.5 bg-[#F7F3EB]">
              SPECIMEN PULSE: 97.4 BPM
            </span>
            <span className="border border-[#111111] px-2 py-0.5 bg-[#cbf230] text-[#171e00] font-bold">
              MUTAGEN: RECEPTIVE
            </span>
          </div>
        </div>

        {/* Main Hero Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <SpecimenLogo size="sm" animate />
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#FF5100] inline-block"></span>
                <span className="font-mono text-[10px] sm:text-xs md:text-sm text-[#FF5100] uppercase font-bold tracking-wider">
                  PROJECT: UNKNOWN GENESIS // SPEC-001
                </span>
              </div>
            </div>

            <h1 className="font-syne text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase text-black tracking-tighter leading-[0.95] mb-4 sm:mb-6">
              FOMO<br />
              <span className="italic font-normal">CORPUS</span>
            </h1>

            <div className="border-l-4 border-black pl-3 sm:pl-4 mb-4 sm:mb-6">
              <p className="font-grotesk text-sm sm:text-base lg:text-lg uppercase text-black tracking-tight font-bold mb-2">
                BORN FROM CURIOSITY. BUILT FOR CHAOS. THE INTERNET'S NEXT BAD IDEA.
              </p>
              <p className="font-grotesk text-xs sm:text-sm md:text-base text-[#525252] leading-relaxed">
                Nobody knows where it came from. It appeared somewhere between 3:42 AM boredom, internet curiosity, and the collective human inability to ignore a new meme. Now it's loose in containment.
              </p>
            </div>

            {/* Action Matrix */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <button
                onClick={() => {
                  sound.playClick();
                  onPlayClick();
                }}
                className="inline-flex items-center justify-center font-mono text-[10px] sm:text-xs md:text-sm bg-black text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 uppercase tracking-wider font-bold border border-black shadow-[4px_4px_0px_#FF5100] hover:bg-[#FF5100] hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                PLAY →
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onAcquireClick();
                }}
                className="inline-flex items-center justify-center font-mono text-[10px] sm:text-xs md:text-sm bg-[#F7F3EB] text-black px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 uppercase tracking-wider font-bold border border-[#111111] shadow-[4px_4px_0px_#111111] hover:bg-[#cbf230] hover:text-[#171e00] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                JOIN
              </button>
            </div>

            {/* Interactive Copyable Contract Bar */}
            <div className="w-full max-w-lg bg-[#F1EDE5] border border-[#111111] p-2 sm:p-2.5 brutalist-shadow-sm flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-mono text-[10px] sm:text-xs text-[#525252] shrink-0 uppercase font-bold">
                  CA:
                </span>
                <code className="font-mono text-[10px] sm:text-xs font-bold text-black truncate select-all">
                  0x98A47F23E90b1c9F7c3d18B47890AA40F4E9b83C
                </code>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 bg-black text-white hover:bg-[#FF5100] hover:text-black px-2 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase transition-colors flex items-center gap-1 active:scale-95 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[12px] sm:text-[14px]">content_copy</span>
                <span className="hidden sm:inline">{copied ? 'COPIED!' : 'COPY'}</span>
                <span className="sm:hidden">{copied ? '✓' : '📋'}</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Specimen Observation Tank */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-4 lg:py-6 order-1 lg:order-2">
            <div
              ref={tankRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square bg-[#F7F3EB] border-2 border-[#111111] brutalist-shadow-xl flex items-center justify-center p-4 sm:p-6 select-none transition-shadow"
            >
              {/* Reticle Corners */}
              <span className="absolute top-2 left-2 font-mono text-xs sm:text-sm font-bold text-black">+</span>
              <span className="absolute top-2 right-2 font-mono text-xs sm:text-sm font-bold text-black">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-xs sm:text-sm font-bold text-black">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-xs sm:text-sm font-bold text-black">+</span>

              {/* Top Tank Header Ribbon */}
              <div className="absolute top-0 inset-x-0 bg-[#ECE8E0] border-b border-[#111111] px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between font-mono text-[9px] sm:text-[10px] md:text-[11px] uppercase text-[#525252]">
                <span className="flex items-center gap-1 sm:gap-1.5 font-bold text-black">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF2A2A] animate-pulse"></span>
                  <span className="hidden sm:inline">LIVE FEED // TANK-01</span>
                  <span className="sm:hidden">TANK-01</span>
                </span>
                <span
                  className={`font-bold transition-colors text-[9px] sm:text-[10px] md:text-[11px] ${
                    tankState.includes('AGITATED') ? 'text-[#FF2A2A]' : 'text-[#FF5100]'
                  }`}
                >
                  {tankState.includes('AGITATED') ? 'AGITATED' : 'QUIESCENT'}
                </span>
              </div>

              {/* Central Creature Specimen Mascot */}
              <div
                onClick={handlePokeSpecimen}
                title="Click to interact with Specimen 001"
                className="relative w-4/5 h-4/5 flex items-center justify-center cursor-pointer group"
              >
                <img
                  alt="FOMO SOMA Mascot Specimen"
                  style={{
                    transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] select-none pointer-events-auto"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJdrmly_8Pf7BSidH_UsACNZmQA8KntHGKjgB6lz1BeOVltx0MF6HqYxoHdpRl8duQoApRPRMrtqEl37VUV07ygsexKWNu-7_4qiTzf7fZOdRJdtyTr3cMSTUIRa42PpmhgluD8D8d6zMVuoPE97K0feClxtx_jgpr59Ut31N9U6eiGRxgP7eCLnmFMQZyIjxiV6LuluaVa_OBUoC-7dyNVY9TCjalExbvOd-iN8eJP9Tso6jPQQS"
                />

                {/* Dynamic Scan Reticle Circle Overlay */}
                <div className="absolute inset-0 border border-black/20 rounded-full pointer-events-none scale-90 group-hover:scale-100 transition-transform duration-500"></div>
                <div className="absolute w-2 h-2 bg-[#FF5100] rounded-full pointer-events-none animate-ping"></div>

                {pokeCount > 0 && (
                  <div className="absolute -top-4 sm:-top-6 bg-[#FF5100] text-black font-mono text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 animate-bounce">
                    POKED {pokeCount}x!
                  </div>
                )}
              </div>

              {/* Bottom Chamber Readout */}
              <div className="absolute bottom-0 inset-x-0 bg-[#F1EDE5] border-t border-[#111111] px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between font-mono text-[9px] sm:text-[10px] md:text-[11px]">
                <span className="text-[#525252]">EXP: ALPHA-BLOB</span>
                <span className="text-black font-bold">99.8% SECURE</span>
              </div>

              {/* Floating Annotation Tag 1 (Top Left) */}
              <div className="absolute -top-2 sm:-top-3 -left-1 sm:-left-6 bg-[#FAF7EE] border border-[#111111] brutalist-shadow-sm p-1.5 sm:p-2 max-w-[140px] sm:max-w-[190px] z-20 pointer-events-none hidden sm:block">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#FF5100] font-bold uppercase">
                  01 // TAXONOMY
                </div>
                <div className="font-grotesk text-[10px] sm:text-sm text-black font-bold">
                  UNKNOWN SPECIES / AMORPHOUS
                </div>
              </div>

              {/* Floating Annotation Tag 2 (Top Right) */}
              <div className="absolute -top-2 sm:-top-3 -right-1 sm:-right-6 bg-[#FAF7EE] border border-[#111111] brutalist-shadow-sm p-1.5 sm:p-2 max-w-[140px] sm:max-w-[190px] z-20 pointer-events-none hidden sm:block">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#FF2A2A] font-bold uppercase">
                  02 // CHAOS RESPONSE
                </div>
                <div className="font-grotesk text-[10px] sm:text-sm text-black font-bold">
                  +420% DISRUPTION RISK
                </div>
              </div>

              {/* Floating Annotation Tag 3 (Bottom Left) */}
              <div className="absolute -bottom-2 sm:-bottom-3 -left-1 sm:-left-6 bg-[#FAF7EE] border border-[#111111] brutalist-shadow-sm p-1.5 sm:p-2 max-w-[140px] sm:max-w-[190px] z-20 pointer-events-none hidden sm:block">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#0035c6] font-bold uppercase">
                  03 // FOMO LEVEL
                </div>
                <div className="font-grotesk text-[10px] sm:text-sm text-black font-bold">
                  CRITICAL METRIC [97.8%]
                </div>
              </div>

              {/* Floating Annotation Tag 4 (Bottom Right) */}
              <div className="absolute -bottom-3 sm:-bottom-4 -right-1 sm:-right-6 bg-[#cbf230] border border-[#111111] brutalist-shadow-sm p-1.5 sm:p-2 max-w-[140px] sm:max-w-[190px] z-20 pointer-events-none hidden sm:block">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#171e00] font-bold uppercase">
                  04 // PROTOCOL WARNING
                </div>
                <div className="font-grotesk text-[10px] sm:text-sm text-[#171e00] font-bold">
                  DO NOT FEED AFTER MIDNIGHT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
