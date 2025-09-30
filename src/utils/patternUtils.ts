// src/utils/patternUtils.ts
import { Note, MajorScaleKey, ScaleType, ScalePattern, PatternNote, PatternNumber } from '../types';
import { allNotes, standardTuning } from '../constants';
import { createScale } from './scaleUtils';

// Find the lowest fret position for a note on a given string (starting from fret 1)
const findLowestFret = (stringIndex: number, targetNote: Note, minFret: number = 1): number => {
  const openNote = standardTuning[stringIndex] as Note;
  const openNoteIndex = allNotes.indexOf(openNote);

  for (let fret = minFret; fret <= 24; fret++) {
    const fretNoteIndex = (openNoteIndex + fret) % 12;
    const fretNote = allNotes[fretNoteIndex];
    if (fretNote === targetNote) {
      return fret;
    }
  }
  return -1;
};

// Generate a three-notes-per-string pattern for a given scale
// Each pattern starts with a different scale degree on the 6th string (low E)
// Pattern 1 starts with 4th degree, Pattern 2 with 5th degree, etc.
export const getThreeNotesPerStringPattern = (
  key: MajorScaleKey,
  scaleType: ScaleType,
  patternNumber: PatternNumber
): ScalePattern => {
  const scale = createScale(key, scaleType);

  // Calculate starting scale degree for this pattern (0-indexed)
  // Pattern 1 starts at degree 3 (4th note), Pattern 2 at degree 4, etc.
  const startingDegree = (patternNumber + 2) % 7;

  const strings: PatternNote[][] = [];
  let minFret = Infinity;
  let maxFret = -Infinity;

  // Find the starting fret on the 6th string (low E) for the first note of this pattern
  const firstNote = scale.notes[startingDegree];
  const patternStartFret = findLowestFret(0, firstNote);

  // For each string (from low E to high E, index 0-5)
  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    const stringNotes: PatternNote[] = [];

    // Calculate which 3 scale degrees this string should have
    // Each string advances 3 degrees through the scale
    const stringStartDegree = (startingDegree + (stringIndex * 3)) % 7;

    // Get the 3 consecutive scale notes for this string
    for (let i = 0; i < 3; i++) {
      const scaleDegree = (stringStartDegree + i) % 7;
      const note = scale.notes[scaleDegree];
      const displayNote = scale.displayNotes[scaleDegree];
      const interval = scale.intervals[note];

      // For the first string, start from the pattern start fret
      // For subsequent strings, stay within a reasonable range of the pattern
      const searchStartFret = stringIndex === 0 ? patternStartFret : Math.max(1, patternStartFret - 2);

      // Find this note on this string
      let foundFret = -1;

      // If we already have notes on this string, find the next occurrence after the last note
      const lastNoteFret = stringNotes.length > 0 ? stringNotes[stringNotes.length - 1].fret : 0;

      for (let fret = Math.max(searchStartFret, lastNoteFret + 1); fret <= 24; fret++) {
        const openNote = standardTuning[stringIndex] as Note;
        const openNoteIndex = allNotes.indexOf(openNote);
        const fretNoteIndex = (openNoteIndex + fret) % 12;
        const fretNote = allNotes[fretNoteIndex];

        if (fretNote === note) {
          foundFret = fret;
          break;
        }
      }

      if (foundFret !== -1) {
        stringNotes.push({
          note,
          displayNote,
          interval,
          fret: foundFret
        });
        minFret = Math.min(minFret, foundFret);
        maxFret = Math.max(maxFret, foundFret);
      }
    }

    strings.push(stringNotes);
  }

  return {
    patternNumber,
    startFret: minFret,
    strings
  };
};

// Generate all 7 three-notes-per-string patterns for a scale
// Sorted by starting fret position (lowest to highest)
export const getAllThreeNotesPerStringPatterns = (
  key: MajorScaleKey,
  scaleType: ScaleType
): ScalePattern[] => {
  const patterns: ScalePattern[] = [];

  for (let i = 1; i <= 7; i++) {
    patterns.push(getThreeNotesPerStringPattern(key, scaleType, i as PatternNumber));
  }

  // Sort patterns by their starting fret (lowest to highest)
  patterns.sort((a, b) => a.startFret - b.startFret);

  return patterns;
};