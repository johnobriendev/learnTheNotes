// src/types.ts
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type ChordQuality = 'major' | 'minor' | 'diminished' | 'augmented';
export type IntervalName = 'R' | '3' | '♭3' | '5' | '♭5' | '♯5';
export type ScaleIntervalName = '1' | '2' | '♭3' | '3' | '4' | '5' | '6' | '7';
export type MajorScaleKey = 'C' | 'G' | 'D' | 'A' | 'E' | 'B' | 'F#' | 'F' | 'Bb' | 'Eb' | 'Ab' | 'Db' | 'Gb';
export type ScaleType = 'major' | 'melodic-minor';
export type StringSet = 'All' | '1-2-3' | '2-3-4' | '3-4-5' | '4-5-6';
export type DisplayMode = 'notes' | 'intervals';

export interface Triad {
  root: Note;
  quality: ChordQuality;
  notes: Note[];
  intervals: Record<Note, IntervalName>; // Maps each note to its interval name
}

export interface Scale {
  key: MajorScaleKey;
  type: ScaleType;
  notes: Note[];
  displayNotes: string[]; // Proper sharp/flat notation for the key
  intervals: Record<Note, ScaleIntervalName>; // Maps each note to its scale degree
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
  // Custom highlighting function for major scale filtering
  shouldHighlight?: (stringIndex: number, fret: number) => boolean;
  // Custom note display mapping for proper sharp/flat notation
  customNoteDisplay?: Record<Note, string>;
  // Quiz props
  quizState?: QuizState;
  currentQuestion?: QuizQuestion | null;
  userAnswers?: { string: number; fret: number }[];
  incorrectPositions?: { string: number; fret: number }[];
  showFeedback?: boolean;
  onFretboardClick?: (stringIndex: number, fret: number) => void;
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

// Quiz types - minimal and simple
export type QuizMode = 'find-note' | 'name-note';
export type QuizState = 'idle' | 'active' | 'completed';

export interface QuizQuestion {
  note: Note;
  mode: QuizMode;
  targetPosition?: { string: number; fret: number }; // For name-note mode
  correctPositions?: { string: number; fret: number }[]; // For find-note mode
  selectedStrings?: number[]; // For string-specific modes
}

export interface QuizSettings {
  selectedStrings: number[];
  noteSequence: Note[];
}

export interface StringSelectorProps {
  selectedStrings: number[];
  onToggleString: (stringIndex: number) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  strings: string[];
}