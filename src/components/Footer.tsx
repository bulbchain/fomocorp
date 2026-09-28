import React from 'react';
import { SpecimenLogo } from './SpecimenLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F1EDE5] border-t border-[#111111] py-8 px-4 lg:px-8 relative z-20 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#525252]">
        <div className="flex items-center gap-3">
          <SpecimenLogo size="md" animate={false} />
          <div>
            <div className="font-syne text-lg uppercase text-black font-extrabold mb-0.5 tracking-tight">
              FOMO CORPUS // ARCHIVAL DIVISION
            </div>
            <p className="font-grotesk text-xs">
              CLASSIFIED SPECIMEN REPOSITORY &amp; ACCELERATED GENETIC RECONFIGURATION FACILITY.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 border border-[#111111] p-2 bg-[#FAF7EE] text-[11px] brutalist-shadow-sm">
          <span className="text-[#FF2A2A] font-bold">SEC-LEVEL: UNRESTRICTED</span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span>INDEX_HASH: #008892-ALPHA</span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span>© 2025 FOMO CORPUS. ALL PHENOMENA REGISTERED.</span>
        </div>
      </div>
    </footer>
  );
};
