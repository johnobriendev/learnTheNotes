// src/components/MajorScaleSelector.tsx
import { useState } from 'react';
import { MajorScaleKey, DisplayMode, MajorScale } from '../types';
import { majorScaleKeys } from '../utils/majorScaleUtils';

interface MajorScaleSelectorProps {
  selectedKey: MajorScaleKey;
  onSelectKey: (key: MajorScaleKey) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
  scale: MajorScale;
  onShowTips: () => void;
}

const MajorScaleSelector: React.FC<MajorScaleSelectorProps> = ({
  selectedKey,
  onSelectKey,
  displayMode,
  onToggleDisplayMode,
  scale,
  onShowTips
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Key Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Key
        </label>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <span className="font-medium">{selectedKey} Major</span>
            <span className="float-right">
              {isOpen ? '▲' : '▼'}
            </span>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {majorScaleKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    onSelectKey(key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                    key === selectedKey ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  {key} Major
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Display Mode Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Mode
        </label>
        <button
          onClick={onToggleDisplayMode}
          className={`w-full py-2 px-4 rounded-md border font-medium transition-colors ${
            displayMode === 'notes'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {displayMode === 'notes' ? 'Showing Notes' : 'Showing Intervals (1-7)'}
        </button>
      </div>


      {/* Scale Information */}
      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">{selectedKey} Major Scale</h4>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Notes:</span> {scale.displayNotes.join(' - ')}
        </p>
        
      </div>

      {/* Tips Button */}
      <button
        onClick={onShowTips}
        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors text-sm font-medium"
      >
        💡 Tips for Learning Major Scales
      </button>
    </div>
  );
};

export default MajorScaleSelector;