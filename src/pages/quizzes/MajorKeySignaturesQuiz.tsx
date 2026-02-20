// src/pages/quizzes/MajorKeySignaturesQuiz.tsx
import { useState, useCallback } from 'react';
import { majorKeyData } from '../../utils/keyUtils';
import { MajorScaleKey } from '../../types';

type QuizPhase = 'idle' | 'question' | 'feedback' | 'complete';
type QuestionMode = 'key-to-signature' | 'signature-to-key' | 'both';
type QuestionType = 'key-to-signature' | 'signature-to-key';

interface Question {
  type: QuestionType;
  key: MajorScaleKey;
  prompt: string;
  correctAnswerId: string;
}

interface Option {
  id: string;
  label: string;
}

const ALL_KEYS = Object.keys(majorKeyData) as MajorScaleKey[];

// Ordered: sharp keys circle of 5ths, then flat keys
const KEY_OPTIONS: Option[] = [
  { id: 'C', label: 'C' },
  { id: 'G', label: 'G' },
  { id: 'D', label: 'D' },
  { id: 'A', label: 'A' },
  { id: 'E', label: 'E' },
  { id: 'B', label: 'B' },
  { id: 'F#', label: 'F#' },
  { id: 'Gb', label: 'G♭' },
  { id: 'Db', label: 'D♭' },
  { id: 'Ab', label: 'A♭' },
  { id: 'Eb', label: 'E♭' },
  { id: 'Bb', label: 'B♭' },
  { id: 'F', label: 'F' },
];

// None first, then 1-6 sharps, then 1-6 flats
const SIGNATURE_OPTIONS: Option[] = [
  { id: '0', label: 'None' },
  { id: '1', label: '1 sharp' },
  { id: '2', label: '2 sharps' },
  { id: '3', label: '3 sharps' },
  { id: '4', label: '4 sharps' },
  { id: '5', label: '5 sharps' },
  { id: '6', label: '6 sharps' },
  { id: '-1', label: '1 flat' },
  { id: '-2', label: '2 flats' },
  { id: '-3', label: '3 flats' },
  { id: '-4', label: '4 flats' },
  { id: '-5', label: '5 flats' },
  { id: '-6', label: '6 flats' },
];

function signatureLabel(sharpsFlats: number): string {
  if (sharpsFlats === 0) return 'no sharps or flats';
  const count = Math.abs(sharpsFlats);
  const type = sharpsFlats > 0 ? (count === 1 ? 'sharp' : 'sharps') : (count === 1 ? 'flat' : 'flats');
  return `${count} ${type}`;
}

function makeQuestion(key: MajorScaleKey, type: QuestionType): Question {
  const keyInfo = majorKeyData[key];
  if (type === 'key-to-signature') {
    return {
      type,
      key,
      prompt: `How many sharps or flats does ${key} major have?`,
      correctAnswerId: String(keyInfo.sharpsFlats)
    };
  } else {
    return {
      type,
      key,
      prompt: `Which major key has ${signatureLabel(keyInfo.sharpsFlats)}?`,
      correctAnswerId: key
    };
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(mode: QuestionMode): Question[] {
  const questions: Question[] = [];
  if (mode === 'key-to-signature' || mode === 'both') {
    ALL_KEYS.forEach(key => questions.push(makeQuestion(key, 'key-to-signature')));
  }
  if (mode === 'signature-to-key' || mode === 'both') {
    ALL_KEYS.forEach(key => questions.push(makeQuestion(key, 'signature-to-key')));
  }
  return shuffle(questions);
}

const MajorKeySignaturesQuiz = () => {
  const [phase, setPhase] = useState<QuizPhase>('idle');
  const [mode, setMode] = useState<QuestionMode>('both');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [didQuit, setDidQuit] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const options = currentQuestion?.type === 'key-to-signature' ? SIGNATURE_OPTIONS : KEY_OPTIONS;

  const startQuiz = useCallback(() => {
    setQuestions(buildQuestions(mode));
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setDidQuit(false);
    setSelectedId(null);
    setIsCorrect(null);
    setPhase('question');
  }, [mode]);

  const handleAnswer = (optionId: string) => {
    if (phase !== 'question') return;
    const correct = optionId === currentQuestion.correctAnswerId;
    setSelectedId(optionId);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setAnsweredCount(c => c + 1);
    setPhase('feedback');
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
      setSelectedId(null);
      setIsCorrect(null);
      setPhase('question');
    }
  };

  const handleReset = () => {
    setPhase('idle');
    setDidQuit(false);
    setSelectedId(null);
    setIsCorrect(null);
  };

  const getButtonClass = (optionId: string) => {
    const base = 'px-3 py-2 rounded-lg text-sm font-medium border transition-colors text-center';
    if (phase === 'feedback') {
      if (optionId === currentQuestion.correctAnswerId) {
        return `${base} bg-green-100 border-green-500 text-green-800`;
      }
      if (optionId === selectedId && !isCorrect) {
        return `${base} bg-red-100 border-red-500 text-red-800`;
      }
      return `${base} bg-gray-50 border-gray-200 text-gray-400 cursor-default`;
    }
    return `${base} bg-gray-100 hover:bg-indigo-50 hover:border-indigo-400 border-gray-300 text-gray-800 cursor-pointer`;
  };

  const scoreDenominator = didQuit ? answeredCount : totalQuestions;
  const scorePercent = scoreDenominator > 0 ? Math.round((score / scoreDenominator) * 100) : 0;
  const scoreColor = scorePercent >= 80 ? 'text-green-600' : scorePercent >= 60 ? 'text-yellow-600' : 'text-red-600';

  // Idle screen
  if (phase === 'idle') {
    const questionCount = mode === 'both' ? 26 : 13;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Major Key Signatures</h1>
          <p className="text-gray-600">
            Practice identifying key signatures. Each quiz covers all 13 major keys.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Question mode</p>
            <div className="flex flex-wrap gap-2">
              {([
                { value: 'key-to-signature', label: 'Key → Signature' },
                { value: 'signature-to-key', label: 'Signature → Key' },
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
            <p className="text-xs text-gray-500 mt-2">{questionCount} questions</p>
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

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={phase === 'feedback'}
              className={getButtonClass(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {phase === 'feedback' && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {isCorrect
              ? '✓ Correct!'
              : `✗ Incorrect — the answer is ${
                  currentQuestion.type === 'key-to-signature'
                    ? SIGNATURE_OPTIONS.find(o => o.id === currentQuestion.correctAnswerId)?.label
                    : KEY_OPTIONS.find(o => o.id === currentQuestion.correctAnswerId)?.label
                }`
            }
          </div>
        )}

        {phase === 'feedback' && (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            {currentIndex + 1 >= totalQuestions ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default MajorKeySignaturesQuiz;
