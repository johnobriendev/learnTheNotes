// src/components/ScaleSelector.tsx
import { useState } from 'react';
import { MajorScaleKey, DisplayMode, Scale, ScaleType } from '../types';
import { scaleKeys } from '../utils/scaleUtils';

interface ScaleSelectorProps {
  selectedKey: MajorScaleKey;
  onSelectKey: (key: MajorScaleKey) => void;
  selectedScaleType: ScaleType;
  onSelectScaleType: (type: ScaleType) => void;
  displayMode: DisplayMode;
  onToggleDisplayMode: () => void;
  scale: Scale;
  onShowTips: () => void;
}

const ScaleSelector: React.FC<ScaleSelectorProps> = ({
  selectedKey,
  onSelectKey,
  selectedScaleType,
  onSelectScaleType,
  displayMode,
  onToggleDisplayMode,
  scale,
  onShowTips
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Key and Scale Type Selectors - Compact Layout */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Key Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 flex-shrink-0">
              Key:
            </label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white border border-gray-300 rounded-md px-2 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 min-w-[80px]"
              >
                <span className="font-medium">{selectedKey}</span>
                <span className="ml-1 text-xs">
                  {isOpen ? '▲' : '▼'}
                </span>
              </button>

              {isOpen && (
                <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto min-w-[80px]">
                  {scaleKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        onSelectKey(key);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 text-sm hover:bg-gray-50 ${
                        key === selectedKey ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Display Mode Toggle */}
          <button
            onClick={onToggleDisplayMode}
            className={`py-1.5 px-2 rounded-md border font-medium transition-colors min-w-[80px] text-sm ${
              displayMode === 'notes'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {displayMode === 'notes' ? 'Notes' : 'Intervals'}
          </button>
        </div>

        {/* Scale Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scale Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectScaleType('major')}
              className={`py-1.5 px-2 rounded-md border font-medium transition-colors text-sm ${
                selectedScaleType === 'major'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Major
            </button>
            <button
              onClick={() => onSelectScaleType('melodic-minor')}
              className={`py-1.5 px-2 rounded-md border font-medium transition-colors text-sm ${
                selectedScaleType === 'melodic-minor'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Melodic Minor
            </button>
          </div>
        </div>
      </div>


      {/* Scale Information */}
      <div className="bg-gray-50 p-3 rounded-md">
        <h4 className="font-medium text-gray-900 mb-2">
          {selectedKey} {selectedScaleType === 'major' ? 'Major' : 'Melodic Minor'}
        </h4>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Notes:</span> {scale.displayNotes.join(' - ')}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pattern:</span> {selectedScaleType === 'major' ? 'W-W-H-W-W-W-H' : 'W-H-W-W-W-W-H'}
        </p>
      </div>

      {/* Tips Button */}
      <button
        onClick={onShowTips}
        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors text-sm font-medium"
      >
        💡 Tips for Learning Scales
      </button>
    </div>
  );
};

export default ScaleSelector;