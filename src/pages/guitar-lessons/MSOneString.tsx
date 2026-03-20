// src/pages/lessons/MSOneString.tsx
import { useState } from 'react';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';
import { getNoteAtPosition } from '../../utils/utils';

const MSOneString = () => {
  const [activeExercise, setActiveExercise] = useState(0);

  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const cMajorNotes: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

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

  const shouldHighlightEx1 = (stringIndex: number, fret: number) => {
    if (stringIndex !== 4) return false;
    if (fret === 0 || fret > 13) return false;
    return cMajorNotes.includes(getNoteAtPosition(strings[stringIndex], fret));
  };

  const shouldHighlightEx2 = (stringIndex: number, fret: number) => {
    if (stringIndex === 4) {
      if (fret === 0 || fret > 13) return false;
      return cMajorNotes.includes(getNoteAtPosition(strings[stringIndex], fret));
    }
    if (stringIndex === 2) {
      if (fret < 2 || fret > 14) return false;
      return cMajorNotes.includes(getNoteAtPosition(strings[stringIndex], fret));
    }
    return false;
  };

  const exercises = [
    {
      label: 'Exercise 1',
      tab: `e|--------------------------|
B|-1--3--5--6--8--10-12-13--|
G|--------------------------|
D|--------------------------|
A|--------------------------|
E|--------------------------|`,
      description: 'Play the C major scale on the B string.',
      diagram: (
        <Fretboard
          numFrets={15}
          strings={strings}
          selectedNotes={cMajorNotes}
          useFlats={false}
          noteColors={noteColors}
          displayMode="notes"
          shouldHighlight={shouldHighlightEx1}
        />
      ),
    },
    {
      label: 'Exercise 2',
      tab: `e|--------------------------|
B|-1--3--5--6--8--10-12-13--|
G|--------------------------|
D|-2--3--5--7--9--10-12-14--|
A|--------------------------|
E|--------------------------|`,
      description: 'Play the C major scale harmonized with a 6th below on the D string.',
      diagram: (
        <Fretboard
          numFrets={15}
          strings={strings}
          selectedNotes={cMajorNotes}
          useFlats={false}
          noteColors={noteColors}
          displayMode="notes"
          shouldHighlight={shouldHighlightEx2}
        />
      ),
    },
  ];

  const exercise = exercises[activeExercise];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: video + tab */}
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Exercise switcher */}
            <div className="flex border-b border-gray-200">
              {exercises.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExercise(i)}
                  className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                    activeExercise === i
                      ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Video */}
              <div className="aspect-video">
                <video
                  key={activeExercise}
                  className="w-full h-full rounded-lg"
                  controls
                  preload="metadata"
                >
                  <source src={`/c1string${activeExercise + 1}.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Description */}
              <p className="text-gray-700">{exercise.description}</p>

              {/* Tab */}
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre">{exercise.tab}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: fretboard diagram */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-md p-4">
              {exercise.diagram}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSOneString;
