// src/types.ts
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

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
  sharpToFlat: Record<Note, string>;
}

export interface FretboardSettingsProps {
  numFrets: number;
  onFretsChange: (frets: number) => void;
  useFlats: boolean;
  onFlatsToggle: () => void;
}