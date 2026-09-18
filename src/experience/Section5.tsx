import React from 'react';
import { motion } from 'motion/react';
import { transcript } from '../content/transcript';
import { TypewriterText } from '../components/TypewriterText';
import { Signature } from '../components/Signature';
import { PortalDoorway } from '../components/PortalDoorway';

interface Section5Props {
  onNearEnd: () => void;
}

export const Section5: React.FC<Section5Props> = ({ onNearEnd }) => {
  const t = transcript.section5;

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 max-w-2xl mx-auto font-sans leading-relaxed text-amber-50">
      <div className="space-y-16 p-6 sm:p-10 rounded-3xl letter-paper-backdrop border-amber-500/10">
        {/* Section 5A: The Anniversary Reveal */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: 'blur(10px)', scale: 0.94 }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-12 space-y-6"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-amber-200 tracking-wide font-normal drop-shadow-[0_0_30px_rgba(251,191,36,0.2)]">
            {t.anniversaryReveal}
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-amber-100/90">
            {t.gulatKa}
          </p>
        </motion.div>

        {/* Section 5B: The Tide Joke - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-amber-100/90 font-serif bg-amber-950/20 p-6 sm:p-8 rounded-2xl border border-amber-900/30 text-center sm:text-left"
        >
          <TypewriterText text={t.tideJoke} speed={13} />
        </motion.div>

        {/* Section 5C: One Year */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-lg sm:text-xl leading-relaxed text-amber-200 font-serif text-center"
        >
          {t.firstYearCelebration}
        </motion.div>

        {/* Section 5D & 5E: Reconciliation ("That Was Then") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="space-y-6 pt-4"
        >
          <p className="text-xl sm:text-2xl font-serif text-amber-200/90 whitespace-pre-line text-center">
            {t.reconcileIntro}
          </p>

          {/* Typewriter reveal for intimate reconciliation */}
          <div className="text-base sm:text-lg whitespace-pre-line leading-loose text-amber-50/90 font-serif bg-neutral-950/40 p-6 sm:p-8 rounded-xl border border-amber-900/20">
            <TypewriterText text={t.reconciliationContent} speed={13} />
          </div>
        </motion.div>

        {/* Section 5F: Gratitude & Promises - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-amber-50 font-serif"
        >
          <TypewriterText text={t.gratitudeAndPromises} speed={13} />
        </motion.div>

        {/* Section 5H: When Hard Days Come Again - Typewriter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2 }}
          className="text-base sm:text-lg whitespace-pre-line leading-loose text-amber-100/95 font-serif bg-amber-950/30 p-6 sm:p-8 rounded-xl border border-amber-800/30"
        >
          <TypewriterText text={t.hardDaysCommitment} speed={13} />
        </motion.div>

        {/* Section 5I: Final Declaration to Jamaica Estrallanes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.4 }}
          className="py-10 px-6 sm:px-10 bg-amber-900/20 rounded-2xl border border-amber-600/30 text-center space-y-6 shadow-2xl"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-serif leading-relaxed text-amber-100">
            {t.finalDeclaration}
          </p>
        </motion.div>

        {/* Section 5J: The Final Thank You */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.4 },
          }}
          onViewportEnter={() => onNearEnd()}
          viewport={{ once: true, margin: '-40px' }}
          className="text-center pt-8 pb-4"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-200/90 leading-snug">
            {t.finalThankYou}
          </p>
        </motion.div>

        {/* FINAL MOMENT: Silence, Warm Background, Minimal Movement */}
        <motion.div
          initial={{ opacity: 0, x: -28, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pt-24 pb-32 text-center space-y-12"
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-widest text-amber-200 font-light drop-shadow-[0_0_35px_rgba(251,191,36,0.3)]">
            {t.padayunTa}
          </h2>

          <div className="space-y-4 pt-6">
            <p className="text-xl sm:text-2xl font-serif text-amber-100/80">
              {t.playfulEnding}
            </p>
            <p className="text-2xl sm:text-3xl font-serif text-amber-200/90">
              {t.closingKisses}
            </p>
          </div>

          {/* Personal handwritten signature using 'Caveat' font */}
          <Signature
            signOff="Always and forever yours,"
            name="Clint Aldwin Maurin"
            dedication="Your Companion BF • For Jamaica, my Lovey"
          />

          {/* Portal Doorway to World of Letters */}
          <PortalDoorway />
        </motion.div>
      </div>
    </div>
  );
};
