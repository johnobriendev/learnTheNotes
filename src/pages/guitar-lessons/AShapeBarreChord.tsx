// src/pages/guitar-lessons/AShapeBarreChord.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const colors = {
  darkNavy: '#153243',
  medNavy: '#284b63',
  sage: '#b4b8ab',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

interface BarreChord {
  name: string;
  barre: number;
  root: Note;
  third: Note;
  fifth: Note;
}

const CHORDS: BarreChord[] = [
  { name: 'A#', barre: 1,  root: 'A#', third: 'D',  fifth: 'F'  },
  { name: 'B',  barre: 2,  root: 'B',  third: 'D#', fifth: 'F#' },
  { name: 'C',  barre: 3,  root: 'C',  third: 'E',  fifth: 'G'  },
  { name: 'C#', barre: 4,  root: 'C#', third: 'F',  fifth: 'G#' },
  { name: 'D',  barre: 5,  root: 'D',  third: 'F#', fifth: 'A'  },
  { name: 'D#', barre: 6,  root: 'D#', third: 'G',  fifth: 'A#' },
  { name: 'E',  barre: 7,  root: 'E',  third: 'G#', fifth: 'B'  },
  { name: 'F',  barre: 8,  root: 'F',  third: 'A',  fifth: 'C'  },
  { name: 'F#', barre: 9,  root: 'F#', third: 'A#', fifth: 'C#' },
  { name: 'G',  barre: 10, root: 'G',  third: 'B',  fifth: 'D'  },
  { name: 'G#', barre: 11, root: 'G#', third: 'C',  fifth: 'D#' },
];

const makeNoteColors = (chord: BarreChord): Record<Note, string> => {
  const def = Object.fromEntries(ALL_NOTES.map(n => [n, 'bg-gray-300'])) as Record<Note, string>;
  return { ...def, [chord.root]: 'bg-blue-500', [chord.third]: 'bg-orange-500', [chord.fifth]: 'bg-green-500' };
};

// A-shape positions relative to barre fret n:
//   string 0 (E):  muted — do not play
//   string 1 (A):  fret n     — barre (root)
//   string 2 (D):  fret n+2   — ring barre (5th)
//   string 3 (G):  fret n+2   — ring barre (root octave)
//   string 4 (B):  fret n+2   — ring barre (3rd)
//   string 5 (e):  muted — do not play
const makeHighlight = (chord: BarreChord) => (si: number, fret: number): boolean => {
  const n = chord.barre;
  return (
    (si === 1 && fret === n) ||
    (si === 2 && fret === n + 2) ||
    (si === 3 && fret === n + 2) ||
    (si === 4 && fret === n + 2)
  );
};

const AShapeBarreChord = () => {
  const [active, setActive] = useState<BarreChord>(CHORDS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: explanation + chord selector + fingering */}
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The A-shape barre chord is the open A major chord moved up the neck. Your index finger
            barres all six strings at the barre fret, and your ring finger barres the D, G, and B
            strings two frets higher.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The root is on the A string at the barre fret. Mute the low E string — it falls below
            the root and muddies the sound.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>
            Major Chords
          </p>
          <div className="flex gap-2 flex-wrap">
            {CHORDS.map(chord => (
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

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
            {active.name} — Fingering
          </h3>
          <ul className="space-y-1 text-sm" style={{ color: colors.medNavy }}>
            <li><strong>Mute:</strong> low E string (6th string) and high e string (1st string)</li>
            <li><strong>Index:</strong> barre strings A–B at fret {active.barre}</li>
            <li><strong>Ring:</strong> barre D, G, B strings at fret {active.barre + 2}</li>
          </ul>
          <p className="text-xs" style={{ color: colors.sage }}>
            Alternatively: middle / ring / pinky on D / G / B strings at fret {active.barre + 2}.
          </p>
          <div className="flex flex-wrap gap-4 text-xs pt-3 border-t" style={{ borderColor: colors.sage }}>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
              root ({active.root})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
              3rd ({active.third})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
              5th ({active.fifth})
            </span>
          </div>
        </div>

      </div>

      {/* Right: fretboard */}
      <div className="sticky top-4">
        <Fretboard
          numFrets={13}
          strings={strings}
          selectedNotes={[]}
          useFlats={false}
          noteColors={makeNoteColors(active)}
          displayMode="notes"
          shouldHighlight={makeHighlight(active)}
        />
      </div>
    </div>
  );
};

export default AShapeBarreChord;
