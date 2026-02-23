// src/components/shared/ChordDiagram.tsx
import React from 'react';

const SINGLE_DOT_FRETS = [3, 5, 7, 9, 15, 17, 19, 21];
const DOUBLE_DOT_FRETS = [12, 24];

export interface ChordDiagramProps {
  /** 6 values (low E → high e): -1 = muted, 0 = open, N = fret number */
  frets: number[];
  /** Tailwind bg-color class per string index for interval-role coloring.
   *  Falls back to gray for non-root strings when omitted. */
  dotColors?: string[];
  /** Fallback root string index when dotColors is not provided */
  rootString?: number;
  /** Chord name displayed above the diagram */
  label?: string;
  /** First fret shown. Auto-detected from min played fret if omitted. */
  startFret?: number;
  /** Number of fret slots to display. Default: 5 */
  numFrets?: number;
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({
  frets,
  dotColors,
  rootString,
  label,
  startFret,
  numFrets = 5,
}) => {
  const N = frets.length;
  const played = frets.filter(f => f > 0);
  const sf = startFret ?? (played.length ? Math.min(...played) : 1);
  const endFret = sf + numFrets - 1;

  const FH = 24;    // px — height of one fret slot
  const GW = 100;   // px — width of string grid
  const GH = numFrets * FH;
  const DS = 14;    // px — note dot diameter
  const MS = 10;    // px — position marker diameter

  const x = (i: number) => (i / (N - 1)) * GW;
  const y = (f: number) => ((f - sf + 0.5) / numFrets) * GH;

  // Center x for fret position markers (between strings D and G = index 2.5)
  const markerX = (2.5 / (N - 1)) * GW;

  const dotColor = (i: number): string => {
    if (dotColors?.[i]) return dotColors[i];
    return i === rootString ? 'bg-blue-600' : 'bg-gray-700';
  };

  return (
    <div className="flex flex-col items-center" style={{ width: GW }}>
      {label && (
        <div className="text-xs font-semibold text-gray-800 mb-2 text-center w-full">
          {label}
        </div>
      )}

      {/* Fretboard grid */}
      <div className="relative overflow-visible" style={{ width: GW, height: GH }}>

        {/* Position markers — rendered behind strings and dots */}
        {SINGLE_DOT_FRETS.filter(f => f >= sf && f <= endFret).map(f => (
          <div
            key={f}
            className="absolute rounded-full bg-gray-300"
            style={{
              width: MS,
              height: MS,
              left: markerX,
              top: y(f),
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
        ))}
        {DOUBLE_DOT_FRETS.filter(f => f >= sf && f <= endFret).map(f => (
          <React.Fragment key={f}>
            <div
              className="absolute rounded-full bg-gray-300"
              style={{
                width: MS,
                height: MS,
                left: x(1.5),
                top: y(f),
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
            <div
              className="absolute rounded-full bg-gray-300"
              style={{
                width: MS,
                height: MS,
                left: x(3.5),
                top: y(f),
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          </React.Fragment>
        ))}

        {/* Fret lines */}
        {Array.from({ length: numFrets + 1 }, (_, j) => (
          <div
            key={j}
            className="absolute bg-slate-600"
            style={{ left: 0, width: GW, top: j * FH, height: 1, zIndex: 2 }}
          />
        ))}

        {/* String lines */}
        {frets.map((_, i) => (
          <div
            key={i}
            className="absolute bg-slate-600"
            style={{ left: x(i) - 0.5, top: 0, width: 1, height: GH, zIndex: 2 }}
          />
        ))}

        {/* Note dots — only render frets within the visible window */}
        {frets.map((f, i) =>
          f >= sf && f <= endFret ? (
            <div
              key={i}
              className={`absolute rounded-full shadow-lg ${dotColor(i)}`}
              style={{
                width: DS,
                height: DS,
                left: x(i),
                top: y(f),
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ChordDiagram;
