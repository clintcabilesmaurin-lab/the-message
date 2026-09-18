import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character (default: 12ms)
  delay?: number; // delay before typing starts in ms
  onComplete?: () => void;
  as?: 'p' | 'div' | 'span';
  id?: string;
  highlight?: boolean; // For poignant highlight sections with enhanced cinematic emergence
}

/**
 * TypewriterText Component
 * Types out letter text line by line.
 * Each line emerges from the paper texture with a subtle horizontal 'slide-in'
 * and cinematic blur-to-sharp fade in, creating an authentic parchment ink revelation.
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 12,
  delay = 80,
  onComplete,
  as: Component = 'div',
  id,
  highlight = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pre-calculate line offsets so each line knows when it begins typing
  const lineInfos = useMemo(() => {
    const rawLines = text.split('\n');
    let offset = 0;
    return rawLines.map((line, idx) => {
      const start = offset;
      const end = start + line.length;
      offset = end + 1; // account for newline character
      return { line, start, end, index: idx };
    });
  }, [text]);

  // Trigger typewriter when entering viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Handle typing progression character by character
  useEffect(() => {
    if (!hasStarted || isFinished) return;

    let index = 0;
    let timer: NodeJS.Timeout | null = null;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);

      const typeNextChar = () => {
        if (index < text.length) {
          index++;
          setCurrentIndex(index);

          const char = text[index - 1];
          let nextDelay = speed;

          // Intimate organic pauses for punctuation
          if (char === '.' || char === '?' || char === '!') {
            nextDelay = speed * 8; // gentle pause after sentence
          } else if (char === ',' || char === ';') {
            nextDelay = speed * 4; // slight breath on comma
          } else if (char === '\n') {
            nextDelay = speed * 6; // pause on paragraph break
          }

          timer = setTimeout(typeNextChar, nextDelay);
        } else {
          setIsTyping(false);
          setIsFinished(true);
          onComplete?.();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearTimeout(timer);
    };
  }, [hasStarted, isFinished, text, speed, delay, onComplete]);

  // Instant completion on click
  const handleInstantComplete = () => {
    if (!isFinished) {
      setCurrentIndex(text.length);
      setIsTyping(false);
      setIsFinished(true);
      onComplete?.();
    }
  };

  return (
    <Component
      ref={containerRef as any}
      id={id}
      onClick={handleInstantComplete}
      className={`cursor-pointer group relative select-text ${className}`}
      title={!isFinished ? 'Click to reveal entire text' : undefined}
    >
      <div className="space-y-2">
        {lineInfos.map((info) => {
          const { line, start, end, index } = info;

          // Line hasn't started yet and we are not finished
          if (!hasStarted || (!isFinished && currentIndex < start)) {
            return null;
          }

          const charsRevealed = isFinished
            ? line.length
            : Math.max(0, Math.min(line.length, currentIndex - start));

          const isLineCurrentlyTyping =
            !isFinished && currentIndex >= start && currentIndex <= end;

          const lineContent = isFinished ? line : line.slice(0, charsRevealed);

          // Render paragraph spacing for empty lines
          if (line.length === 0) {
            return <div key={index} className="h-4" />;
          }

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: highlight ? -22 : -15,
                filter: 'blur(6px)',
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: highlight ? 0.9 : 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`leading-relaxed ${
                highlight
                  ? 'text-amber-100 drop-shadow-[0_0_14px_rgba(251,191,36,0.18)] font-medium'
                  : ''
              }`}
            >
              <span>{lineContent}</span>
              {isLineCurrentlyTyping && isTyping && (
                <span
                  className="inline-block w-[2px] h-[0.95em] bg-amber-300/90 ml-1 align-baseline animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </Component>
  );
};
