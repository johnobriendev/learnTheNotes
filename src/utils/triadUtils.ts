import { Note, ChordQuality, Triad, IntervalName } from '../types';
import { allNotes } from '../constants';

/**
 * Creates a triad based on the given root note and chord quality
 */
export const createTriad = (root: Note, quality: ChordQuality): Triad => {
  const rootIndex = allNotes.indexOf(root);
  let intervals: number[] = [];
  
  // Determine intervals based on chord quality
  switch (quality) {
    case 'major':
      intervals = [0, 4, 7]; // Root, major 3rd, perfect 5th
      break;
    case 'minor':
      intervals = [0, 3, 7]; // Root, minor 3rd, perfect 5th
      break;
    case 'diminished':
      intervals = [0, 3, 6]; // Root, minor 3rd, diminished 5th
      break;
    case 'augmented':
      intervals = [0, 4, 8]; // Root, major 3rd, augmented 5th
      break;
  }
  
  // Calculate the notes in the triad
  const notes: Note[] = intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return allNotes[noteIndex];
  });
  
  // Create a mapping of notes to interval names
  const intervalNames = {} as Record<Note, IntervalName>;
  notes.forEach((note, index) => {
    let intervalName: IntervalName;
    switch (index) {
      case 0:
        intervalName = 'R'; // Root
        break;
      case 1:
        intervalName = quality === 'major' || quality === 'augmented' ? '3' : '♭3';
        break;
      case 2:
        if (quality === 'diminished') intervalName = '♭5';
        else if (quality === 'augmented') intervalName = '♯5';
        else intervalName = '5';
        break;
      default:
        intervalName = 'R'; // Default fallback
    }
    intervalNames[note] = intervalName;
  });
  
  return {
    root,
    quality,
    notes,
    intervals: intervalNames
  };
};

/**
 * Returns the notes and intervals for a triad
 * Utility function for components that need formatted triad data
 */
export const getTriadDetails = (triad: Triad, useFlats: boolean = false) => {
  // Import the displayNote function here to avoid circular dependencies
  const displayNote = (note: Note, useFlats: boolean): string => {
    const sharpToFlat: Record<Note, string> = {
      'C': 'C',
      'C#': 'D♭',
      'D': 'D',
      'D#': 'E♭',
      'E': 'E',
      'F': 'F',
      'F#': 'G♭',
      'G': 'G',
      'G#': 'A♭',
      'A': 'A',
      'A#': 'B♭',
      'B': 'B'
    };
    return useFlats ? sharpToFlat[note] : note;
  };
  
  return {
    rootName: displayNote(triad.root, useFlats),
    quality: triad.quality,
    noteNames: triad.notes.map(note => displayNote(note, useFlats)),
    intervalText: getIntervalText(triad.quality)
  };
};

/**
 * Helper function to get proper notation for intervals based on quality
 */
const getIntervalText = (quality: ChordQuality): string => {
  switch (quality) {
    case 'major':
      return 'Root - 3rd - 5th';
    case 'minor':
      return 'Root - ♭3rd - 5th';
    case 'diminished':
      return 'Root - ♭3rd - ♭5th';
    case 'augmented':
      return 'Root - 3rd - ♯5th';
    default:
      return 'Root - 3rd - 5th';
  }
};