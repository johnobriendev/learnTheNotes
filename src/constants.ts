// src/constants.ts
import { Note } from './types';

export const allNotes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const noteColors: Record<Note, string> = {
  'C': 'bg-red-500', 'C#': 'bg-red-600', 'D': 'bg-orange-500',
  'D#': 'bg-orange-600', 'E': 'bg-yellow-500', 'F': 'bg-green-500',
  'F#': 'bg-green-600', 'G': 'bg-blue-500', 'G#': 'bg-blue-600',
  'A': 'bg-purple-500', 'A#': 'bg-purple-600', 'B': 'bg-pink-500'
};

export const sharpToFlat: Record<Note, string> = {
  'C': 'C', 'C#': 'Db', 'D': 'D', 'D#': 'Eb', 'E': 'E',
  'F': 'F', 'F#': 'Gb', 'G': 'G', 'G#': 'Ab', 'A': 'A', 
  'A#': 'Bb', 'B': 'B'
};

export const standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

export const fretCountOptions = [12, 15, 20, 22, 24];