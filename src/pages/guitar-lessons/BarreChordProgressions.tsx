// src/pages/guitar-lessons/BarreChordProgressions.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const KEYS: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const colors = {
  darkNavy: '#153243',
  medNavy: '#284b63',
  sage: '#b4b8ab',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const NOTE_ORDER: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const step = (root: Note, n: number): Note => NOTE_ORDER[(NOTE_ORDER.indexOf(root) + n) % 12];

const E_FRET: Record<Note, number> = {
  'F': 1, 'F#': 2, 'G': 3, 'G#': 4, 'A': 5, 'A#': 6,
  'B': 7, 'C': 8, 'C#': 9, 'D': 10, 'D#': 11, 'E': 12,
};
const A_FRET: Record<Note, number> = {
  'A#': 1, 'B': 2, 'C': 3, 'C#': 4, 'D': 5, 'D#': 6,
  'E': 7, 'F': 8, 'F#': 9, 'G': 10, 'G#': 11, 'A': 12,
};

interface ChordSlot {
  roman: string;
  name: string;
  root: Note;
  third: Note;
  fifth: Note;
  isMinor: boolean;
}

const makeSlot = (roman: string, root: Note, isMinor: boolean): ChordSlot => ({
  roman,
  name: root + (isMinor ? 'm' : ''),
  root,
  third: step(root, isMinor ? 3 : 4),
  fifth: step(root, 7),
  isMinor,
});

type Prog = '145' | '1564';

const getSlots = (key: Note, prog: Prog): ChordSlot[] =>
  prog === '145'
    ? [
        makeSlot('I',  key,            false),
        makeSlot('IV', step(key, 5),   false),
        makeSlot('V',  step(key, 7),   false),
      ]
    : [
        makeSlot('I',   key,            false),
        makeSlot('V',   step(key, 7),   false),
        makeSlot('vi',  step(key, 9),   true),
        makeSlot('IV',  step(key, 5),   false),
      ];

const makeNoteColors = (slot: ChordSlot): Record<Note, string> => {
  const def = Object.fromEntries(ALL_NOTES.map(n => [n, 'bg-gray-300'])) as Record<Note, string>;
  return { ...def, [slot.root]: 'bg-blue-500', [slot.third]: 'bg-orange-500', [slot.fifth]: 'bg-green-500' };
};

const hlEMajor  = (n: number) => (si: number, fret: number) =>
  (si === 0 && fret === n) || (si === 1 && fret === n + 2) ||
  (si === 2 && fret === n + 2) || (si === 3 && fret === n + 1) ||
  (si === 4 && fret === n) || (si === 5 && fret === n);

const hlAMajor  = (n: number) => (si: number, fret: number) =>
  (si === 1 && fret === n) || (si === 2 && fret === n + 2) ||
  (si === 3 && fret === n + 2) || (si === 4 && fret === n + 2);

const hlEmMinor = (n: number) => (si: number, fret: number) =>
  (si === 0 && fret === n) || (si === 1 && fret === n + 2) ||
  (si === 2 && fret === n + 2) || (si === 3 && fret === n) ||
  (si === 4 && fret === n) || (si === 5 && fret === n);

const hlAmMinor = (n: number) => (si: number, fret: number) =>
  (si === 1 && fret === n) || (si === 2 && fret === n + 2) ||
  (si === 3 && fret === n + 2) || (si === 4 && fret === n + 1) ||
  (si === 5 && fret === n);

const getHighlight = (slot: ChordSlot, shape: 'E' | 'A') => {
  const n = shape === 'E' ? E_FRET[slot.root] : A_FRET[slot.root];
  if (!slot.isMinor) return shape === 'E' ? hlEMajor(n) : hlAMajor(n);
  return shape === 'E' ? hlEmMinor(n) : hlAmMinor(n);
};

const BarreChordProgressions = () => {
  const [key, setKey] = useState<Note>('G');
  const [prog, setProg] = useState<Prog>('145');
  const [shapes, setShapes] = useState<('E' | 'A')[]>(['E', 'E', 'E', 'E']);

  const slots = getSlots(key, prog);

  const setShape = (idx: number, shape: 'E' | 'A') =>
    setShapes(prev => prev.map((s, i) => (i === idx ? shape : s)));

  const allFrets = slots.map((slot, i) =>
    shapes[i] === 'E' ? E_FRET[slot.root] : A_FRET[slot.root]
  );
  const numFrets = Math.max(13, ...allFrets.map(f => f + 2));

  const resetShapes = () => setShapes(['E', 'E', 'E', 'E']);

  const gridCols = slots.length === 3
    ? 'grid-cols-1 sm:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className="flex flex-col gap-6">

      <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
        <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
          Barre chords unlock any chord progression in any key. The I–IV–V and I–V–vi–IV progressions
          are the foundation of countless songs — once you can play them with barre chords, you can
          play them in every key without retuning or using a capo.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
          Each chord can be played as an E-shape (root on low E string) or A-shape (root on A string).
          Comparing the two fret numbers for each chord shows you how to keep your hand in one area
          of the neck.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Key</p>
          <div className="flex gap-2 flex-wrap">
            {KEYS.map(k => (
              <button
                key={k}
                onClick={() => { setKey(k); resetShapes(); }}
                className="px-3 py-1.5 rounded-lg font-bold text-sm transition-all"
                style={
                  key === k
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Progression</p>
          <div className="flex gap-2">
            {(['145', '1564'] as Prog[]).map(p => (
              <button
                key={p}
                onClick={() => { setProg(p); resetShapes(); }}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={
                  prog === p
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                {p === '145' ? 'I – IV – V' : 'I – V – vi – IV'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`grid gap-6 ${gridCols}`}>
        {slots.map((slot, idx) => {
          const shape = shapes[idx];
          return (
            <div key={`${prog}-${slot.roman}-${slot.name}`} className="flex flex-col gap-3">
              <div className="rounded-xl p-4" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: colors.medNavy, color: colors.cream }}
                  >
                    {slot.roman}
                  </span>
                  <span className="font-bold text-base" style={{ color: colors.darkNavy }}>
                    {slot.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShape(idx, 'E')}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={
                      shape === 'E'
                        ? { background: colors.darkNavy, color: colors.cream }
                        : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                    }
                  >
                    {slot.isMinor ? 'Em-shape' : 'E-shape'} · fret {E_FRET[slot.root]}
                  </button>
                  <button
                    onClick={() => setShape(idx, 'A')}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={
                      shape === 'A'
                        ? { background: colors.darkNavy, color: colors.cream }
                        : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                    }
                  >
                    {slot.isMinor ? 'Am-shape' : 'A-shape'} · fret {A_FRET[slot.root]}
                  </button>
                </div>
              </div>

              <Fretboard
                numFrets={numFrets}
                strings={strings}
                selectedNotes={[]}
                useFlats={false}
                noteColors={makeNoteColors(slot)}
                displayMode="notes"
                shouldHighlight={getHighlight(slot, shape)}
              />

              <div className="flex flex-wrap gap-3 text-xs px-1" style={{ color: colors.medNavy }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
                  root ({slot.root})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
                  {slot.isMinor ? '♭3rd' : '3rd'} ({slot.third})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
                  5th ({slot.fifth})
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BarreChordProgressions;
