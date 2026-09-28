import React from 'react';
import logoimage from '../asset/logo.png';

interface SpecimenLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export const SpecimenLogo: React.FC<SpecimenLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
  animate = true,
}) => {
  const dimensions = {
    sm: { box: 'w-7 h-7', img: 'w-5 h-5', text: 'text-xs' },
    md: { box: 'w-9 h-9', img: 'w-7 h-7', text: 'text-sm' },
    lg: { box: 'w-12 h-12', img: 'w-9 h-9', text: 'text-base' },
    xl: { box: 'w-16 h-16', img: 'w-12 h-12', text: 'text-lg' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Specimen Emblem Container */}
      <div
        className={`relative ${dimensions.box} bg-[#FAF7EE] border-2 border-[#111111] brutalist-shadow-sm flex items-center justify-center overflow-visible group shrink-0`}
      >
        {/* Antenna Light Bulb (Pulsing glowing orb) */}
        <span
          className={`absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-[#cbf230] border border-[#111111] shadow-[0_0_8px_#cbf230] z-20 ${
            animate ? 'animate-pulse' : ''
          }`}
        ></span>

        {/* Specimen Silhouette / Mascot graphic */}
        <img
         // src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWJdrmly_8Pf7BSidH_UsACNZmQA8KntHGKjgB6lz1BeOVltx0MF6HqYxoHdpRl8duQoApRPRMrtqEl37VUV07ygsexKWNu-7_4qiTzf7fZOdRJdtyTr3cMSTUIRa42PpmhgluD8D8d6zMVuoPE97K0feClxtx_jgpr59Ut31N9U6eiGRxgP7eCLnmFMQZyIjxiV6LuluaVa_OBUoC-7dyNVY9TCjalExbvOd-iN8eJP9Tso6jPQQS"
         src={logoimage} 
         alt="FOMO Corpus Specimen Emblem"
          className={`${dimensions.img} object-contain transition-transform duration-200 group-hover:scale-110 pointer-events-none filter drop-shadow-sm`}
        />

        {/* Tactical Crosshair registration mark */}
        <span className="absolute bottom-0.5 left-0.5 text-[8px] font-mono font-black text-black leading-none pointer-events-none">
          +
        </span>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-syne font-extrabold uppercase tracking-tight text-black leading-none ${dimensions.text}`}>
            FOMO CORPUS
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF5100] font-bold">
            SPECIMEN: 001
          </span>
        </div>
      )}
    </div>
  );
};
