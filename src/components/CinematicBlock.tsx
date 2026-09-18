import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

export interface CinematicBlockProps {
  id?: string;
  lines: string[];
  durationPerLine?: number; // default 3000ms (3 seconds)
  title?: string;
  subtitle?: string;
  className?: string;
  lineClassName?: string;
  activeLineClassName?: string;
  accentQuote?: boolean;
  onComplete?: () => void;
}

/**
 * CinematicBlock component
 * Handles line-by-line text reveals with a 3-second duration per line,
 * triggered by scroll position for major emotional moments.
 */
export const CinematicBlock: React.FC<CinematicBlockProps> = ({
  id,
  lines,
  durationPerLine = 3000,
  title,
  subtitle,
  className = '',
  lineClassName = '',
  activeLineClassName = '',
  accentQuote = false,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLParagraphElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Triggered by scroll position using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsTriggered(true);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Line-by-line reveal with 3-second duration per line
  useEffect(() => {
    if (!isTriggered || isFinished) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1;
        } else {
          setIsFinished(true);
          if (timerRef.current) clearInterval(timerRef.current);
          onComplete?.();
          return prev;
        }
      });
    }, durationPerLine);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTriggered, isFinished, lines.length, durationPerLine, onComplete]);

  // GSAP animation on the active line reveal
  useEffect(() => {
    if (activeLineRef.current) {
      gsap.fromTo(
        activeLineRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power2.out' }
      );
    }
  }, [currentLineIndex, isTriggered]);

  const handleManualAdvance = () => {
    if (!isTriggered) {
      setIsTriggered(true);
      return;
    }
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      onComplete?.();
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      onClick={handleManualAdvance}
      className={`relative my-20 px-6 py-16 rounded-2xl letter-paper-backdrop border border-white/10 backdrop-blur-sm shadow-2xl transition-all duration-700 cursor-pointer select-none group ${className}`}
    >
      {/* Header: Title/Subtitle for this emotional moment */}
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <span className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-amber-200/70 mb-2">
              {title}
            </span>
          )}
          {subtitle && (
            <p className="font-serif italic text-sm text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Lines display */}
      <div className="space-y-6 max-w-xl mx-auto text-center">
        {!isTriggered ? (
          <div className="py-12 text-neutral-500 font-serif italic text-sm animate-pulse">
            Scroll to reveal this moment...
          </div>
        ) : (
          lines.slice(0, currentLineIndex + 1).map((line, idx) => {
            const isCurrent = idx === currentLineIndex;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: isCurrent ? 1 : 0.55, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p
                  ref={isCurrent ? activeLineRef : undefined}
                  className={`transition-all duration-700 font-serif leading-relaxed ${
                    accentQuote ? 'italic' : ''
                  } ${
                    isCurrent
                      ? `text-xl sm:text-2xl md:text-3xl text-neutral-100 font-normal ${activeLineClassName}`
                      : `text-base sm:text-lg md:text-xl text-neutral-400/70 font-light ${lineClassName}`
                  }`}
                >
                  {line}
                </p>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Subtle indicator of progress / interactive cue */}
      {isTriggered && (
        <div className="mt-8 flex items-center justify-center gap-3 text-xs text-neutral-500 font-sans">
          <span>
            {currentLineIndex + 1} / {lines.length}
          </span>
          {!isFinished && (
            <span className="text-[11px] text-neutral-400 opacity-60 group-hover:opacity-100 transition-opacity">
              • tap to advance
            </span>
          )}
        </div>
      )}
    </div>
  );
};
