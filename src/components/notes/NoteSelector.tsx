// src/components/NoteSelector.tsx
import React from 'react';
import { Note } from '../../types';
import { allNotes, noteColors } from '../../constants';
import { displayNote } from '../../utils/utils';

interface NoteSelectorProps {
  selectedNotes: Note[];
  useFlats: boolean;
  allSelected: boolean;
  onToggleNote: (note: Note) => void;
  onToggleAllNotes: () => void;
  onClearSelection: () => void;
  onFlatsToggle: () => void;
}

const NoteSelector: React.FC<NoteSelectorProps> = ({
  selectedNotes,
  useFlats,
  allSelected,
  onToggleNote,
  onToggleAllNotes,
  onClearSelection,
  onFlatsToggle
}) => {
  return (
    <div className="p-4">

      {/* Sharps/Flats toggle */}
      <div className="mb-3">
        <button
          className="px-3 py-1 w-full bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
          onClick={onFlatsToggle}
        >
          {useFlats ? '♯ Use Sharps' : '♭ Use Flats'}
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Select Notes</h3>
      </div>

      {/* Note buttons grid */}
      <div className="buttons-grid grid grid-cols-3 gap-2 w-full">
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

      {/* Action buttons */}
      <div className="mt-6 flex flex-col gap-2">
        <button
          className={`w-full px-4 py-2 rounded-md ${allSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
            }`}
          onClick={onToggleAllNotes}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>


        <button
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={onClearSelection}
        >
          Clear Selection
        </button>

      </div>
    </div>
  );
};

export default NoteSelector;