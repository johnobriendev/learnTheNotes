// src/pages/guitar-lessons/NotesInOpenPosition.tsx
import LessonLayout from '../../components/LessonLayout';
import Fretboard from '../../components/shared/Fretboard';
import { Note } from '../../types';
import { noteColors } from '../../constants';

const strings: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

// All natural note positions in open position (frets 0–5)
// C major scale: C D E F G A B — no sharps or flats
const naturalPositions: Record<number, number[]> = {
  0: [0, 1, 3, 5],     // E: E F G A
  1: [0, 2, 3, 5],     // A: A B C D
  2: [0, 2, 3, 5],     // D: D E F G
  3: [0, 2, 4, 5],     // G: G A B C
  4: [0, 1, 3, 5],     // B: B C D E
  5: [0, 1, 3, 5],     // e: E F G A
};

const diagram = (
  <Fretboard
    numFrets={5}
    strings={strings}
    selectedNotes={[]}
    useFlats={false}
    noteColors={noteColors}
    displayMode="notes"
    shouldHighlight={(si, fret) => naturalPositions[si]?.includes(fret) ?? false}
  />
);

const textContent = (
  <>
    <h3 className="text-xl font-semibold mb-3">The Natural Notes</h3>
    <p className="mb-4">
      There are 7 natural notes in Western music: <strong>A B C D E F G</strong>. After G, the sequence starts over at A. These are also the notes of the C major and A natural minor scales and the notes you'll find on the white keys of a piano.
    </p>
    

    <h3 className="text-xl font-semibold mb-3 mt-6">What Are Sharps and Flats?</h3>
    <p className="mb-4">
      Between most natural notes there is an in-between note. These are called <strong>sharps (#)</strong> and <strong>flats (b)</strong>:
    </p>
    <ul className="mb-4 space-y-1 text-sm">
      <li><strong>Sharp (#)</strong> — raises a note by one fret. F# is one fret above F.</li>
      <li><strong>Flat (b)</strong> — lowers a note by one fret. Bb is one fret below B.</li>
      <li>A sharp and a flat can refer to the same fret — F# and Gb are the same pitch.</li>
    </ul>
    <p className="mb-4">
      Not every pair of natural notes has a note between them. There is <strong>no sharp or flat between E and F</strong>, and <strong>no sharp or flat between B and C</strong>. Those pairs are only one fret apart. You will however see Cb or E# written when in the keys of Gb or F#. (You'll learn why later)
    </p>
    <p className="mb-4">
      Every other pair — A to B, C to D, D to E, F to G, G to A — has a sharp/flat in between, making them two frets apart.
    </p>

   
    <p>
      Start by learning where the C notes are, then work on recognizing the other notes string by string.
    </p>
    <p>Take note of where you can play the same note on different strings, notice that each open string can be played on the previous string at the 5th fret (4th for B). This is something unique about the guitar that will appear everywhere!</p>
  </>
);

const NotesInOpenPosition = () => (
  <LessonLayout
    title="Learn the Notes in Open Position"
    difficulty="beginner"
    diagram={diagram}
    textContent={textContent}
  />
);

export default NotesInOpenPosition;
