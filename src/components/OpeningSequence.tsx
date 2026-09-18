import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ChevronDown, ArrowDown } from 'lucide-react';
import { transcript } from '../content/transcript';

interface OpeningSequenceProps {
  onBeginReading?: () => void;
}

/**
 * Opening Sequence in MessageShell
 * Gives the initial vulnerability ("I'm tired. 😔", "Kapoy na. 😔") ample, calm screen time
 * before smoothly transitioning the reader into "Upon nag write ko ani..." in Section 1.
 */
export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onBeginReading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [step, setStep] = useState<number>(0); // 0: start, 1: line 1, 2: line 2, 3: completed
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const line1Text = transcript.section1.tired; // "I'm tired. 😔"
  const line2Text = transcript.section1.kapoy; // "Kapoy na. 😔"

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current) return;

    // Set initial GSAP states: hidden, subtle scale
    gsap.set([line1Ref.current, line2Ref.current], {
      opacity: 0,
      scale: 0.92,
      y: 12,
    });

    if (scrollPromptRef.current) {
      gsap.set(scrollPromptRef.current, {
        opacity: 0,
        y: 16,
      });
    }

    // Timeline with generous reading time for "I'm tired. 😔"
    const tl = gsap.timeline({
      onComplete: () => {
        setIsCompleted(true);
        setStep(3);
      },
    });
    timelineRef.current = tl;

    // 1. Line 1 ("I'm tired. 😔") enters tenderly
    tl.to(line1Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 2.0,
      ease: 'power2.out',
      onStart: () => setStep(1),
    })
      // Ample 6.5-second hold time so the reader can absorb and feel the words
      .to({}, { duration: 6.5 })

      // 2. Line 2 ("Kapoy na. 😔") enters gently below
      .to(line2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        ease: 'power2.out',
        onStart: () => setStep(2),
      })
      // 5.5-second hold time for both lines together
      .to({}, { duration: 5.5 })

      // 3. Smooth emergence of the transition invitation to "Upon nag write ko ani..."
      .to(scrollPromptRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power2.out',
      });

    return () => {
      tl.kill();
    };
  }, []);

  const handleSkipIntro = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setIsCompleted(true);
    setStep(3);
    if (scrollPromptRef.current) {
      gsap.to(scrollPromptRef.current, { opacity: 1, y: 0, duration: 0.4 });
    }
  };

  const handleProceed = () => {
    onBeginReading?.();
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center select-none overflow-hidden"
    >
      {/* Ambient background vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none" />

      {/* Main typography container */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-12">
        {/* The Theme Wax Seal Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
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

        {/* Line 1: "I'm tired. 😔" */}
        <h1
          ref={line1Ref}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-100 font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all"
        >
          {line1Text}
        </h1>

        {/* Line 2: "Kapoy na. 😔" */}
        <h2
          ref={line2Ref}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-300/95 font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all"
        >
          {line2Text}
        </h2>
      </div>

      {/* Interactive transition prompt to enter Section 1: "Upon nag write ko ani..." */}
      <div
        ref={scrollPromptRef}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-3 transition-all"
      >
        <button
          onClick={handleProceed}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-amber-950/40 hover:bg-amber-900/50 border border-amber-400/30 shadow-[0_0_25px_rgba(251,191,36,0.2)] hover:shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-all duration-300 cursor-pointer text-amber-100"
        >
          <span className="font-serif text-sm sm:text-base tracking-wide font-normal">
            Enter letter • <span className="italic text-amber-200">Upon nag write ko ani...</span>
          </span>
          <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-neutral-500 font-light">
          Click or scroll down to continue reading
        </span>
      </div>

      {/* Skip button for quick review */}
      {!isCompleted && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-8 right-8 z-30 text-xs text-white/30 hover:text-white/70 tracking-widest uppercase transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 cursor-pointer"
        >
          Skip intro
        </button>
      )}
    </div>
  );
};
