// src/pages/guitar-lessons/HowToReadChordDiagrams.tsx
import LessonLayout from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

// C major chord: A(1)=3(C), D(2)=2(E), G(3)=0(G), B(4)=1(C), e(5)=0(E), low E muted
const chordPositions: Record<number, number[]> = { 1: [3], 2: [2], 3: [0], 4: [1], 5: [0] };

const noteColors: Record<Note, string> = {
  C: 'bg-blue-500',
  E: 'bg-orange-400',
  G: 'bg-green-500',
  'C#': 'bg-gray-300', D: 'bg-gray-300', 'D#': 'bg-gray-300',
  F: 'bg-gray-300', 'F#': 'bg-gray-300', 'G#': 'bg-gray-300',
  A: 'bg-gray-300', 'A#': 'bg-gray-300', B: 'bg-gray-300',
};

const diagram = (
  <div className="flex flex-col gap-3">


    <Fretboard
      numFrets={5}
      strings={strings}
      selectedNotes={[]}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={(si, fret) => chordPositions[si]?.includes(fret) ?? false}
    />

    {/* Legend */}
    <div className="bg-white rounded-md shadow px-4 py-3 flex flex-wrap gap-4 text-sm justify-center">
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-blue-500 inline-block" />
        Root note
      </span>
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-orange-400 inline-block" />
        3rd
      </span>
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-green-500 inline-block" />
        5th
      </span>
    </div>
  </div>
);

const textContent = (
  <>
    <h3 className="text-xl font-semibold mb-3">What is a Chord Diagram?</h3>
    <p className="mb-4">
      A chord diagram is a map of the fretboard showing you exactly where to place your fingers
      to play a chord. Once you can read one, you can learn any chord from this website.
    </p>

    <h3 className="text-xl font-semibold mb-3 mt-6">The Lines</h3>
    <p className="mb-2">The diagram is a grid:</p>
    <ul className="mb-4 space-y-2">
      <li><strong>Vertical lines</strong> — the six strings. The thickest string (low E, string 6) is on the left, the thinnest (high e, string 1) is on the right.</li>
      <li><strong>Horizontal lines</strong> — the frets. The thick line at the top is the nut. Each line below it is a fret.</li>
      <li><strong>Numbers on the left</strong> — which fret you're looking at.</li>
    </ul>

    <h3 className="text-xl font-semibold mb-3 mt-6">The Dots</h3>
    <p className="mb-4">
      Each colored dot shows where to press down a string. The dot sits between two frets and that's where you place your finger. If there is a dot above the fretboard that indicates an open string.
    </p>

  

    <h3 className="text-xl font-semibold mb-3 mt-6">Reading the Example</h3>
    <p className="mb-2">The diagram shows a <strong>C major chord</strong>:</p>
    <ul className="mb-4 space-y-1 text-sm">
      <li><strong>Low E (string 6)</strong> — muted ✕</li>
      <li><strong>A string (string 5)</strong> — 3rd fret (ring finger)</li>
      <li><strong>D string (string 4)</strong> — 2nd fret (middle finger)</li>
      <li><strong>G string (string 3)</strong> — open</li>
      <li><strong>B string (string 2)</strong> — 1st fret (index finger)</li>
      <li><strong>High e (string 1)</strong> — open</li>
      <p>You can use whatever fingers feel most natural to you. Fingerings aren't included in the diagrams for this reason.</p>

    </ul>
    <p className="text-sm text-gray-500">
      Colors show the role each note plays in the chord: blue = root, orange = 3rd, green = 5th.
      Most diagrams just show plain dots — the colors here are to help you see the chord's structure.
    </p>
  </>
);

const HowToReadChordDiagrams = () => (
  <LessonLayout
    title="How to Read Chord Diagrams"
    difficulty="beginner"
    diagram={diagram}
    textContent={textContent}
  />
);

export default HowToReadChordDiagrams;
