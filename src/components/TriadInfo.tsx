// src/components/TriadInfo.tsx
import React from 'react';
import { Triad } from '../types';
import { displayNote } from '../utils/utils';

interface TriadInfoProps {
  triad: Triad;
  onShowTips: () => void;
}

const TriadInfo: React.FC<TriadInfoProps> = ({ triad, onShowTips }) => {
  return (
    <div className="p-4 bg-blue-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Triad Information</h3>
      
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Selected Triad:</strong> {displayNote(triad.root, false)} {triad.quality}
        </p>
        <p>
          <strong>Notes:</strong> {triad.notes.map(note => displayNote(note, false)).join(', ')}
        </p>
        <p>
          <strong>Intervals:</strong> Root - 
          {triad.quality === 'major' || triad.quality === 'augmented' ? '3rd' : '♭3rd'} - 
          {triad.quality === 'diminished' ? '♭5th' : 
           triad.quality === 'augmented' ? '♯5th' : '5th'}
        </p>
      </div>
      
      <button
        onClick={onShowTips}
        className="mt-4 w-full px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors"
      >
        Learn About Triads
      </button>
    </div>
  );
};

export default TriadInfo;