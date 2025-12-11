// src/components/NoteSelector.tsx
import React from 'react';
import { Note } from '../../types';
import { allNotes, noteColors, fretCountOptions } from '../../constants';
import { displayNote } from '../../utils/utils';

interface NoteSelectorProps {
  selectedNotes: Note[];
  useFlats: boolean;
  allSelected: boolean;
  onToggleNote: (note: Note) => void;
  onToggleAllNotes: () => void;
  onClearSelection: () => void;
  onFlatsToggle: () => void;
  numFrets: number;
  onFretsChange: (count: number) => void;
}

const NoteSelector: React.FC<NoteSelectorProps> = ({
  selectedNotes,
  useFlats,
  allSelected,
  onToggleNote,
  onToggleAllNotes,
  onClearSelection,
  onFlatsToggle,
  numFrets,
  onFretsChange
}) => {
  return (
    <div className="p-3">
      {/* Note buttons grid */}
      <div className="buttons-grid grid grid-cols-3 gap-2 w-full mb-3">
        {allNotes.map(note => (
          <button
            key={`btn-${note}`}
            className={`px-4 py-2 rounded-md font-medium ${selectedNotes.includes(note)
                ? `${noteColors[note]} text-white`
                : 'bg-gray-200'
              }`}
            onClick={() => onToggleNote(note)}
          >
            {displayNote(note, useFlats)}
          </button>
        ))}
      </div>

      {/* Action buttons row - smaller buttons */}
      <div className="flex gap-2 mb-3">
        <button
          className={`flex-1 px-2 py-1.5 rounded-md text-sm ${allSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
            }`}
          onClick={onToggleAllNotes}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>

        <button
          className="flex-1 px-2 py-1.5 bg-red-500 text-white rounded-md text-sm"
          onClick={onClearSelection}
        >
          Clear
        </button>

        <button
          className="flex-1 px-2 py-1.5 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
          onClick={onFlatsToggle}
        >
          {useFlats ? '♯ Sharps' : '♭ Flats'}
        </button>
      </div>

      {/* Fret count selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-700 flex-shrink-0">Frets:</label>
        <div className="flex flex-wrap gap-1">
          {fretCountOptions.map(option => (
            <button
              key={`fret-option-${option}`}
              className={`px-2 py-1 rounded-md text-xs ${
                numFrets === option
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => onFretsChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteSelector;