import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { soundtrack } from '../audio/soundtrack';

const PORTAL_URL = 'https://world-of-letters.vercel.app/';

export const PortalDoorway: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePortalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Gently fade the background music down during the portal opening
    try {
      soundtrack.stop(1.2);
    } catch {
      // Ignore if sound already stopped
    }

    // Allow the smooth visual portal animation to unfold before replacing the parent window
    setTimeout(() => {
      try {
        if (window.top && window.top !== window) {
          window.top.location.href = PORTAL_URL;
        } else if (window.parent && window.parent !== window) {
          window.parent.location.href = PORTAL_URL;
        } else {
          window.location.href = PORTAL_URL;
        }
      } catch {
        // Fallback for strict sandbox cross-origin contexts
        window.location.href = PORTAL_URL;
      }
    }, 1400);
  };

  return (
    <div className="pt-20 pb-10 text-center">
      {/* Visual Doorway Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-lg mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-amber-950/30 via-neutral-950/60 to-amber-950/20 border border-amber-500/25 shadow-[0_0_50px_rgba(251,191,36,0.12)] backdrop-blur-md space-y-6 overflow-hidden"
      >
        {/* Subtle decorative golden beam inside card */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

        {/* Small portal crest / icon */}
        <div className="flex items-center justify-center">
          <div className="relative p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 shadow-inner">
            <BookOpen className="w-6 h-6 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        {/* Heading and context */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
            Next Destination
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif text-amber-100 font-normal tracking-wide">
            World of Letters
          </h3>
          <p className="text-sm sm:text-base text-amber-200/70 font-serif leading-relaxed max-w-sm mx-auto">
            A continuation awaits. Step through this doorway into our shared sanctuary of letters.
          </p>
        </div>

        {/* Portal Action Button */}
        <div className="pt-2">
          <a
            href={PORTAL_URL}
            target="_parent"
            rel="noopener noreferrer"
            onClick={handlePortalClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-sm sm:text-base uppercase tracking-[0.2em] font-sans font-medium text-amber-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.35)] hover:shadow-[0_0_45px_rgba(251,191,36,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 cursor-pointer"
          >
            <span>Enter World of Letters</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Destination domain pill */}
        <div className="pt-1">
          <span className="inline-block text-[11px] font-mono tracking-wider text-amber-300/60 border border-amber-500/20 px-3 py-1 rounded-full bg-amber-950/40">
            world-of-letters.vercel.app
          </span>
        </div>
      </motion.div>

      {/* Smooth Cinematic Portal Transition Fullscreen Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto bg-[#070503]/95 backdrop-blur-2xl text-center px-6 overflow-hidden"
          >
            {/* Expanding radial portal light ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.2, 3.5], opacity: [0.3, 0.75, 1] }}
              transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-300/25 to-orange-500/30 blur-3xl pointer-events-none"
            />

            {/* Glowing concentric portal rings */}
            <div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-amber-300/40 flex items-center justify-center p-2"
              >
                <div className="w-full h-full rounded-full border border-amber-400/60 flex items-center justify-center bg-amber-500/10 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                  <Sparkles className="w-8 h-8 text-amber-200 animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Atmospheric transition text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 relative z-10 max-w-md"
            >
              <h2 className="text-2xl sm:text-4xl font-serif text-amber-100 tracking-wide font-normal drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                Entering World of Letters
              </h2>
              <p className="text-sm sm:text-base font-serif italic text-amber-200/80 leading-relaxed">
                Opening the doorway and stepping across...
              </p>
            </motion.div>

            {/* Fallback direct link in case browser policies interfere with automatic replacement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-8 relative z-10"
            >
              <a
                href={PORTAL_URL}
                target="_parent"
                className="text-xs text-amber-400/70 hover:text-amber-200 underline transition-colors"
              >
                Click here if you are not automatically redirected
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
