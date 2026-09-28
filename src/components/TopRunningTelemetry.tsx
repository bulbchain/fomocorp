import React, { useState, useEffect } from 'react';

export const TopRunningTelemetry: React.FC = () => {
  const [clockString, setClockString] = useState('03:42:19.98');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const ms = Math.floor(now.getMilliseconds() / 10);
      const msPad = ms < 10 ? `0${ms}` : `${ms}`;
      setClockString(`ARCHIVE CLK: ${now.toTimeString().split(' ')[0]}.${msPad}`);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#ECE8E0] text-[#525252] border-b border-[#111111] py-1 px-4 lg:px-8 font-mono text-[10px] sm:text-xs flex flex-wrap items-center justify-between gap-3 tracking-widest uppercase select-none">
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-1.5 text-[#FF2A2A] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A2A] animate-ping"></span>
          SUBJECT 001 · SIGNAL DETECTED
        </span>
        <span className="hidden sm:inline">LOC: SECTOR-7B // CONTAINMENT TANK 01</span>
        <span className="hidden md:inline">FREQ: 142.884 MHZ</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-black">{clockString}</span>
        <span className="bg-black text-white px-1.5 py-0.5 text-[9px] font-bold">
          CLEARANCE: SIGMA
        </span>
      </div>
    </div>
  );
};
