import React, { useEffect, useRef } from 'react';
import { soundtrack } from './soundtrack';
import { SectionKey } from '../types';

interface MessageAudioProps {
  currentSection: SectionKey;
  isNearEnd?: boolean;
}

export const MessageAudio: React.FC<MessageAudioProps> = ({ currentSection }) => {
  // Background music plays continuously across section 4 and section 5 without interruption
  const isMusicSection = currentSection === 's4' || currentSection === 's5';
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (isMusicSection) {
      if (!hasStartedRef.current) {
        hasStartedRef.current = true;
        soundtrack.start(0.48);
      }
    } else {
      // Only stop if user explicitly navigates back to previous sections (s1, s2, s3)
      if (hasStartedRef.current) {
        hasStartedRef.current = false;
        soundtrack.stop(1.0);
      }
    }
  }, [isMusicSection]);

  return null;
};
