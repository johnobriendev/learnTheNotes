import React from 'react';
import { Note, ChordQuality, DisplayMode } from '../types';
import { allNotes } from '../constants';
import { displayNote } from '../utils/utils';

interface TriadSelectorProps {
  selectedRoot: Note;
  selectedQuality: ChordQuality;
  useFlats: boolean;
  onSelectRoot: (note: Note) => void;
  onSelectQuality: (quality: ChordQuality) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
}

const TriadSelector: React.FC<TriadSelectorProps> = ({
  selectedRoot,
  selectedQuality,
  useFlats,
  onSelectRoot,
  onSelectQuality,
  displayMode,
  onToggleDisplayMode
}) => {
  const qualities: ChordQuality[] = ['major', 'minor', 'diminished', 'augmented'];

  return (
    <div className="p-3 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">Select Triad</h3>

      {/* Root note selector */}
      <div className="mb-3">
        <label className="text-sm text-gray-700 mb-1 block">Root Note:</label>
        <div className="grid grid-cols-4 gap-1">
          {allNotes.map(note => (
            <button
              key={`root-${note}`}
              className={`px-2 py-1 rounded-md text-sm ${selectedRoot === note
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
              onClick={() => onSelectRoot(note)}
            >
              {displayNote(note, useFlats)}
            </button>
          ))}
        </div>
      </div>

      {/* Chord quality selector */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Chord Quality:</label>
        <div className="grid grid-cols-2 gap-2">
          {qualities.map(quality => (
            <button
              key={`quality-${quality}`}
              className={`px-2 py-1 rounded-md text-sm ${selectedQuality === quality
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
              onClick={() => onSelectQuality(quality)}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-700 mb-1 block">Display Mode:</label>
        <button
          className="w-full px-3 py-2 rounded-md text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          onClick={onToggleDisplayMode}
        >
          {displayMode === 'intervals' ? 'Show Notes' : 'Show Intervals'}
        </button>
      </div>
    </div>
  );
};

export default TriadSelector;