export type Atmosphere =
  | 'dark'
  | 'cold'
  | 'heavy'
  | 'spiritual'
  | 'dawn'
  | 'warm'
  | 'golden';

export type PresentationMode = 'reading' | 'emphasis' | 'cinematic' | 'doorway';

export interface LetterBlock {
  id: string;
  text: string;
  presentation: PresentationMode;
  tag?: string;
}

export type SectionKey = 's1' | 's2' | 's3' | 's4' | 's5';
