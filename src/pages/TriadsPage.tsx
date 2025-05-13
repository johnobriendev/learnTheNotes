// src/pages/TriadsPage.tsx
import { useState, useEffect } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import TriadSelector from '../components/TriadSelector';
import StringSetSelector from '../components/StringSetSelector';
import TriadInfo from '../components/TriadInfo';
import TipsModal from '../components/TipsModal';
import { Note, ChordQuality, StringSet, DisplayMode } from '../types';
import { allNotes, noteColors, standardTuning } from '../constants';
import { createTriad } from '../utils/triadUtils';
import { filterNotesByStringSet } from '../utils/stringSetUtils'; 

const TriadsPage = () => {
  // Basic settings
  const [numFrets, setNumFrets] = useState<number>(15);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  
  // Triad-specific state
  const [selectedRoot, setSelectedRoot] = useState<Note>('C');
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality>('major');
  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>('1-2-3');
  const [notesToHighlight, setNotesToHighlight] = useState<Note[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('intervals');

  
  // Create the current triad
  const currentTriad = createTriad(selectedRoot, selectedQuality);
  
  useEffect(() => {
    try {
      const filteredNotes = filterNotesByStringSet(
        currentTriad,
        selectedStringSet,
        standardTuning,
        numFrets
      );
      setNotesToHighlight(filteredNotes);
    } catch (error) {
      // Fallback to showing all notes in case of error
      setNotesToHighlight(currentTriad.notes);
    }
  }, [selectedRoot, selectedQuality, selectedStringSet, numFrets]);
  


  
  // Handle settings changes
  const handleFretsChange = (count: number) => setNumFrets(count);
  const toggleFlats = () => setUseFlats(!useFlats);
  const toggleDisplayMode = () => {
    setDisplayMode(mode => mode === 'notes' ? 'intervals' : 'notes');
  };

  
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-around">
      {/* Left Side - Fretboard */}
      <div className="order-2 md:order-1 ">
        <Fretboard
          numFrets={numFrets}
          strings={standardTuning}
          selectedNotes={notesToHighlight}
          useFlats={useFlats}
          noteColors={noteColors}
          displayMode={displayMode}
          intervals={currentTriad.intervals}
          selectedStringSet={selectedStringSet}
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
          displayMode={displayMode} 
          onToggleDisplayMode={toggleDisplayMode} 
        />
        
        <StringSetSelector
          selectedSet={selectedStringSet}
          onSelectSet={setSelectedStringSet}
        />
        
        <TriadInfo 
          triad={currentTriad}
          onShowTips={() => setShowTipsModal(true)}
          useFlats={useFlats}
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