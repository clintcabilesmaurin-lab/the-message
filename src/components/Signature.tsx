import React from 'react';
import { motion } from 'motion/react';

interface SignatureProps {
  signOff?: string;
  name?: string;
  dedication?: string;
  className?: string;
}

/**
 * Signature component
 * Renders a handwritten sign-off using the 'Caveat' font at the bottom of the final section,
 * featuring an animated pen flourish underline to add an intimate, personal touch.
 */
export const Signature: React.FC<SignatureProps> = ({
  signOff = 'Always and forever yours,',
  name = 'Clint Aldwin Maurin',
  dedication = 'Your Companion BF • For Jamaica, my Lovey',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className={`pt-16 pb-8 flex flex-col items-center sm:items-end sm:pr-8 select-none ${className}`}
    >
      <div className="relative inline-flex flex-col items-center sm:items-start -rotate-1 hover:rotate-0 transition-transform duration-500">
        {/* Handwritten sign-off text */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-hand text-2xl sm:text-3xl text-amber-200/80 tracking-wide font-normal"
        >
          {signOff}
        </motion.p>

        {/* Handwritten Name / Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative mt-1 mb-2"
        >
          <span className="font-hand text-5xl sm:text-6xl md:text-7xl font-semibold text-amber-100 tracking-wider drop-shadow-[0_2px_12px_rgba(251,191,36,0.25)]">
            {name}
          </span>
          <span className="font-hand text-3xl sm:text-4xl text-amber-300/80 ml-2">
            ♡
          </span>

          {/* Handwritten ink flourish underline */}
          <svg
            className="w-full h-5 text-amber-300/60 -mt-1 overflow-visible"
            viewBox="0 0 200 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 5 12 Q 60 18, 120 10 T 195 14"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.8, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Handwritten Dedication / Date */}
        {dedication && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="font-hand text-lg sm:text-xl text-amber-200/70 tracking-wide mt-1"
          >
            {dedication}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
