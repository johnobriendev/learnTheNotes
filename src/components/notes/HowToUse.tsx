// src/components/HowToUse.tsx
import { HowToUseProps } from "../../types";

const HowToUse: React.FC<HowToUseProps> = ({ 
  onShowTips,
  tipType = 'notes' // Default value
}) => {
  // Render different content based on tipType
  const renderContent = () => {
    switch (tipType) {
      case 'triads':
        return (
          <>
            <h3 className="text-lg font-bold mb-4">How to Use Triads</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Select a root note and chord quality to see the triad</li>
              <li>Choose a string set to focus on specific strings</li>
              <li>The colored dots show the intervals (R, 3, 5) of the triad</li>
              <li>Toggle between sharps and flats using the notation button</li>
            </ul>
          </>
        );
      
      case 'scales':
        return (
          <>
            <h3 className="text-lg font-bold mb-4">How to Use Scales</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Coming soon...</li>
            </ul>
          </>
        );
      
      case 'notes':
      default:
        return (
          <>
            <h3 className="text-lg font-bold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Click on any note button in "Note Selection" to see where it appears on the fretboard</li>
              <li>Use "Select All" to see all note positions at once</li>
              <li>Select the number of frets in "Fretboard Settings" depending on the guitar you have</li>
              <li>Toggle between sharps (♯) and flats (♭) notation using the button in settings</li>
              <li>Try out a quiz to test your knowledge</li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="p-4 ">
      {renderContent()}
      <button
        onClick={onShowTips}
        className="mt-4 w-full px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors"
      >
        {tipType === 'triads' ? 'Triad Tips' : 
         tipType === 'scales' ? 'Scale Tips' : 
         'Tips for Learning'}
      </button>
    </div>
  );
};

export default HowToUse;