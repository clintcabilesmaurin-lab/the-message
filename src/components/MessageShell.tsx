import React, { useState, useEffect, useRef } from 'react';
import { SectionKey, Atmosphere } from '../types';
import { BackgroundLayer } from '../atmosphere/BackgroundLayer';
import { MessageAudio } from '../audio/MessageAudio';
import { Section1 } from '../experience/Section1';
import { Section2 } from '../experience/Section2';
import { Section3 } from '../experience/Section3';
import { Section4 } from '../experience/Section4';
import { Section5 } from '../experience/Section5';
import { CinematicBlock } from './CinematicBlock';
import { transcript } from '../content/transcript';

export { CinematicBlock } from './CinematicBlock';

export const MessageShell: React.FC = () => {
  const [unlockedSections, setUnlockedSections] = useState<SectionKey[]>(['s1']);
  const [activeSection, setActiveSection] = useState<SectionKey>('s1');
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('dark');
  const [isNearEnd, setIsNearEnd] = useState(false);

  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);
  const section5Ref = useRef<HTMLDivElement | null>(null);

  // Section atmosphere mapping
  useEffect(() => {
    switch (activeSection) {
      case 's1':
        setAtmosphere('dark');
        break;
      case 's2':
        setAtmosphere('cold');
        break;
      case 's3':
        setAtmosphere('heavy');
        break;
      case 's4':
        setAtmosphere('warm');
        break;
      case 's5':
        setAtmosphere('golden');
        break;
    }
  }, [activeSection]);

  const unlockAndScrollTo = (next: SectionKey) => {
    if (!unlockedSections.includes(next)) {
      setUnlockedSections((prev) => [...prev, next]);
    }
    setActiveSection(next);

    setTimeout(() => {
      let targetElement: HTMLElement | null = null;
      if (next === 's2') {
        targetElement = document.getElementById('vulnerable-ui') || section2Ref.current;
      } else if (next === 's3') {
        targetElement = section3Ref.current;
      } else if (next === 's4') {
        targetElement = section4Ref.current;
      } else if (next === 's5') {
        targetElement = section5Ref.current;
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Observe which section is currently centered in viewport
  useEffect(() => {
    const handleScroll = () => {
      const refs: [SectionKey, React.RefObject<HTMLDivElement | null>][] = [
        ['s1', section1Ref],
        ['s2', section2Ref],
        ['s3', section3Ref],
        ['s4', section4Ref],
        ['s5', section5Ref],
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (let i = refs.length - 1; i >= 0; i--) {
        const [key, ref] = refs[i];
        if (ref.current && unlockedSections.includes(key)) {
          const top = ref.current.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockedSections]);

  const sectionsList: SectionKey[] = ['s1', 's2', 's3', 's4', 's5'];

  return (
    <div className="relative min-h-screen text-neutral-200 overflow-x-hidden">
      {/* Dynamic Background Atmosphere */}
      <BackgroundLayer atmosphere={atmosphere} />

      {/* Audio Controller - Plays music ONLY on Section 4 */}
      <MessageAudio currentSection={activeSection} isNearEnd={isNearEnd} />

      {/* Minimal Header with Single App Title: "The Message" */}
      <header className="fixed top-6 left-6 z-40 flex items-center gap-6">
        <span className="font-serif text-sm tracking-[0.2em] uppercase text-white/50 select-none">
          The Message
        </span>

        {/* Purely Visual Progress Indicator */}
        <div className="flex items-center gap-1.5 opacity-40 hover:opacity-80 transition-opacity">
          {sectionsList.map((sec) => {
            const isUnlocked = unlockedSections.includes(sec);
            const isCurrent = activeSection === sec;
            return (
              <button
                key={sec}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    let target: React.RefObject<HTMLDivElement | null> | null = null;
                    if (sec === 's1') target = section1Ref;
                    if (sec === 's2') target = section2Ref;
                    if (sec === 's3') target = section3Ref;
                    if (sec === 's4') target = section4Ref;
                    if (sec === 's5') target = section5Ref;
                    target?.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-all duration-500 rounded-full ${
                  isCurrent
                    ? 'w-5 h-1.5 bg-amber-200/90'
                    : isUnlocked
                    ? 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                    : 'w-1.5 h-1.5 bg-white/15'
                }`}
                aria-label="Progress Indicator"
              />
            );
          })}
        </div>
      </header>

      {/* Unfolding continuous reading stream */}
      <main className="w-full">
        {/* Section 1: Continuous unfolding letter starting from I'm tired and Kapoy na */}
        <div ref={section1Ref} id="section-1">
          <Section1 onUnlockNext={() => unlockAndScrollTo('s2')} />
        </div>

        {/* Section 2 */}
        {unlockedSections.includes('s2') && (
          <div ref={section2Ref} id="section-2" className="transition-opacity duration-1000">
            {/* Major Emotional Moment: Vulnerable UI with 3-second line-by-line reveal */}
            <div id="vulnerable-ui" className="max-w-2xl mx-auto px-6 pt-16 scroll-mt-10">
              <CinematicBlock
                id="cinematic-vulnerability"
                title="Vulnerability"
                subtitle="The unspoken thoughts that lingered in the silence"
                durationPerLine={3000}
                lines={[
                  transcript.section3.fourStatements[0],
                  transcript.section3.fourStatements[1],
                  transcript.section3.fourStatements[2],
                  transcript.section3.fourStatements[3],
                  transcript.section3.itHurtAnchor,
                ]}
                accentQuote={true}
              />
            </div>

            <Section2 onUnlockNext={() => unlockAndScrollTo('s3')} />
          </div>
        )}

        {/* Section 3 */}
        {unlockedSections.includes('s3') && (
          <div ref={section3Ref} id="section-3" className="transition-opacity duration-1000">
            <Section3
              onUnlockNext={() => unlockAndScrollTo('s4')}
              onAtmosphereChange={(newAtm) => setAtmosphere(newAtm)}
            />
          </div>
        )}

        {/* Major Emotional Moment: CinematicBlock for the Cross Revelation */}
        {unlockedSections.includes('s4') && (
          <div className="max-w-2xl mx-auto px-6">
            <CinematicBlock
              id="cinematic-cross"
              title="The Turning Point"
              subtitle="Remembering the Cross & Endurance"
              durationPerLine={3000}
              lines={[
                transcript.section3.thisMoment,
                transcript.section3.theCross,
                transcript.section3.cried,
                transcript.section3.forgotJesusDeath,
                transcript.section3.forgotPurpose,
                transcript.section3.forgot,
                transcript.section3.romans8,
                transcript.section3.endureAnchor,
              ]}
              accentQuote={false}
            />
          </div>
        )}

        {/* Section 4: Music plays ONLY in this section */}
        {unlockedSections.includes('s4') && (
          <div ref={section4Ref} id="section-4" className="transition-opacity duration-1000">
            <Section4 onUnlockNext={() => unlockAndScrollTo('s5')} />
          </div>
        )}

        {/* Section 5: The Anniversary Celebration & Promise */}
        {unlockedSections.includes('s5') && (
          <div ref={section5Ref} id="section-5" className="transition-opacity duration-1000">
            <div className="max-w-2xl mx-auto px-6">
              <CinematicBlock
                id="cinematic-anniversary"
                title="A Lifetime Promise"
                subtitle="Looking forward together"
                durationPerLine={3000}
                lines={[
                  transcript.section5.anniversaryReveal,
                  "Youre the only one girl, i want in my Life, Jamaica Estrallanes, I love you.☺️",
                  "pls allow me to be yours for tomorrow and for ever, I love you soo much baby ko",
                  "Thank you soo much Jamaica Estrallanes, Love, Lovey, I love you soo mucch 🤗🤭☺️,",
                  "PADAYUN TA",
                ]}
                accentQuote={true}
              />
            </div>
            <Section5 onNearEnd={() => setIsNearEnd(true)} />
          </div>
        )}
      </main>
    </div>
  );
};
