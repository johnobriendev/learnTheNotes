// src/pages/music-theory/BuildingSeventhChords.tsx
import { useState } from 'react';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

// Major scale notes for each root (used to derive correct diatonic spellings)
const majorScales: Record<string, string[]> = {
  'C':  ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'D':  ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'E':  ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F':  ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'G':  ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'A':  ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'B':  ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
};

// Lower a note by one half step while preserving letter name
function lowerNote(note: string): string {
  if (note.endsWith('##')) return note.slice(0, -1);
  if (note.endsWith('#')) return note.slice(0, -1);
  return note + 'b';
}

function getChordNote(root: string, degIndex: number, halfStepsDown: number): string {
  const scale = majorScales[root] ?? majorScales['C'];
  let note = scale[degIndex];
  for (let i = 0; i < halfStepsDown; i++) note = lowerNote(note);
  return note;
}

// deg = index into major scale (0=root,2=3rd,4=5th,6=7th), low = semitones to lower
interface Interval { deg: number; low: number; }

const chordTypes: Array<{
  name: string; label: string; quality: string;
  formula: string[]; intervals: Interval[];
}> = [
  {
    name: 'maj7', label: 'Major 7', quality: 'Major',
    formula: ['1', '3', '5', '7'],
    intervals: [{ deg: 0, low: 0 }, { deg: 2, low: 0 }, { deg: 4, low: 0 }, { deg: 6, low: 0 }],
  },
  {
    name: '7', label: 'Dominant 7', quality: 'Dominant',
    formula: ['1', '3', '5', 'b7'],
    intervals: [{ deg: 0, low: 0 }, { deg: 2, low: 0 }, { deg: 4, low: 0 }, { deg: 6, low: 1 }],
  },
  {
    name: 'min7', label: 'Minor 7', quality: 'Minor',
    formula: ['1', 'b3', '5', 'b7'],
    intervals: [{ deg: 0, low: 0 }, { deg: 2, low: 1 }, { deg: 4, low: 0 }, { deg: 6, low: 1 }],
  },
  {
    name: 'min7b5', label: 'Minor 7b5', quality: 'Half-dim',
    formula: ['1', 'b3', 'b5', 'b7'],
    intervals: [{ deg: 0, low: 0 }, { deg: 2, low: 1 }, { deg: 4, low: 1 }, { deg: 6, low: 1 }],
  },
  {
    name: 'dim7', label: 'Diminished 7', quality: 'Diminished',
    formula: ['1', 'b3', 'b5', 'bb7'],
    intervals: [{ deg: 0, low: 0 }, { deg: 2, low: 1 }, { deg: 4, low: 1 }, { deg: 6, low: 2 }],
  },
];

const qualityColor: Record<string, { background: string; color: string }> = {
  Major:      { background: colors.medNavy,   color: colors.cream },
  Dominant:   { background: '#7a5230',        color: colors.cream },
  Minor:      { background: colors.lightGray, color: colors.darkNavy },
  'Half-dim': { background: colors.darkNavy,  color: colors.sage },
  Diminished: { background: '#1a0a2e',        color: colors.sage },
};

const rootRows = [
  ['C', 'Db', 'D', 'Eb', 'E', 'F'],
  ['F#', 'G', 'Ab', 'A', 'Bb', 'B'],
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold mt-6 mb-2" style={{ color: colors.darkNavy }}>{children}</h2>
);

const BuildingSeventhChords = () => {
  const [selectedRoot, setSelectedRoot] = useState('C');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text content */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:overflow-y-auto lg:max-h-[calc(100vh-6rem)]">
          <H2>What Makes a 7th Chord?</H2>
          <p style={{ color: colors.medNavy }}>
            A 7th chord is a triad with one more note stacked on top — the <strong>7th interval</strong> above the root.
            The type of 7th (major, minor, or diminished) combined with the quality of the underlying triad
            produces five distinct chord types, each with its own sound and function.
          </p>

          <H2>The Five 7th Chord Types</H2>

          <div className="mt-3 space-y-2">
            {[
              'Major 7 (maj7) — 1 3 5 7',
              'Dominant 7 (7) — 1 3 5 b7',
              'Minor 7 (min7) — 1 b3 5 b7',
              'Minor 7b5 (min7b5) — 1 b3 b5 b7',
              'Fully Diminished (dim7) — 1 b3 b5 bb7',
            ].map((label) => (
              <div key={label} className="rounded-lg px-4 py-3" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
                <div className="font-bold text-sm" style={{ color: colors.darkNavy }}>{label}</div>
              </div>
            ))}
          </div>

          <H2>Understanding the Interval Degrees</H2>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>1</strong> — the root note</li>
            <li><strong>3</strong> — major third (4 semitones above root)</li>
            <li><strong>b3</strong> — minor third (3 semitones above root)</li>
            <li><strong>5</strong> — perfect fifth (7 semitones above root)</li>
            <li><strong>b5</strong> — diminished fifth / tritone (6 semitones above root)</li>
            <li><strong>7</strong> — major seventh (11 semitones above root)</li>
            <li><strong>b7</strong> — minor seventh (10 semitones above root)</li>
            <li><strong>bb7</strong> — diminished seventh (9 semitones above root)</li>
          </ul>

          <H2>Connection to Major Scale Harmony</H2>
          <p style={{ color: colors.medNavy }}>
            These chord types cover everything that naturally occurs when harmonizing a major scale:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>I maj7, IV maj7</strong> — major 7th</li>
            <li><strong>V 7</strong> — dominant 7th</li>
            <li><strong>ii min7, iii min7, vi min7</strong> — minor 7th</li>
            <li><strong>vii min7b5</strong> — minor 7b5</li>
          </ul>
          <p className="mt-3" style={{ color: colors.medNavy }}>
            The fully diminished 7th doesn't appear naturally in major scale harmony, but is widely used
            as a passing chord or borrowed from harmonic minor.
          </p>
        </div>

        {/* Chord reference */}
        <div className="sticky top-4">
          <div className="rounded-xl shadow-md overflow-hidden" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
            {/* Header */}
            <div className="px-6 py-4" style={{ background: colors.darkNavy }}>
              <h3 className="text-lg font-bold" style={{ color: colors.cream }}>
                7th Chord Reference — {selectedRoot}
              </h3>
              <p className="text-sm mt-1" style={{ color: colors.sage }}>All five 7th chord types from the same root</p>
            </div>

            {/* Root selector */}
            <div className="px-4 py-3 flex flex-col gap-2" style={{ background: colors.medNavy }}>
              {rootRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2">
                  {row.map((note) => (
                    <button
                      key={note}
                      onClick={() => setSelectedRoot(note)}
                      className="text-xs font-bold px-2.5 py-1 rounded-md transition-all"
                      style={
                        selectedRoot === note
                          ? { background: colors.cream, color: colors.darkNavy }
                          : { background: 'transparent', color: colors.sage, border: `1px solid ${colors.sage}` }
                      }
                    >
                      {note}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Chord rows */}
            <div className="divide-y" style={{ borderColor: colors.sage }}>
              {chordTypes.map((chord) => {
                const notes = chord.intervals.map(({ deg, low }) =>
                  getChordNote(selectedRoot, deg, low)
                );
                return (
                  <div key={chord.name} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm" style={{ color: colors.darkNavy }}>
                        {selectedRoot} {chord.name}
                      </div>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={qualityColor[chord.quality]}
                      >
                        {chord.label}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {/* Formula */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold mb-1" style={{ color: colors.sage }}>Degrees</div>
                        <div className="font-mono text-xs font-semibold" style={{ color: colors.medNavy }}>
                          {chord.formula.join(' – ')}
                        </div>
                      </div>
                      <div className="w-px" style={{ background: colors.sage }} />
                      {/* Notes */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold mb-1" style={{ color: colors.sage }}>Notes</div>
                        <div className="font-mono text-xs font-semibold" style={{ color: colors.darkNavy }}>
                          {notes.join(' – ')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingSeventhChords;
