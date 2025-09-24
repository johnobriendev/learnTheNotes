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
              Triads are three-note chords consisting of a root (R), third (3), and fifth (5).
            </p>
            <p>
              There are four main types of triads:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li className='pl-1' ><strong>Major</strong>:  R, 3, 5</li>
              <li className='pl-1'><strong>Minor</strong>:  R, b3, 5</li>
              <li className='pl-1'><strong>Diminished</strong>: R, b3, b5</li>
              <li className='pl-1'><strong>Augmented</strong>: R, 3, #5</li>
            </ul>
            
            <h3 className="text-lg font-semibold">Tips for Learning Triads</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className='pl-1'>Start by learning a few triads of notes you know like C, G, D on the top group of strings (1, 2, 3)</li>
              <li className='pl-1'>Each triad will have three inversions. Take note of the distance vertically between each shape</li>
              <li className='pl-1'>Learn the notes of the triad on a single string</li>
              <li className='pl-1'>The inversions always follow the order of R, 3, 5 (Root position) 3, 5, R (First Inversion) or 5, R, 3 (Second Inversion)</li>
              <li className='pl-1'>Pick a song you know and replace the chords with triads</li>
              
            </ul>
          </div>
        );
      
      case 'scales':
        return (
          <div className="text-gray-700 space-y-4">
            <p>
              The major scale is the foundation of Western music theory and consists of seven notes with a specific pattern of whole and half steps.
            </p>
            <p>
              Pattern: <strong>W-W-H-W-W-W-H</strong> (Whole-Whole-Half-Whole-Whole-Whole-Half)
            </p>

            <h3 className="text-lg font-semibold">Tips for Learning Major Scales</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className='pl-1'>Start with the C major scale (all natural notes: C-D-E-F-G-A-B)</li>
              <li className='pl-1'>Learn one position at a time - focus on a specific fret range</li>
              <li className='pl-1'>Practice saying the scale degrees (1-2-3-4-5-6-7) as you play</li>
              <li className='pl-1'>Use string filtering to focus on specific string groups</li>
              <li className='pl-1'>Learn the patterns by their fingering shapes, not just note names</li>
              <li className='pl-1'>Practice ascending and descending patterns</li>
              <li className='pl-1'>Once comfortable, try playing melodies and songs using scale notes</li>
              <li className='pl-1'>Remember: the same pattern works for all keys, just starting from different frets</li>
            </ul>

            <h3 className="text-lg font-semibold">Key Signatures</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className='pl-1'><strong>Sharp keys:</strong> C, G, D, A, E, B, F# (follow the circle of fifths)</li>
              <li className='pl-1'><strong>Flat keys:</strong> F, Bb, Eb, Ab, Db, Gb (reverse order)</li>
              <li className='pl-1'>Each key has its own set of accidentals (sharps or flats)</li>
            </ul>
          </div>
        );
      
      case 'notes':
      default:
        return (
          <div className="text-gray-700 space-y-4">
            <p>
              Many students ask, "Do I need to learn the notes on the guitar?" I don't know the answer but I like to say "You CAN learn the notes!" Each person learns the fretboard in their own way and this page is meant to be a tool to help you do that. 
            </p>
            

            <h3 className="text-lg font-semibold">Some recommendations</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className='pl-1'>Start with C. Learn what fret it is on for all 6 strings.</li>
              <li className='pl-1'>After that learn all the notes on the lowest string (6th, E) and then the next lowest string (5th, A) </li>
              <li className='pl-1'>Take mental notes of the difference in fret number between the same note on different strings</li>
              <li className='pl-1'>Learning the notes on the lowest strings is good for playing chords in all keys</li>
              <li className="pl-1">The notes on the lowest string are the same as the notes on the highest string</li>
              <li className='pl-1'>Use the dots on the fretboard to help you. They are there to act as another reference point while you learn.</li>
              <li className='pl-1'>Don't try to learn everything at once. Have fun with it!</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-neutral-100 bg-opacity-30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
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