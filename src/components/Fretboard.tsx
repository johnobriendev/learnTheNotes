import { Note, FretboardProps} from '../types';
import { displayNote, getHighlightInfo, getNoteAtPosition } from '../utils/utils';
import { stringSetToIndices } from '../utils/stringSetUtils';

const Fretboard: React.FC<FretboardProps> = ({
  numFrets,
  strings,
  selectedNotes,
  useFlats,
  noteColors,
  displayMode = 'notes', 
  intervals,
  selectedStringSet = 'All',
  quizState = 'idle',
  currentQuestion,
  userAnswers = [],
  incorrectPositions = [],
  showFeedback = false,
  onFretboardClick
}) => {
  const frets: number[] = Array.from({ length: numFrets + 1 }, (_, i) => i);

  const visibleStringIndices = stringSetToIndices(selectedStringSet);

  const singleDotFrets = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleDotFrets = [12, 24];


  const getNoteDisplay = (note: Note): string => {
    // If in interval mode and we have an interval name for this note
    if (displayMode === 'intervals' && intervals && note in intervals) {
      return intervals[note];
    }
    
    // Default to regular note display
    return displayNote(note, useFlats);
  };

  // Quiz-specific logic
  const getQuizHighlightInfo = (stringIndex: number, fret: number) => {
    if (quizState !== 'active' || !currentQuestion) return null;
    
    const note = getNoteAtPosition(strings[stringIndex], fret);
    
    if (currentQuestion.mode === 'find-note') {
      const isUserSelected = userAnswers.some(answer => 
        answer.string === stringIndex && answer.fret === fret
      );
      
      // Check if this is a correct position (from the question's correct answers)
      const isCorrectPosition = currentQuestion.correctPositions?.some(pos => 
        pos.string === stringIndex && pos.fret === fret
      ) || false;
      
      // Check if this is one of the user's incorrect selections
      const isUserIncorrect = incorrectPositions.some(pos => 
        pos.string === stringIndex && pos.fret === fret
      );
      
      let color = '';
      let highlighted = false;
      
      if (isUserIncorrect) {
        // User selected this position but it's incorrect
        color = 'bg-red-500';
        highlighted = true;
      } else if (isCorrectPosition && showFeedback) {
        // This is a correct position, but only show it during feedback
        color = 'bg-green-500';
        highlighted = true;
      } else if (isUserSelected) {
        // User selected this position but it's not in feedback mode yet
        color = 'bg-blue-500';
        highlighted = true;
      }
      
      return {
        highlighted,
        note,
        color,
        clickable: true, // All positions are clickable in find-note mode
        isUserSelected,
        showNoteName: showFeedback // Show note names only during feedback
      };
    } else if (currentQuestion.mode === 'name-note') {
      // Highlight only the target position
      const isTargetPosition = currentQuestion.targetPosition?.string === stringIndex && 
                              currentQuestion.targetPosition?.fret === fret;
      
      return {
        highlighted: isTargetPosition,
        note,
        color: isTargetPosition ? 'bg-yellow-400' : '',
        clickable: false,
        isUserSelected: false,
        showNoteName: false // Don't show note names in name-note mode
      };
    }
    
    return null;
  };

  const handlePositionClick = (stringIndex: number, fret: number) => {
    if (onFretboardClick && quizState === 'active' && currentQuestion?.mode === 'find-note') {
      onFretboardClick(stringIndex, fret);
    }
  };



  return (
    <div className="bg-white rounded-md p-8 pr-16 shadow-lg h-full flex justify-center items-center">
      <div className="relative flex self-center">
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
            {/* Fretboard position markers (dots) */}
            {frets.map((fret) => {
              // Skip frets that don't need dots
              if (!singleDotFrets.includes(fret) && !doubleDotFrets.includes(fret)) {
                return null;
              }

              if (singleDotFrets.includes(fret)) {
                // Single dot - between D and G strings (strings index 2 and 3)
                const leftPosition = ((2.5 * 100) / (strings.length - 1)) + '%';
                return (
                  <div
                    key={`marker-${fret}`}
                    className="absolute bg-gray-300 rounded-full w-3 h-3"
                    style={{
                      left: leftPosition,
                      top: `${((fret * 100) / frets.length) + (50 / frets.length)}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1
                    }}
                  />
                );
              }

              if (doubleDotFrets.includes(fret)) {
                // Double dots - outside D and G strings (at strings index 1 and 4)
                return (
                  <>
                    <div
                      key={`marker-${fret}-1`}
                      className="absolute bg-gray-300 rounded-full w-3 h-3"
                      style={{
                        left: `${(1.5 * 100) / (strings.length - 1)}%`,
                        top: `${((fret * 100) / frets.length) + (50 / frets.length)}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                      }}
                    />
                    <div
                      key={`marker-${fret}-2`}
                      className="absolute bg-gray-300 rounded-full w-3 h-3"
                      style={{
                        left: `${(3.5 * 100) / (strings.length - 1)}%`,
                        top: `${((fret * 100) / frets.length) + (50 / frets.length)}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1
                      }}
                    />
                  </>
                );
              }
              
              return null;
            })}
            
            
            
            
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

                if (!visibleStringIndices.includes(stringIndex)) return null;
                
                // Use quiz highlighting if in quiz mode, otherwise use normal highlighting
                let highlightInfo;
                let showNoteName = true;
                let shouldRender = false;
                
                if (quizState === 'active' && currentQuestion) {
                  const quizInfo = getQuizHighlightInfo(stringIndex, fret);
                  if (quizInfo) {
                    highlightInfo = {
                      highlighted: quizInfo.highlighted,
                      color: quizInfo.color,
                      note: quizInfo.note
                    };
                    showNoteName = quizInfo.showNoteName !== false;
                    shouldRender = true; // Always render in quiz mode for clickability
                  } else {
                    // In find-note mode, render invisible clickable areas
                    if (currentQuestion.mode === 'find-note') {
                      highlightInfo = {
                        highlighted: false,
                        color: 'bg-transparent',
                        note: getNoteAtPosition(string, fret)
                      };
                      showNoteName = false;
                      shouldRender = true;
                    }
                  }
                } else {
                  const normalInfo = getHighlightInfo(string, fret, selectedNotes, noteColors, intervals);
                  if (normalInfo.highlighted) {
                    highlightInfo = normalInfo;
                    shouldRender = true;
                  }
                }

                if (!shouldRender || !highlightInfo) return null;

                return (
                  <div
                    key={`note-${stringIndex}-${fret}`}
                    className={`absolute w-6 h-6 rounded-full flex items-center justify-center ${highlightInfo.color} text-white font-bold shadow-lg text-xs ${
                      quizState === 'active' && currentQuestion?.mode === 'find-note'
                        ? 'cursor-pointer hover:opacity-80' 
                        : ''
                    }`}
                    style={{
                      left: `${(stringIndex * 100) / (strings.length - 1)}%`,
                      top: fret === 0
                        ? `${(50 / frets.length)}%`
                        : `${((fret * 100) / frets.length) + (100 / (frets.length * 2))}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handlePositionClick(stringIndex, fret)}
                  >
                    {showNoteName ? getNoteDisplay(highlightInfo.note as Note) : ''}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fretboard;