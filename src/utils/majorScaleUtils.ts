// src/utils/majorScaleUtils.ts
import { Note, MajorScale, MajorScaleKey, ScaleIntervalName, ScaleType } from '../types';
import { allNotes } from '../constants';

// Major scale pattern: W-W-H-W-W-W-H (whole and half steps)
const majorScalePattern = [2, 2, 1, 2, 2, 2, 1]; // semitones
// Melodic minor pattern: W-H-W-W-W-W-H (same as major but with flat 3rd)
const melodicMinorPattern = [2, 1, 2, 2, 2, 2, 1]; // semitones

// Key signatures with proper naming (sharps and flats)
export const majorScaleKeys: MajorScaleKey[] = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'
];

// Map scale keys to their root notes for calculation
const keyToRootNote: Record<MajorScaleKey, Note> = {
  'C': 'C', 'G': 'G', 'D': 'D', 'A': 'A', 'E': 'E', 'B': 'B', 'F#': 'F#',
  'F': 'F', 'Bb': 'A#', 'Eb': 'D#', 'Ab': 'G#', 'Db': 'C#', 'Gb': 'F#'
};

// Proper note names for major scales (using correct sharps/flats)
const majorKeyNoteNames: Record<MajorScaleKey, string[]> = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
};

// Proper note names for melodic minor scales (flat 3rd degree)
const melodicMinorKeyNoteNames: Record<MajorScaleKey, string[]> = {
  'C': ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'],
  'G': ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#'],
  'D': ['D', 'E', 'F', 'G', 'A', 'B', 'C#'],
  'A': ['A', 'B', 'C', 'D', 'E', 'F#', 'G#'],
  'E': ['E', 'F#', 'G', 'A', 'B', 'C#', 'D#'],
  'B': ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E#'],
  'F': ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'],
  'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A'],
  'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D'],
  'Ab': ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G'],
  'Db': ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'C'],
  'Gb': ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'F']
};

export const createScale = (key: MajorScaleKey, type: ScaleType = 'major'): MajorScale => {
  const rootNote = keyToRootNote[key];
  const rootIndex = allNotes.indexOf(rootNote);

  const notes: Note[] = [];
  const displayNotes = type === 'major' ? majorKeyNoteNames[key] : melodicMinorKeyNoteNames[key];
  const intervals: Record<Note, ScaleIntervalName> = {} as Record<Note, ScaleIntervalName>;

  let currentIndex = rootIndex;
  const pattern = type === 'major' ? majorScalePattern : melodicMinorPattern;
  const scaleIntervals: ScaleIntervalName[] = type === 'major'
    ? ['1', '2', '3', '4', '5', '6', '7']
    : ['1', '2', '♭3', '4', '5', '6', '7'];

  for (let i = 0; i < 7; i++) {
    const note = allNotes[currentIndex % 12];
    notes.push(note);
    intervals[note] = scaleIntervals[i];

    if (i < 6) { // Don't advance after the 7th note
      currentIndex += pattern[i];
    }
  }

  return {
    key,
    type,
    notes,
    displayNotes,
    intervals
  };
};

// Keep backward compatibility
export const createMajorScale = (key: MajorScaleKey): MajorScale => {
  return createScale(key, 'major');
};

// Check if a specific note position should be highlighted based on filters
export const shouldHighlightNote = (
  scale: MajorScale,
  strings: string[],
  selectedStrings: number[],
  minFret: number,
  maxFret: number,
  stringIndex: number,
  fret: number
): boolean => {
  // If no strings are selected, don't highlight anything
  if (selectedStrings.length === 0) {
    return false;
  }

  // If this string is not selected, don't highlight
  if (!selectedStrings.includes(stringIndex)) {
    return false;
  }

  // If fret is outside the range, don't highlight
  if (fret < minFret || fret > maxFret) {
    return false;
  }

  // Check if the note at this position is in the scale
  const openNote = strings[stringIndex] as Note;
  const openNoteIndex = allNotes.indexOf(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  const note = allNotes[noteIndex];

  return scale.notes.includes(note);
};

// Create a mapping from Note to proper display name for the given key and scale type
export const createCustomNoteDisplay = (key: MajorScaleKey, type: ScaleType = 'major'): Record<Note, string> => {
  const scale = createScale(key, type);
  const customDisplay: Record<Note, string> = {} as Record<Note, string>;

  // Map each scale note to its proper display name
  for (let i = 0; i < scale.notes.length; i++) {
    const note = scale.notes[i];
    const displayName = scale.displayNotes[i];
    customDisplay[note] = displayName;
  }

  return customDisplay;
};

// Get all notes in a major scale across the fretboard within specified strings and fret range
export const getScaleNotesOnFretboard = (
  scale: MajorScale,
  strings: string[],
  selectedStrings: number[],
  minFret: number,
  maxFret: number,
  totalFrets: number
): Note[] => {
  // If no strings are selected, return empty array
  if (selectedStrings.length === 0) {
    return [];
  }

  const scaleNotes = scale.notes;
  const notesOnFretboard: Note[] = [];

  selectedStrings.forEach(stringIndex => {
    if (stringIndex >= 0 && stringIndex < strings.length) {
      const openNote = strings[stringIndex] as Note;
      const openNoteIndex = allNotes.indexOf(openNote);

      for (let fret = minFret; fret <= Math.min(maxFret, totalFrets); fret++) {
        const noteIndex = (openNoteIndex + fret) % 12;
        const note = allNotes[noteIndex];

        if (scaleNotes.includes(note) && !notesOnFretboard.includes(note)) {
          notesOnFretboard.push(note);
        }
      }
    }
  });

  return notesOnFretboard;
};

// Get scale formula as string
export const getScaleFormula = (): string => {
  return 'W - W - H - W - W - W - H';
};

// Get scale degrees as string
export const getScaleDegrees = (): string => {
  return '1 - 2 - 3 - 4 - 5 - 6 - 7';
};