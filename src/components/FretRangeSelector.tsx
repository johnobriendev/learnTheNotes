// src/components/FretRangeSelector.tsx
interface FretRangeSelectorProps {
  minFret: number;
  maxFret: number;
  totalFrets: number;
  onMinFretChange: (fret: number) => void;
  onMaxFretChange: (fret: number) => void;
}

const FretRangeSelector: React.FC<FretRangeSelectorProps> = ({
  minFret,
  maxFret,
  totalFrets,
  onMinFretChange,
  onMaxFretChange
}) => {
  const fretOptions = Array.from({ length: totalFrets + 1 }, (_, i) => i);

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700">
        Fret Range ({minFret} - {maxFret})
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Min Fret
          </label>
          <select
            value={minFret}
            onChange={(e) => onMinFretChange(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {fretOptions.filter(fret => fret <= maxFret).map(fret => (
              <option key={fret} value={fret}>
                {fret}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Max Fret
          </label>
          <select
            value={maxFret}
            onChange={(e) => onMaxFretChange(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {fretOptions.filter(fret => fret >= minFret).map(fret => (
              <option key={fret} value={fret}>
                {fret}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Only notes within frets {minFret}-{maxFret} will be highlighted
      </div>
    </div>
  );
};

export default FretRangeSelector;