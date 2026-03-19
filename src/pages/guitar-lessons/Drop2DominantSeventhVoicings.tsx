// src/pages/guitar-lessons/Drop2DominantSeventhVoicings.tsx
import { useState } from 'react';

interface Exercise {
  label: string;
  videoUrl: string;
  tab: string;
}

const exercises: Exercise[] = [
  {
    label: 'Exercise 1',
    videoUrl: '/Bb7-lesson-1.mp4',
    tab: `e|--------------------------------|
B|--------------------------------|
G|------3----7------10------13----|
D|-----3----6------8------12------|
A|----5----8-----11-----13--------|
E|---4----6----10-----13----------|`,
  },
  {
    label: 'Exercise 2',
    videoUrl: '/Bb7-lesson-2.mp4',
    tab: `e|--------------------------------|
B|-----3----6----9--------11------|
G|----1----3----7-------10--------|
D|---3----6----8------12----------|
A|--1----5----8-----11------------|
E|--------------------------------|`,
  },
  {
    label: 'Exercise 3',
    videoUrl: '/Bb7-lesson-3.mp4',
    tab: `e|--------------------------------|
B|--------------------------------|
G|-----4----6-----10-------13-----|
D|----3----6-----9-------11-------|
A|---3----7----10------13---------|
E|--3----6----8------12-----------|`,
  },
];

const chordImages = [
  '/7drop2/bb7-1.png',
  '/7drop2/bb7-2.png',
  '/7drop2/bb7-3.png',
  '/7drop2/bb7-4.png',
  '/7drop2/bb7-5.png',
  '/7drop2/bb7-6.png',
  '/7drop2/bb7-7.png',
  '/7drop2/bb7-8.png',
  '/7drop2/bb7-9.png',
  '/7drop2/bb7-10.png',
  '/7drop2/bb7-11.png',
  '/7drop2/bb7-12.png',
];

const Drop2DominantSeventhVoicings = () => {
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
                {chordImages.map((src, i) => (
                  <img key={i} src={src} alt={`Voicing ${i + 1}`} className="w-full rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drop2DominantSeventhVoicings;
