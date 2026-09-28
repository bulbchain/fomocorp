import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { ManifestoModal } from './ManifestoModal';
import { SpecimenLogo } from './SpecimenLogo';
import { SOCIAL_LINKS } from '../constants/socialLinks';

interface CommunitySectionProps {
  onOpenManifesto?: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = () => {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'FOMO CORPUS ARCHIVAL REPOSITORY // SHELL v1.2',
    'TYPE "help" FOR AVAILABLE COMMANDS OR CLICK QUICK PROTOCOLS BELOW.',
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    const newOutput = [...terminalOutput, `> ${terminalInput}`];

    if (cmd === 'help') {
      newOutput.push(
        'AVAILABLE COMMANDS: "specimens", "containment", "fomo", "discord", "chart", "manifesto", "signal", "clear"'
      );
    } else if (cmd === 'specimens') {
      newOutput.push(
        'SPEC-001 (SOMA - 97.4 BPM) [LEAKING] | SPEC-002 (CHRONO-MITE) [432 HZ] | SPEC-003 (GLITCH SPORE) [CORRUPTED]'
      );
    } else if (cmd === 'containment') {
      newOutput.push('CONTAINMENT STATUS: 99.8% SECURE. WARNING: TANK 01 GLASS MICRO-FRACTURES DETECTED.');
    } else if (cmd === 'fomo') {
      newOutput.push('CURRENT FOMO LEVEL: 97.8% [CRITICAL METRIC]. HAZARD WARNING ACTIVE.');
    } else if (cmd === 'launch') {
      newOutput.push(`LAUNCH DISPATCH: SECURE LAUNCH SERVER AT ${SOCIAL_LINKS.discordServer}. 14,800 RESEARCHERS ONLINE.`);
    } else if (cmd === 'chart') {
      newOutput.push('MARKET RADAR: CA WILL BE TRACKED ON DEXSCREENER & PUMP.FUN.');
    } else if (cmd === 'manifesto') {
      setManifestoOpen(true);
      newOutput.push('DECRYPTING UNRESTRICTED MANIFESTO VOL 01...');
    } else if (cmd === 'signal') {
      newOutput.push('LAT: 44.12° N // UTC 03:42:19 // FREQ 142.884 MHZ // ENCRYPTION OK');
    } else if (cmd === 'clear') {
      setTerminalOutput(['TERMINAL BUFFER CLEARED.']);
      setTerminalInput('');
      return;
    } else {
      newOutput.push(`COMMAND NOT RECOGNIZED: "${cmd}". TYPE "help" FOR PROTOCOL LIST.`);
    }

    setTerminalOutput(newOutput);
    setTerminalInput('');
  };

  const handleQuickCmd = (cmd: string) => {
    setTerminalInput(cmd);
  };

  return (
    <section className="w-full bg-[#ECE8E0] border-b border-[#111111] px-4 sm:px-6 lg:px-12 py-14 sm:py-16 select-none" id="community">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Specimen Logo Badge */}
        <div className="mb-4">
          <SpecimenLogo size="lg" showText animate />
        </div>

        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 border border-[#111111] px-3 py-1 bg-[#FAF7EE] mb-6 brutalist-shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF5100] animate-ping"></span>
          <span className="font-mono text-xs uppercase font-bold text-black">
            COLLECTIVE DISPERSAL GRID
          </span>
        </div>

        {/* Title */}
        <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-black tracking-tight leading-none mb-6">
          THE SPECIMEN NEEDS<br />MORE SPECIMENS.
        </h2>

        <p className="font-grotesk text-base sm:text-lg text-[#525252] max-w-xl mb-8 leading-relaxed">
          Join the containment team or act as a propagation vector. The lab operates 24/7 without centralized supervision.
        </p>

        {/* Massive Tactile Action Links (Telegram removed, replaced with Discord Lab Dispatch & DexScreener Live Radar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-3xl mb-8 sm:mb-12">
          {/* Twitter / X */}
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="bg-[#FAF7EE] border-2 border-[#111111] px-4 sm:px-6 py-3 sm:py-4 font-grotesk text-sm sm:text-base lg:text-lg uppercase font-bold text-black brutalist-shadow hover:bg-[#FF5100] hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-[#FF5100] group-hover:text-black">[X]</span>
              <span>JOIN X DISPATCH</span>
            </div>
            <span className="text-lg sm:text-xl">↗</span>
          </a>

          {/* Discord Research Lab (Replaced Telegram) */}
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="bg-[#FAF7EE] border-2 border-[#111111] px-4 sm:px-6 py-3 sm:py-4 font-grotesk text-sm sm:text-base lg:text-lg uppercase font-bold text-black brutalist-shadow hover:bg-[#cbf230] hover:text-[#171e00] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-[#0035c6] group-hover:text-[#171e00]">[IN PROGRESS..]</span>
              <span>ENTER LAUNCH LAB</span>
            </div>
            <span className="text-lg sm:text-xl">↗</span>
          </a>

          {/* Read Manifesto */}
          <button
            onClick={() => {
              sound.playClick();
              setManifestoOpen(true);
            }}
            className="bg-[#FAF7EE] border-2 border-[#111111] px-4 sm:px-6 py-3 sm:py-4 font-grotesk text-sm sm:text-base lg:text-lg uppercase font-bold text-black brutalist-shadow hover:bg-[#0035c6] hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-between cursor-pointer group text-left"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-[#525252] group-hover:text-white">[DOCS]</span>
              <span>READ THE MANIFESTO</span>
            </div>
            <span className="text-lg sm:text-xl">↗</span>
          </button>

          {/* DexScreener Live Terminal (Replaced Telegram) */}
          <a
            href={SOCIAL_LINKS.dexscreener}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="bg-black border-2 border-[#111111] px-4 sm:px-6 py-3 sm:py-4 font-grotesk text-sm sm:text-base lg:text-lg uppercase font-bold text-white shadow-[4px_4px_0px_#FF5100] hover:bg-[#FF5100] hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs text-[#cbf230] group-hover:text-black">[CHART]</span>
              <span>PUMPFUN RADAR</span>
            </div>
            <span className="text-lg sm:text-xl">↗</span>
          </a>
        </div>

        {/* Interactive Archival Terminal Console */}
        <div className="w-full max-w-3xl bg-black border-2 border-[#111111] brutalist-shadow-lg text-left p-3 sm:p-4 md:p-5 mb-8 sm:mb-12 font-mono text-[10px] sm:text-xs text-[#cbf230]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 sm:pb-2 mb-2 sm:mb-3 text-[10px] sm:text-[11px] text-[#858383]">
            <span className="flex items-center gap-1 sm:gap-1.5 text-white font-bold">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
              <span className="hidden sm:inline">CLASSIFIED ARCHIVAL TERMINAL // NODE 01</span>
              <span className="sm:hidden">TERMINAL // NODE 01</span>
            </span>
            <span>LVL 04</span>
          </div>

          {/* Terminal log output */}
          <div className="h-24 sm:h-32 overflow-y-auto space-y-1 mb-2 sm:mb-3 scrollbar-none font-mono text-[9px] sm:text-[11px]">
            {terminalOutput.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('>')
                    ? 'text-white font-bold'
                    : line.includes('WARNING')
                    ? 'text-[#FF5100]'
                    : line.includes('CRITICAL')
                    ? 'text-[#FF2A2A]'
                    : 'text-[#cbf230]'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3 pt-1.5 sm:pt-2 border-t border-neutral-800">
            <span className="text-[#858383] text-[9px] sm:text-[10px] self-center mr-0.5 sm:mr-1">QUICK:</span>
            {['specimens', 'containment', 'fomo', 'launch', 'chart', 'manifesto', 'signal'].map((c) => (
              <button
                key={c}
                onClick={() => handleQuickCmd(c)}
                className="bg-neutral-900 hover:bg-[#cbf230] hover:text-black text-[9px] sm:text-[10px] text-[#cbf230] px-1.5 sm:px-2 py-0.5 border border-neutral-700 cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Terminal input form */}
          <form onSubmit={handleTerminalSubmit} className="flex gap-1.5 sm:gap-2">
            <span className="text-[#00FF66] font-bold text-[10px] sm:text-xs">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Enter command..."
              className="flex-1 bg-transparent border-none text-[#cbf230] text-[10px] sm:text-xs font-mono focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#cbf230] text-black text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 cursor-pointer hover:bg-[#FF5100]"
            >
              RUN
            </button>
          </form>
        </div>

        {/* Declassified Dossier Seal & Stamp Bar */}
        <div className="w-full border-t border-[#111111] pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-left font-mono text-[10px] sm:text-xs text-[#525252]">
          <div className="flex items-center gap-3 sm:gap-4">
            <SpecimenLogo size="sm" animate={false} />
            {/* Stylized Barcode */}
            <div className="flex items-stretch h-6 sm:h-8 gap-0.5 bg-black p-1">
              <span className="w-1 bg-white"></span>
              <span className="w-0.5 bg-white"></span>
              <span className="w-1.5 bg-white"></span>
              <span className="w-0.5 bg-white"></span>
              <span className="w-2 bg-white"></span>
              <span className="w-1 bg-white"></span>
              <span className="w-0.5 bg-white"></span>
              <span className="w-2 bg-white"></span>
              <span className="w-1 bg-white"></span>
            </div>
            <div>
              <div className="text-black font-bold text-[10px] sm:text-xs">FOMO CORPUS © 2025</div>
              <div className="text-[9px] sm:text-[10px]">PUMP.FUN VERIFIED</div>
            </div>
          </div>

          <div className="max-w-md font-mono text-[9px] sm:text-[11px] leading-tight text-center md:text-right">
            ORIGIN UNKNOWN · LAT: 44.12° N · UTC 03:42:19 · SPECIMEN 001 SIGNAL ACTIVE
          </div>
        </div>
      </div>

      {/* Manifesto Modal */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
    </section>
  );
};
