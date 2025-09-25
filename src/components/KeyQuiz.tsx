// src/components/KeyQuiz.tsx
import { useState, useCallback } from 'react';
import { KeyQuizState, KeyQuizMode, KeyQuizQuestion } from '../types';
import { getRandomKey, getKeyInfo } from '../utils/keyUtils';

interface KeyQuizProps {
  onShowTips: () => void;
}

const KeyQuiz: React.FC<KeyQuizProps> = ({ onShowTips }) => {
  const [quizState, setQuizState] = useState<KeyQuizState>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<KeyQuizQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizLength, setQuizLength] = useState(10);
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

    // Check if quiz is complete
    if (totalQuestions >= quizLength) {
      setQuizState('completed');
      return;
    }

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

      // Check for enharmonic equivalents
      let enharmonicKey = '';
      if (question.key === 'F#' && question.type === 'major') {
        enharmonicKey = 'gb';
      } else if (question.key === 'D#' && question.type === 'minor') {
        enharmonicKey = 'eb';
      }

      const acceptedAnswers = [
        normalizedCorrect,
        keyName,
        `${keyName} ${typeName}`,
        `${keyName} ${typeName.substring(0, 3)}`,
        `${keyName}${typeName}`,
        `${keyName}${typeName.substring(0, 3)}`
      ];

      // Add enharmonic equivalents if they exist
      if (enharmonicKey) {
        acceptedAnswers.push(
          enharmonicKey,
          `${enharmonicKey} ${typeName}`,
          `${enharmonicKey} ${typeName.substring(0, 3)}`,
          `${enharmonicKey}${typeName}`,
          `${enharmonicKey}${typeName.substring(0, 3)}`
        );
      }

      return acceptedAnswers.includes(normalizedAnswer);
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

        {/* Quiz Length Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Length
          </label>
          <select
            value={quizLength}
            onChange={(e) => setQuizLength(Number(e.target.value))}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value={5}>5 questions</option>
            <option value={10}>10 questions</option>
            <option value={15}>15 questions</option>
            <option value={20}>20 questions</option>
          </select>
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

  if (quizState === 'completed') {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    return (
      <div className="space-y-4 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz Complete!</h3>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-3xl font-bold mb-2" style={{ color: percentage >= 80 ? '#059669' : percentage >= 60 ? '#d97706' : '#dc2626' }}>
            {score}/{totalQuestions}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {percentage}% correct
          </div>
          <div className="text-xs text-gray-500">
            {percentage >= 90 ? 'Excellent work! 🌟' :
             percentage >= 80 ? 'Great job! 👏' :
             percentage >= 70 ? 'Good effort! 👍' :
             percentage >= 60 ? 'Keep practicing! 📚' : 'More practice needed 💪'}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setQuizState('idle');
              setScore(0);
              setTotalQuestions(0);
              setCurrentQuestion(null);
              setShowFeedback(false);
              setUserAnswer('');
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
          >
            New Quiz
          </button>

          <button
            onClick={onShowTips}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors text-sm font-medium"
          >
            💡 Tips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Score Display */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className={`font-bold ${getScoreColor()}`}>
          {score}/{totalQuestions} ({quizLength} questions total)
        </span>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <div className="text-center mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {currentQuestion.mode === 'name-key'
                ? `What ${currentQuestion.type} key is this?`
                : `How many accidentals does ${currentQuestion.key} ${currentQuestion.type} have?`
              }
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
                onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                placeholder={currentQuestion.mode === 'name-key'
                  ? (currentQuestion.type === 'major' ? 'e.g., C, G, F#' : 'e.g., A, E, B')
                  : 'e.g., 2'
                }
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
            if (totalQuestions > 0) {
              setQuizState('completed');
            } else {
              setQuizState('idle');
              setCurrentQuestion(null);
              setShowFeedback(false);
              setUserAnswer('');
            }
          }}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors text-sm"
        >
          {totalQuestions > 0 ? 'Quit Quiz' : 'End Quiz'}
        </button>
      </div>
    </div>
  );
};

export default KeyQuiz;