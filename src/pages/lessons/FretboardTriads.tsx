// src/pages/lessons/FretboardTriads.tsx
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

const FretboardTriads = () => {
  const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
  const triadNotes: Note[] = ['C', 'E', 'G'];

  const noteColors: Record<Note, string> = {
    'C': 'bg-blue-500',
    'C#': 'bg-gray-400',
    'D': 'bg-gray-400',
    'D#': 'bg-gray-400',
    'E': 'bg-green-500',
    'F': 'bg-gray-400',
    'F#': 'bg-gray-400',
    'G': 'bg-orange-500',
    'G#': 'bg-gray-400',
    'A': 'bg-gray-400',
    'A#': 'bg-gray-400',
    'B': 'bg-gray-400'
  };

  // Position-based highlight functions
  const makeHighlight = (positions: { [key: number]: number[] }) => {
    return (stringIndex: number, fret: number) => {
      return positions[stringIndex]?.includes(fret) || false;
    };
  };

  const highlight1 = makeHighlight({ 0: [3], 1: [3], 2: [2], 3: [0], 4: [1], 5: [0] });
  const highlight2 = makeHighlight({ 0: [8], 1: [7], 2: [5], 3: [5], 4: [5], 5: [3] });
  const highlight3 = makeHighlight({ 0: [12], 1: [10], 2: [10], 3: [9], 4: [8], 5: [8] });
  const highlight4 = makeHighlight({ 0: [3, 8, 12], 1: [3, 7, 10], 2: [2, 5, 10] });
  const highlight5 = makeHighlight({ 1: [3, 7, 10], 2: [2, 5, 10], 3: [0, 5, 9] });
  const highlight6 = makeHighlight({ 2: [2, 5, 10], 3: [0, 5, 9], 4: [1, 5, 8] });
  const highlight7 = makeHighlight({ 3: [0, 5, 9], 4: [1, 5, 8], 5: [0, 3, 8] });

  const makeFretboard = (highlight: (s: number, f: number) => boolean) => (
    <Fretboard
      numFrets={12}
      strings={strings}
      selectedNotes={triadNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={highlight}
    />
  );

  const diagrams = [
    { label: 'Exercise 1', content: makeFretboard(highlight1) },
    { label: 'Exercise 2', content: makeFretboard(highlight2) },
    { label: 'Exercise 3', content: makeFretboard(highlight3) },
    { label: 'Exercise 4', content: makeFretboard(highlight4) },
    { label: 'Exercise 5', content: makeFretboard(highlight5) },
    { label: 'Exercise 6', content: makeFretboard(highlight6) },
    { label: 'Exercise 7', content: makeFretboard(highlight7) },
  ];

  const textContent = (
    <>
      <p>The idea behind these exercises is being able to move either horizontally or vertically across the neck. Exercises 1-3 move horizontally, while 4-7 are moving vertically. Closed triads like these on adjacent strings will always follow a pattern: R 3 5 , 3 5 R, or 5 R 3. These examples are for a C major triad, C is the Root, E is the third, and G is the fifth.</p>
      <br />
      <h4 className="flex items-center font-semibold">
        Exercise 1
        <DiagramButton diagramIndex={0} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|------------------------0-|
B|------------------1---1---|
G|------------0---0---0-----|
D|------2---2---2-----------|
A|----3---3-----------------|
E|--3-----------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 2
        <DiagramButton diagramIndex={1} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|------------------------3-|
B|------------------5---5---|
G|------------5---5---5-----|
D|------5---5---5-----------|
A|----7---7-----------------|
E|--8-----------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 3
        <DiagramButton diagramIndex={2} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|--------------------------8-|
B|--------------------8---8---|
G|--------------9---9---9-----|
D|------10---10---10----------|
A|----10---10-----------------|
E|--12------------------------|`}
        </pre>
      </div>


      <h4 className="flex items-center font-semibold">
        Exercise 4 
        <DiagramButton diagramIndex={3} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-------------------------------|
B|-------------------------------|
G|-------------------------------|
D|-------2--------5--------10----|
A|----3--------7--------10-------|
E|--3--------8--------12---------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 5 
        <DiagramButton diagramIndex={4} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-------------------------------|
B|-------------------------------|
G|-------0--------5--------9-----|
D|----2--------5--------10-------|
A|--3--------7--------10---------|
E|-------------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 6 
        <DiagramButton diagramIndex={5} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-------------------------------|
B|-------1--------5--------8-----|
G|----0--------5--------9--------|
D|--2--------5--------10---------|
A|-------------------------------|
E|-------------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 7
        <DiagramButton diagramIndex={6} label="View Diagram" />
      </h4>
      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-------0--------3--------8-----|
B|----1--------5--------8--------|
G|--0--------5--------9----------|
D|-------------------------------|
A|-------------------------------|
E|-------------------------------|`}
        </pre>
      </div>
    </>
  );

  return (
    <LessonLayout
      title="Learn the Fretboard with Triads"
      difficulty="intermediate"
      diagrams={diagrams}
      textContent={textContent}
      videoUrl="/fretboardTriads.mp4"
      videoTitle="Learn the Fretboard with Triads"
    />
  );
};

export default FretboardTriads;
