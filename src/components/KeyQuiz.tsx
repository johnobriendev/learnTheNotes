// src/components/KeyQuiz.tsx
import { useState, useCallback, useMemo } from 'react';
import { KeyQuizState, KeyQuizMode, KeyQuizQuestion, MajorScaleKey, KeyType } from '../types';
import { getRandomKey, getKeyInfo, formatKeySignature } from '../utils/keyUtils';

interface KeyQuizProps {
  onShowTips: () => void;
}

const KeyQuiz: React.FC<KeyQuizProps> = ({ onShowTips }) => {
  const [quizState, setQuizState] = useState<KeyQuizState>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<KeyQuizQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizMode, setQuizMode] = useState<KeyQuizMode>('name-key');

  const generateQuestion = useCallback((): KeyQuizQuestion => {
    const { key, type } = getRandomKey();
    const keyInfo = getKeyInfo(key, type);

    if (!keyInfo) {
      // Fallback to C major if key info not found
      return {
        key: 'C',
        type: 'major',
        mode: quizMode,
        correctAnswer: quizMode === 'name-key' ? 'C major' : 0
      };
    }

    if (quizMode === 'name-key') {
      return {
        key,
        type,
        mode: quizMode,
        signature: keyInfo.signature,
        correctAnswer: `${key} ${type}`
      };
    } else {
      return {
        key,
        type,
        mode: quizMode,
        correctAnswer: Math.abs(keyInfo.sharpsFlats)
      };
    }
  }, [quizMode]);

  const startQuiz = () => {
    setQuizState('active');
    setScore(0);
    setTotalQuestions(0);
    setShowFeedback(false);
    setCurrentQuestion(generateQuestion());
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setUserAnswer('');
    setCurrentQuestion(generateQuestion());
  };

  const submitAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const isAnswerCorrect = checkAnswer(userAnswer.trim(), currentQuestion);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setTotalQuestions(prev => prev + 1);

    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const checkAnswer = (answer: string, question: KeyQuizQuestion): boolean => {
    if (question.mode === 'name-key') {
      const correctAnswer = question.correctAnswer as string;
      const normalizedAnswer = answer.toLowerCase().replace(/\s+/g, ' ').trim();
      const normalizedCorrect = correctAnswer.toLowerCase();

      // Accept various formats like "C", "C major", "c maj", etc.
      const keyName = question.key.toLowerCase();
      const typeName = question.type.toLowerCase();

      return normalizedAnswer === normalizedCorrect ||
             normalizedAnswer === keyName ||
             normalizedAnswer === `${keyName} ${typeName}` ||
             normalizedAnswer === `${keyName} ${typeName.substring(0, 3)}` ||
             normalizedAnswer === `${keyName}${typeName}` ||
             normalizedAnswer === `${keyName}${typeName.substring(0, 3)}`;
    } else {
      const userNumber = parseInt(answer);
      return userNumber === question.correctAnswer;
    }
  };

  const renderKeySignature = (signature: string[]) => {
    if (signature.length === 0) {
      return (
        <div className="text-2xl text-gray-600 text-center py-4">
          <span className="font-mono">♮</span>
          <p className="text-sm mt-2">No sharps or flats</p>
        </div>
      );
    }

    return (
      <div className="text-center py-4">
        <div className="flex justify-center gap-2 text-2xl font-mono mb-2">
          {signature.map((note, index) => (
            <span key={index} className="text-gray-700">
              {note.replace('#', '♯').replace('b', '♭')}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {signature.length} {signature[0].includes('#') ? 'sharp' : 'flat'}{signature.length !== 1 ? 's' : ''}
        </p>
      </div>
    );
  };

  const getScoreColor = () => {
    if (totalQuestions === 0) return 'text-gray-600';
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (quizState === 'idle') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Signature Quiz</h3>
          <p className="text-gray-600 text-sm">Test your knowledge of key signatures!</p>
        </div>

        {/* Quiz Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Mode
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="name-key"
                checked={quizMode === 'name-key'}
                onChange={(e) => setQuizMode(e.target.value as KeyQuizMode)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm">Name the Key</span>
            </label>
            <p className="text-xs text-gray-500 ml-6">See key signature → identify the key</p>

            <label className="flex items-center">
              <input
                type="radio"
                value="identify-signature"
                checked={quizMode === 'identify-signature'}
                onChange={(e) => setQuizMode(e.target.value as KeyQuizMode)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm">Count Accidentals</span>
            </label>
            <p className="text-xs text-gray-500 ml-6">See key name → count sharps/flats</p>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md transition-colors font-medium"
        >
          Start Quiz
        </button>

        <button
          onClick={onShowTips}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors text-sm font-medium"
        >
          💡 Tips for Learning Keys
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Score Display */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
        <span className="text-sm font-medium text-gray-700">Score</span>
        <span className={`font-bold ${getScoreColor()}`}>
          {score}/{totalQuestions}
        </span>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="text-center mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {currentQuestion.mode === 'name-key' ? 'What key is this?' : 'How many accidentals?'}
            </h4>

            {currentQuestion.mode === 'name-key' ? (
              renderKeySignature(currentQuestion.signature || [])
            ) : (
              <div className="text-xl font-semibold text-gray-700">
                {currentQuestion.key} {currentQuestion.type}
              </div>
            )}
          </div>

          {/* Answer Input */}
          {!showFeedback && (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                placeholder={currentQuestion.mode === 'name-key' ? 'e.g., C major or G minor' : 'e.g., 2'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                autoFocus
              />
              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="space-y-3">
              <div className={`text-center py-3 rounded-md ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="text-2xl mb-1">{isCorrect ? '✅' : '❌'}</div>
                <div className="font-semibold">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                {!isCorrect && (
                  <div className="text-sm mt-1">
                    Correct answer: {currentQuestion.correctAnswer}
                  </div>
                )}
              </div>

              <button
                onClick={nextQuestion}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setQuizState('idle');
            setCurrentQuestion(null);
            setShowFeedback(false);
            setUserAnswer('');
          }}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors text-sm"
        >
          End Quiz
        </button>
      </div>
    </div>
  );
};

export default KeyQuiz;