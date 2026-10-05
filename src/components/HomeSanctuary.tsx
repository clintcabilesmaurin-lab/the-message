import React from 'react';
import { motion } from 'motion/react';
import { Feather, Heart, ArrowRight, Sparkles, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { ActiveView } from '../types';
import { BackgroundLayer } from '../atmosphere/BackgroundLayer';
import { transcript } from '../content/transcript';
import { maicaTranscript } from '../content/maicaTranscript';

interface HomeSanctuaryProps {
  onSelectLetter: (view: ActiveView) => void;
}

export const HomeSanctuary: React.FC<HomeSanctuaryProps> = ({ onSelectLetter }) => {
  return (
    <div className="relative min-h-screen text-neutral-200 overflow-x-hidden pt-20 pb-28 px-4 sm:px-8">
      {/* Dynamic Warm Ambient Atmosphere */}
      <BackgroundLayer atmosphere="golden" />

      <main className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/20 backdrop-blur-md text-amber-200 text-xs sm:text-sm font-serif tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>First Anniversary • Love Letter Sanctuary</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* Main Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15 }}
          className="text-center space-y-3 mb-12 sm:mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-neutral-100 tracking-tight leading-tight">
            The Letters Between Us
          </h1>
          <p className="font-hand text-2xl sm:text-3xl text-amber-200/90 tracking-wide">
            Clint Aldwin Maurin & Jamaica Estrallanes (Maica)
          </p>
        </motion.div>

        {/* Dual Translucent Letter Glass Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {/* Card 1: Clint's Message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            onClick={() => onSelectLetter('clint')}
            className="group relative cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden border border-amber-300/20 bg-white/[0.035] hover:bg-white/[0.07] backdrop-blur-2xl hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(251,191,36,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            {/* Ambient Corner Translucent Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/25 transition-all duration-500" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-amber-400/15 text-amber-200 border border-amber-300/30 backdrop-blur-md">
                <Feather className="w-3 h-3 text-amber-300" />
                The Message
              </span>
              <span className="text-xs font-serif text-neutral-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-500" />
                His Letter
              </span>
            </div>

            {/* Title & Author */}
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-medium tracking-wide mb-2 group-hover:text-amber-100 transition-colors">
              "Upon nag write ko ani..."
            </h2>
            <p className="text-xs uppercase tracking-widest text-amber-300/70 font-sans mb-4">
              Written by Clint to Maica
            </p>

            {/* Excerpt quote */}
            <blockquote className="font-serif italic text-neutral-300/90 text-sm sm:text-base leading-relaxed border-l-2 border-amber-400/40 pl-3.5 my-4 bg-white/[0.02] p-2.5 rounded-r-xl backdrop-blur-sm">
              “Just because I understand doesn't mean it didn't hurt me... But even if I'm tired I must endure. Pls allow me to be yours for tomorrow and forever. PADAYUN TA.”
            </blockquote>

            {/* Highlights Tags */}
            <div className="flex flex-wrap gap-1.5 my-5 text-[11px] font-sans text-neutral-300">
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">Vulnerability</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">The Cross</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">Hebrews 12</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">1st Anniversary</span>
            </div>

            {/* Button */}
            <div className="pt-2 flex items-center justify-between text-amber-200 group-hover:text-amber-100 font-serif text-sm">
              <span className="flex items-center gap-1 tracking-wide font-medium">
                Enter Clint's Letter Experience
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </motion.div>

          {/* Card 2: Maica's Response */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.45 }}
            onClick={() => onSelectLetter('maica')}
            className="group relative cursor-pointer rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden border border-rose-300/20 bg-white/[0.035] hover:bg-white/[0.07] backdrop-blur-2xl hover:border-rose-400/50 hover:shadow-[0_20px_50px_rgba(244,63,94,0.18),inset_0_1px_2px_rgba(255,255,255,0.25)] hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
          >
            {/* Ambient Corner Translucent Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-rose-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-400/25 transition-all duration-500" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header info */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-rose-500/20 text-rose-200 border border-rose-400/35 backdrop-blur-md">
                <Heart className="w-3 h-3 text-rose-300 fill-rose-300/30" />
                Her Response
              </span>
              <span className="text-xs font-serif text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-neutral-500" />
                Her Reply
              </span>
            </div>

            {/* Title & Author */}
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-medium tracking-wide mb-2 group-hover:text-rose-100 transition-colors">
              "Happy 1st anniversary, lovey ko..."
            </h2>
            <p className="text-xs uppercase tracking-widest text-rose-300/70 font-sans mb-4">
              Written by Maica (Jamaica) to Clint
            </p>

            {/* Excerpt quote */}
            <blockquote className="font-serif italic text-neutral-300/90 text-sm sm:text-base leading-relaxed border-l-2 border-rose-400/40 pl-3.5 my-4 bg-white/[0.02] p-2.5 rounded-r-xl backdrop-blur-sm">
              “YOU ARE ENOUGH, MY LOVES. Bisan pa sa katong mga challenges sauna nato, we still chose each other, we still stayed, and we still continued... kita ni grow, ni stay, and ni padayun.”
            </blockquote>

            {/* Highlights Tags */}
            <div className="flex flex-wrap gap-1.5 my-5 text-[11px] font-sans text-neutral-300">
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">Grade 11 & 12 Memories</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">A Warm Hug</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">You Are Enough</span>
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-sm">Staying & Continuing</span>
            </div>

            {/* Button */}
            <div className="pt-2 flex items-center justify-between text-rose-200 group-hover:text-rose-100 font-serif text-sm">
              <span className="flex items-center gap-1 tracking-wide font-medium">
                Enter Maica's Letter Experience
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </motion.div>
        </div>

        {/* Narrative Journey Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-5xl rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-12 mb-14 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
        >
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light">
              Our Story Through the Seasons
            </h3>
            <p className="font-hand text-xl text-amber-200/80 mt-1">
              "Choya sa atung love story no? Niya Karun one year na ta, baby ko."
            </p>
          </div>

          <div className="relative border-l border-amber-300/20 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-400 border-4 border-neutral-950 shadow-md" />
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-300/80">
                  Grade 11 • The Beginning
                </span>
                <h4 className="font-serif text-lg text-neutral-100">
                  Admiring in Silence & Walking Home
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif">
                  Stolen glances across the classroom. Walking home together after school and talking about anything and everything.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-300 border-4 border-neutral-950 shadow-md" />
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-300/80">
                  Grade 12 • Deepening Bonds
                </span>
                <h4 className="font-serif text-lg text-neutral-100">
                  Chatting & Hatod sa Balay
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif">
                  Late chats, shared laughs, and walking her home safely after class. Feelings turning into unspoken devotion.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-rose-400 border-4 border-neutral-950 shadow-md" />
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-widest text-rose-300/80">
                  The Challenges • Overthinking & Avoidance
                </span>
                <h4 className="font-serif text-lg text-neutral-100">
                  The Doubts & The Burden of Understanding
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif">
                  Misunderstandings and personal battles. Clint feeling not enough in silence, and Maica retreating into avoidance out of doubt.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-200 border-4 border-neutral-950 shadow-md" />
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-200">
                  The Turning Point • Calvary & Open Hearts
                </span>
                <h4 className="font-serif text-lg text-neutral-100">
                  Remembering the Cross & "You Are Enough"
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-serif">
                  Finding grace and endurance in Christ. Clint laying down his heart honestly, and Maica wrapping him in unconditional validation: <span className="text-rose-200 italic font-semibold">"YOU ARE ENOUGH, MY LOVES."</span>
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-amber-400 ring-4 ring-amber-400/30 border-4 border-neutral-950 shadow-md" />
              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-widest text-amber-300 font-semibold">
                  1st Anniversary • Today & Forever
                </span>
                <h4 className="font-serif text-lg text-amber-100 font-medium">
                  "Kita ni grow, ni stay, and ni padayun"
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-serif">
                  Choosing each other through every trial. Not letting the past weigh down the present, but stepping into the future hand in hand.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bottom Quick Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => onSelectLetter('clint')}
            className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-400/30 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl flex items-center gap-2 hover:border-amber-400/60"
          >
            <Feather className="w-4 h-4 text-amber-300" />
            <span>Read Clint's Letter First</span>
          </button>

          <button
            onClick={() => onSelectLetter('maica')}
            className="px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-rose-200 border border-rose-400/30 font-serif text-sm tracking-wide transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl flex items-center gap-2 hover:border-rose-400/60"
          >
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300/30" />
            <span>Read Maica's Response</span>
          </button>
        </motion.div>
      </main>
    </div>
  );
};
