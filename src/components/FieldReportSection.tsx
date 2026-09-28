import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { SOCIAL_LINKS } from '../constants/socialLinks';

interface FieldReportProps {
  onPlayClick: () => void;
  onExploreSpecimens: () => void;
}

export const FieldReportSection: React.FC<FieldReportProps> = ({
  onPlayClick,
  onExploreSpecimens,
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      icon: 'search',
      desc: 'Deep-dive internet archaeology. Uncover classified transcripts, hidden test chambers, and rogue transmissions.',
      phase: 'PHASE: INITIAL DISCOVERY',
      secretNote: 'Archive file #001 recovered from corrupted node. Contains original sketch of Specimen 001 with handwritten annotation: "DO NOT REHYDRATE."',
    },
    {
      num: '02',
      title: 'PLAY',
      icon: 'sports_esports',
      desc: 'Real-time reflex and neural endurance arcade runs. Dodge containment traps and outmaneuver the algorithm.',
      phase: 'PHASE: REFLEX SIMULATION',
      action: onPlayClick,
      actionText: 'START RUNNER →',
      secretNote: 'Bio-hazard simulator online. Neural bridge active. Average survival time: 48.2 seconds.',
    },
    {
      num: '03',
      title: 'COLLECT',
      icon: 'token',
      desc: 'Dynamic mutating specimens indexed permanently. Every organism possesses erratic traits and visual DNA.',
      phase: 'PHASE: ON-CHAIN SYNTHESIS',
      action: onExploreSpecimens,
      actionText: 'VIEW ARCHIVE →',
      secretNote: 'Specimen genetic indexing in progress. 1,000 algorithmic variations detected in subnet 9.',
    },
    {
      num: '04',
      title: 'CHAOS',
      icon: 'local_fire_department',
      desc: 'Unpredictable social propagation. Community voting decides which containment chamber opens next.',
      phase: 'PHASE: TOTAL CONTAGION',
      secretNote: 'Contagion vector: Twitter/X & Discord. Decentralized consensus unlocks Phase 05 vault.',
    },
  ];

  return (
    <section className="w-full border-b border-[#111111] bg-[#FAF7EE] px-4 sm:px-6 lg:px-12 py-14 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="w-full mb-8 sm:mb-12">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#111111] pb-2 sm:pb-3 mb-4 sm:mb-6">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#525252]">
              DEPT // SPECULATIVE ANOMALIES
            </span>
            <span className="font-mono text-[10px] sm:text-xs uppercase text-[#FF2A2A] font-bold">
              CLEARANCE: LVL 04
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs sm:text-sm text-[#FF5100] uppercase font-bold tracking-widest mb-2">
                FIELD NOTE // 001 · CLASSIFIED BRIEFING
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-black leading-none mb-6">
                SO... WHAT IS THIS?
              </h2>
              <blockquote className="font-grotesk text-lg sm:text-xl text-black italic border-l-4 border-[#FF5100] pl-4 mb-4 font-semibold">
                “It started as an idea that probably should have stayed in a group chat.”
              </blockquote>
              <p className="font-grotesk text-base sm:text-lg text-[#525252] max-w-2xl leading-relaxed">
                FOMO CORPUS is not an ordinary token, an ordinary game, or an ordinary laboratory. It is an accelerated petri dish for digital contagion, where biological absurdity meets community frenzy on the open web.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F1EDE5] border border-[#111111] p-4 brutalist-shadow">
              <div className="flex items-center justify-between font-mono text-xs border-b border-[#111111] pb-2 mb-3">
                <span className="font-bold uppercase text-black">ANOMALY LOG</span>
                <span className="text-[#525252]">03:42 UTC</span>
              </div>
              <p className="font-grotesk text-xs sm:text-sm text-[#525252] leading-relaxed mb-3">
                Specimen 001 demonstrated autonomous replication inside our test environment. Neural response to market volatility is direct, volatile, and deeply entertaining.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#111111] font-mono text-[11px]">
                <span>OBSERVER: #09</span>
                <span className="text-[#FF5100] font-bold">STATUS: MONITORED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Part Brutalist Numbered Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((s, idx) => {
            const isExpanded = activeStep === idx;
            return (
              <div
                key={s.num}
                onClick={() => {
                  sound.playClick();
                  setActiveStep(isExpanded ? null : idx);
                }}
                className={`border border-[#111111] p-4 sm:p-6 transition-all cursor-pointer group flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#F1EDE5] brutalist-shadow-orange translate-y-[-2px]'
                    : 'bg-[#F7F3EB] brutalist-shadow hover:bg-[#F1EDE5]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="font-grotesk text-xl sm:text-2xl lg:text-3xl font-bold text-black group-hover:text-[#FF5100] transition-colors">
                      {s.num}
                    </span>
                    <span className="material-symbols-outlined text-black group-hover:rotate-12 transition-transform text-2xl sm:text-3xl">
                      {s.icon}
                    </span>
                  </div>

                  <h3 className="font-grotesk text-base sm:text-lg lg:text-xl uppercase text-black font-bold mb-1.5 sm:mb-2">
                    {s.title}
                  </h3>
                  <p className="font-grotesk text-[11px] sm:text-xs md:text-sm text-[#525252] mb-3 sm:mb-4 leading-relaxed">
                    {s.desc}
                  </p>

                  {isExpanded && (
                    <div className="bg-[#FAF7EE] border border-[#111111] p-2 sm:p-2.5 mb-3 sm:mb-4 animate-in fade-in duration-200">
                      <div className="font-mono text-[9px] sm:text-[10px] text-[#FF5100] font-bold uppercase mb-1">
                        CONFIDENTIAL INTEL:
                      </div>
                      <div className="font-mono text-[10px] sm:text-xs text-black leading-snug">
                        {s.secretNote}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {s.action && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        s.action!();
                      }}
                      className="w-full mb-2 sm:mb-3 py-1.5 px-2 bg-black text-white font-mono text-[10px] sm:text-[11px] uppercase font-bold hover:bg-[#FF5100] hover:text-black transition-colors"
                    >
                      {s.actionText}
                    </button>
                  )}
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#525252] uppercase border-t border-[#111111]/30 pt-1.5 sm:pt-2 block">
                    {s.phase}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
