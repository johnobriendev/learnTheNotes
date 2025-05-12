// src/components/TipsModal.tsx
import React from 'react';
import { TipsModalProps } from '../types'; // If defined in types.ts

const TipsModal: React.FC<TipsModalProps> = ({ 
  isOpen, 
  onClose, 
  tipType = 'notes' // Default to 'notes' if not provided
}) => {
  if (!isOpen) return null;

  // Get the appropriate content based on tipType
  const renderTipContent = () => {
    switch (tipType) {
      case 'triads':
        return (
          <div className="text-gray-700 space-y-4">
            <p>
              Triads are three-note chords consisting of a root, third, and fifth.
              They are the building blocks of chord progressions in Western music.
            </p>
            <p>
              There are four main types of triads:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Major</strong>: Root, major 3rd (4 semitones), perfect 5th (7 semitones)</li>
              <li><strong>Minor</strong>: Root, minor 3rd (3 semitones), perfect 5th (7 semitones)</li>
              <li><strong>Diminished</strong>: Root, minor 3rd (3 semitones), diminished 5th (6 semitones)</li>
              <li><strong>Augmented</strong>: Root, major 3rd (4 semitones), augmented 5th (8 semitones)</li>
            </ul>
            
            <h3 className="text-lg font-semibold">Tips for Learning Triads</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Learn triads in the context of the Circle of Fifths</li>
              <li>Practice visualizing triads across different string sets</li>
              <li>Learn to see the relationship between triad shapes and scale patterns</li>
              <li>Try to identify the role of each note (root, third, fifth) in the chord</li>
            </ul>
          </div>
        );
      
      case 'scales':
        return (
          <div className="text-gray-700 space-y-4">
            <p>
              Coming soon: Tips for learning scales on the guitar fretboard.
            </p>
          </div>
        );
      
      case 'notes':
      default:
        return (
          <div className="text-gray-700 space-y-4">
            <p>
              Learning the fretboard takes time but doesn't need to be difficult. Every guitar player views the fretboard in a different way, and this page is meant to be used as a tool to help learning guitarists learn all the notes on the guitar and develop their own vision of the fretboard.
            </p>
            <p>
              Learning the notes on the fretboard with no other context can be tedious, therefore aimlessly memorizing the notes isn't recommended for new players.
            </p>
            <p>
              Soon this guide will include more tips for studying and how a guitarist can use scales and triads to help them visualize the fretboard. For now use it as an opportunity to explore the fretboard and see the visual relationships between the notes.
            </p>

            <h3 className="text-lg font-semibold">Some recommendations</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Start with C. Learn what fret it is on for all 6 strings.</li>
              <li>After that pick another note like G or D. The idea is to start forming spacial relationships between notes. Don't overwhelm youself.</li>
              <li>Pay attention to how many frets you need to move up or down to find the same note when you move to the next string.</li>
              <li>Look at the relationship between where a note is and where it is two strings away.</li>
              <li>A great exersice is to take the notes from the C major scale and learn them on one of the top strings (B or E).</li>
              <li>Learn all the notes from a scale on two adjacent strings and examine how playing the same note on two different strings could open up more possibilities in your playing.</li>
              <li>Use the dots on the fretboard to help you. They are there to act as another reference point while you learn.</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {tipType === 'triads' ? 'Tips for Learning Triads' : 
               tipType === 'scales' ? 'Tips for Learning Scales' : 
               'Tips for Learning the Fretboard'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {renderTipContent()}

          <button
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipsModal;