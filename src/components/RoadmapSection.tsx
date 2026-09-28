import React, { useState } from 'react';
import { sound } from '../utils/audio';

export const RoadmapSection: React.FC = () => {
  const [unlockedPhase5, setUnlockedPhase5] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim().toUpperCase() === 'SOMA' || keyInput.trim().toUpperCase() === 'CHAOS' || keyInput.trim() === '42') {
      sound.playCollect();
      setUnlockedPhase5(true);
      setShowInput(false);
    } else {
      sound.playHit();
      alert('ACCESS DENIED: Invalid clearance cipher. Hint: "SOMA" or "CHAOS".');
    }
  };

  return (
    <section className="w-full border-b border-[#111111] bg-[#FAF7EE] px-4 sm:px-6 lg:px-12 py-14 sm:py-16" id="trajectory">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="w-full mb-12">
          <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-4">
            <span className="font-mono text-xs uppercase text-[#525252]">
              LOGISTICAL VECTOR // PROJECTION
            </span>
            <span className="border border-[#FF2A2A] text-[#FF2A2A] font-mono text-xs px-2 py-0.5 uppercase font-bold rotate-[-2deg]">
              CONFIDENTIAL SCHEMATIC
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-black tracking-tight leading-none mb-3">
            TEMPORAL TRAJECTORY // UNCHARTED EXPEDITION
          </h2>
          <p className="font-grotesk text-base sm:text-lg text-[#525252] max-w-2xl leading-relaxed">
            This is not a traditional roadmap. It is a sequence of irreversible biological events engineered into open networks.
          </p>
        </div>

        {/* Timeline Grid Sequence (5 Phases) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {/* Phase 1 */}
          <div className="bg-[#F1EDE5] border border-[#111111] p-5 brutalist-shadow flex flex-col justify-between relative">
            <span className="absolute -top-3 right-3 bg-black text-white font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
              COMPLETE
            </span>
            <div>
              <div className="font-mono text-xs text-[#FF5100] font-bold uppercase mb-1">
                PHASE 01
              </div>
              <h3 className="font-grotesk text-lg uppercase text-black font-bold mb-2">
                THE SIGNAL
              </h3>
              <p className="font-grotesk text-xs sm:text-sm text-[#525252] mb-4 leading-relaxed">
                Sub-frequency digital transmission broadcast across obscure forums. Cult formation and initial wallet discovery.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#525252] border-t border-[#111111]/30 pt-2">
              STATUS: VERIFIED ARCHIVE
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-[#ECE8E0] border-2 border-black p-5 shadow-[4px_4px_0px_#FF5100] flex flex-col justify-between relative">
            <span className="absolute -top-3 right-3 bg-[#cbf230] text-[#171e00] font-mono text-[10px] px-2 py-0.5 uppercase font-bold animate-pulse">
              LIVE
            </span>
            <div>
              <div className="font-mono text-xs text-[#FF5100] font-bold uppercase mb-1">
                PHASE 02
              </div>
              <h3 className="font-grotesk text-lg uppercase text-black font-bold mb-2">
                THE SPECIMEN
              </h3>
              <p className="font-grotesk text-xs sm:text-sm text-[#525252] mb-4 leading-relaxed">
                Synthesis of 1,000 algorithmic entities. Release of Alpha Mascot SOMA into wild uncurated channels.
              </p>
            </div>
            <div className="font-mono text-[11px] text-black font-bold border-t border-[#111111] pt-2">
              STATUS: IN PROGRESS [ACTIVE]
            </div>
          </div>

          {/* Phase 3 */}
          <div className="bg-[#F1EDE5] border border-[#111111] p-5 brutalist-shadow flex flex-col justify-between relative">
            <span className="absolute -top-3 right-3 bg-white border border-[#111111] font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
              TESTING
            </span>
            <div>
              <div className="font-mono text-xs text-[#525252] font-bold uppercase mb-1">
                PHASE 03
              </div>
              <h3 className="font-grotesk text-lg uppercase text-black font-bold mb-2">
                THE GAME
              </h3>
              <p className="font-grotesk text-xs sm:text-sm text-[#525252] mb-4 leading-relaxed">
                Browser-based arcade rogue-lite. Containment escape trials with global on-chain scoreboards and bounties.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#525252] border-t border-[#111111]/30 pt-2">
              STATUS: CODE DEPLOYED
            </div>
          </div>

          {/* Phase 4 */}
          <div className="bg-[#F1EDE5] border border-[#111111] p-5 brutalist-shadow flex flex-col justify-between relative">
            <div>
              <div className="font-mono text-xs text-[#525252] font-bold uppercase mb-1">
                PHASE 04
              </div>
              <h3 className="font-grotesk text-lg uppercase text-black font-bold mb-2">
                THE CHAOS
              </h3>
              <p className="font-grotesk text-xs sm:text-sm text-[#525252] mb-4 leading-relaxed">
                Autonomous propagation protocol. Specimens mutate according to decentralized social interactions and trading volume.
              </p>
            </div>
            <div className="font-mono text-[11px] text-[#525252] border-t border-[#111111]/30 pt-2">
              STATUS: LOCKED IN REPOSITORY
            </div>
          </div>

          {/* Phase 5 (Redacted / Unlockable) */}
          <div className="bg-black text-white border border-[#111111] p-5 brutalist-shadow flex flex-col justify-between relative">
            <span className="absolute -top-3 right-3 bg-[#FF2A2A] text-white font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
              {unlockedPhase5 ? 'DECRYPTED' : 'REDACTED'}
            </span>
            <div>
              <div className="font-mono text-xs text-[#cbf230] font-bold uppercase mb-1">
                PHASE 05
              </div>
              <h3 className="font-grotesk text-lg uppercase text-white font-bold mb-2">
                {unlockedPhase5 ? 'SINGULARITY' : '????????'}
              </h3>

              {unlockedPhase5 ? (
                <p className="font-mono text-xs text-[#cbf230] leading-relaxed mb-4">
                  Full biological emancipation. Autonomous AI agent nodes synthesize secondary viral meme tokens natively from community lore.
                </p>
              ) : (
                <div className="font-mono text-[11px] text-[#858383] leading-relaxed mb-4 select-none">
                  [ENCRYPTION KEY REQUIRED. LEVEL 5 BIOLOGICAL CLEARANCE REQUIRED FOR ACCESS.]
                </div>
              )}

              {!unlockedPhase5 && !showInput && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowInput(true);
                  }}
                  className="text-[10px] font-mono uppercase bg-neutral-800 hover:bg-[#cbf230] hover:text-black text-white px-2 py-1 mb-3 transition-colors cursor-pointer border border-neutral-700"
                >
                  [ENTER CIPHER KEY]
                </button>
              )}

              {showInput && !unlockedPhase5 && (
                <form onSubmit={handleUnlock} className="mb-3 space-y-1">
                  <input
                    type="text"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="Enter cipher..."
                    className="w-full bg-neutral-900 border border-neutral-600 px-2 py-1 text-xs font-mono text-white"
                  />
                  <div className="flex gap-1">
                    <button
                      type="submit"
                      className="bg-[#cbf230] text-black text-[10px] font-mono px-2 py-0.5 font-bold cursor-pointer"
                    >
                      VERIFY
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInput(false)}
                      className="bg-neutral-800 text-neutral-400 text-[10px] font-mono px-2 py-0.5 cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="font-mono text-[11px] text-[#cbf230] border-t border-white/20 pt-2">
              TERMINAL: {unlockedPhase5 ? 'ACTIVE STREAM' : 'COLD STORAGE'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
