import React, { useState } from 'react';
import { sound } from '../utils/audio';

export const NeuralSensorSection: React.FC = () => {
  const [fomoValue, setFomoValue] = useState<number>(88);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setFomoValue(val);
    sound.playSensorPulse(val);
  };

  const getDiagnostic = (val: number) => {
    if (val < 25) {
      return {
        verdict: '"YOU CAN STILL LEAVE."',
        color: '#111111',
        borderClass: 'border-[#111111]',
        textColor: 'text-white',
        highlightColor: 'text-[#cbf230]',
        glitch: false,
      };
    } else if (val < 65) {
      return {
        verdict: '"YOU PROBABLY SHOULDN\'T."',
        color: '#FF5100',
        borderClass: 'border-[#FF5100]',
        textColor: 'text-white',
        highlightColor: 'text-[#FF5100]',
        glitch: false,
      };
    } else if (val < 90) {
      return {
        verdict: '"TOO LATE. SYMPTOMS PERMANENT."',
        color: '#cbf230',
        borderClass: 'border-[#cbf230]',
        textColor: 'text-white',
        highlightColor: 'text-[#cbf230]',
        glitch: false,
      };
    } else {
      return {
        verdict: '"ABSOLUTE COGNITIVE CONTAMINATION!"',
        color: '#FF2A2A',
        borderClass: 'border-[#FF2A2A]',
        textColor: 'text-[#FF2A2A]',
        highlightColor: 'text-[#FF2A2A]',
        glitch: true,
      };
    }
  };

  const diag = getDiagnostic(fomoValue);

  return (
    <section className="w-full border-b border-[#111111] bg-[#F1EDE5] px-4 sm:px-6 lg:px-12 py-14 sm:py-16" id="sensor">
      <div className="max-w-4xl mx-auto border-2 border-[#111111] bg-[#FAF7EE] p-6 sm:p-10 brutalist-shadow-xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#111111] pb-4 mb-6 gap-2">
          <div>
            <span className="font-mono text-xs text-[#FF5100] uppercase font-bold tracking-widest block">
              LIVE SENSOR APPARATUS
            </span>
            <h2 className="font-syne text-2xl sm:text-3xl uppercase text-black font-extrabold tracking-tight">
              CURRENT FOMO LEVEL · NEURAL SENSOR
            </h2>
          </div>
          <div className="font-mono text-[#525252] text-xs">
            CALIBRATION: SENSOR #42
          </div>
        </div>

        {/* Meter Visual Container */}
        <div className="mb-8">
          <div className="flex justify-between font-mono text-xs uppercase font-bold text-black mb-2">
            <span>LOW</span>
            <span>CURIOUS</span>
            <span>UNSTABLE</span>
            <span className="text-[#FF2A2A]">ABSOLUTE FOMO</span>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative w-full py-4">
            <input
              type="range"
              min="1"
              max="100"
              value={fomoValue}
              onChange={handleSliderChange}
              className="w-full h-5 bg-[#ECE8E0] border-2 border-[#111111] appearance-none cursor-ew-resize accent-[#FF5100]"
            />
          </div>

          {/* Ruler Ticks */}
          <div className="flex justify-between text-[#525252] font-mono text-[11px] select-none px-1">
            <span>| 00</span>
            <span>| 25</span>
            <span>| 50</span>
            <span>| 75</span>
            <span>| 100 MAX</span>
          </div>
        </div>

        {/* Reactive Dynamic Status Alert Box */}
        <div
          className={`bg-black text-[#cbf230] border-2 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
            diag.borderClass
          } ${diag.glitch ? 'animate-pulse' : ''}`}
        >
          <div>
            <div className="font-mono text-xs text-[#858383] uppercase">
              SYSTEM DIAGNOSTIC:
            </div>
            <div
              className={`font-syne text-lg sm:text-2xl uppercase font-bold tracking-tight mt-1 ${diag.textColor}`}
            >
              {diag.verdict}
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="font-mono text-xs text-[#858383] uppercase">
              READOUT SCORE
            </div>
            <div
              className={`font-mono text-2xl sm:text-3xl font-bold tabular-nums ${diag.highlightColor}`}
            >
              {fomoValue}.0%
            </div>
          </div>
        </div>

        <div className="mt-4 text-center font-mono text-xs text-[#525252] uppercase">
          * NOTE: ADJUSTING THE DIAL TRANSMITS SIMULATED REWARD PULSES ACROSS THE CORPUS MESH.
        </div>
      </div>
    </section>
  );
};
