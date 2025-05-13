import { Note, StringSet, Triad, ChordTone } from '../types';
import { getNoteAtPosition } from './utils';

// Convert string set name to array of string indices (0-based)
// IMPORTANT: Guitarists count strings from highest (thinnest) to lowest (thickest)
// String 1 is the high E string (index 5 in a 0-based array starting from low E)
export const stringSetToIndices = (stringSet: StringSet): number[] => {
  if (stringSet === 'All') {
    return [0, 1, 2, 3, 4, 5]; // All 6 strings (low E to high E)
  }

  // Parse format like "1-2-3" (high E, B, G) into array of indices
  // Convert from guitarist's numbering (1 = high E) to array indices (5 = high E)
  return stringSet
    .split('-')
    .map(num => {
      const stringNumber = parseInt(num);
      // Convert guitarist's numbering (1-6) to zero-based array index (5-0)
      return 6 - stringNumber;
    });
};

// Find all positions where a specific note appears on a given string
export const getNotePositionsOnString = (
  note: Note,
  stringNote: string,
  maxFret: number
): number[] => {
  const positions = [];

  for (let fret = 0; fret <= maxFret; fret++) {
    if (getNoteAtPosition(stringNote, fret) === note) {
      positions.push(fret);
    }
  }

  return positions;
};

// Find all positions of triad notes on the selected string set
export const getTriadPositions = (
  triad: Triad,
  stringSet: StringSet,
  strings: string[],
  maxFret: number
): ChordTone[] => {
  const stringIndices = stringSetToIndices(stringSet);
  const positions: ChordTone[] = [];

  // For each string in the selected set
  stringIndices.forEach(stringIndex => {
    // Make sure the string index is valid
    if (stringIndex < 0 || stringIndex >= strings.length) return;

    const stringNote = strings[stringIndex];

    // Check each note in the triad
    triad.notes.forEach(note => {
      const intervalName = triad.intervals[note];

      // Find all positions of this note on this string
      const frets = getNotePositionsOnString(note, stringNote, maxFret);

      // Add each position to the results
      frets.forEach(fret => {
        positions.push({
          note,
          interval: intervalName,
          position: {
            string: stringIndex,
            fret
          }
        });
      });
    });
  });

  return positions;
};

// Filter triad notes based on the selected string set
export const filterNotesByStringSet = (
  triad: Triad,
  stringSet: StringSet,
  strings: string[],
  maxFret: number
): Note[] => {
  // For "All" string set, return all triad notes
  if (stringSet === 'All') {
    return triad.notes;
  }

  // Get all positions of triad notes on the selected strings
  const positions = getTriadPositions(triad, stringSet, strings, maxFret);

  // Extract the notes that appear on these strings (removing duplicates)
  const notesOnStrings = Array.from(new Set(positions.map(pos => pos.note)));

  return notesOnStrings;
};