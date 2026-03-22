// src/pages/guitar-lessons/TheGrid.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonLayout from '../../components/LessonLayout';

const STRING_DATA = [
  { name: 'E', number: 6 },
  { name: 'A', number: 5 },
  { name: 'D', number: 4 },
  { name: 'G', number: 3 },
  { name: 'B', number: 2 },
  { name: 'e', number: 1 },
];

const NUM_FRETS = 12;
const frets = Array.from({ length: NUM_FRETS + 1 }, (_, i) => i);
const SINGLE_DOT_FRETS = [3, 5, 7, 9];
const DOUBLE_DOT_FRETS = [12];
const ROW_HEIGHT = 3.2;
const totalHeight = ROW_HEIGHT * NUM_FRETS;

interface Selected {
  stringIndex: number;
  fret: number;
}

const GridDiagram = () => {
  const [selected, setSelected] = useState<Selected | null>(null);

  const handleClick = (stringIndex: number, fret: number) => {
    if (selected?.stringIndex === stringIndex && selected?.fret === fret) {
      setSelected(null);
    } else {
      setSelected({ stringIndex, fret });
    }
  };

  const selectedString = selected !== null ? STRING_DATA[selected.stringIndex] : null;

  return (
    <div className="bg-white rounded-md shadow-lg w-full flex flex-col items-center overflow-visible py-4">
      <div className="relative flex self-center py-2 md:py-4">
        {/* Fret numbers on the left */}
        <div
          className="absolute right-full mr-3 sm:mr-4 w-9 sm:w-10 flex-shrink-0"
          style={{ height: `${totalHeight}rem` }}
        >
          {frets.map(fret => (
            <div
              key={`fret-num-${fret}`}
              className="absolute right-0 text-gray-600 text-sm"
              style={{
                top: `${((fret * 100) / frets.length) + (100 / (frets.length * 2))}%`,
                transform: 'translateY(-50%)',
              }}
            >
              {fret === 0 ? 'Open' : fret}
            </div>
          ))}
        </div>

        {/* Main fretboard */}
        <div className="relative w-60 sm:w-64 flex-shrink-0">
          {/* String labels */}
          <div className="w-full pb-2.5">
            {STRING_DATA.map((s, index) => (
              <div
                key={`label-${index}`}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(index * 100) / (STRING_DATA.length - 1)}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="font-bold text-gray-500 leading-none">{s.number}</span>
                <span className="font-bold text-gray-700 leading-none">{s.name}</span>
              </div>
            ))}
          </div>

          {/* Fretboard body */}
          <div className="relative" style={{ height: `${totalHeight}rem` }}>
            {/* Position dots */}
            {frets.map(fret => {
              const topPct = `${((fret * 100) / frets.length) + (50 / frets.length)}%`;
              if (DOUBLE_DOT_FRETS.includes(fret)) {
                return (
                  <>
                    <div key={`dot-${fret}-1`} className="absolute bg-gray-300 rounded-full w-3 h-3" style={{ left: `${(1.5 * 100) / (STRING_DATA.length - 1)}%`, top: topPct, transform: 'translate(-50%, -50%)', zIndex: 1 }} />
                    <div key={`dot-${fret}-2`} className="absolute bg-gray-300 rounded-full w-3 h-3" style={{ left: `${(3.5 * 100) / (STRING_DATA.length - 1)}%`, top: topPct, transform: 'translate(-50%, -50%)', zIndex: 1 }} />
                  </>
                );
              }
              if (!SINGLE_DOT_FRETS.includes(fret)) return null;
              return (
                <div key={`dot-${fret}`} className="absolute bg-gray-300 rounded-full w-3 h-3" style={{ left: `${(2.5 * 100) / (STRING_DATA.length - 1)}%`, top: topPct, transform: 'translate(-50%, -50%)', zIndex: 1 }} />
              );
            })}

            {/* String vertical lines */}
            {STRING_DATA.map((_, i) => (
              <div
                key={`string-${i}`}
                className="absolute bottom-0 bg-slate-600"
                style={{
                  left: `${(i * 100) / (STRING_DATA.length - 1)}%`,
                  width: '1px',
                  top: `${100 / frets.length}%`,
                }}
              />
            ))}

            {/* Nut */}
            <div
              className="absolute w-full bg-slate-800"
              style={{ top: `${100 / frets.length}%`, height: '3px', transform: 'translateY(-1px)' }}
            />

            {/* Fret lines */}
            {frets.map(fret =>
              fret > 0 ? (
                <div
                  key={`fret-${fret}`}
                  className="absolute w-full bg-slate-600"
                  style={{ top: `${(fret * 100) / frets.length}%`, height: '1px' }}
                />
              ) : null
            )}

            {/* Bottom line */}
            <div className="absolute w-full bg-slate-600" style={{ bottom: 0, height: '1px' }} />

            {/* Clickable cells */}
            {frets.map(fret =>
              STRING_DATA.map((_, si) => {
                const isSelected = selected?.stringIndex === si && selected?.fret === fret;
                return (
                  <div
                    key={`cell-${si}-${fret}`}
                    onClick={() => handleClick(si, fret)}
                    className="absolute cursor-pointer flex items-center justify-center"
                    style={{
                      left: `${(si * 100) / (STRING_DATA.length - 1)}%`,
                      top: fret === 0
                        ? `${50 / frets.length}%`
                        : `${((fret * 100) / frets.length) + (100 / (frets.length * 2))}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '1.75rem',
                      height: '1.75rem',
                      zIndex: 10,
                    }}
                  >
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 shadow-lg" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Position label */}
      <div
        className="mt-3 h-10 flex items-center justify-center text-sm font-semibold px-4 text-center"
        style={{ color: '#153243' }}
      >
        {selected && selectedString ? (
          <>
            <span className="text-blue-500 mr-1">●</span>
            {`${selectedString.name} string (${selectedString.number}), fret ${selected.fret === 0 ? 'open' : selected.fret}`}
          </>
        ) : (
          <span className="text-gray-400 font-normal">Click any position on the fretboard</span>
        )}
      </div>
    </div>
  );
};

const TheGrid = () => {
  const navigate = useNavigate();
  const textContent = (
    <>
      <p className="mb-4">
        The fretboard is a grid. Strings run vertically, frets run horizontally. Any note position
        can be described using two things: the <strong>string</strong> and the <strong>fret number</strong>.
      </p>

      <p className="mb-3">Some examples:</p>
      <ul className="mb-6 space-y-2">
        <li><strong>4th fret, A string</strong></li>
        <li><strong>B string, 10th fret</strong></li>
        <li><strong>7th fret, 2nd string</strong></li>
        <li><strong>3rd string, 9th fret</strong></li>
      </ul>

      <p className="mb-4">
        All of these ways of saying it are common. Try clicking positions on the fretboard diagram
        to see how each one is described. See if you can find the examples given on the interactive fretboard.
      </p>
      <p>
        Want to explore further?{' '}
        <button
          onClick={() => navigate('/notes')}
          className="underline font-semibold hover:opacity-70 transition-opacity"
          style={{ color: '#284b63' }}
        >
          Learn the Notes
        </button>
        {' '}lets you visualize every note across the full fretboard.
      </p>
    </>
  );

  return (
    <LessonLayout
      title="The Grid"
      difficulty="beginner"
      diagram={<GridDiagram />}
      textContent={textContent}
    />
  );
};

export default TheGrid;
