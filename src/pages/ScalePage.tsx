// src/pages/ScalePage.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import FretboardSettings from '../components/shared/FretboardSettings';
import Fretboard from '../components/shared/Fretboard';
import ScaleSelector from '../components/scales/ScaleSelector';
import StringSelector from '../components/shared/StringSelector';
import FretRangeSelector from '../components/scales/FretRangeSelector';
import TipsModal from '../components/shared/TipsModal';
import CollapsiblePanel from '../components/shared/CollapsiblePanel';
import PatternGrid from '../components/scales/PatternGrid';
import { Note, MajorScaleKey, DisplayMode, ScaleType, ViewMode, PatternSystemType } from '../types';
import { noteColors, standardTuning } from '../constants';
import { createScale, getScaleNotesOnFretboard, shouldHighlightNote, createCustomNoteDisplay } from '../utils/scaleUtils';

const ScalePage = () => {
  // Basic settings
  const [numFrets, setNumFrets] = useState<number>(12);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Scale specific state
  const [selectedKey, setSelectedKey] = useState<MajorScaleKey>('C');
  const [selectedScaleType, setSelectedScaleType] = useState<ScaleType>('major');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('notes');
  const [viewMode, setViewMode] = useState<ViewMode>('fretboard');
  const [patternSystem, setPatternSystem] = useState<PatternSystemType>('3nps');
  const [selectedStrings, setSelectedStrings] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [minFret, setMinFret] = useState<number>(0);
  const [maxFret, setMaxFret] = useState<number>(12);
  const [notesToHighlight, setNotesToHighlight] = useState<Note[]>([]);

  // Create the current scale
  const currentScale = useMemo(() => {
    return createScale(selectedKey, selectedScaleType);
  }, [selectedKey, selectedScaleType]);

  // Create custom note display for proper sharp/flat notation
  const customNoteDisplay = useMemo(() => {
    return createCustomNoteDisplay(selectedKey, selectedScaleType);
  }, [selectedKey, selectedScaleType]);

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
        <div className="flex-grow md:w-2/3 bg-gray-50 p-2 md:p-4">
          <div className="h-full flex items-center justify-center">
            {viewMode === 'fretboard' ? (
              <Fretboard
                numFrets={numFrets}
                strings={standardTuning}
                selectedNotes={notesToHighlight}
                useFlats={false}
                noteColors={noteColors}
                displayMode={displayMode}
                intervals={currentScale.intervals}
                customNoteDisplay={customNoteDisplay}
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
            ) : (
              <PatternGrid
                selectedKey={selectedKey}
                scaleType={selectedScaleType}
                displayMode={displayMode}
                patternSystem={patternSystem}
              />
            )}
          </div>
        </div>

        {/* Right Side - Controls */}
        <div className="
          w-full md:w-1/3 md:min-w-[320px] bg-white
          border-t md:border-t-0 md:border-l border-gray-200 p-4 md:p-6
          flex flex-col gap-4 overflow-y-auto
        ">

            {viewMode === 'fretboard' && (
              <CollapsiblePanel title="Fretboard Settings" defaultOpen={true}>
                <FretboardSettings
                  numFrets={numFrets}
                  onFretsChange={handleFretsChange}
                />
              </CollapsiblePanel>
            )}

            <CollapsiblePanel title="Scale Selector" defaultOpen={true}>
              <ScaleSelector
                selectedKey={selectedKey}
                onSelectKey={setSelectedKey}
                selectedScaleType={selectedScaleType}
                onSelectScaleType={setSelectedScaleType}
                displayMode={displayMode}
                onToggleDisplayMode={toggleDisplayMode}
                scale={currentScale}
                onShowTips={() => setShowTipsModal(true)}
                viewMode={viewMode}
                onSelectViewMode={setViewMode}
                patternSystem={patternSystem}
                onSelectPatternSystem={setPatternSystem}
              />
            </CollapsiblePanel>

            {viewMode === 'fretboard' && (
              <CollapsiblePanel title="String & Fret Filter" defaultOpen={true}>
                <div className="space-y-4">
                  <StringSelector
                    selectedStrings={selectedStrings}
                    onToggleString={handleToggleString}
                    onSelectAll={handleSelectAllStrings}
                    onClearAll={handleClearAllStrings}
                    strings={standardTuning}
                  />
                  <div className="border-t border-gray-200 pt-3">
                    <FretRangeSelector
                      minFret={minFret}
                      maxFret={maxFret}
                      totalFrets={numFrets}
                      onMinFretChange={handleMinFretChange}
                      onMaxFretChange={handleMaxFretChange}
                    />
                  </div>
                </div>
              </CollapsiblePanel>
            )}
          </div>
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

export default ScalePage;