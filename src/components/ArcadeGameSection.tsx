import React, { useState } from 'react';
import { GameDifficulty, RunnerCharacter } from '../types';
import { ArcadeGameCanvas } from './ArcadeGameCanvas';
import { SpecimenLogo } from './SpecimenLogo';
import { sound } from '../utils/audio';

interface ArcadeGameSectionProps {
  onScoreUpdated?: (score: number, mult: number) => void;
}

export const ArcadeGameSection: React.FC<ArcadeGameSectionProps> = ({
  onScoreUpdated,
}) => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>('UNSTABLE');
  const [selectedCharacter, setSelectedCharacter] = useState<RunnerCharacter>('ALPHA');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicActive, setMusicActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [latestScore, setLatestScore] = useState(0);
  const [chaosMult, setChaosMult] = useState(4);

  const handleToggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const handleToggleMusic = () => {
    const next = sound.toggleMusic();
    setMusicActive(next);
  };

  const handleScoreUpdate = (score: number, mult: number) => {
    setLatestScore(score);
    setChaosMult(mult);
    if (onScoreUpdated) onScoreUpdated(score, mult);
  };

  return (
    <section className="w-full border-b border-[#111111] bg-[#F7F3EB] px-4 sm:px-6 lg:px-12 py-14 sm:py-16" id="simulator">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#111111] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <SpecimenLogo size="md" animate />
            <div>
              <div className="font-mono text-xs uppercase text-[#FF5100] font-bold tracking-widest">
                INTERACTIVE TERMINAL // RUNNER-01
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-black tracking-tight leading-none">
                THE EXPERIMENT IS PLAYABLE.
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-[#F1EDE5] border border-[#111111] font-mono text-[10px] sm:text-xs uppercase">
              ENGINE: 2.5D CANVAS
            </span>
            <span className="px-2 py-1 bg-[#cbf230] text-[#171e00] font-mono text-[10px] sm:text-xs uppercase font-bold">
              STATE: LOADED
            </span>
          </div>
        </div>

        {/* Simulator Frame: Styled like an antique CRT containment screen */}
        <div className={`w-full bg-black border-2 border-[#111111] brutalist-shadow-xl overflow-hidden flex flex-col transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 max-h-none h-screen w-screen flex flex-col justify-between p-2 sm:p-6 bg-black/95 backdrop-blur-md' : ''
        }`}>
          {/* CRT Top Bezel Status Bar */}
          <div className="w-full bg-[#ECE8E0] border-b border-[#111111] px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-between text-black font-mono text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <SpecimenLogo size="sm" animate={false} />
              <span className="font-bold tracking-wider text-[10px] sm:text-xs hidden sm:inline">FOMO LABS // BIOS SIMULATOR v0.94</span>
              <span className="font-bold tracking-wider text-[10px] sm:hidden">FOMO LABS</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
              <span className="hidden sm:inline">RES: 960x540</span>
              <span>FPS: 60.0</span>
              <span className="text-[#0035c6] font-bold hidden sm:inline">PROTOCOL: OK</span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hover:text-[#FF5100] font-bold cursor-pointer underline text-[10px] sm:text-xs bg-[#FAF7EE] px-2 py-0.5 border border-[#111111]"
              >
                {isFullscreen ? '[EXIT FULLSCREEN]' : '[FULLSCREEN]'}
              </button>
            </div>
          </div>

          {/* Central Playable Viewport Container */}
          <div className="flex-1 flex items-center justify-center overflow-hidden w-full">
            <ArcadeGameCanvas
              difficulty={difficulty}
              soundEnabled={soundEnabled}
              musicEnabled={musicActive}
              isFullscreen={isFullscreen}
              selectedCharacter={selectedCharacter}
              onCharacterChange={setSelectedCharacter}
              onGameOver={(_score, _high) => {}}
              onScoreUpdate={handleScoreUpdate}
            />
          </div>

          {/* Simulator Lower Control Console */}
          <div className="w-full bg-[#F1EDE5] border-t border-[#111111] p-2 sm:p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs">
            {/* Runner Specimen Character Selection */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
              <span className="text-[#525252] font-bold uppercase text-[10px] sm:text-[11px]">
                RUNNER:
              </span>
              {(['ALPHA', 'SOMA', 'CHRONO'] as RunnerCharacter[]).map((char) => (
                <button
                  key={char}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCharacter(char);
                  }}
                  className={`px-1.5 sm:px-2.5 py-1 border border-[#111111] text-[10px] sm:text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-0.5 sm:gap-1.5 ${
                    selectedCharacter === char
                      ? 'bg-black text-white'
                      : 'bg-[#FAF7EE] text-black hover:bg-[#cbf230]'
                  }`}
                >
                  <span>{char}</span>
                  {char === 'ALPHA' && <span className="text-[8px] sm:text-[9px] opacity-75 hidden sm:inline">(Sci)</span>}
                  {char === 'SOMA' && <span className="text-[8px] sm:text-[9px] text-[#cbf230] font-extrabold hidden sm:inline">(Blob)</span>}
                  {char === 'CHRONO' && <span className="text-[8px] sm:text-[9px] text-[#FF5100] font-extrabold hidden sm:inline">(+1)</span>}
                </button>
              ))}
            </div>

            {/* Difficulty selector buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <span className="text-[#525252] font-bold uppercase text-[10px] sm:text-[11px]">
                DIFF:
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setDifficulty('EASY');
                }}
                className={`px-1.5 sm:px-2.5 py-1 border border-[#111111] text-[10px] sm:text-[11px] font-bold cursor-pointer transition-colors ${
                  difficulty === 'EASY'
                    ? 'bg-black text-white'
                    : 'bg-[#FAF7EE] text-black hover:bg-[#cbf230]'
                }`}
              >
                EASY
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setDifficulty('UNSTABLE');
                }}
                className={`px-1.5 sm:px-2.5 py-1 border border-[#111111] text-[10px] sm:text-[11px] font-bold cursor-pointer transition-colors ${
                  difficulty === 'UNSTABLE'
                    ? 'bg-black text-white'
                    : 'bg-[#FAF7EE] text-black hover:bg-[#cbf230]'
                }`}
              >
                HARD
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setDifficulty('CHAOS99');
                }}
                className={`px-1.5 sm:px-2.5 py-1 border border-[#111111] text-[10px] sm:text-[11px] font-bold cursor-pointer transition-colors ${
                  difficulty === 'CHAOS99'
                    ? 'bg-[#FF2A2A] text-white'
                    : 'bg-[#FAF7EE] text-black hover:bg-[#FF2A2A] hover:text-white'
                }`}
              >
                CHAOS
              </button>
            </div>

            {/* Audio & Soundtrack Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleToggleSound}
                className="px-1.5 sm:px-2 py-1 border border-[#111111] bg-[#FAF7EE] hover:bg-black hover:text-white transition-colors cursor-pointer text-[10px] sm:text-[11px] font-bold"
              >
                SFX: {soundEnabled ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={handleToggleMusic}
                className={`px-1.5 sm:px-2 py-1 border border-[#111111] transition-colors cursor-pointer text-[10px] sm:text-[11px] font-bold flex items-center gap-1 sm:gap-1.5 ${
                  musicActive
                    ? 'bg-[#cbf230] text-[#171e00]'
                    : 'bg-[#FAF7EE] text-black hover:bg-[#cbf230]'
                }`}
              >
                <span className="hidden sm:inline">BASS: {musicActive ? 'ON' : 'OFF'}</span>
                <span className="sm:hidden">{musicActive ? '♫' : '♫'}</span>
                {musicActive && (
                  <div className="flex items-end gap-0.5 h-2 sm:h-3">
                    <span className="w-0.5 sm:w-1 bg-black h-1.5 sm:h-2 animate-bounce"></span>
                    <span className="w-0.5 sm:w-1 bg-black h-2 sm:h-3 animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-0.5 sm:w-1 bg-black h-1 sm:h-1.5 animate-bounce [animation-delay:0.2s]"></span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};