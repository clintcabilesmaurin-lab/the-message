import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface InkPenWritingTextProps {
  text: string;
  isWriting?: boolean;
  onComplete?: () => void;
  className?: string;
  speed?: number; // ms per character (default: 48ms)
  showNib?: boolean;
  onInstantFinish?: () => void;
}

/**
 * InkPenWritingText
 * Simulates an authentic fountain pen nib moving across parchment in real-time.
 * As letters are penned onto the paper, a finely crafted metallic pen nib trails the
 * ink head with subtle handwriting micro-vibrations and an ink droplet glow.
 */
export const InkPenWritingText: React.FC<InkPenWritingTextProps> = ({
  text,
  isWriting = true,
  onComplete,
  className = '',
  speed = 46,
  showNib = true,
  onInstantFinish,
}) => {
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isLiftingNib, setIsLiftingNib] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isWriting) {
      setDisplayedChars(text.length);
      setIsFinished(true);
      return;
    }

    let current = 0;
    setDisplayedChars(0);
    setIsFinished(false);
    setIsLiftingNib(false);

    const typeNext = () => {
      if (current < text.length) {
        current++;
        setDisplayedChars(current);

        const char = text[current - 1];
        let delay = speed;

        // Realistic organic pauses for punctuation & handwriting rhythm
        if (char === ',' || char === ';') {
          delay = speed * 4.5;
        } else if (char === '.' || char === '?' || char === '!') {
          delay = speed * 6;
        } else if (char === ' ') {
          delay = speed * 1.8;
        } else {
          // Slight human jitter in handwriting speed (±8ms)
          delay += Math.floor((Math.random() - 0.5) * 16);
        }

        timerRef.current = window.setTimeout(typeNext, Math.max(20, delay));
      } else {
        // Text is fully penned down
        setIsLiftingNib(true);
        // After gentle lift-off delay, mark complete
        window.setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 700);
      }
    };

    timerRef.current = window.setTimeout(typeNext, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, isWriting, speed]);

  const handleInstantReveal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFinished) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayedChars(text.length);
      setIsFinished(true);
      setIsLiftingNib(true);
      onComplete?.();
      onInstantFinish?.();
    }
  };

  const visibleText = text.slice(0, displayedChars);
  const lastChar = visibleText.slice(-1);

  return (
    <span
      onClick={handleInstantReveal}
      className={`inline-block relative cursor-text select-text ${className}`}
      title={!isFinished ? 'Penning ink onto parchment...' : undefined}
    >
      {/* The visible inked text */}
      <span className="relative z-10 tracking-wide">
        {visibleText.split('').map((char, i) => {
          // The most recently penned character has a subtle wet-ink shimmer
          const isFreshInk = i === displayedChars - 1 && !isFinished;
          return (
            <span
              key={i}
              className={`transition-all duration-300 ${
                isFreshInk
                  ? 'text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.75)]'
                  : ''
              }`}
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Trailing Ink Pen Nib Cursor */}
      {showNib && !isFinished && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isLiftingNib
              ? {
                  opacity: 0,
                  y: -14,
                  x: 8,
                  rotate: -35,
                  scale: 0.85,
                  transition: { duration: 0.65, ease: 'easeInOut' },
                }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -1.8, 0],
                  rotate: [-14, -19, -13],
                  transition: {
                    y: { duration: 0.22, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 0.35, repeat: Infinity, ease: 'easeInOut' },
                  },
                }
          }
          className="inline-flex items-center ml-0.5 select-none pointer-events-none align-baseline relative z-20 origin-bottom-left"
          style={{ verticalAlign: '-0.15em' }}
          aria-hidden="true"
        >
          <span className="relative inline-block w-6 h-6 -ml-1">
            {/* SVG Fountain Pen Nib */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 28 28"
              fill="none"
              className="overflow-visible drop-shadow-[0_2px_10px_rgba(251,191,36,0.45)]"
            >
              <defs>
                <linearGradient id="nibMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="35%" stopColor="#fbbf24" />
                  <stop offset="70%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
                <linearGradient id="nibSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <radialGradient id="inkGlowPoint" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Wet ink droplet radiance at nib tip */}
              <circle
                cx="3.5"
                cy="24.5"
                r="4.5"
                fill="url(#inkGlowPoint)"
                className="animate-pulse"
                style={{ animationDuration: '0.8s' }}
              />
              <circle cx="3.5" cy="24.5" r="1.8" fill="#fef08a" />

              {/* Fountain Pen Nib Body */}
              <path
                d="M3.5 24.5 L9 17 L6.5 10 L19 2.5 L24 7.5 L16.5 20 L10 17.5 L3.5 24.5 Z"
                fill="url(#nibMetallic)"
                stroke="#fef08a"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />

              {/* Center Inlay Accent */}
              <path
                d="M7.5 17.5 L9 13.5 L16.5 6 L18.5 8 L13.5 15.5 L9.5 17 Z"
                fill="url(#nibSteel)"
                opacity="0.8"
              />

              {/* Ink Slit & Breather Hole */}
              <path
                d="M3.5 24.5 L13 13.5"
                stroke="#451a03"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <circle cx="13" cy="13.5" r="1.4" fill="#451a03" />

              {/* Golden Nib Engraving Line */}
              <path
                d="M8.5 10 L15.5 17"
                stroke="#fef3c7"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
            </svg>
          </span>
        </motion.span>
      )}
    </span>
  );
};
