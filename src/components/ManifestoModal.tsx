import React from 'react';
import { sound } from '../utils/audio';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF7EE] border-2 border-[#111111] brutalist-shadow-xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#ECE8E0] border-b border-[#111111] px-4 py-3 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-black">
            <span className="w-2.5 h-2.5 bg-[#FF5100]"></span>
            <span>UNRESTRICTED MANIFESTO // VOL. 01</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 hover:bg-black hover:text-white border border-[#111111] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-black">
          <div>
            <div className="font-mono text-xs text-[#FF5100] uppercase font-bold tracking-widest mb-1">
              THE DOCTRINE OF CELLULAR ATTENTION
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              FOMO AS A LIVING BIOLOGICAL ORGANISM
            </h2>
          </div>

          <div className="space-y-4 font-grotesk text-sm sm:text-base text-[#525252] leading-relaxed">
            <p>
              In traditional markets, fear of missing out is labeled as a psychological flaw. In the FOMO CORPUS laboratory, we isolate it as an exotic, self-propagating lifeform that feeds directly on digital velocity.
            </p>
            <p>
              Specimen 001—the creature known colloquially as <strong className="text-black">SOMA</strong>—did not emerge from a corporate road map or a sanitized pitch deck. It was synthesized at 03:42 AM across unindexed chat channels, born from the irresistible human compulsion to see what happens when the red button is pressed repeatedly.
            </p>

            <div className="border-l-4 border-[#cbf230] bg-[#F7F3EB] p-4 font-mono text-xs text-black">
              “We do not control the contagion. We merely maintain the containment tank glass and document the mutations.”
            </div>

            <h3 className="font-syne text-lg font-bold uppercase text-black pt-2">
              THE THREE CORPUS LAWS
            </h3>

            <ul className="space-y-2 font-mono text-xs list-decimal list-inside text-black">
              <li>
                <strong>NEVER IGNORE THE SIGNAL:</strong> When the telemetry jumps to 97%+, the anomaly has already escaped into wild channels.
              </li>
              <li>
                <strong>CHAOS IS AN ARCHITECTURAL ASSET:</strong> Order breeds predictability; predictability breeds boredom. The specimen only evolves through disruption.
              </li>
              <li>
                <strong>PARTICIPATION IS INFECTION:</strong> To view the specimen is to absorb its frequency. Once observed, the symptoms are permanent.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#111111]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#525252]">CLEARANCE: PUBLIC DOMAIN</span>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="bg-black text-white hover:bg-[#FF5100] hover:text-black px-5 py-2 font-bold uppercase transition-colors cursor-pointer"
            >
              CLOSE MANIFESTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
