// src/components/TriadInfo.tsx
import React from 'react';
import { Triad } from '../types';
import { getTriadDetails } from '../utils/triadUtils';

interface TriadInfoProps {
  triad: Triad;
  onShowTips: () => void;
  useFlats?: boolean;
}

const TriadInfo: React.FC<TriadInfoProps> = ({ triad, onShowTips, useFlats = false }) => {
  // Get formatted triad details using the utility function
  const { rootName, quality, noteNames, intervalText } = getTriadDetails(triad, useFlats);

  return (
    <div className="p-4 bg-blue-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Triad Information</h3>
      
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>Selected Triad:</strong> {rootName} {quality}
        </p>
        <p>
          <strong>Notes:</strong> {noteNames.join(', ')}
        </p>
        <p>
          <strong>Intervals:</strong> {intervalText}
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