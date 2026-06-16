// src/pages/guitar-lessons/MinorBarreChords.tsx
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

// Em-shape minor: root on low E string
const EM_CHORDS: BarreChord[] = [
  { name: 'Fm',  barre: 1,  root: 'F',  third: 'G#', fifth: 'C'  },
  { name: 'F#m', barre: 2,  root: 'F#', third: 'A',  fifth: 'C#' },
  { name: 'Gm',  barre: 3,  root: 'G',  third: 'A#', fifth: 'D'  },
  { name: 'G#m', barre: 4,  root: 'G#', third: 'B',  fifth: 'D#' },
  { name: 'Am',  barre: 5,  root: 'A',  third: 'C',  fifth: 'E'  },
  { name: 'A#m', barre: 6,  root: 'A#', third: 'C#', fifth: 'F'  },
  { name: 'Bm',  barre: 7,  root: 'B',  third: 'D',  fifth: 'F#' },
  { name: 'Cm',  barre: 8,  root: 'C',  third: 'D#', fifth: 'G'  },
  { name: 'C#m', barre: 9,  root: 'C#', third: 'E',  fifth: 'G#' },
  { name: 'Dm',  barre: 10, root: 'D',  third: 'F',  fifth: 'A'  },
  { name: 'D#m', barre: 11, root: 'D#', third: 'F#', fifth: 'A#' },
];

// Am-shape minor: root on A string
const AM_CHORDS: BarreChord[] = [
  { name: 'A#m', barre: 1,  root: 'A#', third: 'C#', fifth: 'F'  },
  { name: 'Bm',  barre: 2,  root: 'B',  third: 'D',  fifth: 'F#' },
  { name: 'Cm',  barre: 3,  root: 'C',  third: 'D#', fifth: 'G'  },
  { name: 'C#m', barre: 4,  root: 'C#', third: 'E',  fifth: 'G#' },
  { name: 'Dm',  barre: 5,  root: 'D',  third: 'F',  fifth: 'A'  },
  { name: 'D#m', barre: 6,  root: 'D#', third: 'F#', fifth: 'A#' },
  { name: 'Em',  barre: 7,  root: 'E',  third: 'G',  fifth: 'B'  },
  { name: 'Fm',  barre: 8,  root: 'F',  third: 'G#', fifth: 'C'  },
  { name: 'F#m', barre: 9,  root: 'F#', third: 'A',  fifth: 'C#' },
  { name: 'Gm',  barre: 10, root: 'G',  third: 'A#', fifth: 'D'  },
  { name: 'G#m', barre: 11, root: 'G#', third: 'B',  fifth: 'D#' },
];

const makeNoteColors = (chord: BarreChord): Record<Note, string> => {
  const def = Object.fromEntries(ALL_NOTES.map(n => [n, 'bg-gray-300'])) as Record<Note, string>;
  return { ...def, [chord.root]: 'bg-blue-500', [chord.third]: 'bg-orange-500', [chord.fifth]: 'bg-green-500' };
};

// Em-shape: same as E-shape major but G string stays at fret n (minor 3rd instead of n+1)
const makeEmHighlight = (chord: BarreChord) => (si: number, fret: number): boolean => {
  const n = chord.barre;
  return (
    (si === 0 && fret === n) ||
    (si === 1 && fret === n + 2) ||
    (si === 2 && fret === n + 2) ||
    (si === 3 && fret === n) ||
    (si === 4 && fret === n) ||
    (si === 5 && fret === n)
  );
};

// Am-shape: low E muted, B at n+1 (minor 3rd), D/G at n+2, high e at n (5th via barre)
const makeAmHighlight = (chord: BarreChord) => (si: number, fret: number): boolean => {
  const n = chord.barre;
  return (
    (si === 1 && fret === n) ||
    (si === 2 && fret === n + 2) ||
    (si === 3 && fret === n + 2) ||
    (si === 4 && fret === n + 1) ||
    (si === 5 && fret === n)
  );
};

type Shape = 'em' | 'am';

const MinorBarreChords = () => {
  const [shape, setShape] = useState<Shape>('em');
  const chords = shape === 'em' ? EM_CHORDS : AM_CHORDS;
  const [active, setActive] = useState<BarreChord>(EM_CHORDS[0]);
  const makeHighlight = shape === 'em' ? makeEmHighlight : makeAmHighlight;

  const handleShapeChange = (s: Shape) => {
    setShape(s);
    setActive(s === 'em' ? EM_CHORDS[0] : AM_CHORDS[0]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            Minor barre chords follow the same principle as major barre chords — you take an open minor
            chord shape and move it up the neck with your index finger as a barre. The two essential
            shapes are the Em-shape (root on the low E string) and the Am-shape (root on the A string).
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The key difference from major shapes: the minor third sits one fret lower, giving the chord
            its darker character.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>
            Shape
          </p>
          <div className="flex gap-2">
            {(['em', 'am'] as Shape[]).map(s => (
              <button
                key={s}
                onClick={() => handleShapeChange(s)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={
                  shape === s
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                {s === 'em' ? 'Em-shape' : 'Am-shape'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>
            Minor Chords
          </p>
          <div className="flex gap-2 flex-wrap">
            {chords.map(chord => (
              <button
                key={`${shape}-${chord.name}`}
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
          {shape === 'em' ? (
            <ul className="space-y-1 text-sm" style={{ color: colors.medNavy }}>
              <li><strong>Index:</strong> barre all 6 strings at fret {active.barre}</li>
              <li><strong>Middle:</strong> A string at fret {active.barre + 2}</li>
              <li><strong>Ring:</strong> D string at fret {active.barre + 2}</li>
            </ul>
          ) : (
            <ul className="space-y-1 text-sm" style={{ color: colors.medNavy }}>
              <li><strong>Mute:</strong> low E string (6th string)</li>
              <li><strong>Index:</strong> barre strings A–e at fret {active.barre}</li>
              <li><strong>Middle:</strong> B string at fret {active.barre + 1}</li>
              <li><strong>Ring:</strong> G string at fret {active.barre + 2}</li>
              <li><strong>Pinky:</strong> D string at fret {active.barre + 2}</li>
            </ul>
          )}
          {shape === 'em' && (
            <p className="text-xs" style={{ color: colors.sage }}>
              G, B, and high e strings ring at the barre fret — no extra fingers needed.
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-xs pt-3 border-t" style={{ borderColor: colors.sage }}>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
              root ({active.root})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
              &#9837;3rd ({active.third})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
              5th ({active.fifth})
            </span>
          </div>
        </div>

      </div>

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

export default MinorBarreChords;
