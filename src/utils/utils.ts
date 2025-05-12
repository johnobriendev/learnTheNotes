// src/utils.ts 
import { Note } from '../types';
import { allNotes, sharpToFlat } from '../constants';

// Function to get note at a specific position
export const getNoteAtPosition = (stringNote: string, fret: number): Note => {
  const noteIndex = allNotes.indexOf(stringNote as Note);
  if (noteIndex === -1) return 'C'; // Default fallback
  
  return allNotes[(noteIndex + fret) % 12] as Note;
};

// Function to display note in flat or sharp notation
export const displayNote = (note: Note, useFlats: boolean): string => {
  return useFlats ? sharpToFlat[note] : note;
};

// Function to get highlight information for a note
export const getHighlightInfo = (stringNote: string, fret: number, selectedNotes: Note[], noteColors: Record<Note, string>, intervals?: Record<Note, string>) => {
  const note = getNoteAtPosition(stringNote, fret);
  const highlighted = selectedNotes.includes(note);
  
  return {
    highlighted,
    note,
    color: highlighted ? noteColors[note] : '',
    interval: intervals && intervals[note] ? intervals[note] : null
  };
};