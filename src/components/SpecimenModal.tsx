import React, { useState } from 'react';
import { Specimen } from '../types';
import { sound } from '../utils/audio';

interface SpecimenModalProps {
  specimen: Specimen | null;
  onClose: () => void;
}

export const SpecimenModal: React.FC<SpecimenModalProps> = ({
  specimen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'BIOMETRICS' | 'DNA' | 'LOGS'>('BIOMETRICS');
  const [decrypted, setDecrypted] = useState(false);
  const [decrypting, setDecrypting] = useState(false);

  if (!specimen) return null;

  const handleTestPulse = () => {
    sound.playSensorPulse(specimen.pulseBpm > 100 ? 95 : 60);
  };

  const handleDecrypt = () => {
    sound.playClick();
    setDecrypting(true);
    setTimeout(() => {
      setDecrypting(false);
      setDecrypted(true);
      sound.playCollect();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF7EE] border-2 border-[#111111] brutalist-shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#ECE8E0] border-b border-[#111111] px-4 py-3 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 bg-[#FF5100]"></span>
            <span>BIOMETRIC DOSSIER // {specimen.ref}</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 hover:bg-black hover:text-white border border-[#111111] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row gap-6 items-center border border-[#111111] p-4 bg-[#F7F3EB]">
            <div className="w-36 h-36 shrink-0 bg-[#F1EDE5] border border-[#111111] p-2 flex items-center justify-center relative overflow-hidden">
              {specimen.image ? (
                <img
                  src={specimen.image}
                  alt={specimen.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-center p-2 font-mono text-[10px] text-[#cbf230]">
                  <div className="w-8 h-8 rounded-full border border-dashed border-[#FF2A2A] animate-ping mb-2"></div>
                  <span>[UNMAPPED CODE]</span>
                </div>
              )}
              <span className="absolute bottom-1 right-1 font-mono text-[9px] bg-black text-white px-1">
                {specimen.rarity}
              </span>
            </div>

            <div className="flex-1 space-y-2 text-left">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: specimen.rarityBg, color: specimen.rarityColor }}
                  className="font-mono text-[10px] font-bold px-2 py-0.5 border border-[#111111]"
                >
                  {specimen.rarity}
                </span>
                <span className="font-mono text-xs text-[#525252]">
                  {specimen.classificationCode}
                </span>
              </div>
              <h3 className="font-syne text-xl font-bold uppercase text-black leading-tight">
                {specimen.name}
              </h3>
              <p className="font-grotesk text-xs text-[#525252]">
                {specimen.subtitle}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#111111] gap-2 font-mono text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('BIOMETRICS');
              }}
              className={`pb-2 px-3 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'BIOMETRICS'
                  ? 'border-black text-black'
                  : 'border-transparent text-[#525252] hover:text-black'
              }`}
            >
              BIOMETRIC VITALS
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('DNA');
              }}
              className={`pb-2 px-3 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'DNA'
                  ? 'border-black text-black'
                  : 'border-transparent text-[#525252] hover:text-black'
              }`}
            >
              DNA SEQUENCING
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('LOGS');
              }}
              className={`pb-2 px-3 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'LOGS'
                  ? 'border-black text-black'
                  : 'border-transparent text-[#525252] hover:text-black'
              }`}
            >
              CONTAINMENT LOG
            </button>
          </div>

          {/* Tab 1: Biometrics */}
          {activeTab === 'BIOMETRICS' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">PULSE FREQ</div>
                  <div className="font-bold text-black text-base flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF2A2A] animate-ping"></span>
                    {specimen.pulseBpm} BPM
                  </div>
                </div>

                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">CHAOS INDEX</div>
                  <div className="font-bold text-[#FF5100] text-base">
                    {specimen.chaosRating}
                  </div>
                </div>

                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">CONTAINMENT</div>
                  <div className="font-bold text-black text-sm truncate">
                    {specimen.containment}
                  </div>
                </div>

                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">REPRODUCTION</div>
                  <div className="font-bold text-black text-sm">
                    {specimen.reproductiveRate}
                  </div>
                </div>

                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">MUTATION STATE</div>
                  <div className="font-bold text-[#0035c6] text-sm">
                    {specimen.mutationStatus}
                  </div>
                </div>

                <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                  <div className="text-[#525252] text-[10px]">MEMETIC THREAT</div>
                  <div className="font-bold text-[#FF2A2A] text-xs leading-tight">
                    {specimen.toxicityLevel}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border border-[#111111] p-3 bg-[#ECE8E0]">
                <div className="font-mono text-xs">
                  <span className="text-[#525252]">ACOUSTIC TRANSDUCER: </span>
                  <span className="font-bold text-black">SAMPLE HARMONIC PULSE</span>
                </div>
                <button
                  onClick={handleTestPulse}
                  className="bg-black text-white hover:bg-[#FF5100] px-3 py-1 font-mono text-[11px] font-bold uppercase transition-colors cursor-pointer"
                >
                  TRANSMIT PULSE ♬
                </button>
              </div>

              <p className="font-grotesk text-xs sm:text-sm text-[#525252] leading-relaxed border-t border-[#111111]/30 pt-3">
                {specimen.description}
              </p>
            </div>
          )}

          {/* Tab 2: DNA */}
          {activeTab === 'DNA' && (
            <div className="space-y-4">
              <div className="border border-[#111111] p-4 bg-black text-[#cbf230] font-mono text-xs space-y-2">
                <div className="text-[#858383] text-[10px]">
                  RECOMBINANT POLYPEPTIDE HASH:
                </div>
                <div className="text-sm font-bold tracking-wider break-all">
                  {specimen.dnaSequence}
                </div>
                <div className="pt-2 border-t border-white/20 text-[#858383] text-[11px]">
                  [00] GATC-9912 // SEQUENCE MUTATION PROBABILITY: 0.8847
                  <br />
                  [01] CHROMOSOME MESH: STABLE UNDER NITROGEN COOLING
                </div>
              </div>

              <div className="p-3 bg-[#F7F3EB] border border-[#111111] font-mono text-xs">
                <div className="font-bold text-black mb-1">
                  GENETIC DRIFT ANALYSIS:
                </div>
                <div className="text-[#525252] leading-relaxed">
                  Specimen shows anomalous DNA recombination when exposed to online sentiment spikes. Cell walls expand proportionally to transaction frequency.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Logs */}
          {activeTab === 'LOGS' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                <div className="text-[#FF5100] font-bold">03:42:19 UTC // TANK-01</div>
                <div className="text-[#525252]">Initial containment protocol established. Specimen observed absorbing light photons.</div>
              </div>

              <div className="border border-[#111111] p-3 bg-[#F7F3EB]">
                <div className="text-[#0035c6] font-bold">04:19:00 UTC // CHAMBER-09</div>
                <div className="text-[#525252]">Acoustic harmonic test complete. Resonance tuned to 432 Hz. Specimen stabilized.</div>
              </div>

              <div className="border border-[#111111] p-3 bg-black text-white">
                <div className="text-[#FF2A2A] font-bold flex items-center justify-between">
                  <span>[RESTRICTED ENCRYPTED LOG]</span>
                  {!decrypted && (
                    <button
                      onClick={handleDecrypt}
                      disabled={decrypting}
                      className="bg-[#FF5100] text-black hover:bg-[#cbf230] px-2 py-0.5 text-[10px] font-bold cursor-pointer"
                    >
                      {decrypting ? 'DECRYPTING...' : 'DECRYPT LOG'}
                    </button>
                  )}
                </div>
                <div className="text-[#cbf230] mt-1">
                  {decrypted
                    ? 'DECRYPTED: Specimen 001 demonstrated conscious intention to contact internet nodes via unshielded Wi-Fi router. Recommendation: maintain 24/7 community surveillance.'
                    : '████████████████████████████████████████████████████████████████'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F1EDE5] border-t border-[#111111] px-4 py-3 flex items-center justify-between font-mono text-xs">
          <span className="text-[#525252]">HAZMAT BIO-LEVEL 04</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="bg-black text-white hover:bg-[#FF5100] hover:text-black px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer"
          >
            DISMISS DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
