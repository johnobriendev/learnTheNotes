// src/pages/lessons/RootPositionSeventhChords.tsx
import React from 'react';
import LessonLayout, { useDiagramSwitcher } from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const DiagramButton: React.FC<{ diagramIndex: number; label: string }> = ({ diagramIndex, label }) => {
  const { setActiveDiagram, activeDiagram } = useDiagramSwitcher();
  const isActive = activeDiagram === diagramIndex;
  return (
    <button
      onClick={() => setActiveDiagram(diagramIndex)}
      className={`ml-2 text-xs px-2 py-1 rounded transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

const DEF: Record<Note, string> = {
  C: 'bg-gray-300', 'C#': 'bg-gray-300', D: 'bg-gray-300', 'D#': 'bg-gray-300',
  E: 'bg-gray-300', F: 'bg-gray-300', 'F#': 'bg-gray-300', G: 'bg-gray-300',
  'G#': 'bg-gray-300', A: 'bg-gray-300', 'A#': 'bg-gray-300', B: 'bg-gray-300',
};
const nc = (o: Partial<Record<Note, string>>): Record<Note, string> => ({ ...DEF, ...o });

const makeHighlight = (pos: Record<number, number[]>) =>
  (si: number, f: number) => pos[si]?.includes(f) ?? false;

// 5th string root — C on A string (fret 3), strings A-D-G-B (indices 1-4)
// Voicing low→high: Root – 5th – 7th – 3rd
const hl5 = {
  maj7: makeHighlight({ 1: [3], 2: [5], 3: [4], 4: [5] }), // C G B E
  dom7: makeHighlight({ 1: [3], 2: [5], 3: [3], 4: [5] }), // C G Bb E
  min7: makeHighlight({ 1: [3], 2: [5], 3: [3], 4: [4] }), // C G Bb Eb
  m7b5: makeHighlight({ 1: [3], 2: [4], 3: [3], 4: [4] }), // C Gb Bb Eb
  dim7: makeHighlight({ 1: [3], 2: [4], 3: [2], 4: [4] }), // C Gb A  Eb
};

const nc5 = {
  maj7: nc({ C: 'bg-blue-600', E: 'bg-orange-500', G: 'bg-green-500', B: 'bg-purple-500' }),
  dom7: nc({ C: 'bg-blue-600', E: 'bg-orange-500', G: 'bg-green-500', 'A#': 'bg-purple-500' }),
  min7: nc({ C: 'bg-blue-600', 'D#': 'bg-orange-500', G: 'bg-green-500', 'A#': 'bg-purple-500' }),
  m7b5: nc({ C: 'bg-blue-600', 'D#': 'bg-orange-500', 'F#': 'bg-green-500', 'A#': 'bg-purple-500' }),
  dim7: nc({ C: 'bg-blue-600', 'D#': 'bg-orange-500', 'F#': 'bg-green-500', A: 'bg-purple-500' }),
};

// 6th string root — G on low E string (fret 3), strings E-D-G-B (indices 0,2,3,4)
// Voicing low→high: Root – 7th – 3rd – 5th
const hl6 = {
  maj7: makeHighlight({ 0: [3], 2: [4], 3: [4], 4: [3] }), // G F# B D
  dom7: makeHighlight({ 0: [3], 2: [3], 3: [4], 4: [3] }), // G F  B D
  min7: makeHighlight({ 0: [3], 2: [3], 3: [3], 4: [3] }), // G F  Bb D
  m7b5: makeHighlight({ 0: [3], 2: [3], 3: [3], 4: [2] }), // G F  Bb Db
  dim7: makeHighlight({ 0: [3], 2: [2], 3: [3], 4: [2] }), // G E  Bb Db
};

const nc6 = {
  maj7: nc({ G: 'bg-blue-600', B: 'bg-orange-500', D: 'bg-green-500', 'F#': 'bg-purple-500' }),
  dom7: nc({ G: 'bg-blue-600', B: 'bg-orange-500', D: 'bg-green-500', F: 'bg-purple-500' }),
  min7: nc({ G: 'bg-blue-600', 'A#': 'bg-orange-500', D: 'bg-green-500', F: 'bg-purple-500' }),
  m7b5: nc({ G: 'bg-blue-600', 'A#': 'bg-orange-500', 'C#': 'bg-green-500', F: 'bg-purple-500' }),
  dim7: nc({ G: 'bg-blue-600', 'A#': 'bg-orange-500', 'C#': 'bg-green-500', E: 'bg-purple-500' }),
};

type ChordKey = 'maj7' | 'dom7' | 'min7' | 'm7b5' | 'dim7';

const makeFretboard = (hl: (si: number, f: number) => boolean, noteColors: Record<Note, string>) => (
  <Fretboard
    numFrets={7}
    strings={strings}
    selectedNotes={[]}
    useFlats={false}
    noteColors={noteColors}
    displayMode="notes"
    shouldHighlight={hl}
  />
);

const legend = (
  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-blue-600" /> root</span>
    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-orange-500" /> 3rd</span>
    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-green-500" /> 5th</span>
    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-purple-500" /> 7th</span>
  </div>
);

const chordEntries: Array<{ key: ChordKey; label: string }> = [
  { key: 'maj7', label: 'maj 7' },
  { key: 'dom7', label: 'dom 7' },
  { key: 'min7', label: 'min 7' },
  { key: 'm7b5', label: 'm7♭5' },
  { key: 'dim7', label: 'dim 7' },
];

const diagrams = chordEntries.map(({ key, label }) => ({
  label,
  content: (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">5th string root — C</p>
      {makeFretboard(hl5[key], nc5[key])}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide pt-2">6th string root — G</p>
      {makeFretboard(hl6[key], nc6[key])}
      {legend}
    </div>
  ),
}));

const RootPositionSeventhChords = () => {
  const textContent = (
    <>
      <p>
        In root position, the root is always the lowest sounding note. These four-string voicings
        cover the five most common seventh chord qualities. Both string groups use the same movable
        shapes — shift up or down the neck to change the root.
      </p>

      <br />

      <h4 className="flex items-center font-semibold">
        maj 7 <DiagramButton diagramIndex={0} label="View Diagram" />
      </h4>
      <p className="text-sm text-gray-600 mb-2">1 – 3 – 5 – △7</p>
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">{`     Cmaj7  Gmaj7
e|    x      x
B|    5      3
G|    4      4
D|    5      4
A|    3      x
E|    x      3`}</pre>
      </div>

      <h4 className="flex items-center font-semibold">
        dom 7 <DiagramButton diagramIndex={1} label="View Diagram" />
      </h4>
      <p className="text-sm text-gray-600 mb-2">1 – 3 – 5 – ♭7</p>
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">{`     C7     G7
e|    x      x
B|    5      3
G|    3      4
D|    5      3
A|    3      x
E|    x      3`}</pre>
      </div>

      <h4 className="flex items-center font-semibold">
        min 7 <DiagramButton diagramIndex={2} label="View Diagram" />
      </h4>
      <p className="text-sm text-gray-600 mb-2">1 – ♭3 – 5 – ♭7</p>
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">{`     Cm7    Gm7
e|    x      x
B|    4      3
G|    3      3
D|    5      3
A|    3      x
E|    x      3`}</pre>
      </div>

      <h4 className="flex items-center font-semibold">
        m7♭5 <DiagramButton diagramIndex={3} label="View Diagram" />
      </h4>
      <p className="text-sm text-gray-600 mb-2">1 – ♭3 – ♭5 – ♭7</p>
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">{`     Cm7♭5  Gm7♭5
e|    x      x
B|    4      2
G|    3      3
D|    4      3
A|    3      x
E|    x      3`}</pre>
      </div>

      <h4 className="flex items-center font-semibold">
        dim 7 <DiagramButton diagramIndex={4} label="View Diagram" />
      </h4>
      <p className="text-sm text-gray-600 mb-2">1 – ♭3 – ♭5 – 𝄫7</p>
      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">{`     Cdim7  Gdim7
e|    x      x
B|    4      2
G|    2      3
D|    4      2
A|    3      x
E|    x      3`}</pre>
      </div>

      <br />

      <p className="text-sm text-gray-600">
        Each quality is one step from the next — lower one interval by a half step to move
        from maj7 → dom7 → min7 → m7♭5 → dim7.
      </p>
    </>
  );

  return (
    <LessonLayout
      title="Root Position Seventh Chords"
      difficulty="intermediate"
      diagrams={diagrams}
      textContent={textContent}
    />
  );
};

export default RootPositionSeventhChords;
