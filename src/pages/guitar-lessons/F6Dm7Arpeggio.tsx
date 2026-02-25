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
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

const F6Dm7Arpeggio = () => {
  const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
  const arpeggioNotes: Note[] = ['F', 'A', 'C', 'D'];

  const noteColors: Record<Note, string> = {
    'C': 'bg-green-500',
    'C#': 'bg-gray-400',
    'D': 'bg-purple-500',
    'D#': 'bg-gray-400',
    'E': 'bg-gray-400',
    'F': 'bg-blue-500',
    'F#': 'bg-gray-400',
    'G': 'bg-gray-400',
    'G#': 'bg-gray-400',
    'A': 'bg-orange-500',
    'A#': 'bg-gray-400',
    'B': 'bg-gray-400',
  };

  const shouldHighlightLow = (stringIndex: number, fret: number) => {
    const positions: { [key: number]: number[] } = {
      0: [1, 5],
      1: [3, 5],
      2: [3, 7],
      3: [5, 7],
      4: [6, 10],
      5: [8, 10],
    };
    return positions[stringIndex]?.includes(fret) || false;
  };

  const shouldHighlightHigh = (stringIndex: number, fret: number) => {
    const positions: { [key: number]: number[] } = {
      0: [8, 10],
      1: [8, 12],
      2: [10, 12],
      3: [10, 14],
      4: [13, 15],
      5: [13, 17],
    };
    return positions[stringIndex]?.includes(fret) || false;
  };

  const shouldHighlightBoth = (stringIndex: number, fret: number) =>
    shouldHighlightLow(stringIndex, fret) || shouldHighlightHigh(stringIndex, fret);

  const fretboard1 = (
    <Fretboard
      numFrets={10}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightLow}
    />
  );

  const fretboard2 = (
    <Fretboard
      numFrets={17}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightHigh}
    />
  );

  const fretboard3 = (
    <Fretboard
      numFrets={17}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightBoth}
    />
  );

  const diagrams = [
    { label: 'Position 1', content: fretboard1 },
    { label: 'Position 2', content: fretboard2 },
    { label: 'Both', content: fretboard3 },
  ];

  const textContent = (
    <>
      <p className="mb-4">
        In this lesson, you'll learn an <strong>F6/Dm7 arpeggio</strong> across two positions on the fretboard.
        The notes are <strong>F, A, C, and D</strong>.
      </p>

      <h3 className="text-xl font-semibold mb-3">Exercises</h3>

      <h4 className="flex items-center font-semibold">
        Exercise 1
        <DiagramButton diagramIndex={0} label="View Position 1" />
      </h4>
      <p className="mb-2">Lower position (frets 1–10)</p>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|---------------------------8-10-|
B|----------------------6-10------|
G|-----------------5-7------------|
D|------------3-7-----------------|
A|-------3-5----------------------|
E|--1-5---------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 2
        <DiagramButton diagramIndex={1} label="View Position 2" />
      </h4>
      <p className="mb-2">Higher position (frets 8–17)</p>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-----------------------------------13-17|
B|----------------------------13-15-------|
G|---------------------10-14-------------|
D|--------------10-12--------------------|
A|--------8-12---------------------------|
E|--8-10---------------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 3
        <DiagramButton diagramIndex={2} label="View Both" />
      </h4>
      <p className="mb-2">Both positions: exercise 1 then exercise 2</p>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|----------------------------8-10--------------------------------------13-17|
B|----------------------6-10-------------------------------------13-15-------|
G|-----------------5-7------------------------------------10-14--------------|
D|------------3-7----------------------------------10-12---------------------|
A|-------3-5---------------------------------8-12----------------------------|
E|--1-5--------------------------------8-10----------------------------------|`}
        </pre>
      </div>
    </>
  );

  return (
    <LessonLayout
      title="F6/Dm7 Arpeggio"
      difficulty="intermediate"
      diagrams={diagrams}
      textContent={textContent}
      videoUrl="/f6arperggio.mp4"
      videoTitle="F6/Dm7 Arpeggio"
    />
  );
};

export default F6Dm7Arpeggio;
