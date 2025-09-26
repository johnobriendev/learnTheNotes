import { FretboardSettingsProps } from '../types';
import { fretCountOptions } from '../constants';


const FretboardSettings = ({ 
  numFrets, 
  onFretsChange, 

}: FretboardSettingsProps) => {
  

  return (
    <div className="p-2">
      
      <div className="space-y-3">
        {/* Fret count selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 flex-shrink-0">Frets:</label>
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
        
        
      </div>
    </div>
  );
};

export default FretboardSettings;