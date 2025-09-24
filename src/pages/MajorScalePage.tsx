// src/pages/MajorScalePage.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import MajorScaleSelector from '../components/MajorScaleSelector';
import StringSelector from '../components/StringSelector';
import FretRangeSelector from '../components/FretRangeSelector';
import TipsModal from '../components/TipsModal';
import CollapsiblePanel from '../components/CollapsiblePanel';
import { Note, MajorScaleKey, DisplayMode } from '../types';
import { noteColors, standardTuning } from '../constants';
import { createMajorScale, getScaleNotesOnFretboard, shouldHighlightNote } from '../utils/majorScaleUtils';

const SIDEBAR_STORAGE_KEY = 'majorscale_sidebarOpen';

const MajorScalePage = () => {
  // Basic settings
  const [numFrets, setNumFrets] = useState<number>(12);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Major scale specific state
  const [selectedKey, setSelectedKey] = useState<MajorScaleKey>('C');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('intervals');
  const [selectedStrings, setSelectedStrings] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [minFret, setMinFret] = useState<number>(0);
  const [maxFret, setMaxFret] = useState<number>(12);
  const [notesToHighlight, setNotesToHighlight] = useState<Note[]>([]);

  // Sidebar state with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return stored === null ? true : stored === 'true';
    } catch (e) {
      console.error('Failed to access localStorage:', e);
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarOpen.toString());
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  }, [sidebarOpen]);

  // Create the current major scale
  const currentScale = useMemo(() => {
    return createMajorScale(selectedKey);
  }, [selectedKey]);

  // Update notes effect
  useEffect(() => {
    const scaleNotes = getScaleNotesOnFretboard(
      currentScale,
      standardTuning,
      selectedStrings,
      minFret,
      maxFret,
      numFrets
    );
    setNotesToHighlight(scaleNotes);
  }, [currentScale, selectedStrings, minFret, maxFret, numFrets]);

  // Handle settings changes
  const handleFretsChange = useCallback((count: number) => {
    setNumFrets(count);
    if (maxFret > count) {
      setMaxFret(count);
    }
  }, [maxFret]);


  const toggleDisplayMode = useCallback(() => {
    setDisplayMode(mode => mode === 'notes' ? 'intervals' : 'notes');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // String selection handlers
  const handleToggleString = useCallback((stringIndex: number) => {
    setSelectedStrings(prev => {
      if (prev.includes(stringIndex)) {
        return prev.filter(s => s !== stringIndex);
      } else {
        return [...prev, stringIndex];
      }
    });
  }, []);

  const handleSelectAllStrings = useCallback(() => {
    setSelectedStrings([0, 1, 2, 3, 4, 5]);
  }, []);

  const handleClearAllStrings = useCallback(() => {
    setSelectedStrings([]);
  }, []);

  // Fret range handlers
  const handleMinFretChange = useCallback((fret: number) => {
    setMinFret(fret);
    if (fret > maxFret) {
      setMaxFret(fret);
    }
  }, [maxFret]);

  const handleMaxFretChange = useCallback((fret: number) => {
    setMaxFret(fret);
    if (fret < minFret) {
      setMinFret(fret);
    }
  }, [minFret]);

  // Clean up modal state on unmount
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
              useFlats={false}
              noteColors={noteColors}
              displayMode={displayMode}
              intervals={currentScale.intervals}
              shouldHighlight={(stringIndex, fret) =>
                shouldHighlightNote(
                  currentScale,
                  standardTuning,
                  selectedStrings,
                  minFret,
                  maxFret,
                  stringIndex,
                  fret
                )
              }
            />
          </div>

          {/* Mobile-only toggle button */}
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
            {/* Desktop toggle button */}
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

            <CollapsiblePanel title="Major Scale Selector" defaultOpen={true}>
              <MajorScaleSelector
                selectedKey={selectedKey}
                onSelectKey={setSelectedKey}
                displayMode={displayMode}
                onToggleDisplayMode={toggleDisplayMode}
                scale={currentScale}
                onShowTips={() => setShowTipsModal(true)}
              />
            </CollapsiblePanel>

            <CollapsiblePanel title="String Filter" defaultOpen={true}>
              <StringSelector
                selectedStrings={selectedStrings}
                onToggleString={handleToggleString}
                onSelectAll={handleSelectAllStrings}
                onClearAll={handleClearAllStrings}
                strings={standardTuning}
              />
            </CollapsiblePanel>

            <CollapsiblePanel title="Fret Range" defaultOpen={true}>
              <FretRangeSelector
                minFret={minFret}
                maxFret={maxFret}
                totalFrets={numFrets}
                onMinFretChange={handleMinFretChange}
                onMaxFretChange={handleMaxFretChange}
              />
            </CollapsiblePanel>
          </div>
        )}
      </div>

      {showTipsModal && (
        <TipsModal
          isOpen={showTipsModal}
          onClose={() => setShowTipsModal(false)}
          tipType="scales"
        />
      )}
    </div>
  );
};

export default MajorScalePage;