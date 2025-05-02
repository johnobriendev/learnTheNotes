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
    <div className="flex flex-col md:flex-row w-full h-screen gap-8 p-4 md:p-12 justify-around">
      {/* Guitar Neck - Left Side */}
      <div className="guitar-neck-container order-2 md:order-1">
        <div className="guitar-neck bg-white rounded-md p-8 shadow-md h-full flex justify-center">
          <div className="fretboard-wrapper">
            
            {/* Fretboard */}
            <div className="relative flex">
              {/* Fret numbers column */}
              <div className="w-10 mr-4 relative">
                {frets.map(fret => (
                  <div 
                    key={`fret-num-${fret}`} 
                    className="absolute right-4 text-gray-600 text-sm"
                    style={{ 
                      top: `${((fret * 100) / frets.length) + (100 / (frets.length * 2))}%`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    {fret === 0 ? "Open" : fret}
                  </div>
                ))}
              </div>
              
              {/* Main fretboard area */}
              <div className="relative w-64">
                {/* String Labels - positioned above the fretboard */}
                <div className="absolute w-full -top-6">
                  {strings.map((string, index) => (
                    <div 
                      key={`string-label-${index}`} 
                      className="absolute font-bold text-gray-700"
                      style={{ 
                        left: `${(index * 100) / (strings.length - 1)}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      {string}
                    </div>
                  ))}
                </div>
                
                <div className="relative" style={{ height: `${3.5 * frets.length}rem` }}>
                  {/* Strings - vertical lines */}
                  {strings.map((_, stringIndex) => (
                    <div 
                      key={`string-${stringIndex}`}
                      className="absolute bottom-0 bg-slate-600"
                      style={{ 
                        left: `${(stringIndex * 100) / (strings.length - 1)}%`,
                        width: '1px',
                        top: `${100 / frets.length}%`
                      }}
                    />
                  ))}
                  
                  {/* Frets - horizontal lines */}
                  {frets.map((fret) => (
                    fret > 0 && (
                      <div 
                        key={`fret-${fret}`} 
                        className="absolute w-full bg-slate-600"
                        style={{ 
                          top: `${(fret * 100) / frets.length}%`,
                          height: '1px'
                        }}
                      />
                    )
                  ))}
                  
                  {/* Bottom fret line */}
                  <div 
                    className="absolute w-full bg-slate-600"
                    style={{ 
                      bottom: '0',
                      height: '1px'
                    }}
                  />
                  
                  {/* Notes on strings */}
                  {frets.map((fret) => (
                    strings.map((string, stringIndex) => {
                      const { highlighted, color, note } = highlightInfo(string, fret);
                      
                      if (!highlighted) return null;
                      
                      return (
                        <div 
                          key={`note-${stringIndex}-${fret}`}
                          className={`absolute w-6 h-6 rounded-full flex items-center justify-center ${color} text-white font-bold shadow-lg text-xs`}
                          style={{ 
                            left: `${(stringIndex * 100) / (strings.length - 1)}%`,
                            top: fret === 0 
                              ? `${(50 / frets.length)}%`
                              : `${((fret * 100) / frets.length) + (100 / (frets.length * 2))}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {note}
                        </div>
                      );
                    })
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Note Buttons and Tips */}
      <div className="w-full md:w-96 order-1 md:order-2 flex flex-col gap-6">
        {/* Note Buttons Section */}
        <div className="p-4 bg-gray-50 rounded-md shadow-md">
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
        
        {/* Tips Section */}
        <div className="p-4 bg-blue-50 rounded-md shadow-md">
          <h3 className="text-lg font-bold mb-4">How to Use</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Click on any note button to see where it appears on the fretboard</li>
            <li>Select multiple notes to visualize scales, chords, or intervals</li>
            <li>Use "Select All" to see all note positions at once</li>
            <li>The colored dots show the selected notes on each string and fret</li>
            <li>Open string positions appear above the fretboard</li>
            <li>Use this tool to learn note positions and understand fretboard patterns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App