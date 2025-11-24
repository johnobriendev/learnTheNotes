// src/pages/lessons/FirstThreeNotes.tsx
import LessonLayout from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';

const FirstThreeNotes = () => {
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const selectedNotes: Note[] = ['C', 'D', 'E'];
  const noteColors: Record<Note, string> = {
    'C': 'bg-blue-500',
    'C#': 'bg-gray-400',
    'D': 'bg-green-500',
    'D#': 'bg-gray-400',
    'E': 'bg-purple-500',
    'F': 'bg-gray-400',
    'F#': 'bg-gray-400',
    'G': 'bg-gray-400',
    'G#': 'bg-gray-400',
    'A': 'bg-gray-400',
    'A#': 'bg-gray-400',
    'B': 'bg-gray-400'
  };

  const diagram = (
    <Fretboard
      numFrets={12}
      strings={strings}
      selectedNotes={selectedNotes}
      useFlats={false}
      noteColors={noteColors}
      displayMode="notes"
    />
  );

  const textContent = (
    <>
      <p className="mb-4">
        In this lesson, you'll learn your first three notes on the guitar: <strong>C, D, and E</strong>.
        
      </p>


      <h3 className="text-xl font-semibold mb-3">Practice Exercises</h3>

      <h4>Exercise 1</h4>
      <p>Play all three notes on 1 string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|---------------------------------------8-10-12--|
B|---------------------------------1--3--5--------|
G|-------------------------5--7--9----------------|
D|----------------10-12-14------------------------|
A|---------3--5-7---------------------------------|
E|-8-10-12----------------------------------------|`}
        </pre>
      </div>

      <h4>Exercise 2</h4>
      <p>Play two notes (C, D) then one (E) on the next string</p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|----------------------------------------0-------|
B|-------------------------------5----1-3---------|
G|-----------------------9---5-7------------------|
D|-------------2---10-12--------------------------|
A|------7--3-5------------------------------------|
E|-8-10-------------------------------------------|`}
        </pre>
      </div>

      <h4>Exercise 3</h4>
      <p>Play one note (C) then two (D, E) on the next string </p>

      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
        <pre className="whitespace-pre">
          {`e|---------------------------------------10-12----|
B|----------------------------3-5----13-----------|
G|--------------------7-9---5---------------------|
D|-----------0-2---10-----------------------------|
A|---5-7---3--------------------------------------|
E|-8----------------------------------------------|`}
        </pre>
      </div>

    
    </>
  );

  return (
    <LessonLayout
      title="Learning Your First Three Notes"
      difficulty="beginner"
      diagram={diagram}
      textContent={textContent}
      videoUrl="/FirstThreeNotes.mp4"
      videoTitle="First Three Notes - C, D, E"
    />
  );
};

export default FirstThreeNotes;
