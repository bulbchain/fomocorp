import React from 'react';

export const MarqueeStrip: React.FC = () => {
  return (
    <div className="w-full border-b border-[#111111] overflow-hidden bg-[#ECE8E0] py-2 relative flex flex-col gap-1 select-none">
      {/* Marquee 1 (Leftwards) */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee-left flex items-center font-grotesk text-sm sm:text-base uppercase tracking-tighter text-black font-bold">
          <span className="mr-8">FOMO ◆ CURIOUS ◆ CHAOTIC ◆ ONLINE ◆ UNFINISHED ◆ IRREVERSIBLE MUTATION ◆ SPECIMEN ACTIVE ◆</span>
          <span className="mr-8">FOMO ◆ CURIOUS ◆ CHAOTIC ◆ ONLINE ◆ UNFINISHED ◆ IRREVERSIBLE MUTATION ◆ SPECIMEN ACTIVE ◆</span>
          <span className="mr-8">FOMO ◆ CURIOUS ◆ CHAOTIC ◆ ONLINE ◆ UNFINISHED ◆ IRREVERSIBLE MUTATION ◆ SPECIMEN ACTIVE ◆</span>
          <span className="mr-8">FOMO ◆ CURIOUS ◆ CHAOTIC ◆ ONLINE ◆ UNFINISHED ◆ IRREVERSIBLE MUTATION ◆ SPECIMEN ACTIVE ◆</span>
        </div>
      </div>

      {/* Marquee 2 (Rightwards, Inverted accent strip) */}
      <div className="bg-black text-[#cbf230] py-1 flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee-right flex items-center font-mono text-xs uppercase tracking-widest font-bold">
          <span className="mr-8">SIGNAL FOUND → SUBJECT ACTIVE → SPECIMEN ONLINE → DO NOT REFRESH → FIELD RECORD 001 → CELLULAR DRIFT DETECTED →</span>
          <span className="mr-8">SIGNAL FOUND → SUBJECT ACTIVE → SPECIMEN ONLINE → DO NOT REFRESH → FIELD RECORD 001 → CELLULAR DRIFT DETECTED →</span>
          <span className="mr-8">SIGNAL FOUND → SUBJECT ACTIVE → SPECIMEN ONLINE → DO NOT REFRESH → FIELD RECORD 001 → CELLULAR DRIFT DETECTED →</span>
          <span className="mr-8">SIGNAL FOUND → SUBJECT ACTIVE → SPECIMEN ONLINE → DO NOT REFRESH → FIELD RECORD 001 → CELLULAR DRIFT DETECTED →</span>
        </div>
      </div>
    </div>
  );
};
