import { useState, useEffect, } from 'react';
import * as Tone from 'tone';
import CollapsiblePanel from '../components/CollapsiblePanel';

// Types
type IntervalName = 'Unison' | 'Minor 2nd' | 'Major 2nd' | 'Minor 3rd' | 'Major 3rd' | 'Perfect 4th' | 'Tritone' | 'Perfect 5th' | 'Minor 6th' | 'Major 6th' | 'Minor 7th' | 'Major 7th' | 'Octave';
type Direction = 'ascending' | 'descending' | 'ascending-both' | 'descending-both';
type Mode = 'practice' | 'quiz';

interface Interval {
  name: IntervalName;
  semitones: number;
}

interface QuizQuestion {
  interval: Interval;
  rootNote: string;
  direction: 'ascending' | 'descending' | 'ascending-both' | 'descending-both';
  notes: [string, string];
}

interface QuizState {
  questions: QuizQuestion[];
  currentIndex: number;
  userAnswers: string[];
  score: number;
  isComplete: boolean;
  showFeedback: boolean;
  isCorrect: boolean;
}

const STORAGE_KEY = 'interval_trainer_sidebar';

const IntervalTrainerPage = () => {
  // State
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === null ? true : stored === 'true';
    } catch (e) {
      return true;
    }
  });

  const [mode, setMode] = useState<Mode>('practice');
  const [selectedInterval, setSelectedInterval] = useState<Interval | null>(null);
  const [rootNote, setRootNote] = useState('C4');
  const [direction, setDirection] = useState<Direction>('ascending');
  const [quizDirection, setQuizDirection] = useState<Direction>('ascending');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    userAnswers: [],
    score: 0,
    isComplete: false,
    showFeedback: false,
    isCorrect: false
  });

  // Intervals data
  const intervals: Interval[] = [
    { name: 'Unison', semitones: 0 },
    { name: 'Minor 2nd', semitones: 1 },
    { name: 'Major 2nd', semitones: 2 },
    { name: 'Minor 3rd', semitones: 3 },
    { name: 'Major 3rd', semitones: 4 },
    { name: 'Perfect 4th', semitones: 5 },
    { name: 'Tritone', semitones: 6 },
    { name: 'Perfect 5th', semitones: 7 },
    { name: 'Minor 6th', semitones: 8 },
    { name: 'Major 6th', semitones: 9 },
    { name: 'Minor 7th', semitones: 10 },
    { name: 'Major 7th', semitones: 11 },
    { name: 'Octave', semitones: 12 }
  ];

  const rootNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];

  // Save sidebar state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, sidebarOpen.toString());
    } catch (e) {
      console.error('Failed to save sidebar state:', e);
    }
  }, [sidebarOpen]);

  // Audio functions
  // const noteToFrequency = (note: string): number => {
  //   return Tone.Frequency(note).toFrequency();
  // };

  const getSecondNote = (rootNote: string, semitones: number, isDescending: boolean): string => {
    const rootFreq = Tone.Frequency(rootNote);
    if (isDescending) {
      return rootFreq.transpose(-semitones).toNote();
    } else {
      return rootFreq.transpose(semitones).toNote();
    }
  };

  const playInterval = async (interval: Interval, root: string, dir: 'ascending' | 'descending' | 'ascending-both' | 'descending-both') => {
    if (isPlaying) return;

    setIsPlaying(true);

    try {
      // Start audio context if needed
      if (Tone.getContext().state === 'suspended') {
        await Tone.start();
      }

      const synth = new Tone.Synth().toDestination();

      const ascendingNote = getSecondNote(root, interval.semitones, false);
      const descendingNote = getSecondNote(root, interval.semitones, true);

      // Play notes based on direction
      if (dir === 'ascending') {
        // C → D
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(ascendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
      } else if (dir === 'descending') {
        // C → Bb
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(descendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
      } else if (dir === 'ascending-both') {
        // C → D → pause → D → C
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(ascendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 1200)); // Longer pause
        synth.triggerAttackRelease(ascendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
      } else if (dir === 'descending-both') {
        // C → Bb → pause → Bb → C
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(descendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 1200)); // Longer pause
        synth.triggerAttackRelease(descendingNote, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
        synth.triggerAttackRelease(root, '0.8n');
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      synth.dispose();
    } catch (error) {
      console.error('Error playing interval:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  // Practice mode functions
  const handleIntervalPlay = (interval: Interval) => {
    setSelectedInterval(interval);
    playInterval(interval, rootNote, direction);
  };

  // Quiz functions
  const generateQuizQuestions = (): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];

    // Shuffle the intervals array to randomize the order
    const shuffledIntervals = [...intervals].sort(() => Math.random() - 0.5);

    // Create one question for each interval
    shuffledIntervals.forEach(interval => {
      const randomRoot = rootNotes[Math.floor(Math.random() * rootNotes.length)];
      const questionDirection = quizDirection;

      let secondNote: string;
      if (questionDirection === 'ascending' || questionDirection === 'ascending-both') {
        secondNote = getSecondNote(randomRoot, interval.semitones, false);
      } else {
        secondNote = getSecondNote(randomRoot, interval.semitones, true);
      }

      questions.push({
        interval,
        rootNote: randomRoot,
        direction: questionDirection,
        notes: [randomRoot, secondNote]
      });
    });

    return questions;
  };

  const startQuiz = () => {
    const questions = generateQuizQuestions();
    setQuizState({
      questions,
      currentIndex: 0,
      userAnswers: [],
      score: 0,
      isComplete: false,
      showFeedback: false,
      isCorrect: false
    });
    setMode('quiz');
    setCurrentAnswer('');
  };

  const playCurrentQuestion = () => {
    if (quizState.questions.length === 0) return;
    
    const currentQuestion = quizState.questions[quizState.currentIndex];
    playInterval(currentQuestion.interval, currentQuestion.rootNote, currentQuestion.direction);
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;

    const currentQuestion = quizState.questions[quizState.currentIndex];
    const isCorrect = currentAnswer === currentQuestion.interval.name;

    setQuizState(prev => ({
      ...prev,
      showFeedback: true,
      isCorrect,
      score: prev.score + (isCorrect ? 1 : 0),
      userAnswers: [...prev.userAnswers, currentAnswer]
    }));
  };

  const nextQuestion = () => {
    const nextIndex = quizState.currentIndex + 1;
    
    if (nextIndex >= quizState.questions.length) {
      setQuizState(prev => ({ ...prev, isComplete: true }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentIndex: nextIndex,
        showFeedback: false,
        isCorrect: false
      }));
      setCurrentAnswer('');
    }
  };

  const resetQuiz = () => {
    setQuizState({
      questions: [],
      currentIndex: 0,
      userAnswers: [],
      score: 0,
      isComplete: false,
      showFeedback: false,
      isCorrect: false
    });
    setMode('practice');
    setCurrentAnswer('');
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);


  const getDisplayedNotes = (interval: Interval, root: string, dir: Direction) => {
    if (dir === 'ascending') {
      const secondNote = getSecondNote(root, interval.semitones, false);
      return [root, secondNote];
    } else if (dir === 'descending') {
      const secondNote = getSecondNote(root, interval.semitones, true);
      return [root, secondNote];
    } else if (dir === 'ascending-both') {
      const secondNote = getSecondNote(root, interval.semitones, false);
      return [root, secondNote, root];
    } else if (dir === 'descending-both') {
      const secondNote = getSecondNote(root, interval.semitones, true);
      return [root, secondNote, root];
    }
    return [root];
  };

  // Render functions
  const renderPracticeMode = () => (
    <CollapsiblePanel title="Practice Mode" defaultOpen={true}>
      <div className="space-y-4">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Root Note</label>
            <select
              value={rootNote}
              onChange={(e) => setRootNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {rootNotes.map(note => (
                <option key={note} value={note}>{note}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as Direction)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
              <option value="ascending-both">Ascending Both</option>
              <option value="descending-both">Descending Both</option>
            </select>
          </div>
        </div>

        {/* Selected interval info */}
        {selectedInterval && (
          <div className="bg-blue-50 p-3 rounded-md">
            <div className="text-sm font-medium text-blue-800">Last Played:</div>
            <div className="text-blue-700">
              {selectedInterval.name} - {getDisplayedNotes(selectedInterval, rootNote, direction).join(' → ')}
            </div>
          </div>
        )}

        {/* Interval buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {intervals.map((interval) => (
            <button
              key={interval.name}
              onClick={() => handleIntervalPlay(interval)}
              disabled={isPlaying}
              className={`p-3 rounded-md text-sm font-medium transition-colors ${
                selectedInterval?.name === interval.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {interval.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMode('quiz')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors font-medium"
        >
          Start Quiz
        </button>
      </div>
    </CollapsiblePanel>
  );

  const renderQuizSetup = () => (
    <CollapsiblePanel title="Quiz Setup" defaultOpen={true}>
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="text-sm font-medium text-blue-800">Quiz Format</div>
          <div className="text-blue-700 text-sm">12 questions - one for each interval</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
          <select
            value={quizDirection}
            onChange={(e) => setQuizDirection(e.target.value as Direction)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ascending">Ascending Only</option>
            <option value="descending">Descending Only</option>
            <option value="ascending-both">Ascending Both Only</option>
            <option value="descending-both">Descending Both Only</option>
          </select>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md transition-colors font-medium"
        >
          Start Quiz
        </button>
      </div>
    </CollapsiblePanel>
  );

  const renderQuizMode = () => {
    // If no questions have been generated yet, show quiz setup
    if (quizState.questions.length === 0) {
      return renderQuizSetup();
    }

    if (quizState.isComplete) {
      const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
      
      return (
        <CollapsiblePanel title="Quiz Results" defaultOpen={true}>
          <div className="space-y-4 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-semibold text-gray-800">Quiz Complete!</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-3xl font-bold mb-2" style={{ 
                color: percentage >= 80 ? '#059669' : percentage >= 60 ? '#d97706' : '#dc2626' 
              }}>
                {quizState.score}/{quizState.questions.length}
              </div>
              <div className="text-sm text-gray-600 mb-2">{percentage}% correct</div>
              <div className="text-xs text-gray-500">
                {percentage >= 90 ? 'Excellent work!' :
                 percentage >= 80 ? 'Great job!' :
                 percentage >= 70 ? 'Good effort!' :
                 percentage >= 60 ? 'Keep practicing!' : 'More practice needed'}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetQuiz}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                Back to Practice
              </button>
              <button
                onClick={startQuiz}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                New Quiz
              </button>
            </div>
          </div>
        </CollapsiblePanel>
      );
    }

    const currentQuestion = quizState.questions[quizState.currentIndex];
    if (!currentQuestion) return null;

    return (
      <CollapsiblePanel title="Quiz Mode" defaultOpen={true}>
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="font-bold text-indigo-600">
              {quizState.currentIndex + 1}/{quizState.questions.length}
            </span>
          </div>

          {/* Question */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="text-center mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">What interval is this?</h4>
              <div className="text-sm text-gray-600 mb-3">
                Direction: {currentQuestion.direction}
              </div>
              
              <button
                onClick={playCurrentQuestion}
                disabled={isPlaying}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-md transition-colors font-medium"
              >
                {isPlaying ? 'Playing...' : 'Play Interval'}
              </button>
            </div>

            {/* Answer Selection */}
            {!quizState.showFeedback && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  {intervals.map((interval) => (
                    <label
                      key={interval.name}
                      className={`flex items-center p-2 border rounded-md cursor-pointer transition-colors text-sm ${
                        currentAnswer === interval.name
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interval"
                        value={interval.name}
                        checked={currentAnswer === interval.name}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        className="mr-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-800">{interval.name}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={submitAnswer}
                  disabled={!currentAnswer.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors font-medium"
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Feedback */}
            {quizState.showFeedback && (
              <div className="space-y-3">
                <div className={`text-center py-3 rounded-md ${
                  quizState.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="text-2xl mb-1">{quizState.isCorrect ? '✅' : '❌'}</div>
                  <div className="font-semibold">
                    {quizState.isCorrect ? 'Correct!' : 'Incorrect'}
                  </div>
                  {!quizState.isCorrect && (
                    <div className="text-sm mt-1">
                      Correct answer: {currentQuestion.interval.name}
                    </div>
                  )}
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
                >
                  {quizState.currentIndex + 1 >= quizState.questions.length ? 'View Results' : 'Next Question'}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors text-sm"
          >
            End Quiz
          </button>
        </div>
      </CollapsiblePanel>
    );
  };

  return (
    <div className="rounded-lg shadow-md h-full">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col relative h-full min-h-screen">
        <div className="bg-gray-50 p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Interval Trainer</h1>
            <p className="text-gray-600 text-sm">Train your ear to recognize musical intervals</p>
          </div>
          
          <div className="w-full flex justify-center">
            <button
              onClick={toggleSidebar}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md shadow-md transition-all flex items-center gap-1 w-full justify-center"
            >
              {sidebarOpen ? 'Hide Controls' : 'Show Controls'}
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <div className="bg-white border-t border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto">
            {mode === 'practice' ? renderPracticeMode() : renderQuizMode()}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col h-full min-h-screen">
        <div className="flex flex-row min-h-[60vh] flex-shrink-0">
          <div className={`bg-gray-50 p-4 min-h-full flex-1 ${sidebarOpen ? 'max-w-[60%]' : ''}`}>
            {!sidebarOpen && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={toggleSidebar}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-md shadow-md transition-all flex items-center gap-1"
                >
                  <span className="text-lg leading-none">←</span> Show Controls
                </button>
              </div>
            )}

            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎵</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Interval Trainer</h1>
                <p className="text-gray-600">Train your ear to recognize musical intervals</p>
                {mode === 'quiz' && !quizState.isComplete && quizState.questions.length > 0 && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="text-lg font-semibold text-gray-800 mb-2">Current Question</div>
                    <button
                      onClick={playCurrentQuestion}
                      disabled={isPlaying}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-md transition-colors font-medium text-lg"
                    >
                      {isPlaying ? 'Playing...' : 'Play Interval'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {sidebarOpen && (
            <div className="flex-1 min-w-[40%] bg-white border-l border-gray-200 p-6">
              <div className="mb-4">
                <button
                  onClick={toggleSidebar}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-md shadow-md transition-all flex items-center gap-1"
                >
                  Hide Controls <span className="text-lg leading-none">→</span>
                </button>
              </div>

              {mode === 'practice' ? renderPracticeMode() : renderQuizMode()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntervalTrainerPage;