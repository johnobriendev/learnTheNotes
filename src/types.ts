// src/types.ts
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type ChordQuality = 'major' | 'minor' | 'diminished' | 'augmented';
export type IntervalName = 'R' | '3' | '♭3' | '5' | '♭5' | '♯5';
export type StringSet = 'All' | '1-2-3' | '2-3-4' | '3-4-5' | '4-5-6';
export type DisplayMode = 'notes' | 'intervals';

export interface Triad {
  root: Note;
  quality: ChordQuality;
  notes: Note[];
  intervals: Record<Note, IntervalName>; // Maps each note to its interval name
}

export interface ChordTone {
  note: Note;
  interval: IntervalName;
  position: {
    string: number;
    fret: number;
  };
}

export interface NoteInfo {
  highlighted: boolean;
  color: string;
  note: string;
}

export interface FretboardProps {
  numFrets: number;
  strings: string[];
  selectedNotes: Note[];
  useFlats: boolean;
  noteColors: Record<Note, string>;
  displayMode?: 'notes' | 'intervals'; 
  intervals?: Record<Note, string>;
  selectedStringSet?: StringSet;
}

export interface FretboardSettingsProps {
  numFrets: number;
  onFretsChange: (frets: number) => void;
}

export interface TriadSelectorProps {
  selectedRoot: Note;
  selectedQuality: ChordQuality;
  useFlats: boolean;
  onSelectRoot: (note: Note) => void;
  onSelectQuality: (quality: ChordQuality) => void;
  displayMode: DisplayMode; // Add display mode prop
  onToggleDisplayMode: () => void; // Add toggle handler prop
  onFlatsToggle: () => void;
  onShowTips: () => void;
  selectedStringSet: StringSet;
  onSelectStringSet: (set: StringSet) => void;
  triad: Triad;
}

export interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipType?: 'notes' | 'triads' | 'scales'; // Add this property with appropriate types
}

export interface HowToUseProps {
  onShowTips: () => void;
  tipType?: 'notes' | 'triads' | 'scales';
}