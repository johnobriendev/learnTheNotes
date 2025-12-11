// src/pages/TriadsPage.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import FretboardSettings from '../components/shared/FretboardSettings';
import Fretboard from '../components/shared/Fretboard';
import TriadSelector from '../components/triads/TriadSelector';
import TipsModal from '../components/shared/TipsModal';
import CollapsiblePanel from '../components/shared/CollapsiblePanel';
import { Note, ChordQuality, StringSet, DisplayMode } from '../types';
import { noteColors, standardTuning } from '../constants';
import { createTriad } from '../utils/triadUtils';
import { filterNotesByStringSet } from '../utils/stringSetUtils';

const TriadsPage = () => {
  // Basic settings
  const [numFrets, setNumFrets] = useState<number>(12);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Triad-specific state
  const [selectedRoot, setSelectedRoot] = useState<Note>('C');
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality>('major');
  const [selectedStringSet, setSelectedStringSet] = useState<StringSet>('1-2-3');
  const [notesToHighlight, setNotesToHighlight] = useState<Note[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('intervals');

  // Create the current triad with useCallback for stability
   const currentTriad = useMemo(() => {
    return createTriad(selectedRoot, selectedQuality);
  }, [selectedRoot, selectedQuality]);

  // Update notes effect with better dependency tracking
  useEffect(() => {
    const filteredNotes = filterNotesByStringSet(
      currentTriad,
      selectedStringSet,
      standardTuning,
      numFrets
    );
    
    setNotesToHighlight(filteredNotes);
  }, [selectedStringSet, numFrets, currentTriad]);

  // Handle settings changes - memoized with useCallback
  const handleFretsChange = useCallback((count: number) => {
    setNumFrets(count);
  }, []);

  const toggleFlats = useCallback(() => {
    setUseFlats(prev => !prev);
  }, []);

  const toggleDisplayMode = useCallback(() => {
    setDisplayMode(mode => mode === 'notes' ? 'intervals' : 'notes');
  }, []);

  // Clear modal state on unmount
  useEffect(() => {
    return () => {
      setShowTipsModal(false);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row relative h-full">
        {/* Left Side - Fretboard */}
        <div className="flex-grow md:w-2/3 bg-gray-50 p-2 md:p-4">
          <div className="h-full flex items-center justify-center">
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
        </div>

        {/* Right Side - Controls */}
        <div className="
          w-full md:w-1/3 md:min-w-[320px] bg-white
          border-t md:border-t-0 md:border-l border-gray-200 p-4 md:p-6
          flex flex-col gap-4 overflow-y-auto
        ">

            <CollapsiblePanel title="Fretboard Settings" defaultOpen={true}>
              <FretboardSettings
                numFrets={numFrets}
                onFretsChange={handleFretsChange}
              />
            </CollapsiblePanel>

            <CollapsiblePanel title="Triad Selector" defaultOpen={true}>
              <TriadSelector
                selectedRoot={selectedRoot}
                selectedQuality={selectedQuality}
                useFlats={useFlats}
                onSelectRoot={setSelectedRoot}
                onSelectQuality={setSelectedQuality}
                displayMode={displayMode}
                onToggleDisplayMode={toggleDisplayMode}
                onFlatsToggle={toggleFlats}
                selectedStringSet={selectedStringSet}
                onSelectStringSet={setSelectedStringSet}
                triad={currentTriad}
                onShowTips={() => setShowTipsModal(true)}
              />
            </CollapsiblePanel>
          </div>
      </div>

      {showTipsModal && (
        <TipsModal
          isOpen={showTipsModal}
          onClose={() => setShowTipsModal(false)}
          tipType="triads"
        />
      )}
    </div>
  );
};

export default TriadsPage;
