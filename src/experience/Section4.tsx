import React from 'react';
import { motion } from 'motion/react';
import { transcript } from '../content/transcript';
import { TypewriterText } from '../components/TypewriterText';

interface Section4Props {
  onUnlockNext: () => void;
}

export const Section4: React.FC<Section4Props> = ({ onUnlockNext }) => {
  const t = transcript.section4;

  const handleContinue = () => {
    onUnlockNext();
  };

  return (
    <div className="relative min-h-screen py-24 px-4 sm:px-6 max-w-2xl mx-auto font-sans leading-relaxed text-neutral-200">
      <div className="space-y-16 p-6 sm:p-10 rounded-3xl letter-paper-backdrop">
        {/* Playful Opening - Warm relief after Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="space-y-3 text-neutral-300 font-serif text-lg sm:text-xl"
        >
          <p>{t.introPlayful1}</p>
          <p className="text-neutral-400 italic">{t.introPlayful2}</p>
        </motion.div>

        {/* Dignity and family values - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg leading-loose text-neutral-200 font-serif"
        >
          <TypewriterText text={t.valuesAndFamily} speed={13} />
        </motion.div>

        {/* "YOU CARE" - Visually strong typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.4 }}
          className="py-10 text-center"
        >
          <p className="text-4xl sm:text-6xl md:text-7xl font-serif text-emerald-200/95 tracking-wider font-semibold">
            {t.youCare}
          </p>
        </motion.div>

        {/* How you love - Genuine & deep - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg leading-loose text-neutral-200 font-serif"
        >
          <TypewriterText text={t.howYouLove} speed={13} />
        </motion.div>

        {/* Hidden love - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg leading-loose text-neutral-200 font-serif bg-emerald-950/20 p-6 sm:p-8 rounded-xl border border-emerald-900/30"
        >
          <TypewriterText text={t.hiddenLove} speed={13} />
        </motion.div>

        {/* Honest Tension: "And kana 😊" & "Your other side..." */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-center pt-8 space-y-6"
        >
          <p className="text-3xl sm:text-4xl font-serif text-amber-200">
            {t.honestTransition}
          </p>

          <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-neutral-300">
            {t.terrifyingOtherSide}
          </p>
        </motion.div>

        {/* Emotional Contrast Peak */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(8px)', scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-10 px-6 sm:px-10 bg-amber-950/25 rounded-2xl border border-amber-800/40 text-center shadow-xl"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-100 font-medium leading-relaxed">
            {t.greenflagsValuable}
          </p>
        </motion.div>

        {/* Not just basta */}
        <motion.div
          initial={{ opacity: 0, x: -22, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center pt-4"
        >
          <p className="text-2xl sm:text-3xl font-serif text-neutral-200 tracking-wide">
            {t.notJustBasta}
          </p>
        </motion.div>

        {/* Uniqueness & Rarity - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg leading-loose text-neutral-200 font-serif text-center"
        >
          <TypewriterText text={t.rareUniqueness} speed={13} />
        </motion.div>

        {/* Doorway to Section 5 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="pt-16 text-center"
        >
          <button
            onClick={handleContinue}
            className="group relative inline-flex items-center justify-center px-12 py-3.5 text-sm uppercase tracking-[0.25em] font-sans font-light text-neutral-300 border border-neutral-700/60 rounded-full hover:border-amber-300/80 hover:text-amber-100 transition-all duration-500 hover:scale-[1.03] bg-neutral-900/40 backdrop-blur-sm shadow-lg shadow-black/40 cursor-pointer"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400/80 animate-ping mr-3" />
            <span className="tracking-[0.25em]">Continue</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
