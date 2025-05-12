import React from 'react';
import { StringSet } from '../types';

interface StringSetSelectorProps {
  selectedSet: StringSet;
  onSelectSet: (set: StringSet) => void;
}

const StringSetSelector: React.FC<StringSetSelectorProps> = ({ 
  selectedSet, 
  onSelectSet 
}) => {
  const stringSets: StringSet[] = ['All', '1-2-3', '2-3-4', '3-4-5', '4-5-6'];
  
  return (
    <div className="p-3 bg-gray-50 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">String Sets</h3>
      <div className="flex flex-wrap gap-2">
        {stringSets.map(set => (
          <button
            key={set}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedSet === set 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onSelectSet(set)}
          >
            {set}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StringSetSelector;