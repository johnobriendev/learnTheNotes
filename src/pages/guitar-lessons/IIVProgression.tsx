// src/pages/guitar-lessons/IIVProgression.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
const ALL_NOTES: Note[] = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const makeColors = (root: Note): Record<Note, string> =>
  Object.fromEntries(
    ALL_NOTES.map(n => [n, n === root ? 'bg-blue-500' : 'bg-slate-500'])
  ) as Record<Note, string>;

interface ChordShape {
  name: string;
  root: Note;
  positions: Record<number, number[]>;
}

const SHAPES: Record<string, ChordShape> = {
  C: { name: 'C', root: 'C', positions: { 1: [3], 2: [2], 3: [0], 4: [1], 5: [0] } },
  F: { name: 'F', root: 'F', positions: { 2: [3], 3: [2], 4: [1], 5: [1] } },
  G: { name: 'G', root: 'G', positions: { 0: [3], 1: [2], 2: [0], 3: [0], 4: [0], 5: [3] } },
  D: { name: 'D', root: 'D', positions: { 2: [0], 3: [2], 4: [3], 5: [2] } },
  A: { name: 'A', root: 'A', positions: { 1: [0], 2: [2], 3: [2], 4: [2], 5: [0] } },
  E: { name: 'E', root: 'E', positions: { 0: [0], 1: [2], 2: [2], 3: [1], 4: [0], 5: [0] } },
};

const PROGRESSIONS = [
  { key: 'C', one: 'C', four: 'F', degrees: ['C', 'D', 'E', 'F'] },
  { key: 'G', one: 'G', four: 'C', degrees: ['G', 'A', 'B', 'C'] },
  { key: 'D', one: 'D', four: 'G', degrees: ['D', 'E', 'F#', 'G'] },
  { key: 'A', one: 'A', four: 'D', degrees: ['A', 'B', 'C#', 'D'] },
  { key: 'E', one: 'E', four: 'A', degrees: ['E', 'F#', 'G#', 'A'] },
];

const colors = {
  darkNavy: '#153243',
  medNavy: '#284b63',
  sage: '#b4b8ab',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const ChordPanel = ({ chord, numeral }: { chord: ChordShape; numeral: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="text-center">
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.sage }}>{numeral}</span>
      <h3 className="text-2xl font-bold" style={{ color: colors.darkNavy }}>{chord.name}</h3>
    </div>
    <Fretboard
      numFrets={5}
      strings={strings}
      selectedNotes={[]}
      useFlats={false}
      noteColors={makeColors(chord.root)}
      displayMode="notes"
      shouldHighlight={(si, fret) => chord.positions[si]?.includes(fret) ?? false}
    />
  </div>
);

const IIVProgression = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const prog = PROGRESSIONS[activeIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: selector + description */}
      <div
        className="rounded-xl p-6 flex flex-col gap-6 h-fit"
        style={{ background: '#fff', border: `1px solid ${colors.sage}` }}
      >
        {/* Key selector */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: colors.sage }}>
            Select a Key
          </p>
          <div className="flex gap-2 flex-wrap">
            {PROGRESSIONS.map((p, i) => (
              <button
                key={p.key}
                onClick={() => setActiveIdx(i)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={
                  activeIdx === i
                    ? { background: colors.darkNavy, color: colors.cream }
                    : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }
                }
              >
                Key of {p.key}
              </button>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
          <video key={prog.key} autoPlay controls className="w-full h-full">
            <source src={`/14${prog.one}${prog.four}.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3 text-sm" style={{ color: colors.darkNavy }}>
          <p>
            The <strong>I</strong> and <strong>IV</strong> are numbers that refer to the position of a chord within a key.
            In the key of <strong>{prog.key}</strong>, if you count up the major scale, each note gets a number:
          </p>

          {/* Scale degrees */}
          <div className="flex gap-2">
            {prog.degrees.map((note, i) => {
              const isOne = i === 0;
              const isFour = i === 3;
              const isHighlighted = isOne || isFour;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base"
                    style={
                      isHighlighted
                        ? { background: colors.darkNavy, color: colors.cream }
                        : { background: colors.lightGray, color: colors.medNavy }
                    }
                  >
                    {note}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: isHighlighted ? colors.darkNavy : colors.sage }}>
                    {isOne ? 'I' : isFour ? 'IV' : i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          <p style={{ color: colors.medNavy }}>
            <strong style={{ color: colors.darkNavy }}>{prog.one}</strong> is the 1st note — that's the I chord.{' '}
            <strong style={{ color: colors.darkNavy }}>{prog.four}</strong> is the 4th note — that's the IV chord.
            The Roman numerals I and IV are just a way of writing "1st chord" and "4th chord" that works across all keys.
          </p>

          <p style={{ color: colors.medNavy }}>
            Practice switching back and forth between the two chords on the right. Try to make the transition smooth before moving on.
          </p>
        </div>
      </div>

      {/* Right: both fretboards stacked */}
      <div className="flex flex-col gap-8">
        <ChordPanel chord={SHAPES[prog.one]} numeral="I" />
        <ChordPanel chord={SHAPES[prog.four]} numeral="IV" />
      </div>
    </div>
  );
};

export default IIVProgression;
