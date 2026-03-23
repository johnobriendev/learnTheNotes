// src/pages/guitar-lessons/CMajorChordAndScale.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

// ── Chord diagram ─────────────────────────────────────────────────────────────
// x32010: A(1)=3(C), D(2)=2(E), G(3)=0(G), B(4)=1(C), e(5)=0(E)
const chordPositions: Record<number, number[]> = { 1: [3], 2: [2], 3: [0], 4: [1], 5: [0] };
const chordColors: Record<Note, string> = {
  C: 'bg-blue-500',   // root
  E: 'bg-orange-500', // major 3rd
  G: 'bg-green-500',  // 5th
  'C#': 'bg-gray-400', D: 'bg-gray-400', 'D#': 'bg-gray-400',
  F: 'bg-gray-400', 'F#': 'bg-gray-400', 'G#': 'bg-gray-400',
  A: 'bg-gray-400', 'A#': 'bg-gray-400', B: 'bg-gray-400',
};

// ── Scale diagram ─────────────────────────────────────────────────────────────
// A(1):3  D(2):0,2,3  G(3):0,2  B(4):0,1
const scalePositions: Record<number, number[]> = {
  1: [3], 2: [0, 2, 3], 3: [0, 2], 4: [0, 1],
};
const scaleColors: Record<Note, string> = {
  C: 'bg-blue-500',    // root
  D: 'bg-gray-500',    E: 'bg-orange-400',
  F: 'bg-purple-400',  G: 'bg-green-500',
  A: 'bg-teal-500',    B: 'bg-red-400',
  'C#': 'bg-gray-400', 'D#': 'bg-gray-400', 'F#': 'bg-gray-400',
  'G#': 'bg-gray-400', 'A#': 'bg-gray-400',
};

// ── Exercises ─────────────────────────────────────────────────────────────────

const exercises = [
  {
    label: 'Exercise 1',
    title: 'Open C Major Chord',
    videoUrl: '',
    tab: `e|---0---|
B|---1---|
G|---0---|
D|---2---|
A|---3---|
E|---x---|`,
    diagram: (
      <Fretboard
        numFrets={5}
        strings={strings}
        selectedNotes={[]}
        useFlats={false}
        noteColors={chordColors}
        displayMode="notes"
        shouldHighlight={(si, fret) => chordPositions[si]?.includes(fret) ?? false}
      />
    ),
  },
  {
    label: 'Exercise 2',
    title: 'C Major Scale — Open Position',
    videoUrl: '',
    tab: `Ascending:
e|------------------------------|
B|-----------------------0--1---|
G|----------------0---2---------|
D|-----0--2---3-----------------|
A|--3---------------------------|
E|------------------------------|

Descending:
e|-----------------------------------|
B|--1---0----------------------------|
G|---------2---0---------------------|
D|-----------------3---2---0---------|
A|----------------------------3------|
E|-----------------------------------|`,
    diagram: (
      <Fretboard
        numFrets={5}
        strings={strings}
        selectedNotes={[]}
        useFlats={false}
        noteColors={scaleColors}
        displayMode="notes"
        shouldHighlight={(si, fret) => scalePositions[si]?.includes(fret) ?? false}
      />
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const CMajorChordAndScale = () => {
  const [activeExercise, setActiveExercise] = useState(0);
  const ex = exercises[activeExercise];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: exercise content */}
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Exercise tabs */}
            <div className="flex border-b border-gray-200">
              {exercises.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExercise(i)}
                  className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                    activeExercise === i
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>

            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-lg font-semibold text-gray-800">{ex.title}</h3>

              {/* Video placeholder */}
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                Video coming soon
              </div>

              {/* Tab */}
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre">{ex.tab}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: fretboard */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            {ex.diagram}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMajorChordAndScale;
