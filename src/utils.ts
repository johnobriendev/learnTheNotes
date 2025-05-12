// src/utils.ts 
import { Note } from './types';
import { allNotes, sharpToFlat } from './constants';

// Function to get note at a specific position
export const getNoteAtPosition = (stringNote: string, fret: number): Note => {
  const startIndex = allNotes.indexOf(stringNote as Note);
  return allNotes[(startIndex + fret) % 12];
};

// Function to display note in flat or sharp notation
export const displayNote = (note: Note, useFlats: boolean): string => {
  return useFlats ? sharpToFlat[note] : note;
};

// Function to get highlight information for a note
export const getHighlightInfo = (
  stringNote: string, 
  fret: number,
  selectedNotes: Note[],
  noteColors: Record<Note, string>
): { highlighted: boolean; color: string; note: string } => {
  if (selectedNotes.length === 0) return { highlighted: false, color: '', note: '' };

  const noteAtPosition = getNoteAtPosition(stringNote, fret);
  if (selectedNotes.includes(noteAtPosition)) {
    return {
      highlighted: true,
      color: noteColors[noteAtPosition],
      note: noteAtPosition
    };
  }

  return { highlighted: false, color: '', note: '' };
};