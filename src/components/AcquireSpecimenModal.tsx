import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface AcquireSpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcquireSpecimenModal: React.FC<AcquireSpecimenModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [stage, setStage] = useState<'SELECT' | 'SYNTHESIZING' | 'SUCCESS'>('SELECT');
  const [selectedVariant, setSelectedVariant] = useState('ALPHA');
  const [generatedId, setGeneratedId] = useState('');

  if (!isOpen) return null;

  const handleSynthesize = () => {
    sound.playClick();
    setStage('SYNTHESIZING');
    setTimeout(() => {
      sound.playCollect();
      setGeneratedId(`SOMA-${Math.floor(1000 + Math.random() * 9000)}-${selectedVariant}`);
      setStage('SUCCESS');
    }, 1200);
  };

  const handleReset = () => {
    setStage('SELECT');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FAF7EE] border-2 border-[#111111] brutalist-shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#ECE8E0] border-b border-[#111111] px-4 py-3 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-black">
            <span className="w-2.5 h-2.5 bg-[#cbf230]"></span>
            <span>SPECIMEN ACQUISITION PROTOCOL</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black hover:text-white border border-[#111111] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {stage === 'SELECT' && (
            <>
              <div>
                <h3 className="font-syne text-xl font-bold uppercase text-black mb-1">
                  JOIN CONTAINMENT MESH
                </h3>
                <p className="font-grotesk text-xs sm:text-sm text-[#525252]">
                  Select your target mutation genome to synthesize an experimental specimen entry into the decentralized ledger.
                </p>
              </div>

              {/* Variant choices */}
              <div className="space-y-2">
                {[
                  {
                    id: 'ALPHA',
                    name: 'ALPHA SOMA (BLOB)',
                    rarity: 'EXOTIC [99% CHAOS]',
                    color: 'border-[#cbf230]',
                  },
                  {
                    id: 'CHRONO',
                    name: 'CHRONO-MITE (SP-002)',
                    rarity: 'MYTHIC [432 HZ]',
                    color: 'border-[#0035c6]',
                  },
                  {
                    id: 'GLITCH',
                    name: 'GLITCH SPORE (SP-003)',
                    rarity: 'UNKNOWN [EXTREME]',
                    color: 'border-[#FF2A2A]',
                  },
                ].map((v) => (
                  <div
                    key={v.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedVariant(v.id);
                    }}
                    className={`border-2 p-3 flex items-center justify-between cursor-pointer transition-all ${
                      selectedVariant === v.id
                        ? 'bg-[#F1EDE5] border-black brutalist-shadow-sm'
                        : 'bg-[#F7F3EB] border-[#111111]/40 hover:border-black'
                    }`}
                  >
                    <div>
                      <div className="font-grotesk font-bold text-sm text-black">
                        {v.name}
                      </div>
                      <div className="font-mono text-[11px] text-[#525252]">
                        {v.rarity}
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 border border-[#111111] flex items-center justify-center ${
                        selectedVariant === v.id ? 'bg-black text-[#cbf230]' : 'bg-white'
                      }`}
                    >
                      {selectedVariant === v.id && '✓'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F7F3EB] border border-[#111111] p-3 font-mono text-xs text-[#525252]">
                <div className="flex justify-between mb-1">
                  <span>GAS / COMPUTATION:</span>
                  <span className="font-bold text-black">0.00 SOL / FREE SIMULATION</span>
                </div>
                <div className="flex justify-between">
                  <span>SECURITY ENCRYPTION:</span>
                  <span className="text-[#00FF66] font-bold">VERIFIED PUMP PROTOCOL</span>
                </div>
              </div>

              <button
                onClick={handleSynthesize}
                className="w-full bg-black text-white hover:bg-[#FF5100] hover:text-black py-3 font-mono text-xs uppercase font-bold tracking-wider transition-all brutalist-shadow active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                INITIALIZE SYNTHESIS →
              </button>
            </>
          )}

          {stage === 'SYNTHESIZING' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-4 border-black border-t-[#cbf230] rounded-full animate-spin"></div>
              <div className="font-syne text-lg font-bold uppercase text-black">
                SYNTHESIZING GENOME SEQUENCE...
              </div>
              <p className="font-mono text-xs text-[#525252]">
                Calibrating cellular integrity against market volatility matrix.
              </p>
            </div>
          )}

          {stage === 'SUCCESS' && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#cbf230] border-2 border-black rounded-full mx-auto flex items-center justify-center font-bold text-2xl">
                ✓
              </div>
              <h3 className="font-syne text-2xl font-bold uppercase text-black">
                SPECIMEN BOUND TO WALLET
              </h3>
              <div className="bg-black text-[#cbf230] p-4 border border-[#111111] font-mono text-xs">
                <div className="text-[#858383] text-[10px]">GENOME SERIAL:</div>
                <div className="font-bold text-sm">{generatedId}</div>
                <div className="text-[10px] text-white mt-1">STATUS: ALIVE IN SUBNET TANK</div>
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-black text-white hover:bg-[#FF5100] hover:text-black py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                COMPLETE &amp; RETURN TO DOSSIER
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
