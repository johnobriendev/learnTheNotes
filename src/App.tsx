import { useState } from 'react'
import FretboardSettings from './components/FretBoardSettings';
import Fretboard from './components/FretBoard';
import NoteSelector from './components/NoteSelector';
import HowToUse from './components/HowToUse';
import TipsModal from './components/TipsModal';
import { Note } from './types';
import { allNotes, noteColors, sharpToFlat, standardTuning } from './constants';

const App = () => {

  const [numFrets, setNumFrets] = useState<number>(12);
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
    <div className="flex flex-col w-full h-screen gap-8 p-4 bg-gray-100">
    
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        Learn the Notes
      </h1>

      <FretboardSettings 
        numFrets={numFrets}
        onFretsChange={handleFretsChange}
        useFlats={useFlats}
        onFlatsToggle={toggleFlats}
      />
      
      <div className="flex flex-col md:flex-row gap-8 justify-around">
        <div className=" order-2 md:order-1">
          <Fretboard
            numFrets={numFrets}
            strings={standardTuning}
            selectedNotes={selectedNotes}
            useFlats={useFlats}
            noteColors={noteColors}
            sharpToFlat={sharpToFlat}
          />
        </div>



        {/* Right Side - Note Buttons and Tips */}
        <div className="w-full md:w-96 order-1 md:order-2 flex flex-col gap-6">
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
          />
        </div>
        
      </div>
      
      <TipsModal 
        isOpen={showTipsModal} 
        onClose={() => setShowTipsModal(false)} 
      />
          
    </div>
  );
};

export default App