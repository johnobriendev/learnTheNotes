// src/pages/TriadsPage.tsx
import { useState, useEffect } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import TriadSelector from '../components/TriadSelector';
import StringSetSelector from '../components/StringSetSelector';
import TriadInfo from '../components/TriadInfo';
import TipsModal from '../components/TipsModal';
import { Note, ChordQuality, StringSet } from '../types';
import { allNotes, noteColors, standardTuning } from '../constants';
import { createTriad } from '../utils/triadUtils';
import { filterNotesByStringSet } from '../utils/fretboardUtils';

const TriadsPage = () => {
  // Basic settings
  const [numFrets, setNumFrets] = useState<number>(12);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  
  // Triad-specific state
  const [selectedRoot, setSelectedRoot] = useState<Note>('C');
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality>('major');
  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>('All');
  const [notesToHighlight, setNotesToHighlight] = useState<Note[]>([]);
  
  // Create the current triad
  const currentTriad = createTriad(selectedRoot, selectedQuality);
  
  // Update notes to highlight whenever triad or string set changes
  useEffect(() => {
    const filteredNotes = filterNotesByStringSet(
      currentTriad,
      selectedStringSet,
      standardTuning,
      numFrets
    );
    setNotesToHighlight(filteredNotes);
  }, [selectedRoot, selectedQuality, selectedStringSet, numFrets]);
  
  // Handle settings changes
  const handleFretsChange = (count: number) => setNumFrets(count);
  const toggleFlats = () => setUseFlats(!useFlats);
  
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-around">
      {/* Left Side - Fretboard */}
      <div className="order-2 md:order-1 md:flex-grow">
        <Fretboard
          numFrets={numFrets}
          strings={standardTuning}
          selectedNotes={notesToHighlight}
          useFlats={useFlats}
          noteColors={noteColors}
          displayMode="intervals"
          intervals={currentTriad.intervals}
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
        
        <TriadSelector
          selectedRoot={selectedRoot}
          selectedQuality={selectedQuality}
          useFlats={useFlats}
          onSelectRoot={setSelectedRoot}
          onSelectQuality={setSelectedQuality}
        />
        
        <StringSetSelector
          selectedSet={selectedStringSet}
          onSelectSet={setSelectedStringSet}
        />
        
        <TriadInfo 
          triad={currentTriad}
          onShowTips={() => setShowTipsModal(true)}
        />
      </div>
      
      <TipsModal 
        isOpen={showTipsModal} 
        onClose={() => setShowTipsModal(false)}
        tipType="triads"
      />
    </div>
  );
};

export default TriadsPage;