// src/pages/guitar-lessons/CagedScalePositions.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_ORDER: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const KEYS: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const colors = {
  darkNavy: '#153243',
  medNavy: '#284b63',
  sage: '#b4b8ab',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const E_FRET: Record<Note, number> = { F:1,'F#':2,G:3,'G#':4,A:5,'A#':6,B:7,C:8,'C#':9,D:10,'D#':11,E:12 };
const A_FRET: Record<Note, number> = { 'A#':1,B:2,C:3,'C#':4,D:5,'D#':6,E:7,F:8,'F#':9,G:10,'G#':11,A:12 };
const D_FRET: Record<Note, number> = { D:0,'D#':1,E:2,F:3,'F#':4,G:5,'G#':6,A:7,'A#':8,B:9,C:10,'C#':11 };

type Shape = 'C' | 'A' | 'G' | 'E' | 'D';
const SHAPES: Shape[] = ['C', 'A', 'G', 'E', 'D'];
const CAGED_PREV: Record<Shape, Shape> = { C: 'D', A: 'C', G: 'A', E: 'G', D: 'E' };
const CAGED_NEXT: Record<Shape, Shape> = { C: 'A', A: 'G', G: 'E', E: 'D', D: 'C' };

const MAJOR_INTERVALS = new Set([0, 2, 4, 5, 7, 9, 11]);

interface WindowInfo {
  low: number;
  high: number;
  rootFret: number;
  rootString: string;
  desc: string;
}

const getWindow = (key: Note, shape: Shape): WindowInfo => {
  switch (shape) {
    case 'E': {
      const n = E_FRET[key];
      return {
        low: n - 1, high: n + 3, rootFret: n, rootString: '6th string (low E)',
        desc: `Based on the E-shape barre chord. Root on the low E string at fret ${n}. Scale box covers frets ${n - 1}–${n + 3}.`,
      };
    }
    case 'A': {
      const n = A_FRET[key];
      return {
        low: n - 2, high: n + 3, rootFret: n, rootString: '5th string (A)',
        desc: `Based on the A-shape barre chord. Root on the A string at fret ${n}. Scale box covers frets ${n - 2}–${n + 3}.`,
      };
    }
    case 'G': {
      const n = E_FRET[key];
      return {
        low: n - 3, high: n + 1, rootFret: n, rootString: '6th and 1st strings (E)',
        desc: `Based on the open G chord shape. Root on the E strings at fret ${n}. Pattern extends below the root — frets ${Math.max(0, n - 4)}–${n + 1}.`,
      };
    }
    case 'C': {
      const n = A_FRET[key];
      return {
        low: n - 3, high: n + 1, rootFret: n, rootString: '5th string (A)',
        desc: `Based on the open C chord shape. Root on the A string at fret ${n}. Pattern extends below the root — frets ${Math.max(0, n - 3)}–${n + 1}.`,
      };
    }
    case 'D': {
      const n = D_FRET[key];
      const low = Math.max(0, n - 1);
      return {
        low, high: n + 3, rootFret: n, rootString: '4th string (D)',
        desc: `Based on the open D chord shape. Root on the D string at fret ${n}${n === 0 ? ' (open string)' : ''}. Scale box covers frets ${low}–${n + 3}.`,
      };
    }
  }
};

const makeNoteColors = (key: Note): Record<Note, string> => {
  const keyIdx = NOTE_ORDER.indexOf(key);
  return Object.fromEntries(ALL_NOTES.map(n => {
    const interval = (NOTE_ORDER.indexOf(n) - keyIdx + 12) % 12;
    if (interval === 0) return [n, 'bg-blue-500'];
    if (interval === 4) return [n, 'bg-orange-500'];
    if (interval === 7) return [n, 'bg-green-500'];
    if (MAJOR_INTERVALS.has(interval)) return [n, 'bg-yellow-400'];
    return [n, 'bg-gray-300'];
  })) as Record<Note, string>;
};

const getStringRange = (shape: Shape, si: number, win: WindowInfo) => {
  const { low, high, rootFret } = win;
  if (shape === 'C' && si === 3) return { low, high: rootFret - 1 };
  if (shape === 'A' && si !== 0) return { low: rootFret - 1, high };
  if (shape === 'G' && si === 2) return { low, high: rootFret - 1 };
  if (shape === 'G' && si === 3) return { low: Math.max(0, rootFret - 4), high: rootFret - 1 };
  return { low, high };
};

const getHighlight = (key: Note, win: WindowInfo, shape: Shape) => {
  const keyIdx = NOTE_ORDER.indexOf(key);
  return (si: number, fret: number): boolean => {
    const { low, high } = getStringRange(shape, si, win);
    if (fret < low || fret > high) return false;
    const pitch = (NOTE_ORDER.indexOf(strings[si]) + fret) % 12;
    const interval = (pitch - keyIdx + 12) % 12;
    return MAJOR_INTERVALS.has(interval);
  };
};

const CagedScalePositions = () => {
  const [key, setKey] = useState<Note>('C');
  const [shape, setShape] = useState<Shape>('C');

  const win = getWindow(key, shape);
  const noteColors = makeNoteColors(key);
  const highlight = getHighlight(key, win, shape);
  const numFrets = Math.max(13, win.high + 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            Each CAGED chord shape has a corresponding major scale position that surrounds it. The five
            positions tile the entire neck — learning all five gives you complete coverage in any key.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The chord tones sit embedded inside each scale box. Blue is the root, orange the 3rd, green
            the 5th — the same as the CAGED chord shapes lesson. Yellow dots are the remaining scale tones.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Key</p>
          <div className="flex gap-2 flex-wrap">
            {KEYS.map(k => (
              <button
                key={k}
                onClick={() => setKey(k)}
                className="px-3 py-1.5 rounded-lg font-bold text-sm transition-all"
                style={key === k
                  ? { background: colors.darkNavy, color: colors.cream }
                  : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Position</p>
          <div className="flex gap-2">
            {SHAPES.map(s => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className="flex-1 py-2.5 rounded-lg font-bold text-base transition-all"
                style={shape === s
                  ? { background: colors.darkNavy, color: colors.cream }
                  : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
            {key} Major — {shape} Position
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            {win.desc}
          </p>
          <p className="text-xs" style={{ color: colors.sage }}>
            Root: {win.rootString} at fret {win.rootFret}
          </p>
          <div className="flex items-center gap-3 pt-1 text-xs" style={{ color: colors.sage }}>
            <span>← {CAGED_PREV[shape]} position</span>
            <span className="flex-1 border-t" style={{ borderColor: colors.sage }} />
            <span>{CAGED_NEXT[shape]} position →</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs pt-3 border-t" style={{ borderColor: colors.sage }}>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
              root ({key})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
              3rd
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
              5th
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block shrink-0" />
              scale tone
            </span>
          </div>
        </div>

      </div>

      <div className="sticky top-4">
        <Fretboard
          numFrets={numFrets}
          strings={strings}
          selectedNotes={[]}
          useFlats={false}
          noteColors={noteColors}
          displayMode="notes"
          shouldHighlight={highlight}
        />
      </div>
    </div>
  );
};

export default CagedScalePositions;
