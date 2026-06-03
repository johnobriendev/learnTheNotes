// src/pages/lessons/TwoNoteArpeggios.tsx
import React from 'react';
import LessonLayout, { useDiagramSwitcher } from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

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

const TwoNoteArpeggios = () => {
  const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];
  const arpeggioNotes: Note[] = ['G', 'B', 'D', 'F#'];

  // Color each note in the G maj7 arpeggio
  const noteColors: Record<Note, string> = {
    'C': 'bg-gray-400',
    'C#': 'bg-gray-400',
    'D': 'bg-green-500',
    'D#': 'bg-gray-400',
    'E': 'bg-gray-400',
    'F': 'bg-gray-400',
    'F#': 'bg-purple-500',
    'G': 'bg-blue-500',
    'G#': 'bg-gray-400',
    'A': 'bg-gray-400',
    'A#': 'bg-gray-400',
    'B': 'bg-orange-500'
  };

  // Helper function to calculate note at fret
  const getNoteAtFret = (stringNote: Note, fret: number): Note => {
    const notes: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const startIndex = notes.indexOf(stringNote);
    const noteIndex = (startIndex + fret) % 12;
    return notes[noteIndex];
  };

  // Pattern 1: F#/G on strings 6,4,2 and B/D on strings 5,3,1
  const shouldHighlightPattern1 = (stringIndex: number, fret: number) => {
    const string = strings[stringIndex];
    const noteAtPosition = getNoteAtFret(string, fret);

    // Strings 6, 4, 2 (indices 0, 2, 4) should show F# and G
    if ([0, 2, 4].includes(stringIndex)) {
      return noteAtPosition === 'F#' || noteAtPosition === 'G';
    }

    // Strings 5, 3, 1 (indices 1, 3, 5) should show B and D
    if ([1, 3, 5].includes(stringIndex)) {
      return noteAtPosition === 'B' || noteAtPosition === 'D';
    }

    return false;
  };

  // Pattern 2: G/B on strings 6,4,2 and D/F# on strings 5,3,1
  // 6th string: G(3), B(7), 5th string: D(5), F#(9)
  // 4th string: G(5), B(9), 3rd string: D(7), F#(11)
  // 2nd string: G(8), B(12), 1st string: D(10), F#(14)
  const shouldHighlightPattern2 = (stringIndex: number, fret: number) => {
    // Define specific fret positions for each string
    const pattern2Positions: { [key: number]: number[] } = {
      0: [3, 7],    // 6th string E: G(3), B(7)
      1: [5, 9],    // 5th string A: D(5), F#(9)
      2: [5, 9],    // 4th string D: G(5), B(9)
      3: [7, 11],   // 3rd string G: D(7), F#(11)
      4: [8, 12],   // 2nd string B: G(8), B(12)
      5: [10, 14]   // 1st string E: D(10), F#(14)
    };

    return pattern2Positions[stringIndex]?.includes(fret) || false;
  };

  // Pattern 3: B/D on strings 6,4,2 and F#/G on strings 5,3,1
  // 6th string: B(7), D(10), 5th string: F#(9), G(10)
  // 4th string: B(9), D(12), 3rd string: F#(11), G(12)
  // 2nd string: B(12), D(15), 1st string: F#(14), G(15)
  const shouldHighlightPattern3 = (stringIndex: number, fret: number) => {
    const pattern3Positions: { [key: number]: number[] } = {
      0: [7, 10],    // 6th string E: B(7), D(10)
      1: [9, 10],    // 5th string A: F#(9), G(10)
      2: [9, 12],    // 4th string D: B(9), D(12)
      3: [11, 12],   // 3rd string G: F#(11), G(12)
      4: [12, 15],   // 2nd string B: B(12), D(15)
      5: [14, 15]    // 1st string E: F#(14), G(15)
    };

    return pattern3Positions[stringIndex]?.includes(fret) || false;
  };

  // Pattern 4: D/F# on strings 6,4,2 and G/B on strings 5,3,1
  // 6th string: D(10), F#(14), 5th string: G(10), B(14)
  // 4th string: D(12), F#(16), 3rd string: G(12), B(16)
  // 2nd string: D(15), F#(19), 1st string: G(15), B(19)
  const shouldHighlightPattern4 = (stringIndex: number, fret: number) => {
    const pattern4Positions: { [key: number]: number[] } = {
      0: [10, 14],   // 6th string E: D(10), F#(14)
      1: [10, 14],   // 5th string A: G(10), B(14)
      2: [12, 16],   // 4th string D: D(12), F#(16)
      3: [12, 16],   // 3rd string G: G(12), B(16)
      4: [15, 19],   // 2nd string B: D(15), F#(19)
      5: [15, 19]    // 1st string E: G(15), B(19)
    };

    return pattern4Positions[stringIndex]?.includes(fret) || false;
  };

  const fretboard1 = (
    <Fretboard
      numFrets={12}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightPattern1}
    />
  );

  const fretboard2 = (
    <Fretboard
      numFrets={15}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightPattern2}
    />
  );

  const fretboard3 = (
    <Fretboard
      numFrets={16}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightPattern3}
    />
  );

  const fretboard4 = (
    <Fretboard
      numFrets={20}
      strings={strings}
      selectedNotes={arpeggioNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
      shouldHighlight={shouldHighlightPattern4}
    />
  );

  const diagrams = [
    { label: 'Pattern 1', content: fretboard1 },
    { label: 'Pattern 2', content: fretboard2 },
    { label: 'Pattern 3', content: fretboard3 },
    { label: 'Pattern 4', content: fretboard4 }
  ];

  const textContent = (
    <>
      <p className="mb-4">
        In this lesson, you'll learn <strong>two-note-per-string arpeggios</strong> using a <strong>G major 7</strong> arpeggio.
        The notes are <strong>G, B, D, and F#</strong>.
      </p>

      <p className="mb-4">
        Two-note-per-string patterns create clean, symmetrical shapes that are easy to visualize and execute.
        Each pattern groups the four notes differently across the strings.
      </p>

      <h3 className="text-xl font-semibold mb-3">Practice Exercises</h3>

      <h4 className="flex items-center font-semibold">
        Exercise 1
        <DiagramButton diagramIndex={0} label="View Pattern 1" />
      </h4>
      <p>7th and Root on one string, 3rd and 5th on another</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-----------------------7-10-|
B|------------------7-8-------|
G|--------------4-7-----------|
D|----------4-5---------------|
A|------2-5-------------------|
E|--2-3-----------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 2
        <DiagramButton diagramIndex={1} label="View Pattern 2" />
      </h4>
      <p>Root and 3rd on one string, 5th and 7th on another</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-----------------------10-14-|
B|------------------8-12-------|
G|-------------7-11------------|
D|---------5-9-----------------|
A|-----5-9---------------------|
E|-3-7-------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 3
        <DiagramButton diagramIndex={2} label="View Pattern 3" />
      </h4>
      <p>3rd and 5th on one string, 7th and Root on another</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|----------------------------14-15-|
B|----------------------12-15-------|
G|----------------11-12-------------|
D|-----------9-12-------------------|
A|------9-10------------------------|
E|-7-10-----------------------------|`}
        </pre>
      </div>

      <h4 className="flex items-center font-semibold">
        Exercise 4
        <DiagramButton diagramIndex={3} label="View Pattern 4" />
      </h4>
      <p>5th and 7th on one string, Root and 3rd on another</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|-------------------------------15-19-|
B|-------------------------15-19-------|
G|-------------------12-16-------------|
D|-------------12-16-------------------|
A|-------10-14-------------------------|
E|-10-14-------------------------------|`}
        </pre>
      </div>
    </>
  );

  return (
    <LessonLayout
      title="Two Note Per String Arpeggios"
      difficulty="intermediate"
      diagrams={diagrams}
      textContent={textContent}
      videoUrl="/TwoNoteArpeggios.mp4"
      videoTitle="Two Note Per String Arpeggios"
    />
  );
};

export default TwoNoteArpeggios;
