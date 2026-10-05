/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveView } from './types';
import { NavigationBar } from './components/NavigationBar';
import { HomeSanctuary } from './components/HomeSanctuary';
import { MessageShell } from './components/MessageShell';
import { MaicaLetterShell } from './components/MaicaLetterShell';
import { WholeBackgroundGallery } from './components/WholeBackgroundGallery';

export default function App() {
  // Read initial view from URL hash if available (e.g., #clint or #maica), otherwise default to 'home'
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'clint') return 'clint';
      if (hash === 'maica') return 'maica';
    }
    return 'home';
  });

  // Keep hash in sync with view
  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view === 'home' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'clint') setActiveView('clint');
      else if (hash === 'maica') setActiveView('maica');
      else setActiveView('home');
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="relative min-h-screen text-neutral-100 font-sans selection:bg-amber-900/40 selection:text-amber-100">
      {/* Whole Fullscreen Wide Background Wallpaper (fixed at z-0, visible across all pages) */}
      <WholeBackgroundGallery />

      {/* Top Floating Glass Navigation Header (z-50) */}
      <NavigationBar activeView={activeView} onNavigate={handleNavigate} />

      {/* Main Content Area (relative z-10 so it sits cleanly above the whole background) */}
      <div className="relative z-10">
        {activeView === 'home' && (
          <HomeSanctuary onSelectLetter={(view) => handleNavigate(view)} />
        )}

        {activeView === 'clint' && (
          <MessageShell
            onBackToHome={() => handleNavigate('home')}
            onGoToMaicaLetter={() => handleNavigate('maica')}
          />
        )}

        {activeView === 'maica' && (
          <MaicaLetterShell
            onBackToHome={() => handleNavigate('home')}
            onGoToClintLetter={() => handleNavigate('clint')}
          />
        )}
      </div>
    </div>
  );
}
