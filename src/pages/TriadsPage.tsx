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

// Create a key for localStorage that won't conflict with other components
const SIDEBAR_STORAGE_KEY = 'triads_sidebarOpen';

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

  // Sidebar state - with localStorage persistence - using safer implementation
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      // Get the stored value from localStorage, default to true if not found
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return stored === null ? true : stored === 'true';
    } catch (e) {
      // If localStorage fails for any reason, default to true
      console.error('Failed to access localStorage:', e);
      return true;
    }
  });

  // Improved approach: update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarOpen.toString());
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  }, [sidebarOpen]);

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

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
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
        <div
          className={`
            transition-all duration-300 ease-in-out bg-gray-50
            flex-grow w-full h-full p-4 md:p-6
            ${sidebarOpen ? 'md:w-2/3' : 'md:w-full'}
          `}
        >
          {/* Toggle button for desktop when controls are hidden */}
          {!sidebarOpen && (
            <div className="hidden md:block absolute top-4 right-4 z-10">
              <button
                onClick={toggleSidebar}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                           px-3 py-1.5 rounded-md shadow-md transition-all
                           flex items-center gap-1"
                aria-label="Show Controls"
              >
                <span className="text-lg leading-none">←</span> Show Controls
              </button>
            </div>
          )}

          <div className="h-full flex items-center justify-center mb-4">
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

          {/* Mobile-only toggle button - below the fretboard */}
          <div className="md:hidden w-full flex justify-center mt-4">
            <button
              onClick={toggleSidebar}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                         px-4 py-2 rounded-md shadow-md z-10 transition-all
                         flex items-center gap-1 w-full justify-center"
              aria-label={sidebarOpen ? 'Hide Controls' : 'Show Controls'}
            >
              {sidebarOpen ? 'Hide Controls' : 'Show Controls'}
            </button>
          </div>
        </div>

        {/* Right Side - Controls - Hidden completely when closed */}
        {sidebarOpen && (
          <div className="
            w-full md:w-1/3 md:min-w-[320px] bg-white
            border-t md:border-t-0 md:border-l border-gray-200 p-4 md:p-6 
            flex flex-col gap-4 overflow-y-auto relative
          ">
            {/* Desktop toggle button - inside the sidebar */}
            <div className="hidden md:block">
              <button
                onClick={toggleSidebar}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                           px-3 py-1.5 rounded-md shadow-md z-10 transition-all
                           flex items-center gap-1"
                aria-label="Hide Controls"
              >
                Hide Controls <span className="text-lg leading-none">→</span>
              </button>
            </div>

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
        )}
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
