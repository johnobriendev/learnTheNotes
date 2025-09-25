// src/pages/KeysPage.tsx
import { useState, useEffect, useCallback } from 'react';
import CircleOfFifths from '../components/CircleOfFifths';
import KeyInfo from '../components/KeyInfo';
import KeyQuiz from '../components/KeyQuiz';
import TipsModal from '../components/TipsModal';
import CollapsiblePanel from '../components/CollapsiblePanel';
import { MajorScaleKey, KeyType } from '../types';

const SIDEBAR_STORAGE_KEY = 'keys_sidebarOpen';

const KeysPage = () => {
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<MajorScaleKey | null>('C');
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
  const handleKeySelect = useCallback((key: MajorScaleKey, type: KeyType) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col lg:flex-row relative h-full">
        {/* Left Side - Circle of Fifths */}
        <div
          className={`
            transition-all duration-300 ease-in-out bg-gray-50
            flex-grow w-full h-full p-4 lg:p-6
            ${sidebarOpen ? 'lg:w-1/2' : 'lg:w-full'}
          `}
        >
          {/* Toggle button for desktop when controls are hidden */}
          {!sidebarOpen && (
            <div className="hidden lg:block absolute top-4 right-4 z-10">
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

          {/* Mobile-only toggle button */}
          <div className="lg:hidden w-full flex justify-center mt-4">
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
            w-full lg:w-1/2 lg:min-w-[400px] bg-white
            border-t lg:border-t-0 lg:border-l border-gray-200 p-4 lg:p-6
            flex flex-col gap-4 overflow-y-auto relative
          ">
            {/* Desktop toggle button */}
            <div className="hidden lg:block">
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

            {/* Key Information Panel */}
            <CollapsiblePanel title="Key Information" defaultOpen={true}>
              <KeyInfo
                selectedKey={selectedKey}
                selectedType={selectedType}
              />
            </CollapsiblePanel>

            {/* Quiz Panel */}
            <CollapsiblePanel title="Key Signature Quiz" defaultOpen={false}>
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