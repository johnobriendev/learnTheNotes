// src/pages/lessons/SwitchingScalePatterns.tsx
import { useState } from 'react';
import ScaleDiagram from '../../components/scales/ScaleDiagram';
import { getAllThreeNotesPerStringPatterns } from '../../utils/patternUtils';

const SwitchingScalePatterns = () => {
  const [activeExercise, setActiveExercise] = useState(0);

  const threeNPSPatterns = getAllThreeNotesPerStringPatterns('G', 'major');
  const pattern2_3NPS = threeNPSPatterns[1];
  const pattern3_3NPS = threeNPSPatterns[2];

  const exercises = [
    {
      label: 'Exercise 1',
      videoUrl: '/switch1.mp4',
      description: 'Ascending first pattern, descending second pattern — switch on the 1st string.',
      tabs: [
        `e|----------------------------------5-7-8-10-|
B|----------------------------5-7-8----------|
G|----------------------4-5-7----------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`,
        `e|-10-8-7------------------------------------|
B|---------10-8-7----------------------------|
G|-----------------9-7-5---------------------|
D|-----------------------9-7-5---------------|
A|-----------------------------9-7-5---------|
E|-----------------------------------8-7-5-3-|`,
      ],
    },
    {
      label: 'Exercise 2',
      videoUrl: '/switch2.mp4',
      description: 'Switch on the 2nd string — combines two patterns.',
      tabs: [
        `e|------------------------------------7-8-10-|
B|----------------------------5-7-8-10-------|
G|----------------------4-5-7----------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`,
        `e|-10-8-7------------------------------------|
B|--------10-8-7-5---------------------------|
G|------------------7-5-4--------------------|
D|------------------------7-5-4--------------|
A|-------------------------------7-5-3-------|
E|-------------------------------------7-5-3-|`,
      ],
    },
    {
      label: 'Exercise 3',
      videoUrl: '/switch3.mp4',
      description: 'Switch on the 3rd string — same lowest and highest note, different switch point.',
      tabs: [
        `e|------------------------------------7-8-10-|
B|------------------------------7-8-10-------|
G|----------------------4-5-7-9--------------|
D|---------------4-5-7-----------------------|
A|--------3-5-7------------------------------|
E|-3-5-7-------------------------------------|`,
        `e|-10-8-7------------------------------------|
B|--------10-8-7-----------------------------|
G|----------------9-7-5-4--------------------|
D|------------------------7-5-4--------------|
A|-------------------------------7-5-3-------|
E|-------------------------------------7-5-3-|`,
      ],
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
                  <source src={exercise.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Description */}
              <p className="text-gray-700">{exercise.description}</p>

              {/* Tabs */}
              {exercise.tabs.map((tab, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre">{tab}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: scale diagrams (static) */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScaleDiagram pattern={pattern2_3NPS} displayMode="notes" />
                <ScaleDiagram pattern={pattern3_3NPS} displayMode="notes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchingScalePatterns;
