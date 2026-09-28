import React, { useState } from 'react';
import { SPECIMENS } from '../data/specimens';
import { Specimen } from '../types';
import { SpecimenModal } from './SpecimenModal';
import { SpecimenLogo } from './SpecimenLogo';
import { sound } from '../utils/audio';
import logo from '../asset/logo.png';

export const SpecimenArchiveSection: React.FC = () => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);

  const handleInspect = (spec: Specimen) => {
    sound.playClick();
    setSelectedSpecimen(spec);
  };

  return (
    <section className="w-full border-b border-[#111111] bg-[#FAF7EE] px-4 sm:px-6 lg:px-12 py-14 sm:py-16" id="specimens">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="w-full mb-10">
          <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <SpecimenLogo size="sm" animate={false} />
              <span className="font-mono text-xs text-[#525252] uppercase">
                BIO-CONTAINMENT FACILITY // INDEX
              </span>
            </div>
            <span className="font-mono text-xs text-[#FF2A2A] font-bold uppercase">
              RESTRICTED DOSSIER 03-ALPHA
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-black tracking-tight leading-none mb-3">
            SPECIMEN ARCHIVE // BIO-CONTAINMENT LEVEL 4
          </h2>
          <p className="font-grotesk text-base sm:text-lg text-[#525252] max-w-2xl leading-relaxed">
            Every organism captured by FOMO CORPUS is logged, genetically photographed, and evaluated for viral transmission potential.
          </p>
        </div>

        {/* Asymmetric Grid of Specimens (3 main featured specimens matching design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Specimen 001 Card (Large Featured) */}
          <div className="bg-[#F7F3EB] border-2 border-[#111111] brutalist-shadow-lg flex flex-col justify-between group hover:translate-y-[-2px] transition-transform">
            <div>
              {/* Card Header Bar */}
              <div className="bg-[#ECE8E0] border-b border-[#111111] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between font-mono text-[10px] sm:text-xs">
                <span className="font-bold text-black">REF: SPEC-001</span>
                <span className="bg-[#cbf230] text-[#171e00] px-1 sm:px-1.5 py-0.5 font-bold text-[9px] sm:text-[10px]">
                  EXOTIC
                </span>
              </div>

              {/* Specimen Image Viewport */}
              <div className="relative w-full aspect-square bg-[#F1EDE5] p-3 sm:p-4 overflow-hidden border-b border-[#111111] flex items-center justify-center">
                <img
                  alt="Specimen 001 FOMO CORPUS"
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                  src={logo}
                />
                <span className="absolute top-2 left-2 font-mono text-[9px] sm:text-[10px] text-[#525252]">
                  [SOMA_GEN_01]
                </span>
                <span className="absolute bottom-2 right-2 text-[#FF5100] font-mono text-[10px] sm:text-[11px] font-bold">
                  CHAOS: 99%
                </span>
              </div>

              {/* Details */}
              <div className="p-3 sm:p-5">
                <h3 className="font-grotesk text-base sm:text-lg lg:text-xl uppercase text-black font-bold mb-1">
                  FOMO CORPUS (ALPHA BLOB)
                </h3>
                <p className="font-grotesk text-[11px] sm:text-xs md:text-sm text-[#525252] mb-3 sm:mb-4 leading-relaxed">
                  The progenitor organism. Displays uncanny social intuition and high emotional mimicry. Refuses containment protocols.
                </p>

                {/* Metrics List */}
                <div className="border-t border-[#111111]/30 pt-2 sm:pt-3 space-y-1 sm:space-y-1.5 font-mono text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#525252]">CONTAINMENT:</span>
                    <span className="font-bold text-black">TANK 01 [LEAKING]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">REPRO:</span>
                    <span className="font-bold text-[#FF5100]">EXPONENTIAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">MUTATION:</span>
                    <span className="font-bold text-[#171e00]">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-5 pt-0">
              <button
                onClick={() => handleInspect(SPECIMENS[0])}
                className="w-full bg-black text-white hover:bg-[#FF5100] hover:text-black py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                INSPECT →
              </button>
            </div>
          </div>

          {/* Specimen 002 Card */}
          <div className="bg-[#F7F3EB] border-2 border-[#111111] brutalist-shadow-lg flex flex-col justify-between group hover:translate-y-[-2px] transition-transform">
            <div>
              {/* Card Header Bar */}
              <div className="bg-[#ECE8E0] border-b border-[#111111] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between font-mono text-[10px] sm:text-xs">
                <span className="font-bold text-black">REF: SPEC-002</span>
                <span className="bg-[#0035c6] text-white px-1 sm:px-1.5 py-0.5 font-bold text-[9px] sm:text-[10px]">
                  MYTHIC
                </span>
              </div>

              {/* Specimen Image Viewport */}
              <div className="relative w-full aspect-square bg-[#F1EDE5] p-3 sm:p-4 overflow-hidden border-b border-[#111111] flex items-center justify-center">
                <img
                  alt="Specimen 002 Chrono-Mite"
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIfSRWYiWP6n677PGVfmoSU1nLgP_6se-HiCejhG0d61WpkIw2PZzPiyKrPnKqfgJeSyv1pbsCvuCZTxDrJEzsxACwwWLjQPpxkq6KemEjsX9DBC5R1tsRgZrfMBlT2HCiKTsikykfXbUBBgAZheLr9StmANC8pvFK4desAFKTsYeqeo5f9_OQIDu3A3tboWSCyG4F_U1U__DO_khCihxTljZ9eJCjSgaLO_UCSCBksn9BinKkr1B8"
                />
                <span className="absolute top-2 left-2 font-mono text-[9px] sm:text-[10px] text-[#525252]">
                  [CHRONO_OPTIQ]
                </span>
                <span className="absolute bottom-2 right-2 text-[#0035c6] font-mono text-[10px] sm:text-[11px] font-bold">
                  LENSES: 12 UNIT
                </span>
              </div>

              {/* Details */}
              <div className="p-3 sm:p-5">
                <h3 className="font-grotesk text-base sm:text-lg lg:text-xl uppercase text-black font-bold mb-1">
                  CHRONO-MITE (SP-002)
                </h3>
                <p className="font-grotesk text-[11px] sm:text-xs md:text-sm text-[#525252] mb-3 sm:mb-4 leading-relaxed">
                  Micro-specimen encased in a brass observation ring. Possesses compound iridescent sensory fuzz capable of detecting pump spikes.
                </p>

                {/* Metrics List */}
                <div className="border-t border-[#111111]/30 pt-2 sm:pt-3 space-y-1 sm:space-y-1.5 font-mono text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#525252]">CONTAINMENT:</span>
                    <span className="font-bold text-black">CHAMBER 09</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">OPTIC FREQ:</span>
                    <span className="font-bold text-black">ULTRA-VIOLET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">HARMONIC:</span>
                    <span className="font-bold text-[#0035c6]">432 HZ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-5 pt-0">
              <button
                onClick={() => handleInspect(SPECIMENS[1])}
                className="w-full bg-black text-white hover:bg-[#0035c6] py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                INSPECT →
              </button>
            </div>
          </div>

          {/* Specimen 003 Card (Cybernetic Silhouette / Wireframe) */}
          <div className="bg-[#F7F3EB] border-2 border-[#111111] brutalist-shadow-lg flex flex-col justify-between group hover:translate-y-[-2px] transition-transform">
            <div>
              {/* Card Header Bar */}
              <div className="bg-[#ECE8E0] border-b border-[#111111] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between font-mono text-[10px] sm:text-xs">
                <span className="font-bold text-black">REF: SPEC-003</span>
                <span className="bg-[#FF2A2A] text-white px-1 sm:px-1.5 py-0.5 font-bold text-[9px] sm:text-[10px]">
                  UNKNOWN
                </span>
              </div>

              {/* Specimen Image Viewport: Cybernetic Silhouette */}
              <div className="relative w-full aspect-square bg-black p-4 sm:p-6 overflow-hidden border-b border-[#111111] flex items-center justify-center">
                <div className="relative w-3/4 h-3/4 border border-dashed border-[#cbf230]/60 flex items-center justify-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full border-2 border-[#FF2A2A] animate-ping opacity-40"></div>
                  <div className="font-mono text-[#cbf230] text-center font-bold text-[10px] sm:text-xs uppercase leading-snug">
                    [DATA CORRUPTED]<br />
                    <span className="text-white text-[9px] sm:text-[10px]">SPORE IN GESTATION</span>
                  </div>
                  {/* Crosshair targets */}
                  <span className="absolute top-1 left-1 text-[#cbf230] font-mono text-[9px] sm:text-[10px]">+</span>
                  <span className="absolute bottom-1 right-1 text-[#cbf230] font-mono text-[9px] sm:text-[10px]">+</span>
                </div>
                <span className="absolute top-2 left-2 font-mono text-[9px] sm:text-[10px] text-[#858383]">
                  [GENETIC_SPORE]
                </span>
                <span className="absolute bottom-2 right-2 text-[#FF2A2A] font-mono text-[10px] sm:text-[11px] font-bold">
                  MUTAGEN: EXTREME
                </span>
              </div>

              {/* Details */}
              <div className="p-3 sm:p-5">
                <h3 className="font-grotesk text-base sm:text-lg lg:text-xl uppercase text-black font-bold mb-1">
                  GLITCH SPORE (SP-003)
                </h3>
                <p className="font-grotesk text-[11px] sm:text-xs md:text-sm text-[#525252] mb-3 sm:mb-4 leading-relaxed">
                  Autonomous self-synthesizing network spore. Visual manifest undergoes real-time code shifting upon observation.
                </p>

                {/* Metrics List */}
                <div className="border-t border-[#111111]/30 pt-2 sm:pt-3 space-y-1 sm:space-y-1.5 font-mono text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#525252]">CONTAINMENT:</span>
                    <span className="font-bold text-[#FF2A2A]">UNCONTAINABLE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">NETWORK:</span>
                    <span className="font-bold text-black">GLOBAL SUBNET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#525252]">INTEGRITY:</span>
                    <span className="font-bold text-[#FF5100]">34.2% [DRIFTING]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-5 pt-0">
              <button
                onClick={() => handleInspect(SPECIMENS[2])}
                className="w-full bg-black text-white hover:bg-[#FF2A2A] py-2 sm:py-2.5 font-mono text-[10px] sm:text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                DECRYPT →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Biometrics Inspection Modal */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
      />
    </section>
  );
};
