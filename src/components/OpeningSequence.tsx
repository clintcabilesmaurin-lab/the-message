import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { transcript } from '../content/transcript';

interface OpeningSequenceProps {
  onBeginReading?: () => void;
}

/**
 * Opening Sequence in MessageShell
 * Renders the initial lines ('I'm tired. 😔', 'Kapoy na. 😔') one by one
 * with a 4-second delay for each, using GSAP to animate opacity and scale.
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

    // Set initial GSAP states: hidden, scaled down
    gsap.set([line1Ref.current, line2Ref.current], {
      opacity: 0,
      scale: 0.85,
      y: 10,
    });

    if (scrollPromptRef.current) {
      gsap.set(scrollPromptRef.current, {
        opacity: 0,
        y: 20,
      });
    }

    // Timeline for one-by-one rendering with 4-second delay
    const tl = gsap.timeline({
      onComplete: () => {
        setIsCompleted(true);
        setStep(3);
      },
    });
    timelineRef.current = tl;

    // Render Line 1 with GSAP opacity and scale
    tl.to(line1Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.6,
      ease: 'power2.out',
      onStart: () => setStep(1),
    })
      // 5-second pause after line 1 as requested
      .to({}, { duration: 5 })
      // Render Line 2 with GSAP opacity and scale
      .to(line2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.6,
        ease: 'power2.out',
        onStart: () => setStep(2),
      })
      // 5-second pause before showing scroll prompt
      .to(
        scrollPromptRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '+=5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSkipOrProceed = () => {
    if (!isCompleted && timelineRef.current) {
      timelineRef.current.progress(1);
      setIsCompleted(true);
      setStep(3);
    } else {
      onBeginReading?.();
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkipOrProceed}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center select-none cursor-pointer overflow-hidden"
    >
      {/* Ambient background vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950/90 pointer-events-none" />

      {/* Main typography container */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-12">
        {/* Line 1 */}
        <h1
          ref={line1Ref}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-100 font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
        >
          {line1Text}
        </h1>

        {/* Line 2 */}
        <h2
          ref={line2Ref}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-300/95 font-light tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
        >
          {line2Text}
        </h2>
      </div>

      {/* Interactive prompt to proceed down into the unfolding letter */}
      <div
        ref={scrollPromptRef}
        className="absolute bottom-12 z-20 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors"
      >
        <span className="font-sans text-xs tracking-[0.25em] uppercase text-neutral-400 font-light">
          Scroll to enter the message
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-200/80" />
      </div>

      {/* Skip button for re-visitors */}
      {!isCompleted && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkipOrProceed();
          }}
          className="absolute top-8 right-8 z-30 text-xs text-white/30 hover:text-white/70 tracking-widest uppercase transition-colors px-3 py-1.5 rounded-full border border-white/5"
        >
          Skip intro
        </button>
      )}
    </div>
  );
};
