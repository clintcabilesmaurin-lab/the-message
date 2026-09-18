import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { transcript } from '../content/transcript';
import { soundtrack } from '../audio/soundtrack';
import { InkPenWritingText } from '../components/InkPenWritingText';
import { StaggeredSentence } from '../components/StaggeredSentence';

interface Section1Props {
  onUnlockNext: () => void;
}

interface CinematicLine {
  id: string;
  text: string;
  category: 'opening' | 'mind' | 'heartFocus' | 'heartVoice' | 'questions' | 'sorry' | 'screaming';
  fontSize: string;
  fontFamily: string;
  color: string;
  extraClasses?: string;
  spacingBefore?: string;
}

export const Section1: React.FC<Section1Props> = ({ onUnlockNext }) => {
  const t = transcript.section1;

  const lines: CinematicLine[] = [
    {
      id: 'tired',
      text: t.tired,
      category: 'opening',
      fontFamily: 'font-serif',
      fontSize: 'text-4xl sm:text-6xl md:text-7xl',
      color: 'text-neutral-100',
      extraClasses: 'font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]',
      spacingBefore: 'pt-2',
    },
    {
      id: 'kapoy',
      text: t.kapoy,
      category: 'opening',
      fontFamily: 'font-serif',
      fontSize: 'text-3xl sm:text-5xl md:text-6xl',
      color: 'text-neutral-300/95',
      extraClasses: 'font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]',
      spacingBefore: 'mt-8 mb-6',
    },
    {
      id: 'mind1',
      text: t.mind1,
      category: 'mind',
      fontFamily: 'font-sans',
      fontSize: 'text-xl sm:text-2xl md:text-3xl',
      color: 'text-neutral-300',
      extraClasses: 'font-light leading-relaxed',
      spacingBefore: 'pt-8',
    },
    {
      id: 'mind2',
      text: t.mind2,
      category: 'mind',
      fontFamily: 'font-sans',
      fontSize: 'text-lg sm:text-xl md:text-2xl',
      color: 'text-neutral-400',
      extraClasses: 'font-light leading-relaxed max-w-lg mx-auto',
      spacingBefore: 'mt-6',
    },
    {
      id: 'heartQuestion',
      text: t.heartQuestion,
      category: 'heartFocus',
      fontFamily: 'font-serif',
      fontSize: 'text-5xl sm:text-7xl md:text-8xl',
      color: 'text-neutral-100',
      extraClasses: 'italic font-normal tracking-wider drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]',
      spacingBefore: 'mt-20 mb-8',
    },
    {
      id: 'heartVoice',
      text: t.heartVoice,
      category: 'heartVoice',
      fontFamily: 'font-serif',
      fontSize: 'text-2xl sm:text-3xl md:text-4xl',
      color: 'text-neutral-200',
      extraClasses: 'font-light',
      spacingBefore: 'mt-10',
    },
    {
      id: 'heartHeavy',
      text: t.heartHeavy,
      category: 'heartVoice',
      fontFamily: 'font-serif',
      fontSize: 'text-2xl sm:text-3xl md:text-4xl',
      color: 'text-neutral-300',
      extraClasses: 'font-light',
      spacingBefore: 'mt-4',
    },
    {
      id: 'heartReal',
      text: t.heartReal,
      category: 'heartVoice',
      fontFamily: 'font-serif',
      fontSize: 'text-2xl sm:text-3xl md:text-4xl',
      color: 'text-neutral-300',
      extraClasses: 'font-light',
      spacingBefore: 'mt-4',
    },
    {
      id: 'heartHard',
      text: t.heartHard,
      category: 'heartVoice',
      fontFamily: 'font-serif',
      fontSize: 'text-2xl sm:text-3xl md:text-4xl',
      color: 'text-neutral-300',
      extraClasses: 'font-light',
      spacingBefore: 'mt-4',
    },
    {
      id: 'dontKnowWhy',
      text: t.dontKnowWhy,
      category: 'questions',
      fontFamily: 'font-sans',
      fontSize: 'text-base sm:text-lg md:text-xl',
      color: 'text-neutral-400',
      extraClasses: 'font-light',
      spacingBefore: 'mt-12',
    },
    {
      id: 'dontKnowHow',
      text: t.dontKnowHow,
      category: 'questions',
      fontFamily: 'font-sans',
      fontSize: 'text-base sm:text-lg md:text-xl',
      color: 'text-neutral-400',
      extraClasses: 'font-light',
      spacingBefore: 'mt-3',
    },
    {
      id: 'sorry',
      text: t.sorry,
      category: 'sorry',
      fontFamily: 'font-serif',
      fontSize: 'text-5xl sm:text-7xl md:text-8xl',
      color: 'text-neutral-100',
      extraClasses: 'font-medium tracking-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]',
      spacingBefore: 'mt-20',
    },
    {
      id: 'screaming',
      text: t.screaming,
      category: 'screaming',
      fontFamily: 'font-sans',
      fontSize: 'text-lg sm:text-xl md:text-2xl',
      color: 'text-neutral-200',
      extraClasses: 'whitespace-pre-line leading-relaxed max-w-xl mx-auto',
      spacingBefore: 'mt-8',
    },
  ];

  const totalLines = lines.length;
  // currentStep starts at 0 ("I'm tired. 😔")
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Advance to next line
  const advance = () => {
    setCurrentStep((prev) => {
      if (prev < totalLines - 1) {
        return prev + 1;
      } else {
        setIsCompleted(true);
        setIsPlaying(false);
        return prev;
      }
    });
  };

  // User scroll detection: allow sentences to fade in gracefully as user scrolls
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      isUserScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 1500);

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 45 && !isCompleted) {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // If the letter container is actively in view and reader is scrolling downward
          if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
            advance();
          }
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isCompleted, currentStep]);

  // Continuous timer loop with generous timing for the opening lines
  useEffect(() => {
    if (!isPlaying || isCompleted) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // 6.5s for "I'm tired. 😔", 5.5s for "Kapoy na. 😔", 5.5s for "Upon nag write ko ani,", then 4.5s for following lines
    const lineDuration =
      currentStep === 0
        ? 6500
        : currentStep === 1
        ? 5500
        : currentStep === 2
        ? 5500
        : 4500;

    timerRef.current = window.setTimeout(() => {
      advance();
    }, lineDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, isCompleted, currentStep]);

  // Smooth scroll to newest line gently as letter unfolds downwards (only when not actively scrolling)
  useEffect(() => {
    if (!isUserScrollingRef.current && currentStep >= 2 && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentStep]);

  const handleSkipToEnd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentStep(totalLines - 1);
    setIsCompleted(true);
    setIsPlaying(false);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentStep(0);
    setIsCompleted(false);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const handleScreenClick = () => {
    if (!isCompleted) {
      advance();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center select-none cursor-pointer"
    >
      {/* Main text container */}
      <div className="max-w-2xl w-full flex flex-col items-center letter-paper-backdrop p-6 sm:p-10 rounded-3xl">
        {/* The Theme Wax Seal Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10"
        >
          <div className="relative p-1 rounded-full bg-amber-500/10 border border-amber-400/25 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
            <img
              src="/icon.jpg"
              alt="The Message Seal"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-inner"
            />
          </div>
        </motion.div>

        {lines.map((line, index) => {
          if (index > currentStep) return null;

          const isLatest = index === currentStep && !isCompleted;
          const isHeart = line.category === 'heartFocus';
          const isSorry = line.category === 'sorry';
          const isPenWritten = line.id === 'mind1';

          return (
            <div
              key={line.id}
              ref={isLatest ? activeLineRef : null}
              className={`w-full transition-all duration-1000 ${line.spacingBefore || ''}`}
            >
              {isPenWritten ? (
                /* Real-time Ink Pen Nib Trailing Effect for 'Upon nag write ko ani,' */
                <div className="w-full flex justify-center py-2">
                  <p
                    className={`${line.fontFamily} ${line.fontSize} ${line.color} ${
                      line.extraClasses || ''
                    }`}
                  >
                    <InkPenWritingText
                      text={line.text}
                      isWriting={index <= currentStep}
                      speed={50}
                      showNib={true}
                    />
                  </p>
                </div>
              ) : (
                /* Staggered word-by-word entrance animation for letter sentences */
                <StaggeredSentence
                  text={line.text}
                  fontFamily={line.fontFamily}
                  fontSize={line.fontSize}
                  color={line.color}
                  extraClasses={line.extraClasses}
                  isLatest={isLatest}
                  isActive={true}
                  staggerDelay={isHeart || isSorry ? 0.08 : 0.055}
                />
              )}
            </div>
          );
        })}

        {/* Doorway to Section 2 appears once finished or at the final step */}
        {(isCompleted || currentStep >= totalLines - 1) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.6 }}
            className="pt-20 pb-8"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnlockNext();
              }}
              className="group relative inline-flex items-center justify-center px-12 py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-light text-neutral-300 border border-neutral-700/70 rounded-full hover:border-amber-200/80 hover:text-white transition-all duration-500 hover:scale-[1.03] bg-neutral-900/40 backdrop-blur-md shadow-2xl shadow-black/60 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Continue</span>
              </span>
              <div className="absolute inset-0 rounded-full bg-amber-400/5 group-hover:bg-amber-400/10 transition-colors blur-sm" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Discrete Cinematic Controls */}
      <div
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-lg text-xs font-sans text-neutral-400 select-none opacity-40 hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {!isCompleted ? (
          <>
            <button
              onClick={handleTogglePlay}
              className="p-1.5 hover:text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                advance();
              }}
              className="p-1.5 hover:text-white transition-colors"
              title="Next Line"
              aria-label="Next Line"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSkipToEnd}
              className="px-2 py-0.5 text-[10px] tracking-wider uppercase text-neutral-400 hover:text-white transition-colors"
            >
              Skip
            </button>
          </>
        ) : (
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] tracking-wider text-neutral-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay opening</span>
          </button>
        )}
      </div>

      {/* Subtle hint that clicking advances */}
      {!isCompleted && currentStep < 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="fixed bottom-6 left-6 z-30 text-[11px] font-sans tracking-widest uppercase text-neutral-500 pointer-events-none hidden sm:block"
        >
          tap anywhere to advance
        </motion.div>
      )}
    </div>
  );
};
