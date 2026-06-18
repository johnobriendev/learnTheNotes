import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note, MajorScaleKey, ScalePattern } from '../../types';
import { getAllThreeNotesPerStringPatterns } from '../../utils/patternUtils';
import { createCustomNoteDisplay } from '../../utils/scaleUtils';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
const NOTE_ORDER: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const KEYS: MajorScaleKey[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Gb', 'F', 'Bb', 'Eb', 'Ab', 'Db'];
const FLAT_KEYS = new Set<MajorScaleKey>(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']);

const KEY_TO_NOTE: Record<MajorScaleKey, Note> = {
  C: 'C', G: 'G', D: 'D', A: 'A', E: 'E', B: 'B',
  'F#': 'F#', Gb: 'F#',
  F: 'F', Bb: 'A#', Eb: 'D#', Ab: 'G#', Db: 'C#',
};

const MAJOR_INTERVALS = new Set([0, 2, 4, 5, 7, 9, 11]);

const colors = {
  darkNavy: '#153243',
  medNavy: '#284b63',
  sage: '#b4b8ab',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const makeNoteColors = (keyName: MajorScaleKey): Record<Note, string> => {
  const keyIdx = NOTE_ORDER.indexOf(KEY_TO_NOTE[keyName]);
  return Object.fromEntries(NOTE_ORDER.map(n => {
    const interval = (NOTE_ORDER.indexOf(n) - keyIdx + 12) % 12;
    if (interval === 0) return [n, 'bg-blue-500'];
    if (interval === 4) return [n, 'bg-orange-500'];
    if (interval === 7) return [n, 'bg-green-500'];
    if (MAJOR_INTERVALS.has(interval)) return [n, 'bg-yellow-400'];
    return [n, 'bg-gray-300'];
  })) as Record<Note, string>;
};

const getHighlight = (pattern: ScalePattern) => {
  const set = new Set<string>();
  pattern.strings.forEach((notes, si) => notes.forEach(({ fret }) => set.add(`${si}-${fret}`)));
  return (si: number, fret: number) => set.has(`${si}-${fret}`);
};

const ThreeNotePerStringScales = () => {
  const [key, setKey] = useState<MajorScaleKey>('C');
  const [patternIndex, setPatternIndex] = useState(0);

  const patterns = getAllThreeNotesPerStringPatterns(key, 'major');
  const pattern = patterns[patternIndex];

  const maxFret = Math.max(...pattern.strings.flatMap(s => s.map(n => n.fret)));
  const numFrets = Math.max(13, maxFret + 2);

  const noteColors = makeNoteColors(key);
  const highlight = getHighlight(pattern);
  const useFlats = FLAT_KEYS.has(key);
  const customNoteDisplay = createCustomNoteDisplay(key, 'major');

  const startNote = pattern.strings[0][0]?.displayNote ?? '';
  const prevIndex = (patternIndex - 1 + 7) % 7;
  const nextIndex = (patternIndex + 1) % 7;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            Three-note-per-string patterns place exactly three notes on every string, giving a consistent
            stretch across the neck. Because each string has 3 notes, there are 7 patterns — one starting
            on each scale degree — that together tile the full fretboard.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
            The uniform grouping makes these patterns popular for legato and high-speed playing.
            Blue is the root, orange the 3rd, green the 5th — the same color scheme as the CAGED lessons.
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
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.sage }}>Pattern</p>
          <div className="flex gap-2">
            {patterns.map((_, i) => (
              <button
                key={i}
                onClick={() => setPatternIndex(i)}
                className="flex-1 py-2.5 rounded-lg font-bold text-base transition-all"
                style={patternIndex === i
                  ? { background: colors.darkNavy, color: colors.cream }
                  : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5 flex flex-col gap-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
          <h3 className="font-bold text-lg" style={{ color: colors.darkNavy }}>
            {key} Major — Pattern {patternIndex + 1}
          </h3>
          <p className="text-sm" style={{ color: colors.medNavy }}>
            Frets {pattern.startFret}–{maxFret} · Starts on {startNote} (low E string)
          </p>
          <div className="flex items-center gap-3 pt-1 text-xs" style={{ color: colors.sage }}>
            <span>← Pattern {prevIndex + 1}</span>
            <span className="flex-1 border-t" style={{ borderColor: colors.sage }} />
            <span>Pattern {nextIndex + 1} →</span>
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
          useFlats={useFlats}
          noteColors={noteColors}
          displayMode="notes"
          shouldHighlight={highlight}
          customNoteDisplay={customNoteDisplay}
        />
      </div>
    </div>
  );
};

export default ThreeNotePerStringScales;
