// src/utils/fretboardUtils.ts
import { Note, Triad, StringSet, ChordTone } from '../types';
import { getNoteAtPosition } from './utils';

// Convert string set name to array of string indices
export const stringSetToIndices = (stringSet: StringSet): number[] => {
  if (stringSet === 'All') {
    return [0, 1, 2, 3, 4, 5]; // All 6 strings
  }
  
  // Parse format like "1-2-3" into array of indices [0, 1, 2]
  return stringSet
    .split('-')
    .map(num => parseInt(num) - 1);
};

// Get all positions where a note appears on a specific string
export const getNotePositionsOnString = (
  note: Note, 
  stringNote: string, 
  maxFret: number
): number[] => {
  const positions: number[] = [];
  
  for (let fret = 0; fret <= maxFret; fret++) {
    if (getNoteAtPosition(stringNote, fret) === note) {
      positions.push(fret);
    }
  }
  
  return positions;
};

// Find all chord tones for a triad on specified string set
export const getTriadTones = (
  triad: Triad, 
  stringSet: StringSet, 
  strings: string[],
  maxFret: number
): ChordTone[] => {
  const stringIndices = stringSetToIndices(stringSet);
  const chordTones: ChordTone[] = [];
  
  // For each string in the set
  stringIndices.forEach(stringIndex => {
    // Skip if invalid string index
    if (stringIndex < 0 || stringIndex >= strings.length) return;
    
    const stringNote = strings[stringIndex];
    
    // For each note in the triad
    triad.notes.forEach(note => {
      // Find all positions of this note on this string
      const frets = getNotePositionsOnString(note, stringNote, maxFret);
      
      // Create chord tone objects for each position
      frets.forEach(fret => {
        chordTones.push({
          note,
          interval: triad.intervals[note],
          position: {
            string: stringIndex,
            fret
          }
        });
      });
    });
  });
  
  return chordTones;
};

// Filter notes based on string set
export const filterNotesByStringSet = (
  triad: Triad,
  stringSet: StringSet,
  strings: string[],
  maxFret: number
): Note[] => {
  if (stringSet === 'All') {
    return triad.notes; // Return all triad notes for 'All' string set
  }
  
  // Get the chord tones for the specific string set
  const chordTones = getTriadTones(triad, stringSet, strings, maxFret);
  
  // Extract unique notes from the chord tones
  const uniqueNotes = Array.from(new Set(chordTones.map(tone => tone.note)));
  
  return uniqueNotes;
};

