// src/types.ts
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export interface NoteInfo {
  highlighted: boolean;
  color: string;
  note: string;
}