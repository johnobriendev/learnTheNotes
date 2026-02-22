// src/pages/music-theory/MajorScaleHarmony.tsx
import { useState } from 'react';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const majorKeyRoots: Record<string, string[]> = {
  'C':  ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G':  ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'D':  ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'A':  ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'E':  ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'B':  ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'F':  ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
};

const scaleFormula = [
  { roman: 'I',    quality: 'Major',      seventh: 'maj7' },
  { roman: 'ii',   quality: 'Minor',      seventh: 'min7' },
  { roman: 'iii',  quality: 'Minor',      seventh: 'min7' },
  { roman: 'IV',   quality: 'Major',      seventh: 'maj7' },
  { roman: 'V',    quality: 'Major',      seventh: '7'    },
  { roman: 'vi',   quality: 'Minor',      seventh: 'min7' },
  { roman: 'vii°', quality: 'Diminished', seventh: 'min7b5' },
];

const keyRows = [
  ['C', 'G', 'D', 'A', 'E', 'B', 'F#'],
  ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'],
];

const qualityColor: Record<string, { background: string; color: string }> = {
  Major:      { background: colors.medNavy, color: colors.cream },
  Minor:      { background: colors.lightGray, color: colors.darkNavy },
  Diminished: { background: colors.darkNavy, color: colors.sage },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold mt-6 mb-2" style={{ color: colors.darkNavy }}>{children}</h2>
);

const MajorScaleHarmony = () => {
  const [selectedKey, setSelectedKey] = useState('C');
  const roots = majorKeyRoots[selectedKey];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <H2>Building Chords from the Scale</H2>
          <p style={{ color: colors.medNavy }}>
            To build a chord on any scale degree, stack every other note of the scale starting from that degree —
            a process called <strong>stacking thirds</strong>. Using three notes gives you a triad.
          </p>
          <p className="mt-3" style={{ color: colors.medNavy }}>
            In C major (C D E F G A B), starting on C and stacking thirds gives you C–E–G: a <strong>C major triad</strong>.
            Starting on D gives you D–F–A: a <strong>D minor triad</strong>. The intervals between the notes determine the chord quality.
          </p>

          <H2>The Roman Numeral System</H2>
          <p style={{ color: colors.medNavy }}>
            Musicians use <strong>roman numerals</strong> to label each chord by its position (degree) in the scale.
            This lets you describe chord relationships without naming a specific key.
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>Uppercase</strong> roman numerals (I, IV, V) indicate <strong>major</strong> chords.</li>
            <li><strong>Lowercase</strong> roman numerals (ii, iii, vi) indicate <strong>minor</strong> chords.</li>
            <li>The <strong>° symbol</strong> (vii°) indicates a <strong>diminished</strong> chord.</li>
          </ul>

          <H2>The Major Scale Formula</H2>
          <p style={{ color: colors.medNavy }}>
            No matter what major key you're in, the chord qualities always follow the same pattern:
          </p>
          <div
            className="rounded-lg px-5 py-4 my-4 font-mono text-lg tracking-widest text-center"
            style={{ background: colors.darkNavy, color: colors.cream }}
          >
            I &nbsp; ii &nbsp; iii &nbsp; IV &nbsp; V &nbsp; vi &nbsp; vii°
          </div>
          <p style={{ color: colors.medNavy }}>
            That's <strong>Major, minor, minor, Major, Major, minor, diminished</strong> — or put another way,
            three major chords, three minor chords, and one diminished chord, always in that order.
            In G major, the I chord is G major, the ii chord is A minor, and so on.
          </p>

          <H2>7th Chords</H2>
          <p style={{ color: colors.medNavy }}>
            Stack one more third on top of each triad and you get a <strong>7th chord</strong>. Each scale degree
            produces a specific 7th chord quality:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>I maj7</strong> — major 7th </li>
            <li><strong>ii min7</strong> — minor 7th </li>
            <li><strong>iii min7</strong> — minor 7th</li>
            <li><strong>IV maj7</strong> — major 7th</li>
            <li><strong>V 7</strong> — dominant 7th </li>
            <li><strong>vi min7</strong> — minor 7th</li>
            <li><strong>vii° min7b5</strong> — half-diminished 7th</li>
          </ul>
         

          <H2>Extensions: 9ths, 11ths, and 13ths</H2>
          <p style={{ color: colors.medNavy }}>
            Keep stacking thirds and you get <strong>extended chords</strong>. These are the same stacking-thirds
            logic continued beyond the octave:
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>9th</strong> — the 2nd degree an octave up. Adds color without changing function. (Cmaj9, Dm9)</li>
            <li><strong>11th</strong> — the 4th degree an octave up. Common in minor chords and jazz voicings. (Dm11, G11)</li>
            <li><strong>13th</strong> — the 6th degree an octave up. The richest extension — a 13th chord technically contains all 7 scale tones. (Cmaj13, G13)</li>
          </ul>
          <p className="mt-3" style={{ color: colors.medNavy }}>
            In practice, players omit notes to keep voicings playable. The name of the
            chord tells you the <em>highest extension</em> included — a 13th chord also implies the 7th, 9th, and 11th
            are present (though often omitted).
          </p>

          <H2>Common Progressions to Develop Your Ear</H2>
          <p style={{ color: colors.medNavy }}>
            Roman numerals let you understand <strong>chord progressions</strong> in any key at once.
            The classic I–IV–V sounds the same way in every key because the relationships are identical.
            Once you know the formula, you can transpose any progression instantly.
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside" style={{ color: colors.medNavy }}>
            <li><strong>I – IV – V</strong> — the foundation of blues and rock</li>
            <li><strong>I – V – vi – IV</strong> — one of the most popular pop progressions</li>
            <li><strong>ii – V – I</strong> — the cornerstone of jazz harmony</li>
          </ul>
        </div>

        {/* Chord reference chart */}
        <div className="sticky top-4">
          <div className="rounded-xl shadow-md overflow-hidden" style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}>
            {/* Header */}
            <div className="px-6 py-4" style={{ background: colors.darkNavy }}>
              <h3 className="text-lg font-bold" style={{ color: colors.cream }}>
                {selectedKey} Major — Chord Reference
              </h3>
              <p className="text-sm mt-1" style={{ color: colors.sage }}>The same pattern applies in every major key</p>
            </div>

            {/* Key selector */}
            <div className="px-4 py-3 flex flex-col gap-2" style={{ background: colors.medNavy }}>
              {keyRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2">
                  {row.map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedKey(key)}
                      className="text-xs font-bold px-2.5 py-1 rounded-md transition-all"
                      style={
                        selectedKey === key
                          ? { background: colors.cream, color: colors.darkNavy }
                          : { background: 'transparent', color: colors.sage, border: `1px solid ${colors.sage}` }
                      }
                    >
                      {key}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Chord rows */}
            <div className="divide-y" style={{ borderColor: colors.sage }}>
              {scaleFormula.map((row, i) => {
                const triadNotes = [roots[i % 7], roots[(i + 2) % 7], roots[(i + 4) % 7]];
                const seventhNotes = [...triadNotes, roots[(i + 6) % 7]];
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: colors.medNavy, color: colors.cream }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="w-12 text-center font-mono text-lg font-bold flex-shrink-0"
                      style={{ color: colors.darkNavy }}
                    >
                      {row.roman}
                    </div>
                    <div className="flex-1 min-w-0 flex gap-3">
                      {/* Triad */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold mb-0.5" style={{ color: colors.darkNavy }}>{roots[i]} {row.quality.toLowerCase()}</div>
                        <div className="text-xs font-mono font-semibold" style={{ color: colors.darkNavy }}>
                          {triadNotes.join(' – ')}
                        </div>
                      </div>
                      {/* Divider */}
                      <div className="w-px self-stretch" style={{ background: colors.sage }} />
                      {/* 7th chord */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold mb-0.5" style={{ color: colors.darkNavy }}>{roots[i]} {row.seventh}</div>
                        <div className="text-xs font-mono font-semibold" style={{ color: colors.darkNavy }}>
                          {seventhNotes.join(' – ')}
                        </div>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                      style={qualityColor[row.quality]}
                    >
                      {row.quality}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorScaleHarmony;
