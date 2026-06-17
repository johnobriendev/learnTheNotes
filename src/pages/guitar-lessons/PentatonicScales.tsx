// src/pages/guitar-lessons/PentatonicScales.tsx
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

// Root fret on low E string
const E_FRET: Record<Note, number> = { F:1,'F#':2,G:3,'G#':4,A:5,'A#':6,B:7,C:8,'C#':9,D:10,'D#':11,E:12 };

const MINOR_PENT = new Set([0, 3, 5, 7, 10]);
const MAJOR_PENT = new Set([0, 2, 4, 7, 9]);

type ScaleType = 'major' | 'minor';

// Fret window offsets relative to E_FRET[key].
// Minor P3 and major P2 extend to +8/+5 to reach the B string's extra fret.
const WINDOWS: Record<ScaleType, { low: number; high: number }[]> = {
  minor: [
    { low: 0, high: 3 },
    { low: 2, high: 5 },
    { low: 4, high: 8 },
    { low: 7, high: 10 },
    { low: 9, high: 12 },
  ],
  major: [
    { low: -1, high: 2 },
    { low: 1, high: 5 },
    { low: 4, high: 7 },
    { low: 6, high: 9 },
    { low: 9, high: 12 },
  ],
};

const makeNoteColors = (key: Note, scaleType: ScaleType): Record<Note, string> => {
  const keyIdx = NOTE_ORDER.indexOf(key);
  const scale = scaleType === 'minor' ? MINOR_PENT : MAJOR_PENT;
  const thirdInterval = scaleType === 'minor' ? 3 : 4;
  return Object.fromEntries(ALL_NOTES.map(n => {
    const interval = (NOTE_ORDER.indexOf(n) - keyIdx + 12) % 12;
    if (interval === 0) return [n, 'bg-blue-500'];
    if (interval === thirdInterval) return [n, 'bg-orange-500'];
    if (interval === 7) return [n, 'bg-green-500'];
    if (scale.has(interval)) return [n, 'bg-yellow-400'];
    return [n, 'bg-gray-300'];
  })) as Record<Note, string>;
};

const getHighlight = (key: Note, scaleType: ScaleType, lowFret: number, highFret: number) => {
  const keyIdx = NOTE_ORDER.indexOf(key);
  const scale = scaleType === 'minor' ? MINOR_PENT : MAJOR_PENT;
  return (si: number, fret: number): boolean => {
    if (fret < lowFret || fret > highFret) return false;
    const pitch = (NOTE_ORDER.indexOf(strings[si]) + fret) % 12;
    const interval = (pitch - keyIdx + 12) % 12;
    return scale.has(interval);
  };
};

const PentatonicScales = () => {
  const [key, setKey] = useState<Note>('A');
  const [scaleType, setScaleType] = useState<ScaleType>('minor');
  const [position, setPosition] = useState(1);

  const r = E_FRET[key];
  const win = WINDOWS[scaleType][position - 1];
  let offset = r;
  while (offset - 12 + win.low >= 0) offset -= 12;
  const lowFret = Math.max(0, offset + win.low);
  const highFret = offset + win.high;
  const numFrets = Math.max(13, highFret + 2);
  const noteColors = makeNoteColors(key, scaleType);
  const highlight = getHighlight(key, scaleType, lowFret, highFret);

  const keyIdx = NOTE_ORDER.indexOf(key);
  const thirdInterval = scaleType === 'minor' ? 3 : 4;
  const thirdNote = NOTE_ORDER[(keyIdx + thirdInterval) % 12];
  const fifthNote = NOTE_ORDER[(keyIdx + 7) % 12];
  const relativeNote = scaleType === 'minor'
    ? NOTE_ORDER[(keyIdx + 3) % 12]
    : NOTE_ORDER[(keyIdx + 9) % 12];
  const relativeLabel = scaleType === 'minor'
    ? `Same notes as ${relativeNote} major pentatonic`
    : `Same notes as ${relativeNote} minor pentatonic`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The pentatonic scale uses five notes per octave — a subset of the major scale that removes
            the two most harmonically tense intervals. It's the most widely used scale for soloing
            in rock, blues, country, and pop.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            There are five box positions that tile the entire neck. The major and minor pentatonic
            share the same five boxes — they're relative scales, just starting from a different root.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Scale</p>
          <div className="flex gap-2">
            {(['minor', 'major'] as ScaleType[]).map(s => (
              <button
                key={s}
                onClick={() => setScaleType(s)}
                className="flex-1 py-2.5 rounded-lg font-bold text-sm transition-all"
                style={scaleType === s
                  ? { background: colors.darkNavy, color: colors.cream }
                  : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                {s === 'minor' ? 'Minor Pentatonic' : 'Major Pentatonic'}
              </button>
            ))}
          </div>
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
            {[1, 2, 3, 4, 5].map(p => (
              <button
                key={p}
                onClick={() => setPosition(p)}
                className="flex-1 py-2.5 rounded-lg font-bold text-base transition-all"
                style={position === p
                  ? { background: colors.darkNavy, color: colors.cream }
                  : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
            {key} {scaleType === 'minor' ? 'Minor' : 'Major'} Pentatonic — Position {position}
          </h3>
          <p className="text-sm" style={{ color: colors.medNavy }}>
            Root on the low E string at fret {r}. Box covers frets {lowFret}–{highFret}.
          </p>
          <p className="text-xs italic" style={{ color: colors.sage }}>
            {relativeLabel}
          </p>
          <div className="flex flex-wrap gap-4 text-xs pt-3 border-t" style={{ borderColor: colors.sage }}>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block shrink-0" />
              root ({key})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shrink-0" />
              {scaleType === 'minor' ? 'b3' : '3'} ({thirdNote})
            </span>
            <span className="flex items-center gap-1.5" style={{ color: colors.medNavy }}>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shrink-0" />
              5th ({fifthNote})
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

export default PentatonicScales;
