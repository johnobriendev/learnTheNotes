// src/pages/guitar-lessons/OpenChords.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

const ALL_NOTES: Note[] = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const makeColors = (root: Note): Record<Note, string> =>
  Object.fromEntries(
    ALL_NOTES.map(n => [n, n === root ? 'bg-blue-500' : 'bg-slate-500'])
  ) as Record<Note, string>;

interface Chord {
  name: string;
  root: Note;
  // positions[stringIndex] = fret numbers to highlight (omit string index to mute)
  positions: Record<number, number[]>;
  fingering: string[];
  muted: number[]; // string indices that are muted
}

const MAJOR_CHORDS: Chord[] = [
  {
    name: 'E',
    root: 'E',
    positions: { 0: [0], 1: [2], 2: [2], 3: [1], 4: [0], 5: [0] },
    fingering: ['Index — G string, 1st fret', 'Middle — A string, 2nd fret', 'Ring — D string, 2nd fret'],
    muted: [],
  },
  {
    name: 'A',
    root: 'A',
    positions: { 1: [0], 2: [2], 3: [2], 4: [2], 5: [0] },
    fingering: ['Index — D string, 2nd fret', 'Middle — G string, 2nd fret', 'Ring — B string, 2nd fret'],
    muted: [0],
  },
  {
    name: 'D',
    root: 'D',
    positions: { 2: [0], 3: [2], 4: [3], 5: [2] },
    fingering: ['Index — G string, 2nd fret', 'Middle — e string, 2nd fret', 'Ring — B string, 3rd fret'],
    muted: [0, 1],
  },
  {
    name: 'G',
    root: 'G',
    positions: { 0: [3], 1: [2], 2: [0], 3: [0], 4: [0], 5: [3] },
    fingering: ['Middle — A string, 2nd fret', 'Ring — low E string, 3rd fret', 'Pinky — high e string, 3rd fret'],
    muted: [],
  },
  {
    name: 'C',
    root: 'C',
    positions: { 1: [3], 2: [2], 3: [0], 4: [1], 5: [0] },
    fingering: ['Index — B string, 1st fret', 'Middle — D string, 2nd fret', 'Ring — A string, 3rd fret'],
    muted: [0],
  },
  {
    name: 'F',
    root: 'F',
    positions: { 2: [3], 3: [2], 4: [1], 5: [1] },
    fingering: ['Index — B and e strings, 1st fret (mini barre)', 'Middle — G string, 2nd fret', 'Ring — D string, 3rd fret'],
    muted: [0, 1],
  },
];

const MINOR_CHORDS: Chord[] = [
  {
    name: 'Em',
    root: 'E',
    positions: { 0: [0], 1: [2], 2: [2], 3: [0], 4: [0], 5: [0] },
    fingering: ['Middle — A string, 2nd fret', 'Ring — D string, 2nd fret'],
    muted: [],
  },
  {
    name: 'Am',
    root: 'A',
    positions: { 1: [0], 2: [2], 3: [2], 4: [1], 5: [0] },
    fingering: ['Index — B string, 1st fret', 'Middle — D string, 2nd fret', 'Ring — G string, 2nd fret'],
    muted: [0],
  },
  {
    name: 'Dm',
    root: 'D',
    positions: { 2: [0], 3: [2], 4: [3], 5: [1] },
    fingering: ['Index — e string, 1st fret', 'Middle — G string, 2nd fret', 'Ring — B string, 3rd fret'],
    muted: [0, 1],
  },
];

const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e'];

const OpenChords = () => {
  const [active, setActive] = useState<Chord>(MAJOR_CHORDS[0]);

  const colors = {
    darkNavy: '#153243',
    medNavy: '#284b63',
    sage: '#b4b8ab',
    cream: '#f4f9e9',
    lightGray: '#eef0eb',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: chord selector + fingering */}
      <div className="flex flex-col gap-6">

        {/* Major chords */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: colors.sage }}>
            Major Chords
          </p>
          <div className="flex gap-2 flex-wrap">
            {MAJOR_CHORDS.map(chord => (
              <button
                key={chord.name}
                onClick={() => setActive(chord)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={
                  active.name === chord.name
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                {chord.name}
              </button>
            ))}
          </div>
        </div>

        {/* Minor chords */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: colors.sage }}>
            Minor Chords
          </p>
          <div className="flex gap-2 flex-wrap">
            {MINOR_CHORDS.map(chord => (
              <button
                key={chord.name}
                onClick={() => setActive(chord)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={
                  active.name === chord.name
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                {chord.name}
              </button>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <video key={active.name} autoPlay controls className="w-full h-full">
            <source src={`/open${active.name}.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Fingering + string map */}
        <div className="rounded-xl p-5 flex flex-col gap-4" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
            {active.name} — Fingering
          </h3>

          {/* Muted strings */}
          {active.muted.length > 0 && (
            <p className="text-sm" style={{ color: colors.medNavy }}>
              <strong>Mute:</strong> {active.muted.map(i => STRING_NAMES[i]).join(', ')} string{active.muted.length > 1 ? 's' : ''} (don't play)
            </p>
          )}

          <ul className="space-y-1 text-sm" style={{ color: colors.medNavy }}>
            {active.fingering.map(f => <li key={f}>{f}</li>)}
          </ul>

          <div className="flex items-center gap-3 mt-1">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
            <span className="text-sm" style={{ color: colors.medNavy }}>Blue dot = root note ({active.root})</span>
          </div>
        </div>
      </div>

      {/* Right: fretboard */}
      <div className="sticky top-4">
        <Fretboard
          numFrets={5}
          strings={strings}
          selectedNotes={[]}
          useFlats={false}
          noteColors={makeColors(active.root)}
          displayMode="notes"
          shouldHighlight={(si, fret) => active.positions[si]?.includes(fret) ?? false}
        />
      </div>
    </div>
  );
};

export default OpenChords;
