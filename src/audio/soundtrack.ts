/**
 * Web Audio Engine for "The Message"
 * Generates an expressive, tender acoustic piano and ambient warmth
 * that matches the gentle, nostalgic, and uplifting piano piece.
 *
 * Automatically handles browser user-gesture requirements and volume fades.
 */

class EmotionalSoundtrack {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private usingExternalAudio = true;
  private hasUserInteracted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const el = new Audio('/music.mp3');
      el.loop = true;
      el.preload = 'auto';
      this.audioEl = el;

      // Listen for initial user gesture to unlock audio if autoplay was blocked
      const unlockAudio = () => {
        this.hasUserInteracted = true;
        if (this.isPlaying && this.audioEl && this.audioEl.paused) {
          this.audioEl.play().catch(() => {});
        }
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
    }
  }

  public setCustomAudioUrl(url: string) {
    if (this.audioEl) {
      this.audioEl.src = url;
      this.usingExternalAudio = true;
      if (this.isPlaying) {
        this.audioEl.play().catch(() => {});
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(targetVolume = 0.5) {
    // If soundtrack is already playing, do NOT restart or reset volume; keep playing seamlessly
    if (this.isPlaying) {
      return;
    }
    this.isPlaying = true;

    // Try HTMLAudioElement with /music.mp3 first
    if (this.audioEl && this.usingExternalAudio) {
      this.audioEl.volume = 0;
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.fadeAudioElement(targetVolume, 2.5);
          })
          .catch(() => {
            // Autoplay blocked by browser until user gesture, or file error
            if (this.hasUserInteracted) {
              this.startSynth(targetVolume);
            }
          });
      }
      return;
    }

    this.startSynth(targetVolume);
  }

  private fadeAudioElement(target: number, duration: number) {
    if (!this.audioEl) return;
    const startVol = this.audioEl.volume;
    const startTime = performance.now();
    const step = () => {
      const now = performance.now();
      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      if (this.audioEl) {
        this.audioEl.volume = startVol + (target - startVol) * progress;
      }
      if (progress < 1 && this.isPlaying) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  private startSynth(targetVolume: number) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Smooth fade in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + 3);

    // Progression of emotive chords in D Major / G Major / B minor
    // Tender piano arpeggios that create the emotional warmth
    const chords = [
      // Dmaj: D3, A3, D4, F#4, A4
      [146.83, 220.00, 293.66, 369.99, 440.00, 587.33],
      // Gmaj: G3, D4, G4, B4, D5
      [98.00, 196.00, 293.66, 392.00, 493.88, 587.33],
      // Bm: B2, F#3, B3, D4, F#4
      [123.47, 185.00, 246.94, 293.66, 369.99, 493.88],
      // A add4 / Asus4: A2, E3, A3, C#4, E4
      [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
      // Gmaj9: G3, B3, D4, F#4, A4
      [98.00, 246.94, 293.66, 369.99, 440.00, 587.33],
      // D/F#: F#2, D3, A3, D4, F#4
      [92.50, 146.83, 220.00, 293.66, 369.99, 587.33],
      // Em7: E2, B2, E3, G3, D4, E4
      [82.41, 123.47, 164.81, 196.00, 293.66, 329.63],
      // Asus4 -> A: A2, E3, A3, C#4, E4
      [110.00, 164.81, 220.00, 277.18, 329.63, 440.00],
    ];

    let chordIdx = 0;
    let step = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const currentChord = chords[chordIdx];
      // Pick notes in an arpeggiated flow
      const noteFreq = currentChord[step % currentChord.length];
      const isBass = step % currentChord.length === 0;

      this.triggerPianoNote(noteFreq, isBass ? 0.35 : 0.2, isBass ? 4.0 : 2.5);

      step++;
      if (step % currentChord.length === 0) {
        chordIdx = (chordIdx + 1) % chords.length;
      }

      // Timing between 380ms and 520ms for organic, human-like tempo
      const delay = 440 + Math.sin(step * 0.7) * 45;
      this.timerId = window.setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  private triggerPianoNote(freq: number, velocity: number, decay: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm piano-like timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle 2nd harmonic
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(120, freq * 1.2), now + decay);

    // Fast attack, exponential acoustic decay
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(velocity, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + decay);
    oscHarmonic.stop(now + decay);
  }

  public setVolume(volume: number, rampDuration = 2) {
    if (this.audioEl && this.usingExternalAudio) {
      this.fadeAudioElement(volume, rampDuration);
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(volume, now + rampDuration);
    }
  }

  public stop(rampDuration = 1.5) {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.audioEl && this.usingExternalAudio) {
      this.fadeAudioElement(0, rampDuration);
      setTimeout(() => {
        if (!this.isPlaying && this.audioEl) {
          this.audioEl.pause();
        }
      }, rampDuration * 1000);
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + rampDuration);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundtrack = new EmotionalSoundtrack();
