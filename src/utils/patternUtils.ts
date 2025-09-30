// src/utils/patternUtils.ts
import { Note, MajorScaleKey, ScaleType, ScalePattern, PatternNote, PatternNumber, CAGEDPattern } from '../types';
import { allNotes, standardTuning } from '../constants';
import { createScale } from './scaleUtils';

// CAGED pattern definitions: scale degrees for each string
// Note: 3rd string (G) and 2nd string (B) have only 2 notes in some patterns
const cagedPatternDegrees: Record<CAGEDPattern, number[][]> = {
  'C': [
    [3, 4, 5],    // 6th string: E
    [6, 7, 1],    // 5th string: A
    [2, 3, 4],    // 4th string: D
    [5, 6],       // 3rd string: G
    [7, 1, 2],    // 2nd string: B
    [3, 4, 5]     // 1st string: E
  ],
  'A': [
    [4, 5, 6],    // 6th string: E
    [7, 1, 2],    // 5th string: A
    [3, 4, 5],    // 4th string: D
    [6, 7, 1],    // 3rd string: G
    [2, 3],       // 2nd string: B
    [4, 5, 6]     // 1st string: E
  ],
  'G': [
    [6, 7, 1],    // 6th string: E
    [2, 3, 4],    // 5th string: A
    [5, 6],       // 4th string: D
    [7, 1, 2],    // 3rd string: G
    [3, 4, 5],    // 2nd string: B
    [6, 7, 1]     // 1st string: E
  ],
  'E': [
    [7, 1, 2],    // 6th string: E
    [3, 4, 5],    // 5th string: A
    [6, 7, 1],    // 4th string: D
    [2, 3, 4],    // 3rd string: G
    [5, 6],       // 2nd string: B
    [7, 1, 2]     // 1st string: E
  ],
  'D': [
    [2, 3, 4],    // 6th string: E
    [5, 6],       // 5th string: A
    [7, 1, 2],    // 4th string: D
    [3, 4, 5],    // 3rd string: G
    [6, 7, 1],    // 2nd string: B
    [2, 3, 4]     // 1st string: E
  ]
};

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

// Generate a CAGED pattern for a given scale
export const getCAGEDPattern = (
  key: MajorScaleKey,
  scaleType: ScaleType,
  cagedPattern: CAGEDPattern
): ScalePattern => {
  const scale = createScale(key, scaleType);
  const patternDegrees = cagedPatternDegrees[cagedPattern];

  // Helper to check if a pattern would contain any open string notes
  const wouldContainOpenStrings = (startFret: number): boolean => {
    for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
      const degrees = patternDegrees[stringIndex];
      const openNote = standardTuning[stringIndex] as Note;
      const openNoteIndex = allNotes.indexOf(openNote);

      const searchStartFret = Math.max(1, startFret - 2);
      const searchEndFret = startFret + 7;

      for (const degree of degrees) {
        const scaleDegree = degree - 1;
        const note = scale.notes[scaleDegree];

        // Check if this note would be found at fret 0 within search range
        if (note === openNote && searchStartFret <= 1) {
          return true;
        }
      }
    }
    return false;
  };

  // Find the starting position based on the first note of the first string
  const firstDegree = patternDegrees[0][0] - 1; // 0-indexed
  const firstNote = scale.notes[firstDegree];
  let patternStartFret = findLowestFret(0, firstNote);

  // If this position would include open strings, find the next occurrence
  if (wouldContainOpenStrings(patternStartFret)) {
    patternStartFret = findLowestFret(0, firstNote, patternStartFret + 12);
  }

  const strings: PatternNote[][] = [];
  let minFret = Infinity;
  let maxFret = -Infinity;

  // For each string (from low E to high E, index 0-5)
  for (let stringIndex = 0; stringIndex < 6; stringIndex++) {
    const stringNotes: PatternNote[] = [];
    const degrees = patternDegrees[stringIndex];

    const openNote = standardTuning[stringIndex] as Note;
    const openNoteIndex = allNotes.indexOf(openNote);

    // Determine search range for this string - stay within ~5 frets of pattern start
    const searchStartFret = Math.max(1, patternStartFret - 2);
    const searchEndFret = patternStartFret + 7;

    // Get each scale degree for this string
    for (let i = 0; i < degrees.length; i++) {
      const degree = degrees[i];
      const scaleDegree = degree - 1; // Convert to 0-indexed
      const note = scale.notes[scaleDegree];
      const displayNote = scale.displayNotes[scaleDegree];
      const interval = scale.intervals[note];

      // Find this note on this string within the pattern range
      let foundFret = -1;

      // If we already have notes on this string, find the next occurrence after the last note
      const lastNoteFret = stringNotes.length > 0 ? stringNotes[stringNotes.length - 1].fret : 0;

      // Search within the pattern range
      for (let fret = Math.max(searchStartFret, lastNoteFret + 1); fret <= searchEndFret; fret++) {
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
    cagedPattern,
    startFret: minFret,
    strings
  };
};

// Generate all 5 CAGED patterns for a scale
// Sorted by starting fret position (lowest to highest)
export const getAllCAGEDPatterns = (
  key: MajorScaleKey,
  scaleType: ScaleType
): ScalePattern[] => {
  const cagedOrder: CAGEDPattern[] = ['C', 'A', 'G', 'E', 'D'];
  const patterns: ScalePattern[] = [];

  for (const cagedPattern of cagedOrder) {
    patterns.push(getCAGEDPattern(key, scaleType, cagedPattern));
  }

  // Sort patterns by their starting fret (lowest to highest)
  patterns.sort((a, b) => a.startFret - b.startFret);

  return patterns;
};