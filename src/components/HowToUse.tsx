// src/components/HowToUse.tsx
import React from 'react';

interface HowToUseProps {
  onShowTips: () => void;
}

const HowToUse: React.FC<HowToUseProps> = ({ onShowTips }) => {
  return (
    <div className="p-4 bg-blue-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">How to Use</h3>
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li>Click on any note button to see where it appears on the fretboard</li>
        <li>Use "Select All" to see all note positions at once</li>
        <li>The colored dots show the selected notes on each string and fret</li>
        <li>Open string positions appear above the fretboard</li>
        <li>Toggle between sharps (♯) and flats (♭) notation using the button in settings</li>
      </ul>
      <button
        onClick={onShowTips}
        className="mt-4 w-full px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors"
      >
        Tips for Learning
      </button>
    </div>
  );
};

export default HowToUse;