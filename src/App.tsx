import { useState } from 'react'


const App = () => {
  // Standard tuning - E A D G B E (low to high)
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const frets = Array.from({ length: 13 }, (_, i) => i); // 0-12 frets (including open string)
  const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Color palette for selected notes
  const noteColors = {
    'C': 'bg-red-500',
    'C#': 'bg-red-600',
    'D': 'bg-orange-500',
    'D#': 'bg-orange-600',
    'E': 'bg-yellow-500',
    'F': 'bg-green-500',
    'F#': 'bg-green-600',
    'G': 'bg-blue-500',
    'G#': 'bg-blue-600',
    'A': 'bg-purple-500',
    'A#': 'bg-purple-600',
    'B': 'bg-pink-500'
  };
  
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  
  // Map of what note is at each position (string, fret)
  const getNoteAtPosition = (stringNote, fret) => {
    const startIndex = allNotes.indexOf(stringNote);
    return allNotes[(startIndex + fret) % 12];
  };
  
  // Check if a position should be highlighted and with what color
  const highlightInfo = (stringNote, fret) => {
    if (selectedNotes.length === 0) return { highlighted: false, color: '' };
    
    const noteAtPosition = getNoteAtPosition(stringNote, fret);
    if (selectedNotes.includes(noteAtPosition)) {
      return { 
        highlighted: true, 
        color: noteColors[noteAtPosition],
        note: noteAtPosition
      };
    }
    
    return { highlighted: false, color: '', note: '' };
  };
  
  // Toggle note selection
  const toggleNote = (note) => {
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
  const toggleAllNotes = () => {
    if (allSelected) {
      setSelectedNotes([]);
      setAllSelected(false);
    } else {
      setSelectedNotes([...allNotes]);
      setAllSelected(true);
    }
  };
  
  // Clear all selected notes
  const clearSelection = () => {
    setSelectedNotes([]);
    setAllSelected(false);
  };
  
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-8 p-4">
      {/* Guitar Neck - Left Side */}
      <div className="guitar-neck-container w-full md:w-3/4 order-2 md:order-1">
        <div className="guitar-neck bg-amber-100 rounded-md p-4 shadow-md">
          {/* String Labels (horizontally across the top) */}
          <div className="string-labels flex border-b border-gray-700 pb-2 mb-4">
            <div className="w-16 text-center font-bold">Fret</div>
            {strings.map((string, index) => (
              <div key={`string-label-${index}`} className="w-16 text-center font-bold">
                {string}
              </div>
            ))}
          </div>
          
          {/* Fretboard (frets going down vertically) */}
          <div className="fretboard">
            {frets.map(fret => (
              <div key={`fret-${fret}`} className="fret-row flex items-center h-12 border-b border-gray-300">
                {/* Fret Number or "Open" for fret 0 */}
                <div className="w-16 text-center font-medium">
                  {fret === 0 ? "Open" : fret}
                </div>
                
                {/* Notes at each string position */}
                {strings.map((string, stringIndex) => {
                  const { highlighted, color, note } = highlightInfo(string, fret);
                  
                  return (
                    <div 
                      key={`pos-${stringIndex}-${fret}`}
                      className={`w-16 h-12 flex items-center justify-center 
                        ${fret === 0 ? 'border-r-2 border-r-gray-800' : 'border border-gray-400'}`}
                    >
                      {highlighted ? (
                        <div className={`note-circle w-8 h-8 rounded-full flex items-center justify-center ${color} text-white font-bold`}>
                          {note}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Fret Markers (Inlays) */}
          <div className="fret-markers flex mt-2">
            {frets.map(fret => {
              if ([3, 5, 7, 9].includes(fret)) {
                return (
                  <div key={`marker-${fret}`} className="w-16 flex justify-center" style={{marginLeft: '5rem'}}>
                    <div className="rounded-full bg-gray-500 w-3 h-3"></div>
                  </div>
                );
              } else if (fret === 12) {
                return (
                  <div key={`marker-${fret}`} className="w-16 flex justify-center space-x-2" style={{marginLeft: '5rem'}}>
                    <div className="rounded-full bg-gray-500 w-3 h-3"></div>
                    <div className="rounded-full bg-gray-500 w-3 h-3"></div>
                  </div>
                );
              }
              return <div key={`marker-${fret}`} className="w-16" style={{marginLeft: '5rem'}}></div>;
            })}
          </div>
        </div>
      </div>
      
      {/* Note Buttons - Right Side */}
      <div className="note-buttons w-full md:w-1/4 p-4 bg-gray-50 rounded-md shadow-md order-1 md:order-2">
        <h3 className="w-full text-lg font-bold mb-4">Select Notes</h3>
        <div className="buttons-grid grid grid-cols-3 gap-2 w-full">
          {allNotes.map(note => (
            <button
              key={`btn-${note}`}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedNotes.includes(note) 
                  ? `${noteColors[note]} text-white` 
                  : 'bg-gray-200'
              }`}
              onClick={() => toggleNote(note)}
            >
              {note}
            </button>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col gap-2">
          <button
            className={`w-full px-4 py-2 rounded-md ${
              allSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
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
    </div>
  );
};



export default App
