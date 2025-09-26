import { StringSelectorProps } from '../types';

// Use standardTuning for default strings
const defaultStrings = ['E', 'A', 'D', 'G', 'B', 'E'];

const StringSelector: React.FC<StringSelectorProps> = ({
  selectedStrings,
  onToggleString,
  onSelectAll,
  onClearAll,
  strings = defaultStrings
}) => {
  const stringLabels = strings.map((note, index) => ({
    index,
    label: `${6 - index}(${note})`, // String 6 = index 0, String 1 = index 5
  }));

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Select Strings ({selectedStrings.length}/6)
        </span>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="text-xs text-indigo-600 hover:text-indigo-800"
          >
            All
          </button>
          <button
            onClick={onClearAll}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            None
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stringLabels.map(({ index, label }) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedStrings.includes(index)}
              onChange={() => onToggleString(index)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      {selectedStrings.length === 0 && (
        <p className="text-xs text-red-600">
          Please select at least one string to start the quiz.
        </p>
      )}
    </div>
  );
};

export default StringSelector;