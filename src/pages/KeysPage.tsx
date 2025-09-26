// src/pages/KeysPage.tsx
import { useState, useEffect, useCallback } from 'react';
import CircleOfFifths from '../components/CircleOfFifths';
import KeyInfo from '../components/KeyInfo';
import KeyQuiz from '../components/KeyQuiz';
import TipsModal from '../components/TipsModal';
import CollapsiblePanel from '../components/CollapsiblePanel';
import { KeyName, KeyType } from '../types';

const SIDEBAR_STORAGE_KEY = 'keys_sidebarOpen';

const KeysPage = () => {
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<KeyName | null>('C');
  const [selectedType, setSelectedType] = useState<KeyType>('major');

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

  // Handle key selection from circle of fifths
  const handleKeySelect = useCallback((key: KeyName, type: KeyType) => {
    setSelectedKey(key);
    setSelectedType(type);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Clean up modal state on unmount
  useEffect(() => {
    return () => {
      setShowTipsModal(false);
    };
  }, []);

  return (
    <div className="rounded-lg shadow-md h-full">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col relative h-full min-h-screen">
        {/* Circle of Fifths */}
        <div className="bg-gray-50 p-4">
          <div className="flex items-center justify-center">
            <CircleOfFifths
              selectedKey={selectedKey}
              selectedType={selectedType}
              onKeySelect={handleKeySelect}
            />
          </div>

          {/* Mobile toggle button */}
          <div className="w-full flex justify-center mt-4">
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

        {/* Mobile Controls */}
        {sidebarOpen && (
          <div className="bg-white border-t border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto">
            <CollapsiblePanel title="Key Information" defaultOpen={true}>
              <KeyInfo
                selectedKey={selectedKey}
                selectedType={selectedType}
              />
            </CollapsiblePanel>

            <CollapsiblePanel title="Key Signature Quiz" defaultOpen={true}>
              <KeyQuiz
                onShowTips={() => setShowTipsModal(true)}
              />
            </CollapsiblePanel>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col h-full min-h-screen">
        {/* Top Row - Circle of Fifths and Key Information */}
        <div className="flex flex-row min-h-[60vh] flex-shrink-0">
          {/* Circle of Fifths - Flexible Width */}
          <div className={`bg-gray-50 p-4 min-h-full flex-1 ${sidebarOpen ? 'max-w-[60%]' : ''}`}>
            {/* Toggle button for desktop when controls are hidden */}
            {!sidebarOpen && (
              <div className="absolute top-4 right-4 z-10">
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

            <div className="h-full flex items-center justify-center">
              <CircleOfFifths
                selectedKey={selectedKey}
                selectedType={selectedType}
                onKeySelect={handleKeySelect}
              />
            </div>
          </div>

          {/* Key Information - Flexible Width */}
          {sidebarOpen && (
            <div className="flex-1 min-w-[40%] bg-white border-l border-gray-200 p-6">
              {/* Desktop toggle button */}
              <div className="mb-4">
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

              <CollapsiblePanel title="Key Information" defaultOpen={true}>
                <KeyInfo
                  selectedKey={selectedKey}
                  selectedType={selectedType}
                />
              </CollapsiblePanel>
            </div>
          )}
        </div>

        {/* Bottom Row - Quiz (full width) */}
        {sidebarOpen && (
          <div className="bg-white border-t border-gray-200 p-6">
            <CollapsiblePanel title="Key Signature Quiz" defaultOpen={true}>
              <KeyQuiz
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
          tipType="keys"
        />
      )}
    </div>
  );
};

export default KeysPage;