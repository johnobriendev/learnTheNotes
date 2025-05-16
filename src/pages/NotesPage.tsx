// src/pages/NotesPage.tsx
import { useState } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import NoteSelector from '../components/NoteSelector';
import HowToUse from '../components/HowToUse';
import TipsModal from '../components/TipsModal';
import CollapsiblePanel from '../components/CollapsiblePanel';
import { Note } from '../types';
import { allNotes, noteColors, standardTuning } from '../constants';

const NotesPage = () => {
  // State management
  const [numFrets, setNumFrets] = useState<number>(15);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Sidebar state - with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Get the stored value from localStorage, default to true if not found
    const stored = localStorage.getItem('notes_sidebarOpen');
    return stored === null ? true : stored === 'true';
  });
  
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

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('notes_sidebarOpen', newState.toString());
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row relative h-full">
        {/* Left Side - Fretboard */}
        <div 
          className={`
            transition-all duration-300 ease-in-out bg-gray-50
            flex-grow w-full h-full p-4 md:p-6 flex flex-col
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
              selectedNotes={selectedNotes}
              useFlats={useFlats}
              noteColors={noteColors}
              displayMode="notes"
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

        {/* Right Side - Controls */}
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
            
            <CollapsiblePanel title="Note Selection" defaultOpen={true}>
              <NoteSelector 
                selectedNotes={selectedNotes}
                useFlats={useFlats}
                allSelected={allSelected}
                onToggleNote={toggleNote}
                onToggleAllNotes={toggleAllNotes}
                onClearSelection={clearSelection}
                onFlatsToggle={toggleFlats}
              />
            </CollapsiblePanel>
            
            <CollapsiblePanel title="Help Information" defaultOpen={true}>
              <HowToUse 
                onShowTips={() => setShowTipsModal(true)} 
                tipType="notes"
              />
            </CollapsiblePanel>
          </div>
        )}
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