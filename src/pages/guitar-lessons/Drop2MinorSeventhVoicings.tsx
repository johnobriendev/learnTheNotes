// src/pages/guitar-lessons/Drop2MinorSeventhVoicings.tsx
import { useState } from 'react';

interface Exercise {
  label: string;
  videoUrl: string;
  tab: string;
}

const exercises: Exercise[] = [
  {
    label: 'Exercise 1',
    videoUrl: '/cm7-lesson-1.mp4',
    tab: `e|--------------------------------|
B|--------------------------------|
G|-----3-----5------8--------12---|
D|----1-----5------8-------10-----|
A|---3-----6-----10------13-------|
E|--3-----6-----8------11---------|`,
  },
  {
    label: 'Exercise 2',
    videoUrl: '/cm7-lesson-2.mp4',
    tab: `e|--------------------------------|
B|-----4----8-------11------13----|
G|----3----5-------8------12------|
D|---5----8------10-----13--------|
A|--3----6-----10-----13----------|
E|--------------------------------|`,
  },
  {
    label: 'Exercise 3',
    videoUrl: '/cm7-lesson-3.mp4',
    tab: `e|------3--6---8------11-----|
B|----1---4---8-----11-------|
G|---3---5---8----12---------|
D|--1---5---8----10----------|
A|---------------------------|
E|---------------------------|`,
  },
];

const Drop2MinorSeventhVoicings = () => {
  const [activeExercise, setActiveExercise] = useState(0);
  const exercise = exercises[activeExercise];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: exercises */}
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
                  <source src={exercise.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Tab */}
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre">{exercise.tab}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: chord diagrams */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-md p-3">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <img
                    key={n}
                    src={`/m7drop2/cm7-${n}.png`}
                    alt={`Voicing ${n}`}
                    className="w-full rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drop2MinorSeventhVoicings;
