import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Settings,
  X,
  Check,
  Sparkles,
  Upload,
  Play,
  Pause,
  Sun,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';

export interface BackgroundSlot {
  id: string;
  name: string;
  url: string; // resolved direct Google Drive image URL
  rawInput: string; // original Google Drive share link
  fallbackUrl: string; // local cached copy of the exact same Drive image
}

// Extract Google Drive File ID from any variant of Google Drive URL
export function extractDriveFileId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (trimmed.includes('/folders/')) {
    return null;
  }

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{20,})/,
    /[?&]id=([a-zA-Z0-9_-]{20,})/,
    /\/d\/([a-zA-Z0-9_-]{20,})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

// Convert Google Drive URL formats into direct high-res Google CDN image URLs
export function resolveDriveImageUrl(input: string, fallback: string): string {
  const trimmed = input.trim();
  if (!trimmed) return fallback;

  const fileId = extractDriveFileId(trimmed);
  if (fileId) {
    // Direct Google CDN endpoint (returns HTTP 200 image/jpeg directly without 302 CORS issues)
    return `https://lh3.googleusercontent.com/d/${fileId}=w2000`;
  }

  return trimmed;
}

// The 4 provided Google Drive links
export const PROVIDED_DRIVE_LINKS = [
  'https://drive.google.com/file/d/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_/view?usp=drive_link',
  'https://drive.google.com/file/d/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB/view?usp=drive_link',
  'https://drive.google.com/file/d/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz/view?usp=drive_link',
  'https://drive.google.com/file/d/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ/view?usp=drive_link',
];

export const DEFAULT_SLOTS: BackgroundSlot[] = [
  {
    id: 'slot-1',
    name: 'Memory 1 • Tuktok ng Pangilatan',
    rawInput: 'https://drive.google.com/file/d/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_/view?usp=drive_link',
    url: 'https://lh3.googleusercontent.com/d/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_=w2000',
    fallbackUrl: '/drive/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_.jpg',
  },
  {
    id: 'slot-2',
    name: 'Memory 2 • Nakatitig sa Kabundukan',
    rawInput: 'https://drive.google.com/file/d/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB/view?usp=drive_link',
    url: 'https://lh3.googleusercontent.com/d/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB=w2000',
    fallbackUrl: '/drive/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB.jpg',
  },
  {
    id: 'slot-3',
    name: 'Memory 3 • Unang Silip sa Liwayway',
    rawInput: 'https://drive.google.com/file/d/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz/view?usp=drive_link',
    url: 'https://lh3.googleusercontent.com/d/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz=w2000',
    fallbackUrl: '/drive/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz.jpg',
  },
  {
    id: 'slot-4',
    name: 'Memory 4 • Dapit-Umaga sa Pangilatan',
    rawInput: 'https://drive.google.com/file/d/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ/view?usp=drive_link',
    url: 'https://lh3.googleusercontent.com/d/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ=w2000',
    fallbackUrl: '/drive/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ.jpg',
  },
];

// Additional 15 Google Drive photos from the provided Random Memories folder (1bmxqSuz-w8dmYPBi0SARQcG7pO7g2b5r)
export const EXTRA_DRIVE_FOLDER_IDS = [
  '1Bbekg6FM5PyNt_-1aCJ2J_Ph5KSUGgin',
  '1EE1sh-n9RrGUxJNvpq7dGsxm8c9z63qU',
  '1eSZssJ3-Jt4u8ziZv6nZOh_DxXC3HMzs',
  '1f3oBBoyh3T63C9W8iUw8U4iK3-cMKfbu',
  '1FUhX2lJkqllKKNmr_thz18c4Uz_5DQgQ',
  '1HZhN-iKpxp20s5hqvaA-aHyUvNyG88eJ',
  '1J0ZDRpVRMs5pXI059HO8YWgHoLMV3X2H',
  '1JmMjKGKaktlpIlEtxIpNcT0TxzbMO1mY',
  '1KxzztsYsjpsvIETV7r0AcC4NVUc41wSh',
  '1NFvjCnB-JQut88nD7gKe5tdyvMcYXbY3',
  '1Nm80b5sDfycKBYtEuELpNkBgSCqkWat3',
  '1Qq8ZqOf7ieUcUV5IbWlWfAmq_ZrqREeo',
  '1QXFiSfD250FH884k_NTwqFDwM7YfFCGc',
  '1_SxoGSwgKXHnEghGlFVG4NxoH2Ermgue',
  '1VepSI-NLip_Db2N0jEfD2NXfmlx3HJ-v',
];

const STORAGE_KEY = 'anniversary_4_bg_drive_links_v3';
const BRIGHTNESS_KEY = 'anniversary_bg_brightness';

export const WholeBackgroundGallery: React.FC = () => {
  const [slots, setSlots] = useState<BackgroundSlot[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Clear legacy storage keys that held Unsplash placeholders
        localStorage.removeItem('anniversary_4_bg_drive_links');
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 4) {
            const hasInvalidPlaceholder = parsed.some(
              (item: BackgroundSlot) =>
                !item.rawInput ||
                item.url?.includes('unsplash.com') ||
                item.url === '/icon.jpg' ||
                item.url === '/apple-touch-icon.jpg'
            );
            if (!hasInvalidPlaceholder) {
              return parsed;
            }
          }
        }
      } catch {
        // fallback to DEFAULT_SLOTS
      }
    }
    return DEFAULT_SLOTS;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(BRIGHTNESS_KEY);
        if (saved) return parseFloat(saved);
      } catch {
        // fallback
      }
    }
    return 0.8; // 80% brightness by default so Drive photos shine vividly
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bulkInput, setBulkInput] = useState<string>('');
  const [slotInputs, setSlotInputs] = useState<string[]>(() => slots.map((s) => s.rawInput));
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Persist slots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } catch {
      // ignore
    }
  }, [slots]);

  // Persist brightness
  useEffect(() => {
    try {
      localStorage.setItem(BRIGHTNESS_KEY, brightness.toString());
    } catch {
      // ignore
    }
  }, [brightness]);

  // Automatic cycle between the background photos every 10 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slots.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isAutoPlay, slots.length]);

  // Preload all Google Drive background images in browser cache for instant transitions
  useEffect(() => {
    slots.forEach((slot) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = slot.url;
    });
  }, [slots]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slots.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slots.length) % slots.length);
  };

  const handleRandom = () => {
    if (slots.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * slots.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % slots.length;
    }
    setCurrentIndex(nextIdx);
  };

  // 1-Click Bulk Paste Parser: extracts URLs from any text
  const handleBulkParse = (text: string) => {
    setBulkInput(text);
    if (!text.trim()) return;

    const urls = text.match(/https?:\/\/[^\s"'<>]+/g) || [];
    if (urls.length > 0) {
      const updatedInputs = [...slotInputs];
      for (let i = 0; i < Math.min(urls.length, updatedInputs.length); i++) {
        updatedInputs[i] = urls[i];
      }
      setSlotInputs(updatedInputs);
      setSaveMessage(`Found ${urls.length} Drive link(s)! Click "Apply & Save Backgrounds" below.`);
    }
  };

  const handleSaveSlots = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = slots.map((slot, idx) => {
      const raw = slotInputs[idx]?.trim() || slot.rawInput;
      return {
        ...slot,
        rawInput: raw,
        url: resolveDriveImageUrl(raw, slot.fallbackUrl),
      };
    });

    setSlots(updated);
    setSaveMessage('Saved successfully! Google Drive backgrounds updated.');
    setTimeout(() => {
      setIsModalOpen(false);
      setSaveMessage('');
    }, 700);
  };

  const handleResetDefaults = () => {
    setSlots(DEFAULT_SLOTS);
    setSlotInputs(DEFAULT_SLOTS.map((s) => s.rawInput));
    setCurrentIndex(0);
    setBulkInput('');
    setBrightness(0.8);
    setSaveMessage('Restored your 4 provided Google Drive links.');
  };

  const handleLoadAllDriveMemories = () => {
    const extraSlots: BackgroundSlot[] = EXTRA_DRIVE_FOLDER_IDS.map((id, idx) => ({
      id: `folder-slot-${idx + 5}`,
      name: `Drive Folder Memory #${idx + 5}`,
      rawInput: `https://drive.google.com/file/d/${id}/view?usp=drive_link`,
      url: `https://lh3.googleusercontent.com/d/${id}=w2000`,
      fallbackUrl: DEFAULT_SLOTS[idx % DEFAULT_SLOTS.length].fallbackUrl,
    }));
    const combined = [...DEFAULT_SLOTS, ...extraSlots];
    setSlots(combined);
    setSlotInputs(combined.map((s) => s.rawInput));
    setSaveMessage(`Loaded all ${combined.length} photos from your Google Drive folders!`);
  };

  const activeSlot = slots[currentIndex] || slots[0];

  return (
    <>
      {/* 1. WHOLE WIDE FULLSCREEN GOOGLE DRIVE BACKGROUND WALLPAPER */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-[#07060a]">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlot.id + '-' + activeSlot.url}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Whole Background Image from Google Drive (no crossOrigin attribute so Google redirects/CDN never get blocked by CORS) */}
            <img
              src={activeSlot.url}
              alt={activeSlot.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-700"
              style={{
                filter: `brightness(${brightness}) contrast(1.06) saturate(1.12)`,
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const fileId = extractDriveFileId(activeSlot.rawInput);
                if (fileId) {
                  // Fallback 1: Google Drive thumbnail endpoint
                  if (!target.src.includes('drive.google.com/thumbnail') && !target.dataset.triedThumb) {
                    target.dataset.triedThumb = 'true';
                    target.src = `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
                    return;
                  }
                  // Fallback 2: Google Drive uc export view
                  if (!target.src.includes('export=view') && !target.dataset.triedUc) {
                    target.dataset.triedUc = 'true';
                    target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                    return;
                  }
                }
                // Fallback 3: Local cached copy of the exact same Google Drive photo
                if (target.src !== activeSlot.fallbackUrl) {
                  target.src = activeSlot.fallbackUrl;
                }
              }}
            />

            {/* Soft Translucent Vignette for Letter Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55 pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. TRANSLUCENT BOTTOM CONTROLLER DOCK */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-neutral-950/60 hover:bg-neutral-900/80 backdrop-blur-2xl border border-white/20 text-neutral-200 text-xs font-serif shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all">
          {/* Previous photo */}
          <button
            onClick={handlePrev}
            className="p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Previous Google Drive Photo"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Slot numbers */}
          <div className="flex items-center gap-1 px-1 max-w-[180px] overflow-x-auto no-scrollbar">
            {slots.slice(0, 6).map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-mono transition-all ${
                  currentIndex === idx
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                    : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                }`}
                title={`Switch to ${s.name}`}
              >
                {idx + 1}
              </button>
            ))}
            {slots.length > 6 && (
              <span className="text-[10px] font-mono text-amber-200/80 px-1">
                {currentIndex + 1}/{slots.length}
              </span>
            )}
          </div>

          {/* Next photo */}
          <button
            onClick={handleNext}
            className="p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            title="Next Google Drive Photo"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Pause / Play auto-cycle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-1 rounded-full hover:bg-white/10 transition-colors ml-0.5 ${
              isAutoPlay ? 'text-amber-300' : 'text-neutral-400'
            }`}
            title={isAutoPlay ? 'Pause auto-cycle (every 10s)' : 'Resume auto-cycle'}
          >
            {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>

          {/* Random photo */}
          <button
            onClick={handleRandom}
            className="p-1 rounded-full hover:bg-white/10 text-neutral-300 hover:text-amber-200 transition-colors"
            title="Random Google Drive Photo"
          >
            <Shuffle className="w-3 h-3" />
          </button>

          {/* Configure Google Drive links & brightness */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 pl-2 pr-1 py-0.5 ml-1 border-l border-white/20 hover:text-amber-200 text-neutral-200 transition-colors group"
            title="Google Drive Background Links"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-[11px] font-sans font-medium">Drive Links</span>
            <Settings className="w-3 h-3 text-neutral-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* 3. TRANSLUCENT GLASS MODAL FOR GOOGLE DRIVE BACKGROUND LINKS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-neutral-950/85 backdrop-blur-2xl border border-white/25 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] text-neutral-100 max-h-[92vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-serif uppercase tracking-widest bg-emerald-400/15 text-emerald-200 border border-emerald-300/30 mb-2">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  Google Drive Connected ({slots.length} Photos Active)
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-neutral-100">
                  Your Google Drive Background Links
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                  Pre-loaded with your provided Google Drive links (<code className="text-amber-200 font-mono text-[11px]">10Vv9RM...</code>, <code className="text-amber-200 font-mono text-[11px]">1smj64a...</code>, <code className="text-amber-200 font-mono text-[11px]">1e9tm3i...</code>, <code className="text-amber-200 font-mono text-[11px]">16Y45AC...</code>).
                </p>
              </div>

              {/* Brightness & Preset Bar */}
              <div className="mb-4 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-serif text-amber-200">
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>Background Brightness:</span>
                  <span className="font-mono text-white font-bold">{Math.round(brightness * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.05"
                  value={brightness}
                  onChange={(e) => setBrightness(parseFloat(e.target.value))}
                  className="w-full sm:w-44 accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Quick Folder Preset Switcher */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all flex items-center gap-1.5 ${
                    slots.length === 4
                      ? 'bg-amber-400/20 border-amber-300/50 text-amber-100'
                      : 'bg-white/5 border-white/15 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-amber-300" />
                  <span>4 Main Drive Links (Pangilatan)</span>
                </button>
                <button
                  type="button"
                  onClick={handleLoadAllDriveMemories}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all flex items-center gap-1.5 ${
                    slots.length > 4
                      ? 'bg-amber-400/20 border-amber-300/50 text-amber-100'
                      : 'bg-white/5 border-white/15 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Include All 19 Drive Folder Photos</span>
                </button>
              </div>

              {/* 1-Click Quick Bulk Paste Box */}
              <div className="mb-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-md">
                <label className="block text-xs font-serif tracking-wider uppercase text-amber-200/90 mb-1 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-amber-300" />
                  <span>1-Click Bulk Paste (Replace with any Google Drive links)</span>
                </label>
                <textarea
                  rows={2}
                  value={bulkInput}
                  onChange={(e) => handleBulkParse(e.target.value)}
                  placeholder="Paste Google Drive links here (space or line separated)..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400/60 focus:outline-none text-xs text-neutral-100 placeholder:text-neutral-500 font-mono transition-all resize-none"
                />
                <div className="flex items-center gap-1 text-[10px] text-amber-300/80 mt-1">
                  <AlertCircle className="w-3 h-3 text-amber-300" />
                  <span>Direct Google Drive links are automatically resolved via Google High-Res CDN.</span>
                </div>
              </div>

              {/* Individual Link Slots Form */}
              <form onSubmit={handleSaveSlots} className="flex-1 overflow-y-auto space-y-3 pr-1">
                {slots.map((slot, index) => {
                  const currentInputValue = slotInputs[index] ?? slot.rawInput;
                  const resolvedPreview = currentInputValue
                    ? resolveDriveImageUrl(currentInputValue, slot.fallbackUrl)
                    : slot.url;

                  return (
                    <div
                      key={slot.id}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/15 hover:border-white/25 transition-all flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      {/* Live Thumbnail preview */}
                      <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-neutral-900 border border-white/20 flex-shrink-0 relative">
                        <img
                          src={resolvedPreview}
                          alt={`Slot ${index + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== slot.fallbackUrl) {
                              target.src = slot.fallbackUrl;
                            }
                          }}
                        />
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-amber-300">
                          #{index + 1}
                        </div>
                      </div>

                      {/* Inputs & Quick Test */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-serif text-neutral-200 font-medium truncate">
                            {slot.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {currentInputValue && (
                              <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-sans">
                                <Check className="w-3 h-3" /> Drive Linked
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentIndex(index);
                                setIsModalOpen(false);
                              }}
                              className="text-[10px] text-amber-300 hover:underline font-serif"
                            >
                              View Now
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={currentInputValue}
                          onChange={(e) => {
                            const updated = [...slotInputs];
                            updated[index] = e.target.value;
                            setSlotInputs(updated);
                          }}
                          placeholder={`Paste Google Drive link for Photo ${index + 1}...`}
                          className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/15 focus:border-amber-400/60 focus:outline-none text-xs text-neutral-100 placeholder:text-neutral-500 font-mono transition-all"
                        />
                      </div>
                    </div>
                  );
                })}

                {saveMessage && (
                  <p className="text-xs text-amber-300 font-serif text-center py-1">
                    {saveMessage}
                  </p>
                )}

                {/* Modal Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-xs text-neutral-400 hover:text-amber-200 underline font-serif"
                  >
                    Restore 4 Default Drive Links
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-serif transition-all"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400/25 hover:bg-amber-400/35 text-amber-200 border border-amber-400/40 text-xs font-serif tracking-wide transition-all shadow-lg flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>Apply & Save Backgrounds</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
