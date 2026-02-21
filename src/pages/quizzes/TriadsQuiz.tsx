// src/pages/quizzes/TriadsQuiz.tsx
import { useState, useCallback } from 'react';
import { createTriad } from '../../utils/triadUtils';
import { allNotes } from '../../constants';
import { Note, ChordQuality } from '../../types';

type QuizPhase = 'idle' | 'question' | 'feedback' | 'complete';
type QuestionMode = 'triad-to-notes' | 'notes-to-triad' | 'both';
type QuestionType = 'triad-to-notes' | 'notes-to-triad';

const QUALITIES: ChordQuality[] = ['major', 'minor', 'diminished', 'augmented'];

const QUIZ_LENGTHS = [12, 24, 48];

const QUAL_LABEL: Record<ChordQuality, string> = {
  major: 'maj', minor: 'min', diminished: 'dim', augmented: 'aug',
};

const QUAL_DISPLAY: Record<ChordQuality, string> = {
  major: 'major', minor: 'minor', diminished: 'diminished', augmented: 'augmented',
};

// All note name buttons — both sharp and flat spellings for accidentals.
// Correct answers are always the sharp spellings (from createTriad), so flat
// buttons are valid distractors but never the right answer.
const NOTE_BUTTONS: { id: string; label: string }[] = [
  { id: 'C',  label: 'C' },
  { id: 'C#', label: 'C#' },
  { id: 'Db', label: 'Db' },
  { id: 'D',  label: 'D' },
  { id: 'D#', label: 'D#' },
  { id: 'Eb', label: 'Eb' },
  { id: 'E',  label: 'E' },
  { id: 'F',  label: 'F' },
  { id: 'F#', label: 'F#' },
  { id: 'Gb', label: 'Gb' },
  { id: 'G',  label: 'G' },
  { id: 'G#', label: 'G#' },
  { id: 'Ab', label: 'Ab' },
  { id: 'A',  label: 'A' },
  { id: 'A#', label: 'A#' },
  { id: 'Bb', label: 'Bb' },
  { id: 'B',  label: 'B' },
];

interface ChordOption {
  id: string; // `${Note}-${ChordQuality}`
  label: string;
}

interface Question {
  type: QuestionType;
  root: Note;
  quality: ChordQuality;
  notes: Note[];             // from createTriad — always sharp names
  prompt: string;
  correctNoteIds: string[];  // sharp names from createTriad
  correctChordIds: string[]; // for augmented: 3 valid IDs
  chordOptions: ChordOption[];
}

// For augmented triads all 3 notes are valid roots
function getCorrectChordIds(root: Note, quality: ChordQuality, notes: Note[]): string[] {
  if (quality !== 'augmented') return [`${root}-${quality}`];
  return notes.map(n => `${n}-${quality}`);
}

// 12 options: 4 qualities × 3 notes in the triad
function buildChordOptions(notes: Note[]): ChordOption[] {
  const options: ChordOption[] = [];
  for (const note of notes) {
    for (const q of QUALITIES) {
      options.push({ id: `${note}-${q}`, label: `${note} ${QUAL_LABEL[q]}` });
    }
  }
  return options;
}

function makeQuestion(root: Note, quality: ChordQuality, type: QuestionType): Question {
  const triad = createTriad(root, quality);
  const notes = triad.notes;

  return {
    type,
    root,
    quality,
    notes,
    prompt: type === 'triad-to-notes'
      ? `What are the notes in ${root} ${QUAL_DISPLAY[quality]}?`
      : `What triad has these notes: ${notes.join('  ')}?`,
    correctNoteIds: notes as unknown as string[],
    correctChordIds: getCorrectChordIds(root, quality, notes),
    chordOptions: type === 'notes-to-triad' ? buildChordOptions(notes) : [],
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(mode: QuestionMode, length: number): Question[] {
  const types: QuestionType[] = mode === 'both'
    ? ['triad-to-notes', 'notes-to-triad']
    : [mode];
  const pool: Question[] = [];
  for (const type of types) {
    for (const root of allNotes) {
      for (const quality of QUALITIES) {
        pool.push(makeQuestion(root, quality, type));
      }
    }
  }
  return shuffle(pool).slice(0, length);
}

const TriadsQuiz = () => {
  const [phase, setPhase] = useState<QuizPhase>('idle');
  const [mode, setMode] = useState<QuestionMode>('both');
  const [quizLength, setQuizLength] = useState(24);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [didQuit, setDidQuit] = useState(false);

  // triad-to-notes: set of selected button IDs (string)
  const [selectedNotes, setSelectedNotes] = useState<Set<string>>(new Set());

  // notes-to-triad: selected chord option ID
  const [selectedChordId, setSelectedChordId] = useState<string | null>(null);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const startQuiz = useCallback(() => {
    setQuestions(buildQuestions(mode, quizLength));
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setDidQuit(false);
    setSelectedNotes(new Set());
    setSelectedChordId(null);
    setIsCorrect(null);
    setPhase('question');
  }, [mode, quizLength]);

  const resetAnswer = () => {
    setSelectedNotes(new Set());
    setSelectedChordId(null);
    setIsCorrect(null);
  };

  const handleQuit = () => {
    setDidQuit(true);
    setPhase('complete');
  };

  const handleNext = () => {
    if (currentIndex + 1 >= totalQuestions) {
      setPhase('complete');
    } else {
      setCurrentIndex(i => i + 1);
      resetAnswer();
      setPhase('question');
    }
  };

  const handleReset = () => {
    setPhase('idle');
    setDidQuit(false);
    resetAnswer();
  };

  const toggleNote = (id: string) => {
    if (phase !== 'question') return;
    setSelectedNotes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmitNotes = () => {
    if (selectedNotes.size !== 3 || phase !== 'question') return;
    const correct =
      currentQuestion.correctNoteIds.length === 3 &&
      currentQuestion.correctNoteIds.every(n => selectedNotes.has(n));
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setAnsweredCount(c => c + 1);
    setPhase('feedback');
  };

  const handleChordSelect = (chordId: string) => {
    if (phase !== 'question') return;
    const correct = currentQuestion.correctChordIds.includes(chordId);
    setSelectedChordId(chordId);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setAnsweredCount(c => c + 1);
    setPhase('feedback');
  };

  const getNoteButtonClass = (id: string) => {
    const base = 'px-2 py-2 rounded-lg text-sm font-medium border transition-colors text-center';
    const isSelected = selectedNotes.has(id);
    const isCorrectNote = currentQuestion?.correctNoteIds.includes(id);

    if (phase === 'feedback') {
      if (isCorrectNote) return `${base} bg-green-100 border-green-500 text-green-800`;
      if (isSelected && !isCorrectNote) return `${base} bg-red-100 border-red-500 text-red-800`;
      return `${base} bg-gray-50 border-gray-200 text-gray-400 cursor-default`;
    }
    if (isSelected) return `${base} bg-indigo-600 border-indigo-600 text-white cursor-pointer`;
    return `${base} bg-gray-100 hover:bg-indigo-50 hover:border-indigo-400 border-gray-300 text-gray-800 cursor-pointer`;
  };

  const getChordButtonClass = (chordId: string) => {
    const base = 'px-2 py-2 rounded-lg text-sm font-medium border transition-colors text-center';
    if (phase === 'feedback') {
      if (currentQuestion.correctChordIds.includes(chordId))
        return `${base} bg-green-100 border-green-500 text-green-800`;
      if (chordId === selectedChordId)
        return `${base} bg-red-100 border-red-500 text-red-800`;
      return `${base} bg-gray-50 border-gray-200 text-gray-400 cursor-default`;
    }
    return `${base} bg-gray-100 hover:bg-indigo-50 hover:border-indigo-400 border-gray-300 text-gray-800 cursor-pointer`;
  };

  const scoreDenominator = didQuit ? answeredCount : totalQuestions;
  const scorePercent = scoreDenominator > 0 ? Math.round((score / scoreDenominator) * 100) : 0;
  const scoreColor = scorePercent >= 80 ? 'text-green-600' : scorePercent >= 60 ? 'text-yellow-600' : 'text-red-600';

  // Idle screen
  if (phase === 'idle') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Triads</h1>
          <p className="text-gray-600">
            Practice identifying triads and their notes across all 12 roots and 4 qualities.
            Both sharp and flat spellings are shown — only the exact spelling counts.
            Augmented triads accept all three enharmonic root names.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Question mode</p>
            <div className="flex flex-wrap gap-2">
              {([
                { value: 'triad-to-notes', label: 'Triad → Notes' },
                { value: 'notes-to-triad', label: 'Notes → Triad' },
                { value: 'both', label: 'Both' },
              ] as { value: QuestionMode; label: string }[]).map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                    mode === value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Number of questions</p>
            <div className="flex gap-2">
              {QUIZ_LENGTHS.map(len => (
                <button
                  key={len}
                  onClick={() => setQuizLength(len)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                    quizLength === len
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-5xl mb-4">{didQuit ? '🚪' : '🎉'}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {didQuit ? 'Quiz Ended' : 'Quiz Complete!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {didQuit
              ? `You answered ${answeredCount} of ${totalQuestions} questions — ${score} correct.`
              : `You answered ${score} out of ${totalQuestions} correctly.`
            }
          </p>
          {scoreDenominator > 0 && (
            <p className={`text-5xl font-bold mb-6 ${scoreColor}`}>{scorePercent}%</p>
          )}
          <button
            onClick={handleReset}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Question / Feedback screen
  const isTriadToNotes = currentQuestion.type === 'triad-to-notes';
  const correctNotesLabel = currentQuestion.correctNoteIds.join(', ');
  const correctChordLabel = currentQuestion.chordOptions
    .find(o => currentQuestion.correctChordIds.includes(o.id))?.label ?? '';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
        <span>Question {currentIndex + 1} of {totalQuestions}</span>
        <div className="flex items-center gap-4">
          <span>Score: {score}</span>
          <button
            onClick={handleQuit}
            className="px-3 py-1 rounded-md text-xs font-medium border border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            Quit
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all"
          style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.prompt}</p>

        {isTriadToNotes ? (
          <>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-3">
              {NOTE_BUTTONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => toggleNote(id)}
                  disabled={phase === 'feedback'}
                  className={getNoteButtonClass(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mb-3">
              {phase === 'question' ? `Select 3 notes (${selectedNotes.size}/3 selected)` : ''}
            </p>
            {phase === 'feedback' && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? '✓ Correct!' : `✗ Incorrect — the notes are ${correctNotesLabel}`}
              </div>
            )}
            {phase === 'question' && (
              <button
                onClick={handleSubmitNotes}
                disabled={selectedNotes.size !== 3}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Submit
              </button>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {currentQuestion.chordOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleChordSelect(opt.id)}
                  disabled={phase === 'feedback'}
                  className={getChordButtonClass(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {phase === 'feedback' && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {isCorrect ? '✓ Correct!' : `✗ Incorrect — the answer is ${correctChordLabel}`}
              </div>
            )}
          </>
        )}

        {phase === 'feedback' && (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors mt-2"
          >
            {currentIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TriadsQuiz;
