import React from 'react';
import { Atmosphere } from '../types';
import { ParticleLayer } from './ParticleLayer';

interface BackgroundLayerProps {
  atmosphere: Atmosphere;
}

/**
 * BackgroundLayer component
 * Renders deeply atmospheric, multi-layered gradient backgrounds specifically crafted
 * for each chapter of the letter, with elevated luminous depth in Sections 3, 4, and 5:
 *  - Section 3 (heavy -> spiritual -> dawn): midnight storm, divine celestial light, morning relief
 *  - Section 4 (warm): lush emerald green forest canopy with streaming golden sunbeams
 *  - Section 5 (golden): celebratory golden hour sunset, molten amber glow, and romantic hearth warmth
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ atmosphere }) => {
  // Base linear gradient foundation (ultra-translucent so whole background image shines through vividly)
  const getBaseGradient = () => {
    switch (atmosphere) {
      case 'dark':
        // Section 1: Deep night, quiet solitude, starlit dark room
        return 'bg-gradient-to-b from-[#030407]/30 via-transparent to-[#040508]/40';
      case 'cold':
        // Section 2: Cold grey mist, emotional distance, misty mountains
        return 'bg-gradient-to-b from-[#080b0f]/30 via-transparent to-[#0a0e13]/40';
      case 'heavy':
        // Section 3A: Midnight storm, emotional exhaustion, deep indigo darkness
        return 'bg-gradient-to-b from-[#06070d]/35 via-transparent to-[#070710]/45';
      case 'spiritual':
        // Section 3B: Sacred stillness, Calvary remembrance, celestial violet-indigo
        return 'bg-gradient-to-b from-[#08091a]/30 via-transparent to-[#0d0f24]/40';
      case 'dawn':
        // Section 3C: Relief, light breaking over the ridge, morning mist
        return 'bg-gradient-to-b from-[#0b0e18]/25 via-transparent to-[#1f1622]/35';
      case 'warm':
        // Section 4: The Green Forest, lush canopy, cream & dappled golden hour sunlight
        return 'bg-gradient-to-b from-[#071109]/25 via-transparent to-[#09140b]/35';
      case 'golden':
        // Section 5: Celebratory anniversary, deep molten amber, romantic sunset warmth
        return 'bg-gradient-to-b from-[#140b04]/25 via-transparent to-[#160a03]/35';
      case 'rose':
        // Maica's letter: Intimate rosewood, soft blush candlelight, romantic warmth
        return 'bg-gradient-to-b from-[#12070c]/25 via-transparent to-[#13080e]/35';
      case 'tender':
        // Maica's emotional reassurance: Deep velvet burgundy, soothing lavender ember
        return 'bg-gradient-to-b from-[#0f0914]/25 via-transparent to-[#120918]/35';
      default:
        return 'bg-black/25';
    }
  };

  // Volumetric light beam selector
  const getLightBeamClass = () => {
    switch (atmosphere) {
      case 'spiritual':
        return 'light-beam-shaft-spiritual';
      case 'warm':
        return 'light-beam-shaft-warm';
      case 'golden':
      case 'rose':
      case 'tender':
        return 'light-beam-shaft-golden';
      default:
        return 'light-beam-shaft';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] transition-colors duration-1000 ease-in-out overflow-hidden">
      {/* 1. Base linear gradient */}
      <div className={`absolute inset-0 ${getBaseGradient()} transition-all duration-1000`} />

      {/* 2. Deep Atmospheric Multi-Radial Gradient Layers */}

      {/* Heavy atmosphere: Storm clouds & deep oceanic darkness */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'heavy' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at 50% 15%, rgba(99, 102, 241, 0.09) 0%, rgba(67, 56, 202, 0.04) 45%, transparent 75%),
            radial-gradient(ellipse at 50% 90%, rgba(30, 27, 75, 0.14) 0%, transparent 65%)
          `,
        }}
      />

      {/* Spiritual atmosphere (Section 3): Sacred celestial bloom & holy twilight rays */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'spiritual' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 50% 28%, rgba(254, 240, 138, 0.16) 0%, rgba(192, 132, 252, 0.12) 35%, rgba(99, 102, 241, 0.06) 60%, transparent 80%),
            radial-gradient(ellipse at 50% 92%, rgba(168, 85, 247, 0.12) 0%, rgba(251, 191, 36, 0.09) 40%, transparent 75%),
            radial-gradient(circle at 20% 40%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Dawn atmosphere (Section 3): First morning light & rising hope */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'dawn' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(ellipse at 50% 92%, rgba(251, 191, 36, 0.20) 0%, rgba(244, 114, 182, 0.11) 35%, rgba(129, 140, 248, 0.05) 65%, transparent 85%),
            radial-gradient(ellipse at 40% 15%, rgba(254, 243, 199, 0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Warm atmosphere (Section 4): The Green Forest, dappled golden sunbeams & rich emerald foliage */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'warm' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 60% 18%, rgba(251, 191, 36, 0.18) 0%, rgba(52, 211, 153, 0.15) 35%, rgba(16, 185, 129, 0.07) 60%, transparent 78%),
            radial-gradient(ellipse at 35% 85%, rgba(5, 150, 105, 0.14) 0%, rgba(217, 119, 6, 0.09) 45%, transparent 72%),
            radial-gradient(circle at 20% 45%, rgba(110, 231, 183, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 80% 65%, rgba(252, 211, 77, 0.09) 0%, transparent 40%)
          `,
        }}
      />

      {/* Golden atmosphere (Section 5): Molten sunset amber, glowing hearth, celebratory anniversary warmth */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'golden' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 50% 32%, rgba(251, 191, 36, 0.26) 0%, rgba(245, 158, 11, 0.18) 30%, rgba(234, 88, 12, 0.10) 55%, transparent 78%),
            radial-gradient(ellipse at 50% 96%, rgba(249, 115, 22, 0.22) 0%, rgba(217, 119, 6, 0.15) 35%, rgba(180, 83, 9, 0.06) 65%, transparent 82%),
            radial-gradient(circle at 82% 55%, rgba(252, 211, 77, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 18% 65%, rgba(245, 158, 11, 0.11) 0%, transparent 45%)
          `,
        }}
      />

      {/* Rose atmosphere (Maica's letter): Soft blush petals, candlelit romance */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'rose' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 50% 28%, rgba(251, 113, 133, 0.22) 0%, rgba(244, 63, 94, 0.14) 32%, rgba(225, 29, 72, 0.06) 58%, transparent 80%),
            radial-gradient(ellipse at 50% 92%, rgba(253, 164, 175, 0.18) 0%, rgba(217, 70, 239, 0.10) 40%, transparent 75%),
            radial-gradient(circle at 80% 45%, rgba(254, 205, 211, 0.09) 0%, transparent 55%),
            radial-gradient(circle at 20% 60%, rgba(244, 114, 182, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Tender atmosphere: Deep reassuring lavender & burgundy embrace */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          atmosphere === 'tender' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(216, 180, 254, 0.20) 0%, rgba(192, 132, 252, 0.12) 35%, rgba(147, 51, 234, 0.06) 60%, transparent 80%),
            radial-gradient(ellipse at 50% 95%, rgba(244, 114, 182, 0.16) 0%, rgba(168, 85, 247, 0.09) 45%, transparent 75%),
            radial-gradient(circle at 25% 40%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* 3. Subtle off-white cream paper texture overlay */}
      <div className="absolute inset-0 paper-texture-overlay pointer-events-none transition-opacity duration-1000" />

      {/* 4. Fine tactile paper noise filter for organic texture */}
      <div className="absolute inset-0 paper-noise-filter pointer-events-none opacity-40 mix-blend-overlay" />

      {/* 5. Volumetric light beam cutting diagonally across the space */}
      <div
        className={`absolute -top-32 -left-20 w-[90vw] max-w-5xl h-[160vh] ${getLightBeamClass()} -rotate-[24deg] origin-top-left pointer-events-none blur-[50px] opacity-80 animate-light-beam transition-all duration-1000`}
      />

      {/* 6. Center breathing illumination */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-4xl h-[55vh] rounded-full blur-[130px] transition-all duration-1000 animate-breathe pointer-events-none ${
          atmosphere === 'spiritual'
            ? 'bg-amber-200/[0.08]'
            : atmosphere === 'dawn'
            ? 'bg-amber-300/[0.07]'
            : atmosphere === 'warm'
            ? 'bg-emerald-300/[0.06]'
            : atmosphere === 'golden'
            ? 'bg-amber-400/[0.10]'
            : atmosphere === 'rose'
            ? 'bg-rose-300/[0.09]'
            : atmosphere === 'tender'
            ? 'bg-purple-300/[0.08]'
            : atmosphere === 'cold'
            ? 'bg-sky-400/[0.03]'
            : 'bg-white/[0.02]'
        }`}
      />

      {/* 7. Secondary accent glow for spiritual, golden, rose and warm emotional peaks */}
      {(atmosphere === 'spiritual' || atmosphere === 'golden' || atmosphere === 'warm' || atmosphere === 'rose' || atmosphere === 'tender') && (
        <div
          className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[65vw] max-w-3xl h-[45vh] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 animate-light-beam ${
            atmosphere === 'golden'
              ? 'bg-amber-600/[0.09]'
              : atmosphere === 'warm'
              ? 'bg-emerald-600/[0.07]'
              : atmosphere === 'rose'
              ? 'bg-rose-500/[0.08]'
              : atmosphere === 'tender'
              ? 'bg-fuchsia-600/[0.07]'
              : 'bg-purple-500/[0.06]'
          }`}
        />
      )}

      {/* 8. Fine film grain subtle grid */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-20" />

      {/* 9. Floating dust motes drifting across the illuminated space */}
      <ParticleLayer atmosphere={atmosphere} />
    </div>
  );
};
