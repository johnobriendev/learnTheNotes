// src/pages/NotesPage.tsx
import { useState } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import NoteSelector from '../components/NoteSelector';
import HowToUse from '../components/HowToUse';
import TipsModal from '../components/TipsModal';
import { Note } from '../types';
import { allNotes, noteColors, standardTuning } from '../constants';

const NotesPage = () => {
  // State management
  const [numFrets, setNumFrets] = useState<number>(15);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  
  // Toggle note selection
  const toggleNote = (note: Note): void => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
      setAllSelected(false);
    } else {
      setSelectedNotes([...selectedNotes, note]);
      if (selectedNotes.length + 1 === allNotes.length) {
        setAllSelected(true);
      }
    }
  };

  // Toggle all notes
  const toggleAllNotes = (): void => {
    if (allSelected) {
      setSelectedNotes([]);
      setAllSelected(false);
    } else {
      setSelectedNotes([...allNotes]);
      setAllSelected(true);
    }
  };

  // Handle frets change
  const handleFretsChange = (count: number): void => {
    setNumFrets(count);
  };

  // Toggle flats/sharps
  const toggleFlats = (): void => {
    setUseFlats(!useFlats);
  };

  // Clear all selected notes
  const clearSelection = (): void => {
    setSelectedNotes([]);
    setAllSelected(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-around">
      {/* Left Side - Fretboard */}
      <div className="order-2 md:order-1 md:flex-grow">
        <Fretboard
          numFrets={numFrets}
          strings={standardTuning}
          selectedNotes={selectedNotes}
          useFlats={useFlats}
          noteColors={noteColors}
          displayMode="notes"
        />
      </div>

      {/* Right Side - Controls */}
      <div className="w-full md:w-80 order-1 md:order-2 flex flex-col gap-4">
        <FretboardSettings 
          numFrets={numFrets}
          onFretsChange={handleFretsChange}
          useFlats={useFlats}
          onFlatsToggle={toggleFlats}
        />
        
        <NoteSelector 
          selectedNotes={selectedNotes}
          useFlats={useFlats}
          allSelected={allSelected}
          onToggleNote={toggleNote}
          onToggleAllNotes={toggleAllNotes}
          onClearSelection={clearSelection}
        />
        
        <HowToUse 
          onShowTips={() => setShowTipsModal(true)} 
          tipType="notes"
        />
      </div>
      
      <TipsModal 
        isOpen={showTipsModal} 
        onClose={() => setShowTipsModal(false)}
        tipType="notes" 
      />
    </div>
  );
};

export default NotesPage;