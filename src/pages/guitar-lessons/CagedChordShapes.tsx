// src/pages/guitar-lessons/CagedChordShapes.tsx
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

const step = (root: Note, n: number): Note => NOTE_ORDER[(NOTE_ORDER.indexOf(root) + n) % 12];

// Root fret tables: string open note + n semitones = key
const E_FRET: Record<Note, number> = { F:1,'F#':2,G:3,'G#':4,A:5,'A#':6,B:7,C:8,'C#':9,D:10,'D#':11,E:12 };
const A_FRET: Record<Note, number> = { 'A#':1,B:2,C:3,'C#':4,D:5,'D#':6,E:7,F:8,'F#':9,G:10,'G#':11,A:12 };
const D_FRET: Record<Note, number> = { D:0,'D#':1,E:2,F:3,'F#':4,G:5,'G#':6,A:7,'A#':8,B:9,C:10,'C#':11 };

type Shape = 'C' | 'A' | 'G' | 'E' | 'D';
const SHAPES: Shape[] = ['C', 'A', 'G', 'E', 'D'];

interface ShapeConfig {
  fret: number;
  rootString: string;
  desc: string;
  highlight: (si: number, fret: number) => boolean;
}

const getConfig = (key: Note, shape: Shape): ShapeConfig => {
  switch (shape) {
    case 'E': {
      const n = E_FRET[key];
      return {
        fret: n,
        rootString: '6th string (low E)',
        desc: `Barre all 6 strings at fret ${n}. Middle finger: G string fret ${n+1}. Ring finger: A string fret ${n+2}. Pinky: D string fret ${n+2}.`,
        highlight: (si, f) =>
          (si===0&&f===n)||(si===1&&f===n+2)||(si===2&&f===n+2)||
          (si===3&&f===n+1)||(si===4&&f===n)||(si===5&&f===n),
      };
    }
    case 'A': {
      const n = A_FRET[key];
      return {
        fret: n,
        rootString: '5th string (A)',
        desc: `Barre at fret ${n}. Ring or pinky across D, G, B strings at fret ${n+2}. Low E and high e strings muted.`,
        highlight: (si, f) =>
          (si===1&&f===n)||(si===2&&f===n+2)||(si===3&&f===n+2)||(si===4&&f===n+2),
      };
    }
    case 'G': {
      const raw = E_FRET[key];
      const n = raw < 3 ? raw + 12 : raw;
      return {
        fret: n,
        rootString: '6th and 1st strings (E)',
        desc: `Root on both E strings at fret ${n}. Middle finger: A string fret ${n-1}. Ring, pinky (or barre): D, G, B strings at fret ${n-3}. Based on the open G chord shape.`,
        highlight: (si, f) =>
          (si===0&&f===n)||(si===1&&f===n-1)||(si===2&&f===n-3)||
          (si===3&&f===n-3)||(si===4&&f===n-3)||(si===5&&f===n),
      };
    }
    case 'C': {
      const raw = A_FRET[key];
      const n = raw < 3 ? raw + 12 : raw;
      return {
        fret: n,
        rootString: '5th string (A)',
        desc: `Root on A string at fret ${n}. D string: fret ${n-1}. G and high e strings: fret ${n-3}. B string: fret ${n-2}. Based on the open C chord shape.`,
        highlight: (si, f) =>
          (si===1&&f===n)||(si===2&&f===n-1)||(si===3&&f===n-3)||
          (si===4&&f===n-2)||(si===5&&f===n-3),
      };
    }
    case 'D': {
      const n = D_FRET[key];
      return {
        fret: n,
        rootString: '4th string (D)',
        desc: `Root on D string at fret ${n}${n===0?' (open string)':''}. G and high e strings: fret ${n+2}. B string: fret ${n+3}. Low E and A strings muted. Based on the open D chord shape.`,
        highlight: (si, f) =>
          (si===2&&f===n)||(si===3&&f===n+2)||(si===4&&f===n+3)||(si===5&&f===n+2),
      };
    }
  }
};

const makeNoteColors = (key: Note): Record<Note, string> => {
  const third = step(key, 4);
  const fifth = step(key, 7);
  const def = Object.fromEntries(ALL_NOTES.map(n => [n, 'bg-gray-300'])) as Record<Note, string>;
  return { ...def, [key]: 'bg-blue-500', [third]: 'bg-orange-500', [fifth]: 'bg-green-500' };
};

const getNumFrets = (shape: Shape, fret: number): number => {
  switch (shape) {
    case 'E': return Math.max(13, fret + 3);
    case 'A': return Math.max(13, fret + 3);
    case 'G': return Math.max(13, fret + 2);
    case 'C': return Math.max(13, fret + 2);
    case 'D': return Math.max(13, fret + 4);
  }
};

const CAGED_PREV: Record<Shape, Shape> = { C: 'D', A: 'C', G: 'A', E: 'G', D: 'E' };
const CAGED_NEXT: Record<Shape, Shape> = { C: 'A', A: 'G', G: 'E', E: 'D', D: 'C' };

const CagedChordShapes = () => {
  const [key, setKey] = useState<Note>('C');
  const [shape, setShape] = useState<Shape>('C');

  const config = getConfig(key, shape);
  const third = step(key, 4);
  const fifth = step(key, 7);
  const numFrets = getNumFrets(shape, config.fret);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The CAGED system shows that every major chord can be played in five different positions
            across the neck — each using the shape of one of the five open chords: C, A, G, E, D.
            These five shapes tile the fretboard without gaps, repeating every 12 frets.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            Pick a key and click through each shape to see how the same chord appears in five different
            positions. Notice that the C and A shapes share the same root string (A string), as do G and E
            (low E string) — only the voicing changes.
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
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Shape</p>
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
          <div className="flex items-baseline gap-3">
            <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
              {key} — {shape} Shape
            </h3>
            <span className="text-sm font-semibold" style={{ color: colors.sage }}>
              fret {config.fret}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            {config.desc}
          </p>
          <p className="text-xs" style={{ color: colors.sage }}>
            Root: {config.rootString}
          </p>
          <div className="flex items-center gap-3 pt-1 text-xs" style={{ color: colors.sage }}>
            <span>← {CAGED_PREV[shape]} shape</span>
            <span className="flex-1 border-t" style={{ borderColor: colors.sage }} />
            <span>{CAGED_NEXT[shape]} shape →</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs pt-3 border-t" style={{ borderColor: colors.sage }}>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
              root ({key})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
              3rd ({third})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
              5th ({fifth})
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
          noteColors={makeNoteColors(key)}
          displayMode="notes"
          shouldHighlight={config.highlight}
        />
      </div>
    </div>
  );
};

export default CagedChordShapes;
