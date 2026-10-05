import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Feather, ArrowLeft, ArrowRight, Sparkles, Check, Smile, Music, Eye, EyeOff } from 'lucide-react';
import { Atmosphere } from '../types';
import { BackgroundLayer } from '../atmosphere/BackgroundLayer';
import { maicaTranscript } from '../content/maicaTranscript';
import { InkPenWritingText } from './InkPenWritingText';
import { StaggeredSentence } from './StaggeredSentence';
import { CinematicBlock } from './CinematicBlock';
import { soundtrack } from '../audio/soundtrack';

interface MaicaLetterShellProps {
  onBackToHome: () => void;
  onGoToClintLetter: () => void;
}

export const MaicaLetterShell: React.FC<MaicaLetterShellProps> = ({
  onBackToHome,
  onGoToClintLetter,
}) => {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('rose');
  const [unlockedSections, setUnlockedSections] = useState<number[]>([1]);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [hasStartedInk, setHasStartedInk] = useState<boolean>(true);
  const [isInkFinished, setIsInkFinished] = useState<boolean>(false);
  const [isMusicExpanded, setIsMusicExpanded] = useState<boolean>(true);

  // Stop background piano synth so the YouTube song plays cleanly
  useEffect(() => {
    if (soundtrack.getIsPlaying()) {
      soundtrack.stop(0.5);
    }
  }, []);

  const t = maicaTranscript;

  const sec1Ref = useRef<HTMLDivElement | null>(null);
  const sec2Ref = useRef<HTMLDivElement | null>(null);
  const sec3Ref = useRef<HTMLDivElement | null>(null);
  const sec4Ref = useRef<HTMLDivElement | null>(null);
  const sec5Ref = useRef<HTMLDivElement | null>(null);

  // Section atmosphere mapping
  useEffect(() => {
    switch (activeSection) {
      case 1:
        setAtmosphere('rose');
        break;
      case 2:
        setAtmosphere('tender');
        break;
      case 3:
        setAtmosphere('cold');
        break;
      case 4:
        setAtmosphere('warm');
        break;
      case 5:
        setAtmosphere('golden');
        break;
    }
  }, [activeSection]);

  // Section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const refs = [
        { id: 1, ref: sec1Ref },
        { id: 2, ref: sec2Ref },
        { id: 3, ref: sec3Ref },
        { id: 4, ref: sec4Ref },
        { id: 5, ref: sec5Ref },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = refs.length - 1; i >= 0; i--) {
        const item = refs[i];
        if (item.ref.current && unlockedSections.includes(item.id)) {
          const top = item.ref.current.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockedSections]);

  const unlockNextSection = (secNum: number) => {
    if (!unlockedSections.includes(secNum)) {
      setUnlockedSections((prev) => [...prev, secNum]);
    }
    setActiveSection(secNum);

    setTimeout(() => {
      let targetRef: React.RefObject<HTMLDivElement | null> | null = null;
      if (secNum === 2) targetRef = sec2Ref;
      if (secNum === 3) targetRef = sec3Ref;
      if (secNum === 4) targetRef = sec4Ref;
      if (secNum === 5) targetRef = sec5Ref;

      targetRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen text-neutral-200 overflow-x-hidden pt-20 pb-32">
      {/* Dynamic Background Atmosphere */}
      <BackgroundLayer atmosphere={atmosphere} />

      {/* Floating Section Progress Indicator */}
      <aside className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
        {[1, 2, 3, 4, 5].map((num) => {
          const isUnlocked = unlockedSections.includes(num);
          const isCurrent = activeSection === num;
          return (
            <button
              key={num}
              disabled={!isUnlocked}
              onClick={() => {
                let target: React.RefObject<HTMLDivElement | null> | null = null;
                if (num === 1) target = sec1Ref;
                if (num === 2) target = sec2Ref;
                if (num === 3) target = sec3Ref;
                if (num === 4) target = sec4Ref;
                if (num === 5) target = sec5Ref;
                target?.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-all duration-300 rounded-full flex items-center justify-center text-[10px] font-serif ${
                isCurrent
                  ? 'w-6 h-6 bg-rose-400 text-neutral-950 font-bold shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                  : isUnlocked
                  ? 'w-4 h-4 bg-white/40 hover:bg-white/70 text-transparent'
                  : 'w-2.5 h-2.5 bg-white/10 text-transparent'
              }`}
              title={`Section ${num}`}
            >
              {isCurrent ? num : ''}
            </button>
          );
        })}
      </aside>

      <main className="max-w-4xl lg:max-w-5xl mx-auto px-6 sm:px-10">
        {/* SECTION 1: THE GREETING & GRADE 11/12 MEMORIES */}
        <section ref={sec1Ref} id="maica-sec-1" className="min-h-[85vh] flex flex-col justify-center pt-8 pb-16">
          {/* Section Chapter Header */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-widest bg-rose-500/15 text-rose-300 border border-rose-400/30 backdrop-blur-md">
              <Heart className="w-3 h-3 text-rose-300 fill-rose-300/40" />
              Her Response • 1st Anniversary
            </span>
          </div>

          {/* Maica's Special Song • Translucent Glass Music Player */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="mb-10 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-rose-300/25 p-4 sm:p-6 shadow-[0_20px_50px_rgba(244,63,94,0.18),inset_0_1px_1px_rgba(255,255,255,0.2)]"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shadow-inner">
                  <Music className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans text-rose-300 font-medium">
                      Maica's Letter Soundtrack
                    </span>
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-2.5 bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 h-3.5 bg-rose-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 h-2 bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-base text-rose-100 font-normal">
                    Listen while reading her response
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setIsMusicExpanded((prev) => !prev)}
                className="px-3 py-1.5 rounded-full text-xs font-serif text-rose-200 bg-white/5 hover:bg-white/10 border border-rose-400/20 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-sm"
              >
                {isMusicExpanded ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-rose-300" />
                    <span className="hidden sm:inline">Minimize</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-rose-300" />
                    <span className="hidden sm:inline">Show Player</span>
                  </>
                )}
              </button>
            </div>

            {/* Responsive YouTube Player Iframe */}
            <div
              className={`transition-all duration-500 overflow-hidden ${
                isMusicExpanded ? 'opacity-100 max-h-[380px] mt-2' : 'opacity-0 max-h-0 pointer-events-none'
              }`}
            >
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/_TNwN92mw6E?si=gF15J3tXMaFR7-KV&autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            {!isMusicExpanded && (
              <p className="text-xs text-rose-200/80 font-serif italic pt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                The music is currently playing in the background while you read.
              </p>
            )}
          </motion.div>

          {/* Real-time Ink Pen Nib for Maica's Opening Greeting */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-rose-100 font-light leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              <InkPenWritingText
                text={t.section1.greeting}
                isWriting={hasStartedInk}
                speed={48}
                onComplete={() => setIsInkFinished(true)}
              />
            </h1>
          </div>

          {/* Staggered entrance for her opening message */}
          <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-serif leading-relaxed">
            <StaggeredSentence
              text={t.section1.openingPonder}
              color="text-neutral-300/90"
              fontSize="text-lg sm:text-xl"
              staggerDelay={0.035}
            />

            <StaggeredSentence
              text={t.section1.simpleMessage}
              color="text-neutral-300/85"
              fontSize="text-lg sm:text-xl"
              staggerDelay={0.035}
            />

            <div className="pt-6 border-t border-rose-400/20">
              <StaggeredSentence
                text={t.section1.timePassed}
                color="text-rose-200/95 font-medium"
                fontSize="text-xl sm:text-2xl"
                staggerDelay={0.04}
              />
            </div>

            <StaggeredSentence
              text={t.section1.grade11Memory}
              color="text-neutral-300/90"
              fontSize="text-base sm:text-lg"
              staggerDelay={0.03}
            />

            <StaggeredSentence
              text={t.section1.grade12Memory}
              color="text-neutral-300/90"
              fontSize="text-base sm:text-lg"
              staggerDelay={0.03}
            />

            {/* Special Highlight Callout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-rose-300/25 my-8 text-center shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]"
            >
              <p className="font-hand text-2xl sm:text-3xl text-rose-200">
                "{t.section1.loveStoryRemark}"
              </p>
            </motion.div>
          </div>

          {/* Doorway to Section 2 */}
          {!unlockedSections.includes(2) && (
            <div className="pt-8 text-center">
              <button
                onClick={() => unlockNextSection(2)}
                className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-rose-200 border border-rose-400/30 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl inline-flex items-center gap-2 group hover:border-rose-400/60"
              >
                <span>Continue Reading Her Reaction</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </section>

        {/* SECTION 2: READING HIS LETTER & A HUG ACROSS DISTANCE */}
        {unlockedSections.includes(2) && (
          <section ref={sec2Ref} id="maica-sec-2" className="pt-16 pb-20 border-t border-white/5">
            <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-serif leading-relaxed mb-12">
              <StaggeredSentence
                text={t.section2.oneYearTogether}
                color="text-neutral-200"
                fontSize="text-lg sm:text-xl"
                staggerDelay={0.035}
              />

              <StaggeredSentence
                text={t.section2.challenges}
                color="text-neutral-400 italic"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <div className="pt-4">
                <StaggeredSentence
                  text={t.section2.touchedByLetter}
                  color="text-rose-200 font-medium"
                  fontSize="text-xl sm:text-2xl"
                  staggerDelay={0.04}
                />
              </div>

              <StaggeredSentence
                text={t.section2.hiddenYear}
                color="text-neutral-300/90"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <StaggeredSentence
                text={t.section2.feltHisBurden}
                color="text-neutral-300/90"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <StaggeredSentence
                text={t.section2.introComment}
                color="text-neutral-300/80"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />
            </div>

            {/* Cinematic Block: The Hug & The Understanding */}
            <div className="my-10">
              <CinematicBlock
                id="maica-cinematic-hug"
                title="A Warm Hug Across the Distance"
                subtitle="Her heartfelt reaction to his letter"
                durationPerLine={3000}
                lines={[
                  t.section2.understandQuoteCallback,
                  "If naa lng ko beside you at that moment,",
                  "gusto lang unta nako nga e hug tika ng mahigpit ba hehe",
                  "cute ko nmn baby ko hehe...",
                ]}
                accentQuote={true}
              />
            </div>

            {/* Doorway to Section 3 */}
            {!unlockedSections.includes(3) && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => unlockNextSection(3)}
                  className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-rose-200 border border-rose-400/30 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl inline-flex items-center gap-2 group hover:border-rose-400/60"
                >
                  <span>Continue • Understanding the Past</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: EXPLAINING THE AVOIDANCE & CHOOSING COMMUNICATION */}
        {unlockedSections.includes(3) && (
          <section ref={sec3Ref} id="maica-sec-3" className="pt-16 pb-20 border-t border-white/5">
            <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-serif leading-relaxed mb-10">
              <StaggeredSentence
                text={t.section3.feltSameBefore}
                color="text-amber-100 font-medium"
                fontSize="text-xl sm:text-2xl"
                staggerDelay={0.04}
              />

              <p className="text-xs sm:text-sm text-neutral-300 italic bg-white/[0.035] backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-sm">
                {t.section3.disclaimerClarification}
              </p>

              <StaggeredSentence
                text={t.section3.whyAvoidance}
                color="text-neutral-300/90"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <StaggeredSentence
                text={t.section3.effectOnRelationship}
                color="text-neutral-300/90"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-purple-400/25 my-6 shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <StaggeredSentence
                  text={t.section3.communicationSolution}
                  color="text-purple-200"
                  fontSize="text-base sm:text-lg"
                  staggerDelay={0.035}
                />
              </div>

              <StaggeredSentence
                text={t.section3.processAndAdjustment}
                color="text-neutral-200 font-medium"
                fontSize="text-lg sm:text-xl"
                staggerDelay={0.04}
              />
            </div>

            {/* Doorway to Section 4 */}
            {!unlockedSections.includes(4) && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => unlockNextSection(4)}
                  className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-400/30 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl inline-flex items-center gap-2 group hover:border-amber-400/60"
                >
                  <span>Continue • The Truth She Wants You to Know</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION 4: "YOU ARE ENOUGH, MY LOVES" */}
        {unlockedSections.includes(4) && (
          <section ref={sec4Ref} id="maica-sec-4" className="pt-16 pb-20 border-t border-white/5">
            {/* Cinematic Block: Reassurance */}
            <div className="mb-10">
              <CinematicBlock
                id="maica-cinematic-enough"
                title="The Core Reassurance"
                subtitle="Her voice piercing through every fear of inadequacy"
                durationPerLine={3000}
                lines={[
                  t.section4.enoughAffirmation1,
                  "YOU ARE ENOUGH, MY LOVES.",
                  t.section4.appreciationGrade11,
                  "I APPRECIATE ALL YOUR EFFORTS SAUNA UNTIL KARUN. ALWAYS REMEMBER THAT HA? ❤️",
                ]}
                accentQuote={true}
              />
            </div>

            <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-serif leading-relaxed mb-10">
              <StaggeredSentence
                text={t.section4.apologyMayEnd}
                color="text-neutral-300/85"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <div className="p-8 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-amber-300/30 text-center shadow-[0_20px_50px_rgba(251,191,36,0.15),inset_0_1px_2px_rgba(255,255,255,0.2)] my-6">
                <p className="font-sans text-xs uppercase tracking-widest text-amber-300/80 mb-2">
                  Her Promise To You
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-amber-100 font-medium leading-relaxed">
                  "{t.section4.reiterateEnough}"
                </p>
              </div>
            </div>

            {/* Doorway to Section 5 */}
            {!unlockedSections.includes(5) && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => unlockNextSection(5)}
                  className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-100 border border-amber-300/40 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl inline-flex items-center gap-2 group hover:border-amber-300/70"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>The Final Anniversary Blessing</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* SECTION 5: CHOOSING EACH OTHER, STAYING, GROWING & CONTINUING ("PADAYUN") */}
        {unlockedSections.includes(5) && (
          <section ref={sec5Ref} id="maica-sec-5" className="pt-16 pb-24 border-t border-white/5">
            {/* Cinematic Block: 1st Anniversary Climax */}
            <div className="mb-12">
              <CinematicBlock
                id="maica-cinematic-padayun"
                title="Padayun (We Continue)"
                subtitle="Growing together through every season"
                durationPerLine={3000}
                lines={[
                  "We still chose each other, we still stayed, and we still continued...",
                  "Dli ta mag focus sa negative ba instead Atung hunahunaon",
                  "sa kana nga mga negatives kita ni grow , ni stay , and ni padayun...",
                  t.section5.codeAnalogyCallback,
                  t.section5.finalAnniversaryClimax,
                ]}
                accentQuote={false}
              />
            </div>

            <div className="space-y-6 text-neutral-300 text-lg sm:text-xl font-serif leading-relaxed mb-16">
              <StaggeredSentence
                text={t.section5.focusOnFuture}
                color="text-amber-100 font-medium"
                fontSize="text-lg sm:text-2xl"
                staggerDelay={0.04}
              />

              <StaggeredSentence
                text={t.section5.reachedHereNow}
                color="text-neutral-300/90"
                fontSize="text-base sm:text-lg"
                staggerDelay={0.035}
              />

              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-amber-400/25 text-center my-6 shadow-[0_15px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <StaggeredSentence
                  text={t.section5.growthAndLessons}
                  color="text-amber-200 font-serif"
                  fontSize="text-xl sm:text-2xl"
                  staggerDelay={0.04}
                />
              </div>

              {/* Her playful nod to Clint's code analogy */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="p-6 rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/15 font-mono text-sm sm:text-base text-amber-200/90 leading-relaxed my-6 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]"
              >
                <div className="flex items-center gap-2 mb-2 text-xs text-neutral-400 font-sans uppercase tracking-wider">
                  <Smile className="w-3.5 h-3.5 text-amber-300" />
                  <span>The Code Analogy Callback</span>
                </div>
                <p>"{t.section5.codeAnalogyCallback}"</p>
              </motion.div>

              {/* Big Anniversary Greeting Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="py-12 px-6 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-rose-300/35 text-center shadow-[0_25px_60px_rgba(244,63,94,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] my-12"
              >
                <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-4 animate-pulse" />
                <h3 className="font-serif text-3xl sm:text-5xl font-light text-rose-100 tracking-wide mb-3">
                  AGAIN HAPPY 1ST ANNIVERSARY BABY KO
                </h3>
                <p className="text-3xl sm:text-4xl">☺️🤭🥹🥰</p>
              </motion.div>
            </div>

            {/* Handwritten Signature for Maica */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 }}
              className="pt-10 pb-16 flex flex-col items-center sm:items-end sm:pr-8 select-none"
            >
              <div className="relative inline-flex flex-col items-center sm:items-start -rotate-1">
                <p className="font-hand text-2xl sm:text-3xl text-rose-300/90 font-normal">
                  Always choosing you,
                </p>

                <div className="relative mt-1 mb-2">
                  <span className="font-hand text-5xl sm:text-6xl md:text-7xl font-semibold text-rose-100 tracking-wider drop-shadow-[0_2px_12px_rgba(244,63,94,0.3)]">
                    Jamaica Estrallanes
                  </span>
                  <span className="font-hand text-3xl sm:text-4xl text-rose-400 ml-2">
                    (Maica ♡)
                  </span>

                  {/* Ink flourish underline */}
                  <svg
                    className="w-full h-5 text-rose-400/60 -mt-1 overflow-visible"
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
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, delay: 0.3 }}
                    />
                  </svg>
                </div>

                <p className="font-hand text-lg sm:text-xl text-rose-200/70 tracking-wide mt-1">
                  For Clint Aldwin Maurin • 1st Anniversary & Forever
                </p>
              </div>
            </motion.div>

            {/* Bottom Navigation between Letters and Archive */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/15 font-serif text-sm transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Anniversary Archive</span>
              </button>

              <button
                onClick={onGoToClintLetter}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-400/30 font-serif text-sm transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl flex items-center justify-center gap-2 hover:border-amber-400/60"
              >
                <Feather className="w-4 h-4 text-amber-300" />
                <span>Read Clint's Letter Again</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
