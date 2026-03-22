// src/pages/guitar-lessons/StringNames.tsx
import LessonLayout from '../../components/LessonLayout';

const STRING_DATA = [
  { name: 'E', number: 6 },
  { name: 'A', number: 5 },
  { name: 'D', number: 4 },
  { name: 'G', number: 3 },
  { name: 'B', number: 2 },
  { name: 'e', number: 1 },
];

const NUM_FRETS = 5;
const frets = Array.from({ length: NUM_FRETS + 1 }, (_, i) => i);
const SINGLE_DOT_FRETS = [3, 5];

// Height per fret row in rem
const ROW_HEIGHT = 3.5;
const totalHeight = ROW_HEIGHT * NUM_FRETS;

const StringNamesDiagram = () => (
  <div className="bg-white rounded-md shadow-lg w-full flex justify-center items-center overflow-visible py-4">
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
        {/* String labels: number on top, name below */}
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
          {/* Position dot markers */}
          {frets.map(fret => {
            if (!SINGLE_DOT_FRETS.includes(fret)) return null;
            return (
              <div
                key={`dot-${fret}`}
                className="absolute bg-gray-300 rounded-full w-3 h-3"
                style={{
                  left: `${(2.5 * 100) / (STRING_DATA.length - 1)}%`,
                  top: `${((fret * 100) / frets.length) + (50 / frets.length)}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1,
                }}
              />
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

          {/* Nut (thicker top line) */}
          <div
            className="absolute w-full bg-slate-800"
            style={{ top: `${100 / frets.length}%`, height: '3px', transform: 'translateY(-1px)' }}
          />

          {/* Fret horizontal lines */}
          {frets.map(fret =>
            fret > 0 ? (
              <div
                key={`fret-${fret}`}
                className="absolute w-full bg-slate-600"
                style={{ top: `${(fret * 100) / frets.length}%`, height: '1px' }}
              />
            ) : null
          )}

          {/* Bottom fret line */}
          <div className="absolute w-full bg-slate-600" style={{ bottom: 0, height: '1px' }} />
        </div>
      </div>
    </div>
  </div>
);

const StringNames = () => {
  const diagram = <StringNamesDiagram />;

  const textContent = (
    <>
      <h3 className="text-xl font-semibold mb-3">The Six Strings</h3>
      <p className="mb-4">
        The guitar has six strings. From thickest (lowest pitch) to thinnest (highest pitch):
      </p>
      <ul className="mb-6 space-y-2">
        <li><strong>6 — E</strong> (thickest, lowest)</li>
        <li><strong>5 — A</strong></li>
        <li><strong>4 — D</strong></li>
        <li><strong>3 — G</strong></li>
        <li><strong>2 — B</strong></li>
        <li><strong>1 — e</strong> (thinnest, highest)</li>
      </ul>
      <p className="mb-4">
        A way to remember the names:{' '}
        <strong>E</strong>ddie <strong>A</strong>te <strong>D</strong>ynamite,{' '}
        <strong>G</strong>ood <strong>B</strong>ye <strong>E</strong>ddie.
      </p>
      <p className="mb-4">
        Notice both the thickest and thinnest strings are named E. The low one is written
        as a capital <strong>E</strong>, the high one as lowercase <strong>e</strong>.
      </p>
      <p>
        You'll see both names and numbers used in tabs, chord diagrams, and lessons —
        knowing both is essential.
      </p>
    </>
  );

  return (
    <LessonLayout
      title="Learning the String Names"
      difficulty="beginner"
      diagram={diagram}
      textContent={textContent}
    />
  );
};

export default StringNames;
