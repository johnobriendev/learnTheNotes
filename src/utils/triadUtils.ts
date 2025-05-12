// utils/triadUtils.ts
import { Note, ChordQuality, IntervalName, Triad } from '../types';
import { allNotes } from '../constants';

// Convert semitones to interval names based on chord quality
const semitonesToInterval = (
  semitones: number, 
  quality: ChordQuality
): IntervalName => {
  switch (semitones) {
    case 0: return 'R';
    case 3: return '♭3'; // Minor third
    case 4: return '3';  // Major third
    case 6: return '♭5'; // Diminished fifth
    case 7: return '5';  // Perfect fifth
    case 8: return '♯5'; // Augmented fifth
    default: return 'R'; // Default fallback
  }
};

// Get index of a note in the allNotes array
const getNoteIndex = (note: Note): number => {
  return allNotes.indexOf(note);
};

// Calculate a note at a given interval from root
const getIntervalNote = (root: Note, semitones: number): Note => {
  const rootIndex = getNoteIndex(root);
  return allNotes[(rootIndex + semitones) % 12];
};

// Generate a complete triad object
export const createTriad = (root: Note, quality: ChordQuality): Triad => {
  let notes: Note[] = [];
  const intervals: Record<Note, IntervalName> = {} as Record<Note, IntervalName>;
  
  // Add root note
  notes.push(root);
  intervals[root] = 'R';
  
  // Add third based on quality
  const thirdSemitones = quality === 'major' || quality === 'augmented' ? 4 : 3;
  const third = getIntervalNote(root, thirdSemitones);
  notes.push(third);
  intervals[third] = semitonesToInterval(thirdSemitones, quality);
  
  // Add fifth based on quality
  let fifthSemitones = 7; // Perfect fifth by default
  if (quality === 'diminished') fifthSemitones = 6; // Flat fifth
  if (quality === 'augmented') fifthSemitones = 8;  // Sharp fifth
  
  const fifth = getIntervalNote(root, fifthSemitones);
  notes.push(fifth);
  intervals[fifth] = semitonesToInterval(fifthSemitones, quality);
  
  return {
    root,
    quality,
    notes,
    intervals
  };
};

// Check if a note belongs to a triad
export const isNoteInTriad = (note: Note, triad: Triad): boolean => {
  return triad.notes.includes(note);
};

// Get the interval name for a note within a triad
export const getIntervalName = (note: Note, triad: Triad): IntervalName | null => {
  if (isNoteInTriad(note, triad)) {
    return triad.intervals[note];
  }
  return null;
};