import { FretboardSettingsProps } from '../types';
import { fretCountOptions } from '../constants';


const FretboardSettings = ({ 
  numFrets, 
  onFretsChange, 
  useFlats, 
  onFlatsToggle 
}: FretboardSettingsProps) => {
  

  return (
    <div className="p-3 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">Fretboard Settings</h3>
      
      <div className="space-y-3">
        {/* Fret count selector */}
        <div>
          <label className="text-sm text-gray-700 block mb-1">Frets:</label>
          <div className="flex flex-wrap gap-1">
            {fretCountOptions.map(option => (
              <button
                key={`fret-option-${option}`}
                className={`px-2 py-1 rounded-md text-xs ${
                  numFrets === option 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => onFretsChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sharps/Flats toggle */}
        <div>
          <label className="text-sm text-gray-700 block mb-1">Notation:</label>
          <button
            className="px-3 py-1 w-full bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
            onClick={onFlatsToggle}
          >
            {useFlats ? '♭ Flats' : '♯ Sharps'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FretboardSettings;