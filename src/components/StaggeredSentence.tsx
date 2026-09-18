import React, { useMemo } from 'react';
import { motion, Variants } from 'motion/react';

interface StaggeredSentenceProps {
  text: string;
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  extraClasses?: string;
  isLatest?: boolean;
  isActive?: boolean;
  staggerDelay?: number;
  id?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay = 0.055) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * StaggeredSentence
 * Renders letter sentences with a staggered, graceful framer-motion word entrance.
 * Words fade in consecutively as time passes or as the reader scrolls past them,
 * giving an authentic narrative cadence to the unfolding letter.
 */
export const StaggeredSentence: React.FC<StaggeredSentenceProps> = ({
  text,
  fontFamily = 'font-serif',
  fontSize = 'text-xl sm:text-2xl',
  color = 'text-neutral-200',
  extraClasses = '',
  isLatest = false,
  isActive = true,
  staggerDelay = 0.055,
  id,
}) => {
  // Parse text into lines and words, preserving newlines
  const parsedParagraphs = useMemo(() => {
    return text.split('\n').map((paragraph) => {
      // Split by whitespace while preserving punctuation
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      return words;
    });
  }, [text]);

  return (
    <motion.div
      id={id}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      custom={staggerDelay}
      variants={containerVariants}
      className={`w-full transition-opacity duration-1000 ${
        isLatest ? 'opacity-100' : 'opacity-80 hover:opacity-100'
      }`}
    >
      <p className={`${fontFamily} ${fontSize} ${color} ${extraClasses} leading-relaxed`}>
        {parsedParagraphs.map((words, pIdx) => (
          <span key={pIdx} className="block not-last:mb-3">
            {words.map((word, wIdx) => (
              <motion.span
                key={`${pIdx}-${wIdx}`}
                variants={wordVariants}
                className="inline-block mr-[0.28em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </span>
        ))}
      </p>
    </motion.div>
  );
};
