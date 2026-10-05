import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Home, Heart, Feather } from 'lucide-react';
import { ActiveView } from '../types';
import { soundtrack } from '../audio/soundtrack';

interface NavigationBarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeView, onNavigate }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(soundtrack.getIsPlaying());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlayingMusic(soundtrack.getIsPlaying());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const toggleSoundtrack = () => {
    if (soundtrack.getIsPlaying()) {
      soundtrack.stop(0.8);
      setIsPlayingMusic(false);
    } else {
      soundtrack.start(0.48);
      setIsPlayingMusic(true);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Home / Archive Brand */}
        <div className="pointer-events-auto flex items-center gap-2 bg-neutral-950/40 backdrop-blur-2xl border border-white/15 px-3.5 py-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-amber-400/40">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 text-xs sm:text-sm font-serif tracking-wider uppercase transition-colors ${
              activeView === 'home' ? 'text-amber-200 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
            title="Return to 1st Anniversary Archive"
          >
            <Home className="w-3.5 h-3.5 text-amber-300/80" />
            <span className="hidden sm:inline">Our Letters</span>
            <span className="text-[10px] text-amber-300/80 border border-amber-300/30 px-1.5 py-0.5 rounded-full bg-white/[0.04] backdrop-blur-sm">
              1 Year
            </span>
          </button>
        </div>

        {/* Center: Switch Between Letters */}
        <div className="pointer-events-auto flex items-center gap-1 bg-neutral-950/40 backdrop-blur-2xl border border-white/15 p-1 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <button
            onClick={() => onNavigate('clint')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all duration-300 ${
              activeView === 'clint'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-inner'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Feather className="w-3 h-3 text-amber-300/90" />
            <span>Clint's Message</span>
          </button>

          <button
            onClick={() => onNavigate('maica')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all duration-300 ${
              activeView === 'maica'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-400/50 shadow-inner'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-3 h-3 text-rose-300 fill-rose-300/30" />
            <span>Maica's Response</span>
          </button>
        </div>

        {/* Right: Ambient Audio Toggle */}
        <div className="pointer-events-auto">
          <button
            onClick={toggleSoundtrack}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border backdrop-blur-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] ${
              isPlayingMusic
                ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                : 'bg-neutral-950/40 text-neutral-400 border-white/15 hover:text-neutral-200 hover:border-white/30'
            }`}
            title={isPlayingMusic ? 'Mute piano soundtrack' : 'Play emotional piano soundtrack'}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="hidden md:inline font-serif text-[11px] tracking-wider text-amber-200/90">
                  Piano • Playing
                </span>
                <span className="flex gap-0.5 items-end h-2.5">
                  <span className="w-0.5 h-2 bg-amber-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 h-3 bg-amber-200 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-amber-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden md:inline font-serif text-[11px] tracking-wider">Soundtrack</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
