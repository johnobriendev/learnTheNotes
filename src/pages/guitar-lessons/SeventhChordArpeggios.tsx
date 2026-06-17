import React, { useState } from 'react';
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

const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const makeColors = (map: Partial<Record<Note, string>>): Record<Note, string> => {
  const r = {} as Record<Note, string>;
  for (const n of ALL_NOTES) r[n] = map[n] ?? 'bg-gray-400';
  return r;
};

const makeHighlight = (pos: Record<number, number[]>) =>
  (si: number, fret: number) => (pos[si]?.includes(fret) ?? false);

const STRINGS: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

type NoteDisplay = Record<Note, string>;

// Helper: build a NoteDisplay from positional args (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
const nd = (C:string,Cs:string,D:string,Ds:string,E:string,F:string,Fs:string,G:string,Gs:string,A:string,As:string,B:string): NoteDisplay =>
  ({ C,'C#':Cs,D,'D#':Ds,E,F,'F#':Fs,G,'G#':Gs,A,'A#':As,B });

//                  C      C#     D      D#     E      F      F#     G      G#     A      A#     B
const KEY_DISPLAYS: NoteDisplay[] = [
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ),  // C
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'F#', 'G', 'Ab', 'A', 'Bb', 'B' ),  // G
  nd('C', 'C#', 'D', 'Eb', 'E', 'F',  'F#', 'G', 'Ab', 'A', 'Bb', 'B' ),  // D
  nd('C', 'C#', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'G#', 'A', 'Bb', 'B' ),  // A
  nd('C', 'Db', 'D', 'D#', 'E', 'F',  'F#', 'G', 'G#', 'A', 'Bb', 'B' ),  // E
  nd('C', 'C#', 'D', 'D#', 'E', 'F',  'F#', 'G', 'Ab', 'A', 'A#', 'B' ),  // B
  nd('C', 'C#', 'D', 'Eb', 'E', 'E#', 'F#', 'G', 'G#', 'A', 'A#', 'B' ),  // F# (F→E#)
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ),  // F
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ),  // Bb
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'B' ),  // Eb
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb'),  // Ab (B→Cb)
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb'),  // Db (B→Cb)
  nd('C', 'Db', 'D', 'Eb', 'E', 'F',  'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb'),  // Gb (B→Cb)
];

// The 13 commonly used major keys; F# and G♭ share the same pitch
const MAJOR_KEYS: { label: string; note: Note; display: NoteDisplay }[] = [
  { label: 'C',  note: 'C',  display: KEY_DISPLAYS[0]  },
  { label: 'G',  note: 'G',  display: KEY_DISPLAYS[1]  },
  { label: 'D',  note: 'D',  display: KEY_DISPLAYS[2]  },
  { label: 'A',  note: 'A',  display: KEY_DISPLAYS[3]  },
  { label: 'E',  note: 'E',  display: KEY_DISPLAYS[4]  },
  { label: 'B',  note: 'B',  display: KEY_DISPLAYS[5]  },
  { label: 'F#', note: 'F#', display: KEY_DISPLAYS[6]  },
  { label: 'F',  note: 'F',  display: KEY_DISPLAYS[7]  },
  { label: 'B♭', note: 'A#', display: KEY_DISPLAYS[8]  },
  { label: 'E♭', note: 'D#', display: KEY_DISPLAYS[9]  },
  { label: 'A♭', note: 'G#', display: KEY_DISPLAYS[10] },
  { label: 'D♭', note: 'C#', display: KEY_DISPLAYS[11] },
  { label: 'G♭', note: 'F#', display: KEY_DISPLAYS[12] },
];

const LOW_E_FRET: Record<Note, number> = {
  E: 0, F: 1, 'F#': 2, G: 3, 'G#': 4, A: 5, 'A#': 6, B: 7,
  C: 8, 'C#': 9, D: 10, 'D#': 11,
};

const A_STR_FRET: Record<Note, number> = {
  A: 0, 'A#': 1, B: 2, C: 3, 'C#': 4, D: 5, 'D#': 6,
  E: 7, F: 8, 'F#': 9, G: 10, 'G#': 11,
};

type PosMap = Record<number, number[]>;

const transposePos = (pos: PosMap, offset: number): PosMap => {
  const result: PosMap = {};
  for (const si in pos) result[Number(si)] = pos[Number(si)].map(f => f + offset);
  return result;
};

const posMaxFret = (pos: PosMap): number =>
  Math.max(...Object.values(pos).flat());

// Base positions in C (6th-string root at fret 8, 5th-string root at fret 3)
const BASE: Record<string, PosMap> = {
  maj7_6th:   { 0: [8], 1: [7, 10], 2: [9, 10], 3: [9], 4: [8], 5: [7] },
  maj7_5th:   { 1: [3], 2: [2, 5], 3: [4, 5], 4: [5], 5: [3, 7] },
  dom7_6th:   { 0: [8], 1: [7, 10], 2: [8, 10], 3: [9], 4: [8, 11] },
  dom7_5th:   { 1: [3], 2: [2, 5], 3: [3, 5], 4: [5], 5: [3, 6] },
  min7_6th:   { 0: [8, 11], 1: [10], 2: [8, 10], 3: [8], 4: [8, 11] },
  min7_5th:   { 1: [3, 6], 2: [5], 3: [3, 5], 4: [4], 5: [3, 6] },
  min7b5_6th: { 0: [8, 11], 1: [9], 2: [8, 10], 3: [8], 4: [7, 11] },
  min7b5_5th: { 1: [3, 6], 2: [4], 3: [3, 5], 4: [4], 5: [2, 6] },
  dim7_6th:   { 0: [8], 1: [6, 9], 2: [7, 10], 3: [8, 11], 4: [10] },
  dim7_5th:   { 1: [3], 2: [1, 4], 3: [2, 5], 4: [4], 5: [2, 5] },
};

const getOffset = (key: Note, is6th: boolean, base: PosMap): number => {
  const rootFret = is6th ? LOW_E_FRET[key] : A_STR_FRET[key];
  const cRootFret = is6th ? 8 : 3;
  let off = rootFret - cRootFret;
  const minF = Math.min(...Object.values(base).flat()) + off;
  if (minF < 0) off += 12;
  return off;
};

const SeventhChordArpeggios = () => {
  const [selectedKeyIdx, setSelectedKeyIdx] = useState(0);
  const selectedKey = MAJOR_KEYS[selectedKeyIdx];

  const noteIdx = ALL_NOTES.indexOf(selectedKey.note);
  const note = (semitones: number): Note => ALL_NOTES[(noteIdx + semitones + 120) % 12];
  const noteDisplay = selectedKey.display;

  const makeChordColors = (intervals: number[]) => {
    const colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500'];
    const map: Partial<Record<Note, string>> = {};
    intervals.forEach((iv, i) => { map[note(iv)] = colors[i]; });
    return makeColors(map);
  };

  const getPos = (baseName: string): PosMap => {
    const base = BASE[baseName];
    const is6th = baseName.endsWith('_6th');
    return transposePos(base, getOffset(selectedKey.note, is6th, base));
  };

  const maj7Notes = [0, 4, 7, 11].map(note) as Note[];
  const dom7Notes = [0, 4, 7, 10].map(note) as Note[];
  const min7Notes = [0, 3, 7, 10].map(note) as Note[];
  const min7b5Notes = [0, 3, 6, 10].map(note) as Note[];
  const dim7Notes = [0, 3, 6, 9].map(note) as Note[];

  const maj7Colors = makeChordColors([0, 4, 7, 11]);
  const dom7Colors = makeChordColors([0, 4, 7, 10]);
  const min7Colors = makeChordColors([0, 3, 7, 10]);
  const min7b5Colors = makeChordColors([0, 3, 6, 10]);
  const dim7Colors = makeChordColors([0, 3, 6, 9]);

  const rootName = selectedKey.label;

  const diagrams = [
    {
      label: 'Maj7 — 6th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('maj7_6th')) + 1}
          strings={STRINGS}
          selectedNotes={maj7Notes}
          useFlats={false}
          noteColors={maj7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('maj7_6th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Maj7 — 5th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('maj7_5th')) + 1}
          strings={STRINGS}
          selectedNotes={maj7Notes}
          useFlats={false}
          noteColors={maj7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('maj7_5th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Dom7 — 6th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('dom7_6th')) + 1}
          strings={STRINGS}
          selectedNotes={dom7Notes}
          useFlats={false}
          noteColors={dom7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('dom7_6th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Dom7 — 5th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('dom7_5th')) + 1}
          strings={STRINGS}
          selectedNotes={dom7Notes}
          useFlats={false}
          noteColors={dom7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('dom7_5th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Min7 — 6th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('min7_6th')) + 1}
          strings={STRINGS}
          selectedNotes={min7Notes}
          useFlats={false}
          noteColors={min7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('min7_6th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Min7 — 5th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('min7_5th')) + 1}
          strings={STRINGS}
          selectedNotes={min7Notes}
          useFlats={false}
          noteColors={min7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('min7_5th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'm7♭5 — 6th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('min7b5_6th')) + 1}
          strings={STRINGS}
          selectedNotes={min7b5Notes}
          useFlats={false}
          noteColors={min7b5Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('min7b5_6th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'm7♭5 — 5th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('min7b5_5th')) + 1}
          strings={STRINGS}
          selectedNotes={min7b5Notes}
          useFlats={false}
          noteColors={min7b5Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('min7b5_5th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Dim7 — 6th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('dim7_6th')) + 1}
          strings={STRINGS}
          selectedNotes={dim7Notes}
          useFlats={false}
          noteColors={dim7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('dim7_6th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
    {
      label: 'Dim7 — 5th',
      content: (
        <Fretboard
          numFrets={posMaxFret(getPos('dim7_5th')) + 1}
          strings={STRINGS}
          selectedNotes={dim7Notes}
          useFlats={false}
          noteColors={dim7Colors}
          displayMode="notes"
          shouldHighlight={makeHighlight(getPos('dim7_5th'))}
          customNoteDisplay={noteDisplay}
        />
      ),
    },
  ];

  const textContent = (
    <>
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-2 font-medium">Key</p>
        <div className="flex flex-wrap gap-1">
          {MAJOR_KEYS.map((k, i) => (
            <button
              key={k.label}
              onClick={() => setSelectedKeyIdx(i)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                selectedKeyIdx === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-3">
        Learn one shape per chord quality rooted on the <strong>6th string</strong> and one on the <strong>5th string</strong>.
      </p>

      <div className="flex flex-wrap gap-3 mb-5 text-xs text-gray-600">
        <span><span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1 align-middle" />Root</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1 align-middle" />3rd</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1 align-middle" />5th</span>
        <span><span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-1 align-middle" />7th</span>
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-1">Major 7 — {rootName}maj7 (R, 3, 5, 7)</h3>
      <div className="flex gap-1 mb-3">
        <DiagramButton diagramIndex={0} label="6th str root" />
        <DiagramButton diagramIndex={1} label="5th str root" />
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-1">Dominant 7 — {rootName}7 (R, 3, 5, ♭7)</h3>
      <div className="flex gap-1 mb-3">
        <DiagramButton diagramIndex={2} label="6th str root" />
        <DiagramButton diagramIndex={3} label="5th str root" />
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-1">Minor 7 — {rootName}m7 (R, ♭3, 5, ♭7)</h3>
      <div className="flex gap-1 mb-3">
        <DiagramButton diagramIndex={4} label="6th str root" />
        <DiagramButton diagramIndex={5} label="5th str root" />
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-1">Minor 7♭5 — {rootName}m7♭5 (R, ♭3, ♭5, ♭7)</h3>
      <div className="flex gap-1 mb-3">
        <DiagramButton diagramIndex={6} label="6th str root" />
        <DiagramButton diagramIndex={7} label="5th str root" />
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-1">Diminished 7 — {rootName}dim7 (R, ♭3, ♭5, ♭♭7)</h3>
      <div className="flex gap-1 mb-3">
        <DiagramButton diagramIndex={8} label="6th str root" />
        <DiagramButton diagramIndex={9} label="5th str root" />
      </div>
    </>
  );

  return (
    <LessonLayout
      title="Seventh Chord Arpeggios"
      difficulty="intermediate"
      diagrams={diagrams}
      textContent={textContent}
    />
  );
};

export default SeventhChordArpeggios;
