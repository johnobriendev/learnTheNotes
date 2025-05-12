

interface FretboardSettingsProps {
  numFrets: number;
  onFretsChange: (frets: number) => void;
  useFlats: boolean;
  onFlatsToggle: () => void;
}

const FretboardSettings = ({ 
  numFrets, 
  onFretsChange, 
  useFlats, 
  onFlatsToggle 
}: FretboardSettingsProps) => {
  
  // Possible fret count options
  const fretOptions = [12, 15, 20, 22, 24];
  
  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md mb-4">
      <h3 className="text-lg font-bold mb-4">Fretboard Settings</h3>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Fret count selector */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Number of Frets:</label>
          <div className="flex gap-2">
            {fretOptions.map(option => (
              <button
                key={`fret-option-${option}`}
                className={`px-3 py-1 rounded-md text-sm ${
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
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Notation:</label>
          <button
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 flex items-center gap-1 text-sm"
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