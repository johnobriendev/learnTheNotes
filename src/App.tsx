import { useState } from 'react'
import FretboardSettings from './components/FretBoardSettings';
import Fretboard from './components/FretBoard';
import { Note } from './types';
import { allNotes, noteColors, sharpToFlat, standardTuning } from './constants';
import { displayNote } from './utils';

const App = () => {



  
 
  const [numFrets, setNumFrets] = useState<number>(12);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);


  // Toggle note selection
  const toggleNote = (note: Note): void => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
      setAllSelected(false);
    } else {
      setSelectedNotes([...selectedNotes, note]);
      if (selectedNotes.length + 1 === allNotes.length) {
        setAllSelected(true);
      }
    }
  };

  // Toggle all notes
  const toggleAllNotes = (): void => {
    if (allSelected) {
      setSelectedNotes([]);
      setAllSelected(false);
    } else {
      setSelectedNotes([...allNotes]);
      setAllSelected(true);
    }
  };

   const handleFretsChange = (count: number): void => {
    setNumFrets(count);
  };

  // Toggle flats/sharps
  const toggleFlats = (): void => {
    setUseFlats(!useFlats);
  };

  // Clear all selected notes
  const clearSelection = (): void => {
    setSelectedNotes([]);
    setAllSelected(false);
  };

  return (
    <div className="flex flex-col w-full h-screen gap-8 p-4 bg-gray-100">
      {/* Guitar Neck - Left Side */}

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        Learn the Notes
      </h1>

      <FretboardSettings 
        numFrets={numFrets}
        onFretsChange={handleFretsChange}
        useFlats={useFlats}
        onFlatsToggle={toggleFlats}
      />
      
      <div className="flex flex-col md:flex-row gap-8 justify-around">
        <div className=" order-2 md:order-1">
          <Fretboard
            numFrets={numFrets}
            strings={standardTuning}
            selectedNotes={selectedNotes}
            useFlats={useFlats}
            noteColors={noteColors}
            sharpToFlat={sharpToFlat}
          />
        </div>



        {/* Right Side - Note Buttons and Tips */}
        <div className="w-full md:w-96 order-1 md:order-2 flex flex-col gap-6">
          {/* Note Buttons Section */}
          <div className="p-4 bg-gray-50 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select Notes</h3>

              {/* ADD THIS: Sharps/Flats toggle button */}
              <button
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 flex items-center gap-1 text-sm"
                onClick={() => setUseFlats(!useFlats)}
              >
                {useFlats ? '♭ Flats' : '♯ Sharps'}
              </button>
            </div>
            <div className="buttons-grid grid grid-cols-3 gap-2 w-full">
              {allNotes.map(note => (
                <button
                  key={`btn-${note}`}
                  className={`px-4 py-2 rounded-md font-medium ${selectedNotes.includes(note)
                    ? `${noteColors[note]} text-white`
                    : 'bg-gray-200'
                    }`}
                  onClick={() => toggleNote(note)}
                >
                  {displayNote(note, useFlats)}

                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                className={`w-full px-4 py-2 rounded-md ${allSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}
                onClick={toggleAllNotes}
              >
                {allSelected ? "Deselect All" : "Select All"}
              </button>

              {selectedNotes.length > 0 && (
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={clearSelection}
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-4 bg-blue-50 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">How to Use</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Click on any note button to see where it appears on the fretboard</li>
              <li>Use "Select All" to see all note positions at once</li>
              <li>The colored dots show the selected notes on each string and fret</li>
              <li>Open string positions appear above the fretboard</li>
              <li>Toggle between sharps (♯) and flats (♭) notation using the button next to "Select Notes"</li>
            </ul>
            <button
              onClick={() => setShowTipsModal(true)}
              className="mt-4 w-full px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200 transition-colors"
            >
              Tips for Learning
            </button>
          </div>
        </div>
      </div>
      {showTipsModal && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowTipsModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Tips for Learning the Fretboard</h2>
                <button
                  onClick={() => setShowTipsModal(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-gray-700 space-y-4">
                
                <p>
                  Learning the fretboard takes time but doesn't need to be difficult. Every guitar player views the fretboard in a different way, and this page is meant to be used as a tool to help learning guitarists learn all the notes on the guitar and develop their own vision of the fretboard.
                </p>
                <p>
                  Learning the notes on the fretboard with no other context can be tedious, therefore aimlessly memorizing the notes isn't recommended for new players. 
                </p>
                <p>Soon this guide will include more tips for studying and how a guitarist can use scales and triads to help them visualize the fretboard. For now use it as an opportunity to explore the fretboard and see the visual relationships between the notes.</p>

                

                <h3 className="text-lg font-semibold">Some recommendations</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Start with C. Learn what fret it is on for all 6 strings.</li>
                  <li>After that pick another note like G or D. The idea is to start forming spacial relationships between notes. Don't overwhelm youself.</li>
                  <li>Pay attention to how many frets you need to move up or down to find the same note when you move to the next string.</li>
                  <li>Look at the relationship between where a note is and where it is two strings away.</li>
                  <li>A great exersice is to take the notes from the C major scale and learn them on one of the top strings (B or E).</li>
                  <li>Learn all the notes from a scale on two adjacent strings and examine how playing the same note on two different strings could open up more possibilities in your playing.</li>
                  <li>Use the dots on the fretboard to help you. They are there to act as another reference point while you learn.</li>
                </ul>

                
              </div>

              <button
                onClick={() => setShowTipsModal(false)}
                className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App