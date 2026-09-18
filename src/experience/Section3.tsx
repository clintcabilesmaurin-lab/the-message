import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { transcript } from '../content/transcript';
import { TypewriterText } from '../components/TypewriterText';

interface Section3Props {
  onUnlockNext: () => void;
  onAtmosphereChange?: (atmosphere: 'heavy' | 'spiritual' | 'dawn') => void;
}

export const Section3: React.FC<Section3Props> = ({ onUnlockNext, onAtmosphereChange }) => {
  const [showSpiritualPart, setShowSpiritualPart] = useState(false);
  const t = transcript.section3;

  const handleRevealSpiritual = () => {
    setShowSpiritualPart(true);
    onAtmosphereChange?.('spiritual');
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 max-w-2xl mx-auto font-sans leading-relaxed text-neutral-300">
      <div className="space-y-16 p-6 sm:p-10 rounded-3xl letter-paper-backdrop">
        {/* Section 3A: "Maybe I'm Not Enough" */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(8px)', scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-200 leading-relaxed text-center py-6 border-b border-neutral-800/60"
        >
          {t.notEnoughToKeepTogether}
        </motion.div>

        {/* Family Choice & Understanding - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif"
        >
          <TypewriterText text={t.familyChoice} speed={13} />
        </motion.div>

        {/* Avoidant Observation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-400 font-serif italic"
        >
          {t.avoidantObservation}
        </motion.div>

        {/* Section 3B: The Four Core Statements (Quiet Sequence) */}
        <div className="py-12 space-y-10 border-y border-neutral-800/50 my-10">
          {t.fourStatements.map((statement, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -22, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.3, delay: idx * 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl font-serif italic text-neutral-200 text-center tracking-wide px-4"
            >
              {statement}
            </motion.p>
          ))}
        </div>

        {/* Section 3C: "These Were My Interpretations Too" (Reassurance) - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif bg-neutral-900/40 p-6 sm:p-8 rounded-xl border border-neutral-800/60"
        >
          <TypewriterText text={t.notBlaming} speed={13} />
        </motion.div>

        {/* Section 3D: "I'm Tired" Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg text-neutral-400 font-serif"
        >
          {t.tiredIntro}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -26, filter: 'blur(8px)', scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-8"
        >
          <p className="text-4xl sm:text-6xl md:text-7xl font-serif text-neutral-100 italic tracking-wider">
            {t.tiredAnchor}
          </p>
        </motion.div>

        {/* Tired Explanation (Intimate Letter Typewriter) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif"
        >
          <TypewriterText text={t.tiredExplanation} speed={13} />
        </motion.div>

        {/* Major Visual Anchor: "Just because I understand doesn't mean it didn't hurt me." */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(8px)', scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 px-6 sm:px-10 bg-neutral-950/60 rounded-2xl border border-neutral-800/80 text-center shadow-2xl"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-amber-100 font-normal leading-snug">
            {t.itHurtAnchor}
          </p>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg leading-loose text-neutral-400 font-serif"
        >
          {t.reassuranceBeforeBurden}
        </motion.div>

        {/* Doorway to Spiritual Burden */}
        {!showSpiritualPart && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="pt-12 text-center"
          >
            <button
              onClick={handleRevealSpiritual}
              className="group relative inline-flex items-center justify-center px-10 py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-light text-neutral-300 border border-neutral-700/60 rounded-full hover:border-neutral-400 hover:text-white transition-all duration-500 hover:scale-[1.03] bg-neutral-900/30 backdrop-blur-sm shadow-lg shadow-black/40 cursor-pointer"
            >
              <span>{t.doorwayFindOutMore}</span>
            </button>
          </motion.div>
        )}

        {/* Section 3F & 3G: Spiritual Burden & The Cross */}
        <AnimatePresence>
          {showSpiritualPart && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6 }}
              className="space-y-16 pt-8"
            >
              {/* Spiritual walking exhaustion - Typewriter reveal */}
              <div className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif">
                <TypewriterText text={t.spiritualBurden} speed={13} />
              </div>

              <div className="text-lg sm:text-xl font-serif italic text-neutral-400 text-center pt-6">
                {t.thisMoment}
              </div>

              {/* THE CROSS - Major Turning Point from darkness to light */}
              <div className="py-16 text-center space-y-10 border-t border-amber-900/20">
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                  className="text-3xl sm:text-5xl md:text-6xl font-serif text-amber-200/95 tracking-wide font-normal drop-shadow-[0_0_25px_rgba(250,220,150,0.15)]"
                >
                  {t.theCross}
                </motion.p>

                {/* Quiet remembrance sequence */}
                <div className="space-y-5 pt-8 text-neutral-300 font-serif text-xl sm:text-2xl italic">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                  >
                    {t.cried}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                  >
                    {t.forgotJesusDeath}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 2.0 }}
                  >
                    {t.forgotPurpose}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 2.8 }}
                  >
                    {t.forgot}
                  </motion.p>
                </div>
              </div>

              {/* Christ scripture references */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="text-base sm:text-lg leading-loose text-neutral-200 font-serif bg-amber-950/20 p-6 sm:p-8 rounded-xl border border-amber-900/30"
              >
                {t.christReferences}
              </motion.div>

              {/* Romans 8:1 - Relief enters */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="text-xl sm:text-2xl font-serif italic text-amber-100 text-center py-4"
              >
                {t.romans8}
              </motion.div>

              {/* Hebrews 12 / Her Testimony */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="text-base sm:text-lg leading-loose text-neutral-300 font-serif pt-4"
              >
                {t.testimonyHebrews}
              </motion.div>

              {/* Running passage - Typewriter reveal */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="text-base sm:text-lg whitespace-pre-line leading-loose text-neutral-300 font-serif"
              >
                <TypewriterText text={t.runningPassage} speed={13} />
              </motion.div>

              {/* Endurance & Padayun */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif text-amber-200 text-center py-8 border-y border-neutral-800/80"
              >
                {t.endureAnchor}
              </motion.div>

              {/* Doorway to Section 4 */}
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
                  <span>{t.doorwaySection4}</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
