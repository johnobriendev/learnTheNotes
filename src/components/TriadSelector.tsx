import React from 'react';
import { Note, ChordQuality, DisplayMode, StringSet, Triad } from '../types';
import { allNotes } from '../constants';
import { displayNote } from '../utils/utils';
import { getTriadDetails } from '../utils/triadUtils';


interface TriadSelectorProps {
  selectedRoot: Note;
  selectedQuality: ChordQuality;
  useFlats: boolean;
  onSelectRoot: (note: Note) => void;
  onSelectQuality: (quality: ChordQuality) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
  onFlatsToggle: () => void;
  // Added props from StringSetSelector
  selectedStringSet: StringSet;
  onSelectStringSet: (set: StringSet) => void;
  // Added props from TriadInfo
  triad: Triad;
  onShowTips: () => void;
}

const TriadSelector: React.FC<TriadSelectorProps> = ({
  selectedRoot,
  selectedQuality,
  useFlats,
  onSelectRoot,
  onSelectQuality,
  displayMode,
  onToggleDisplayMode,
  onFlatsToggle,
  selectedStringSet,
  onSelectStringSet,
  triad,
  onShowTips
}) => {
  const qualities: ChordQuality[] = ['major', 'minor', 'diminished', 'augmented'];
  const stringSets: StringSet[] = ['1-2-3', '2-3-4', '3-4-5', '4-5-6', 'All'];

  const { rootName, quality, noteNames, intervalText } = getTriadDetails(triad, useFlats);

  return (
    <div>
      {/* Root and quality selection section */}
      <div className="p-3 ">
        {/* Sharps/Flats toggle */}
        <div className="mb-3">
          <button
            className="px-3 py-1 w-full bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
            onClick={onFlatsToggle}
          >
            {useFlats ? '♯ Use Sharps' : '♭ Use Flats'}
          </button>
        </div>

        {/* Root note selector */}
        <div className="mb-3">
          <div className="grid grid-cols-4 gap-1">
            {allNotes.map(note => (
              <button
                key={`root-${note}`}
                className={`px-2 py-1 rounded-md text-sm ${
                  selectedRoot === note
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
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-2">
            {qualities.map(quality => (
              <button
                key={`quality-${quality}`}
                className={`px-2 py-1 rounded-md text-sm ${
                  selectedQuality === quality
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
        
        {/* Display mode toggle */}
        <div>
          <button
            className="w-full px-3 py-2 rounded-md text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
            onClick={onToggleDisplayMode}
          >
            {displayMode === 'intervals' ? 'Show Notes' : 'Show Intervals'}
          </button>
        </div>
      </div>
      
      {/* String Sets - from StringSetSelector */}
      <div className="mt-4 p-3 ">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">String Sets</h3>
        <div className="flex flex-wrap gap-2">
          {stringSets.map(set => (
            <button
              key={set}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedStringSet === set 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => onSelectStringSet(set)}
            >
              {set}
            </button>
          ))}
        </div>
      </div>
      
      {/* Triad Information - from TriadInfo */}
      <div className="mt-4 p-4 ">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">Triad Information</h3>
        
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
          Tips for Learning
        </button>
      </div>
    </div>
  );

};

export default TriadSelector;