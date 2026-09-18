import React from 'react';
import { motion } from 'motion/react';
import { transcript } from '../content/transcript';
import { TypewriterText } from '../components/TypewriterText';

interface Section2Props {
  onUnlockNext: () => void;
}

export const Section2: React.FC<Section2Props> = ({ onUnlockNext }) => {
  const t = transcript.section2;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 max-w-2xl mx-auto font-sans leading-relaxed text-neutral-300">
      <div className="space-y-16 p-6 sm:p-10 rounded-3xl letter-paper-backdrop">
        {/* History & Admiration - Typewriter reveal for intimate letter feel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif text-justify sm:text-left"
        >
          <TypewriterText text={t.historyAndAdmiration} speed={13} />
        </motion.div>

        {/* First Turning Point - Large Typography & Contrast */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(8px)', scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-10 border-y border-neutral-800/80 my-8 text-center"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-amber-200/90 leading-tight">
            {t.otherSideEmphasis}
          </p>
        </motion.div>

        {/* The Feeling of "Not Enough" - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif"
        >
          <TypewriterText text={t.notEnoughIntro} speed={13} />
        </motion.div>

        {/* "Maybe It's Me" - Overthinking & Internalizing - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300/90 font-serif bg-neutral-900/30 p-6 sm:p-8 rounded-xl border border-neutral-800/40"
        >
          <TypewriterText text={t.overthinkingAndGaslight} speed={13} />
        </motion.div>

        {/* Accumulation & Avoidance Memory - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif"
        >
          <TypewriterText text={t.accumulationAndAvoidance} speed={13} />
        </motion.div>

        {/* May Memory - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-200 font-serif pt-4"
        >
          <TypewriterText text={t.mayMoment} speed={13} />
        </motion.div>

        {/* The Repeated Pattern: Major Visual Anchors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5 }}
          className="pt-16 pb-8 text-center space-y-8"
        >
          <p className="text-2xl sm:text-3xl md:text-5xl font-serif text-neutral-100 tracking-wide font-light">
            {t.understandAnchor}
          </p>

          <p className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-neutral-200/95 pt-6 font-medium">
            {t.questionAnchor}
          </p>
        </motion.div>

        {/* Transition Doorway: Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="pt-16 text-center"
        >
          <button
            onClick={onUnlockNext}
            className="group relative inline-flex items-center justify-center px-12 py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-light text-neutral-300 border border-neutral-700/60 rounded-full hover:border-neutral-400 hover:text-white transition-all duration-500 hover:scale-[1.03] bg-neutral-900/30 backdrop-blur-sm shadow-lg shadow-black/40 cursor-pointer"
          >
            <span>Continue</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
