import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { sound } from '../utils/audio';
import { SpecimenLogo } from './SpecimenLogo';
import { SOCIAL_LINKS } from '../constants/socialLinks';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenContract: () => void;
  onPlayClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenContract,
  onPlayClick,
}) => {
  const [utcTime, setUtcTime] = useState<string>('00:00:00');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(sound.isSoundEnabled());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyContract = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    navigator.clipboard.writeText(SOCIAL_LINKS.CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const active = sound.toggleSound();
    setSoundActive(active);
  };

  const navItems: { tab: NavigationTab; label: string }[] = [
    { tab: 'origin', label: 'ORIGIN' },
    { tab: 'specimen', label: 'SPECIMEN' },
    { tab: 'game', label: 'GAME' },
    { tab: 'lab', label: 'LAB' },
    { tab: 'community', label: 'COMMUNITY' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7EE] border-b border-[#111111] select-none">
      {/* Primary Top Bar */}
      <div className="h-14 sm:h-16 w-full px-3 sm:px-4 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone with Specimen Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onTabChange('origin');
            }}
            className="text-left font-bold text-base sm:text-lg lg:text-xl uppercase tracking-tighter text-black flex items-center gap-1.5 sm:gap-2.5 hover:opacity-85 transition-opacity cursor-pointer group"
          >
            <SpecimenLogo size="sm" />
            <span className="font-syne font-black tracking-tight text-sm sm:text-base lg:text-lg">
              FOMO CORPUS
            </span>
          </button>
          
          <div className="hidden xl:flex items-center gap-2 pl-2 sm:pl-3 border-l border-[#111111]">
            <span className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase text-[#FF2A2A] tracking-wider font-bold">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#FF2A2A] animate-pulse"></span>
              SIGNAL ACTIVE
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#525252] uppercase border border-[#111111] px-1 sm:px-1.5 py-0.5 bg-[#F7F3EB]">
              [SPECIMEN: 001]
            </span>
          </div>
        </div>

        {/* Desktop Nav Zone */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-[10px] sm:text-xs tracking-wider">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  sound.playClick();
                  onTabChange(item.tab);
                }}
                className={`px-2 sm:px-3 py-1 border uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white border-black brutalist-shadow-sm font-bold'
                    : 'text-[#525252] border-transparent hover:border-[#111111] hover:text-black hover:bg-[#F1EDE5]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {/* Quick Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Audio Enabled' : 'Audio Muted'}
            className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs border border-[#111111] px-1.5 sm:px-2 py-1 bg-[#F7F3EB] hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-[9px] sm:text-[10px]">{soundActive ? 'SFX: ON' : 'SFX: OFF'}</span>
          </button>

          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noreferrer"
            onClick={() => sound.playClick()}
            className="hidden sm:inline-flex items-center font-mono text-[10px] sm:text-xs text-black border border-[#111111] px-1.5 sm:px-2.5 py-1 bg-[#F7F3EB] hover:bg-[#FF5100] hover:text-black transition-colors brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 uppercase cursor-pointer"
          >
            X ↗
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onPlayClick();
            }}
            className="hidden sm:inline-flex items-center font-mono text-[10px] sm:text-xs text-black border border-[#111111] px-1.5 sm:px-2.5 py-1 bg-[#F7F3EB] hover:bg-[#cbf230] hover:text-[#171e00] transition-colors brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 uppercase cursor-pointer font-bold"
          >
            PLAY ↗
          </button>

          <button
            onClick={handleCopyContract}
            className={`font-mono text-[9px] sm:text-[10px] md:text-xs border border-[#111111] px-1.5 sm:px-2.5 md:px-3 py-1 sm:py-1.5 transition-all active:translate-x-0.5 active:translate-y-0.5 uppercase cursor-pointer font-bold ${
              copied
                ? 'bg-[#cbf230] text-[#171e00]'
                : 'bg-black text-white hover:bg-[#FF5100] hover:text-black shadow-[3px_3px_0px_#FF5100]'
            }`}
          >
            {copied ? '✓ COPIED!' : 'CA [COPY]'}
          </button>

          <div
            onClick={onOpenContract}
            title="Inspect Specimen 001 Dossier"
            className="cursor-pointer"
          >
            <SpecimenLogo size="sm" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-1 sm:p-1.5 border border-[#111111] bg-[#F7F3EB] hover:bg-black hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-[18px] sm:text-[20px] block">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FAF7EE] border-t border-[#111111] px-3 sm:px-4 py-2 sm:py-3 flex flex-col gap-2 font-mono text-[10px] sm:text-xs uppercase animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  sound.playClick();
                  onTabChange(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 sm:py-2 px-2 sm:px-3 border text-left font-bold ${
                  currentTab === item.tab
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F3EB] text-[#525252] border-[#111111]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-[#111111]/30">
            <button
              onClick={() => {
                sound.playClick();
                onPlayClick();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-1.5 text-center bg-[#cbf230] text-[#171e00] border border-[#111111] font-bold"
            >
              PLAY ↗
            </button>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="px-3 sm:px-4 py-1.5 text-center bg-[#F7F3EB] border border-[#111111] text-black font-bold"
            >
              X ↗
            </a>
          </div>
        </div>
      )}

      {/* Sub-header Coordinates Bar */}
      <div className="h-5 sm:h-6 w-full border-t border-[#111111] bg-[#F7F3EB] px-3 sm:px-4 lg:px-8 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#525252] select-none">
        <div className="flex items-center gap-2 sm:gap-4">
          <span>LAT: 44.12° N</span>
          <span className="hidden sm:inline text-[#111111]">|</span>
          <span className="hidden sm:inline">REF: ARCHIVE-EXP-09</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden md:inline">DATA: ENCRYPTED</span>
          <span>UTC: {utcTime}</span>
        </div>
      </div>
    </header>
  );
};
