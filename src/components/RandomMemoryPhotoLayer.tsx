import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Plus, X, Heart, Sparkles, ExternalLink } from 'lucide-react';

export interface MemoryPhoto {
  id: string;
  url: string;
  originalLink?: string;
  caption?: string;
}

// Convert various Google Drive URL formats into direct image URLs
export function parseDriveOrImageUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Standard Google Drive file ID match: /d/ID or id=ID
  const driveMatch = trimmed.match(/(?:id=|\/d\/|\/file\/d\/)([a-zA-Z0-9_-]{25,})/);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    // This Google thumbnail endpoint reliably serves the image publicly
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }

  // Already a direct or generic image URL
  return trimmed;
}

// Default romantic memories from the provided Google Drive links
const DEFAULT_MEMORIES: MemoryPhoto[] = [
  {
    id: 'mem-1',
    url: 'https://lh3.googleusercontent.com/d/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_=w1200',
    originalLink: 'https://drive.google.com/file/d/10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_/view?usp=drive_link',
    caption: 'Tuktok ng Pangilatan • Our Beginning',
  },
  {
    id: 'mem-2',
    url: 'https://lh3.googleusercontent.com/d/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB=w1200',
    originalLink: 'https://drive.google.com/file/d/1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB/view?usp=drive_link',
    caption: 'Nakatitig sa Kabundukan • Quiet Smiles',
  },
  {
    id: 'mem-3',
    url: 'https://lh3.googleusercontent.com/d/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz=w1200',
    originalLink: 'https://drive.google.com/file/d/1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz/view?usp=drive_link',
    caption: 'Unang Silip sa Liwayway • Holding Hands',
  },
  {
    id: 'mem-4',
    url: 'https://lh3.googleusercontent.com/d/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ=w1200',
    originalLink: 'https://drive.google.com/file/d/16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ/view?usp=drive_link',
    caption: 'Dapit-Umaga sa Pangilatan • Padayun Ta',
  },
];

interface ActiveFloatingPhoto {
  instanceId: string;
  photo: MemoryPhoto;
  top: number; // percentage
  left: number; // percentage
  rotation: number; // degrees
  scale: number;
}

interface RandomMemoryPhotoLayerProps {
  allowConfig?: boolean;
}

export const RandomMemoryPhotoLayer: React.FC<RandomMemoryPhotoLayerProps> = ({ allowConfig = true }) => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('anniversary_memories_drive');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_MEMORIES;
  });

  const [activePhotos, setActivePhotos] = useState<ActiveFloatingPhoto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInputUrl, setNewInputUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [inputError, setInputError] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anniversary_memories_drive', JSON.stringify(photos));
    } catch {
      // ignore
    }
  }, [photos]);

  // Periodic random spawner for floating background memory photos
  useEffect(() => {
    if (photos.length === 0) return;

    const spawnPhoto = () => {
      setActivePhotos((prev) => {
        // Keep max 2 active photos at a time on mobile, 3 on desktop so it doesn't crowd text
        const maxPhotos = window.innerWidth < 768 ? 2 : 3;
        const current = prev.length >= maxPhotos ? prev.slice(1) : [...prev];

        const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

        // Random positions focused along periphery so reading area stays clean
        // Avoid center where the main text column is (x: 25% to 75%)
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const left = side === 'left' ? Math.random() * 20 + 3 : Math.random() * 20 + 75;
        const top = Math.random() * 70 + 15;
        const rotation = (Math.random() - 0.5) * 14; // -7deg to +7deg
        const scale = Math.random() * 0.15 + 0.9;

        const newInstance: ActiveFloatingPhoto = {
          instanceId: `${Date.now()}-${Math.random()}`,
          photo: randomPhoto,
          top,
          left,
          rotation,
          scale,
        };

        return [...current, newInstance];
      });
    };

    // Initial spawn
    spawnPhoto();

    // Spawning interval: every 6-8 seconds
    const interval = setInterval(spawnPhoto, 7000);
    return () => clearInterval(interval);
  }, [photos]);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInputUrl.trim()) return;

    const parsed = parseDriveOrImageUrl(newInputUrl.trim());
    if (!parsed) {
      setInputError('Please enter a valid Google Drive or image URL.');
      return;
    }

    const newPhoto: MemoryPhoto = {
      id: `drive-${Date.now()}`,
      url: parsed,
      originalLink: newInputUrl.trim(),
      caption: newCaption.trim() || 'A Precious Memory • Clint & Maica',
    };

    setPhotos((prev) => [newPhoto, ...prev]);
    setNewInputUrl('');
    setNewCaption('');
    setInputError('');

    // Force an immediate appearance of this new photo
    setActivePhotos((prev) => [
      ...prev.slice(1),
      {
        instanceId: `inst-${Date.now()}`,
        photo: newPhoto,
        top: 25,
        left: Math.random() > 0.5 ? 8 : 78,
        rotation: (Math.random() - 0.5) * 10,
        scale: 1,
      },
    ]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setActivePhotos((prev) => prev.filter((ap) => ap.photo.id !== id));
  };

  const handleResetDefaults = () => {
    setPhotos(DEFAULT_MEMORIES);
  };

  return (
    <>
      {/* 1. BACKGROUND FLOATING MEMORY PHOTOS (Translucent, dreamy, randomly appearing) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence>
          {activePhotos.map((item) => (
            <motion.div
              key={item.instanceId}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{
                opacity: [0, 0.75, 0.75, 0],
                scale: [item.scale * 0.95, item.scale, item.scale * 1.02, item.scale * 0.95],
                y: [10, 0, -10, -20],
                rotate: item.rotation,
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                duration: 9.5,
                times: [0, 0.15, 0.85, 1],
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: `${item.top}%`,
                left: `${item.left}%`,
                maxWidth: '240px',
              }}
              className="hidden sm:block"
            >
              {/* Frosted Translucent Glass Polaroid Card */}
              <div className="relative p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-700 group hover:border-amber-400/40">
                {/* Glowing Candlelight/Rose Aura */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl blur-lg pointer-events-none -z-10" />

                {/* Subtle Washi Tape Translucent Pin at top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-white/20 backdrop-blur-md rounded border border-white/25 -rotate-2" />

                {/* Image viewport */}
                <div className="w-44 h-32 sm:w-48 sm:h-36 rounded-xl overflow-hidden bg-neutral-900/60 relative">
                  <img
                    src={item.photo.url}
                    alt={item.photo.caption || 'Memory'}
                    className="w-full h-full object-cover filter brightness-95 contrast-105 transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      // If Google Drive link fails or has CORS/auth restrictions, fallback to cozy placeholder
                      (e.target as HTMLImageElement).src = '/apple-touch-icon.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Polaroid handwritten caption */}
                {item.photo.caption && (
                  <div className="pt-2 px-1 text-center">
                    <p className="font-hand text-xs sm:text-sm text-neutral-200/90 tracking-wide line-clamp-1">
                      {item.photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 2. TRANSLUCENT FLOATING CONTROL BUTTON: Manage Drive Links */}
      {allowConfig && (
        <div className="fixed bottom-4 right-4 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-950/40 hover:bg-neutral-900/60 backdrop-blur-xl border border-white/15 hover:border-amber-400/40 text-neutral-300 hover:text-white text-xs font-serif shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all group"
            title="Google Drive Memories & Background Photos"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-300/90 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">Drive Memories ({photos.length})</span>
            <span className="md:hidden">Memories</span>
            <Sparkles className="w-3 h-3 text-amber-300/70" />
          </motion.button>
        </div>
      )}

      {/* 3. TRANSLUCENT GLASS MODAL FOR GOOGLE DRIVE PHOTOS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-3xl bg-neutral-950/70 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] text-neutral-100 max-h-[88vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-serif uppercase tracking-widest bg-amber-400/15 text-amber-200 border border-amber-300/30 mb-2">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Background Memories
                </div>
                <h3 className="font-serif text-2xl font-light text-neutral-100">
                  Google Drive Background Photos
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                  Paste your Google Drive image links or photo URLs. They will randomly appear floating in the background as you and Maica read!
                </p>
              </div>

              {/* Form to add Google Drive Link */}
              <form onSubmit={handleAddPhoto} className="space-y-3 mb-6 bg-white/[0.03] backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-xs font-serif tracking-wider uppercase text-neutral-300 mb-1">
                    Google Drive Link or Image URL:
                  </label>
                  <input
                    type="text"
                    value={newInputUrl}
                    onChange={(e) => {
                      setNewInputUrl(e.target.value);
                      setInputError('');
                    }}
                    placeholder="https://drive.google.com/file/d/1abc.../view?usp=sharing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-amber-400/60 focus:outline-none text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 font-mono transition-all"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Tip: Make sure the Google Drive image sharing setting is set to <em>"Anyone with the link can view"</em>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-serif tracking-wider uppercase text-neutral-300 mb-1">
                    Romantic Caption (Optional):
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="e.g. Walking home together, Grade 12"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-amber-400/60 focus:outline-none text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 font-serif transition-all"
                  />
                </div>

                {inputError && (
                  <p className="text-xs text-rose-400 font-sans">{inputError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 text-xs sm:text-sm font-serif tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Add to Floating Memories</span>
                </button>
              </form>

              {/* Photo list preview */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400 px-1 mb-1">
                  <span>Current Memories ({photos.length})</span>
                  <button
                    onClick={handleResetDefaults}
                    className="text-[11px] text-amber-300/80 hover:text-amber-200 underline"
                  >
                    Reset Defaults
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-white/10 p-1.5 aspect-square flex flex-col"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Memory'}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/apple-touch-icon.jpg';
                        }}
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-neutral-300 hover:text-rose-400 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {photo.caption && (
                        <div className="absolute inset-x-1.5 bottom-1.5 bg-black/70 backdrop-blur-sm p-1 rounded-b-lg">
                          <p className="text-[10px] text-neutral-200 truncate font-hand text-center">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
