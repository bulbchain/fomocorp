import React, { useState, useEffect } from 'react';

export const LiveTelemetryStrip: React.FC = () => {
  const [pulse, setPulse] = useState(97);
  const [chaosMultiplier, setChaosMultiplier] = useState(4.8);

  useEffect(() => {
    const interval = setInterval(() => {
      // Gentle jitter around 97%
      const jitter = Math.floor(Math.random() * 5) - 2;
      setPulse(Math.min(99, Math.max(94, 97 + jitter)));
      setChaosMultiplier(Number((4.8 + (Math.random() * 0.2 - 0.1)).toFixed(2)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-black text-white border-b border-[#111111] py-3 px-4 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="text-[#FF5100] font-bold">SUBJECT →</span>
          <span className="text-[#cbf230] font-bold">001 (SOMA)</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[#858383]">STATUS →</span>
          <span className="text-[#FF2A2A] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-pulse"></span>
            ACTIVE / UNSTABLE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#858383]">FOMO PULSE →</span>
          <div className="w-20 bg-neutral-800 h-3 border border-white/20 relative overflow-hidden">
            <div
              style={{ width: `${pulse}%` }}
              className="h-full bg-[#cbf230] transition-all duration-500 animate-pulse"
            ></div>
          </div>
          <span className="text-[#cbf230] font-bold tabular-nums">{pulse}%</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-[#858383]">CHAOS FACTOR →</span>
          <span className="text-[#FF5100] font-bold tabular-nums">{chaosMultiplier}X</span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[#858383]">SIGNAL →</span>
          <span className="text-white tracking-widest">[DETECTION CONFIRMED]</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#858383]">EXTRACTED →</span>
          <span className="text-[#cbf230] font-bold">00∞ SPECIMENS</span>
        </div>
      </div>
    </section>
  );
};
