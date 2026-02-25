// src/pages/lessons/MSOneString.tsx
import React from 'react';
import LessonLayout, { useDiagramSwitcher } from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';
import { getNoteAtPosition } from '../../utils/utils';

// Diagram button component to be used in text content
const DiagramButton: React.FC<{ diagramIndex: number; label: string }> = ({ diagramIndex, label }) => {
  const { setActiveDiagram, activeDiagram } = useDiagramSwitcher();
  const isActive = activeDiagram === diagramIndex;

  return (
    <button
      onClick={() => setActiveDiagram(diagramIndex)}
      className={`ml-2 text-xs px-2 py-1 rounded transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

const MSOneString = () => {
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const cMajorNotes: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  // Color each note in the C major scale
  const noteColors: Record<Note, string> = {
    'C': 'bg-blue-500',
    'C#': 'bg-gray-400',
    'D': 'bg-green-500',
    'D#': 'bg-gray-400',
    'E': 'bg-purple-500',
    'F': 'bg-yellow-500',
    'F#': 'bg-gray-400',
    'G': 'bg-orange-500',
    'G#': 'bg-gray-400',
    'A': 'bg-red-500',
    'A#': 'bg-gray-400',
    'B': 'bg-pink-500'
  };

  // Custom highlight function for Exercise 1 - B string only, frets 1-13
  const shouldHighlightEx1 = (stringIndex: number, fret: number) => {
    const isBString = stringIndex === 4; // B string is index 4 (0-indexed from bottom)
    if (!isBString) return false;

    // Exclude open string (fret 0) and fret 15
    if (fret === 0 || fret > 13) return false;

    // Get the note at this position and check if it's in the C major scale
    const string = strings[stringIndex];
    const note = getNoteAtPosition(string, fret);
    return cMajorNotes.includes(note);
  };

  // Custom highlight function for Exercise 2 - D and B strings, specific range
  const shouldHighlightEx2 = (stringIndex: number, fret: number) => {
    const isBString = stringIndex === 4; // B string is index 4
    const isDString = stringIndex === 2; // D string is index 2

    if (isBString) {
      // B string: frets 1-13 (same as Ex 1)
      if (fret === 0 || fret > 13) return false;
      const note = getNoteAtPosition(strings[stringIndex], fret);
      return cMajorNotes.includes(note);
    }

    if (isDString) {
      // D string: frets 2-14 (E at fret 2 to E at fret 14)
      if (fret < 2 || fret > 14) return false;
      const note = getNoteAtPosition(strings[stringIndex], fret);
      return cMajorNotes.includes(note);
    }

    return false;
  };

  const fretboard1 = (
    <Fretboard
      numFrets={15}
      strings={strings}
      selectedNotes={cMajorNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightEx1}
    />
  );

  const fretboard2 = (
    <Fretboard
      numFrets={15}
      strings={strings}
      selectedNotes={cMajorNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightEx2}
    />
  );

  const diagrams = [
    { label: 'Ex 1', content: fretboard1 },
    { label: 'Ex 2', content: fretboard2 }
  ];

  const textContent = (
    <>
      <p className="mb-4">
        In this lesson, you'll learn the <strong>C Major Scale</strong> on a single string - the <strong>B string</strong>.
        The C major scale consists of seven notes: <strong>C, D, E, F, G, A, B</strong>.
      </p>

      <p className="mb-4">
        Playing scales on one string helps you understand the intervals and spacing between notes
        without worrying about changing strings.
      </p>

      <h3 className="text-xl font-semibold mb-3">Practice Exercises</h3>

      <h4 className="flex items-center">
        Exercise 1
        <DiagramButton diagramIndex={0} label="View Diagram" />
      </h4>
      <p>Play the C major scale on the B string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|--------------------------|
B|-1--3--5--6--8--10-12-13--|
G|--------------------------|
D|--------------------------|
A|--------------------------|
E|--------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center">
        Exercise 2
        <DiagramButton diagramIndex={1} label="View Diagram" />
      </h4>
      <p>Play the C major scale harmonized with a 6th below on the B string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|--------------------------|
B|-1--3--5--6--8--10-12-13--|
G|--------------------------|
D|-2--3--5--7--9--10-12-14--|
A|--------------------------|
E|--------------------------|`}
        </pre>
      </div>
    </>
  );

  return (
    <LessonLayout
      title="Learn the Major Scale on One String"
      difficulty="beginner"
      diagrams={diagrams}
      textContent={textContent}
      videoUrl="/msOneString.mp4"
      videoTitle="Major Scale on One String"
    />
  );
};

export default MSOneString;
