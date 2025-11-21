// src/components/ScaleDiagram.tsx
import { ScalePattern, DisplayMode } from '../../types';
import { standardTuning } from '../../constants';

interface ScaleDiagramProps {
  pattern: ScalePattern;
  displayMode: DisplayMode;
}

const ScaleDiagram: React.FC<ScaleDiagramProps> = ({ pattern, displayMode }) => {
  // Calculate the fret range needed to show all notes
  const allFrets = pattern.strings.flat().map(note => note.fret);
  const minFret = Math.min(...allFrets);
  const maxFret = Math.max(...allFrets);
  const fretSpan = maxFret - minFret + 1;

  // Show at least 4 frets, but expand if needed to show all notes
  const numFretsToShow = Math.max(4, fretSpan);
  const frets = Array.from({ length: numFretsToShow }, (_, i) => minFret + i);

  return (
    <div className="bg-white rounded-md p-4 shadow-md">
      <div className="relative flex justify-center">
        {/* Fret numbers column */}
        <div className="w-8 mr-2 relative">
          {frets.map(fret => (
            <div
              key={`fret-num-${fret}`}
              className="absolute right-2 text-gray-600 text-xs"
              style={{
                top: `${((fret - minFret) * 100) / numFretsToShow + (100 / (numFretsToShow * 2))}%`,
                transform: 'translateY(-50%)'
              }}
            >
              {fret}
            </div>
          ))}
        </div>

        {/* Main fretboard area */}
        <div className="relative w-48">
          {/* String Labels - positioned above the fretboard */}
          <div className="absolute w-full -top-5">
            {standardTuning.map((string, index) => (
              <div
                key={`string-label-${index}`}
                className="absolute font-bold text-gray-700 text-xs"
                style={{
                  left: `${(index * 100) / 5}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {string}
              </div>
            ))}
          </div>

          <div className="relative" style={{ height: `${numFretsToShow * 2.5}rem` }}>
            {/* Fret lines */}
            {frets.map((fret) => (
              <div
                key={`fret-line-${fret}`}
                className="absolute w-full border-t border-gray-400"
                style={{
                  top: `${((fret - minFret) * 100) / numFretsToShow}%`
                }}
              />
            ))}

            {/* Bottom border */}
            <div className="absolute w-full border-t-2 border-gray-400" style={{ top: '100%' }} />

            {/* Strings (vertical lines) */}
            {standardTuning.map((_, stringIndex) => (
              <div
                key={`string-${stringIndex}`}
                className="absolute h-full border-l border-gray-300"
                style={{
                  left: `${(stringIndex * 100) / 5}%`
                }}
              />
            ))}

            {/* Notes */}
            {pattern.strings.map((stringNotes, stringIndex) =>
              stringNotes.map((note) => {
                const fretPosition = note.fret - minFret;
                return (
                  <div
                    key={`note-${stringIndex}-${note.fret}`}
                    className="absolute w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold shadow-md"
                    style={{
                      left: `${(stringIndex * 100) / 5}%`,
                      top: `${(fretPosition * 100) / numFretsToShow + (100 / (numFretsToShow * 2))}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10
                    }}
                  >
                    {displayMode === 'notes' ? note.displayNote : note.interval}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleDiagram;