// src/pages/NotesPage.tsx
import { useState } from 'react';
import FretboardSettings from '../components/FretboardSettings';
import Fretboard from '../components/Fretboard';
import NoteSelector from '../components/NoteSelector';
import StringSelector from '../components/StringSelector';
import HowToUse from '../components/HowToUse';
import TipsModal from '../components/TipsModal';
import CollapsiblePanel from '../components/CollapsiblePanel';
import { Note, QuizMode, QuizState, QuizQuestion } from '../types';
import { allNotes, noteColors, standardTuning } from '../constants';
import { displayNote } from '../utils/utils';

const NotesPage = () => {
  // State management
  const [numFrets, setNumFrets] = useState<number>(12);
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [useFlats, setUseFlats] = useState<boolean>(false);
  const [showTipsModal, setShowTipsModal] = useState<boolean>(false);

  // Sidebar state - with localStorage persistence
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Get the stored value from localStorage, default to true if not found
    const stored = localStorage.getItem('notes_sidebarOpen');
    return stored === null ? true : stored === 'true';
  });

  // Quiz state
  const [quizMode, setQuizMode] = useState<QuizMode>('find-note');
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ string: number; fret: number }[]>([]);
  const [selectedNoteAnswer, setSelectedNoteAnswer] = useState<Note | null>(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [incorrectPositions, setIncorrectPositions] = useState<{ string: number; fret: number }[]>([]);
  const [selectedQuizStrings, setSelectedQuizStrings] = useState<number[]>([]);
  
  // Panel states
  const [fretboardSettingsOpen, setFretboardSettingsOpen] = useState(false);
  const [noteSelectionOpen, setNoteSelectionOpen] = useState(false);
  const [quizModeOpen, setQuizModeOpen] = useState(false);
  
  // Toggle note selection
  const toggleNote = (note: Note): void => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
      setAllSelected(false);
    } else {
      setSelectedNotes([...selectedNotes, note]);
      if (selectedNotes.length + 1 === allNotes.length) {
        setAllSelected(true);
      }
    }
  };

  // Toggle all notes
  const toggleAllNotes = (): void => {
    if (allSelected) {
      setSelectedNotes([]);
      setAllSelected(false);
    } else {
      setSelectedNotes([...allNotes]);
      setAllSelected(true);
    }
  };

  // Handle frets change
  const handleFretsChange = (count: number): void => {
    setNumFrets(count);
  };

  // Toggle flats/sharps
  const toggleFlats = (): void => {
    setUseFlats(!useFlats);
  };

  // Clear all selected notes
  const clearSelection = (): void => {
    setSelectedNotes([]);
    setAllSelected(false);
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('notes_sidebarOpen', newState.toString());
  };

  // String selection handlers
  const toggleQuizString = (stringIndex: number) => {
    if (selectedQuizStrings.includes(stringIndex)) {
      setSelectedQuizStrings(selectedQuizStrings.filter(s => s !== stringIndex));
    } else {
      setSelectedQuizStrings([...selectedQuizStrings, stringIndex]);
    }
  };

  const selectAllQuizStrings = () => {
    setSelectedQuizStrings([0, 1, 2, 3, 4, 5]);
  };

  const clearAllQuizStrings = () => {
    setSelectedQuizStrings([]);
  };

  // Quiz functions
  const generateQuizQuestion = (): QuizQuestion => {
    const randomNote = allNotes[Math.floor(Math.random() * allNotes.length)];

    // Use selected strings if any are selected, otherwise use all strings
    const stringsToUse = selectedQuizStrings.length > 0 ? selectedQuizStrings : [0, 1, 2, 3, 4, 5];

    if (quizMode === 'find-note') {
      // Find all positions where this note appears on selected strings
      const correctPositions: { string: number; fret: number }[] = [];
      stringsToUse.forEach((stringIndex) => {
        for (let fret = 0; fret <= numFrets; fret++) {
          if (getNoteAtPosition(standardTuning[stringIndex], fret) === randomNote) {
            correctPositions.push({ string: stringIndex, fret });
          }
        }
      });

      return {
        note: randomNote,
        mode: quizMode,
        correctPositions,
        selectedStrings: selectedQuizStrings.length > 0 ? selectedQuizStrings : undefined
      };
    } else {
      // Pick a random position from selected strings and find what note it is
      const randomStringIndex = stringsToUse[Math.floor(Math.random() * stringsToUse.length)];
      const fret = Math.floor(Math.random() * (numFrets + 1));
      const note = getNoteAtPosition(standardTuning[randomStringIndex], fret);

      return {
        note,
        mode: quizMode,
        targetPosition: { string: randomStringIndex, fret },
        selectedStrings: selectedQuizStrings.length > 0 ? selectedQuizStrings : undefined
      };
    }
  };

  const startQuiz = () => {
    setQuizState('active');
    setQuestionNumber(1);
    setScore(0);
    setUserAnswers([]);
    setSelectedNoteAnswer(null);
    // Clear selected notes from before quiz
    setSelectedNotes([]);
    setAllSelected(false);
    // Close other panels and open quiz mode
    setFretboardSettingsOpen(false);
    setNoteSelectionOpen(false);
    setQuizModeOpen(true);
    const question = generateQuizQuestion();
    setCurrentQuestion(question);
  };

  const endQuiz = () => {
    setQuizState('completed');
    setShowScoreModal(true);
  };

  const nextQuestion = () => {
    if (questionNumber >= 12) {
      endQuiz();
    } else {
      setQuestionNumber(questionNumber + 1);
      setUserAnswers([]);
      setSelectedNoteAnswer(null);
      setIncorrectPositions([]);
      const question = generateQuizQuestion();
      setCurrentQuestion(question);
    }
  };

  const handleFretboardClick = (stringIndex: number, fret: number) => {
    if (quizState !== 'active' || !currentQuestion) return;

    if (currentQuestion.mode === 'find-note') {
      const position = { string: stringIndex, fret };
      if (userAnswers.some(answer => answer.string === stringIndex && answer.fret === fret)) {
        // Remove if already selected
        setUserAnswers(userAnswers.filter(answer =>
          !(answer.string === stringIndex && answer.fret === fret)
        ));
      } else {
        // Add to answers
        setUserAnswers([...userAnswers, position]);
      }
    }
  };

  const submitAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;

    if (currentQuestion.mode === 'find-note') {
      // Check if all correct positions are selected and no incorrect ones
      const questionCorrectPositions = currentQuestion.correctPositions || [];

      // Find positions that are correct (user selected and are actually correct)
      const userCorrectSelections = userAnswers.filter(answer =>
        questionCorrectPositions.some(pos => pos.string === answer.string && pos.fret === answer.fret)
      );

      // Find positions that are incorrect (user selected but are not correct)
      const userIncorrectSelections = userAnswers.filter(answer =>
        !questionCorrectPositions.some(pos => pos.string === answer.string && pos.fret === answer.fret)
      );

      // For feedback display, we want to show:
      // - All correct positions (both selected and missed) in green
      // - User's incorrect selections in red
      setIncorrectPositions(userIncorrectSelections); // Only user's incorrect selections

      // Answer is correct only if all correct positions are selected and no incorrect ones
      isCorrect = userCorrectSelections.length === questionCorrectPositions.length && userIncorrectSelections.length === 0;
    } else if (currentQuestion.mode === 'name-note') {
      // Check if the selected note matches the target note
      isCorrect = selectedNoteAnswer === currentQuestion.note;
      setIncorrectPositions([]);
    }

    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const proceedToNext = () => {
    setShowFeedback(false);
    nextQuestion();
  };

  const quitQuiz = () => {
    setQuizState('idle');
    setQuestionNumber(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedNoteAnswer(null);
    setCurrentQuestion(null);
    setShowScoreModal(false);
    setShowFeedback(false);
    setLastAnswerCorrect(false);
    setIncorrectPositions([]);
    // Clear selected notes and close quiz mode
    setSelectedNotes([]);
    setAllSelected(false);
    setQuizModeOpen(false);
  };

  const restartQuiz = () => {
    setQuizState('idle');
    setQuestionNumber(0);
    setScore(0);
    setUserAnswers([]);
    setSelectedNoteAnswer(null);
    setCurrentQuestion(null);
    setShowScoreModal(false);
    setShowFeedback(false);
    setLastAnswerCorrect(false);
    setIncorrectPositions([]);
    // Clear selected notes and close quiz mode
    setSelectedNotes([]);
    setAllSelected(false);
    setQuizModeOpen(false);
  };

  // Import the getNoteAtPosition function
  const getNoteAtPosition = (stringNote: string, fret: number): Note => {
    const noteIndex = allNotes.indexOf(stringNote as Note);
    if (noteIndex === -1) return 'C';
    return allNotes[(noteIndex + fret) % 12] as Note;
  };

  // Function to display note with both sharp and flat notation
  const displayNoteWithBothNotations = (note: Note): string => {
    const sharp = note;
    const flat = displayNote(note, true);
    return sharp === flat ? sharp : `${sharp}/${flat}`;
  };

  // Function to format selected strings display
  const formatSelectedStrings = (stringIndices: number[]): string => {
    if (stringIndices.length === 0) return '';

    const stringLabels = stringIndices
      .sort((a, b) => a - b) // Sort by string index (6, 5, 4, 3, 2, 1)
      .map(index => `${6 - index}(${standardTuning[index]})`)
      .join(', ');

    return `: ${stringLabels}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row relative h-full">
        {/* Left Side - Fretboard */}
        <div 
          className={`
            transition-all duration-300 ease-in-out bg-gray-50
            flex-grow w-full h-full p-4 md:p-6 flex flex-col
            ${sidebarOpen ? 'md:w-2/3' : 'md:w-full'}
          `}
        >
          {/* Toggle button for desktop when controls are hidden */}
          {!sidebarOpen && (
            <div className="hidden md:block absolute top-4 right-4 z-10">
              <button
                onClick={toggleSidebar}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                           px-3 py-1.5 rounded-md shadow-md transition-all
                           flex items-center gap-1"
                aria-label="Show Controls"
              >
                <span className="text-lg leading-none">←</span> Show Controls
              </button>
            </div>
          )}
          
          <div className="h-full flex items-center justify-center mb-4">
            <Fretboard
              numFrets={numFrets}
              strings={standardTuning}
              selectedNotes={selectedNotes}
              useFlats={useFlats}
              noteColors={noteColors}
              displayMode="notes"
              quizState={quizState}
              currentQuestion={currentQuestion}
              userAnswers={userAnswers}
              incorrectPositions={incorrectPositions}
              showFeedback={showFeedback}
              onFretboardClick={handleFretboardClick}
            />
          </div>
          
          {/* Mobile-only toggle button - below the fretboard */}
          <div className="md:hidden w-full flex justify-center mt-4">
            <button
              onClick={toggleSidebar}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                         px-4 py-2 rounded-md shadow-md z-10 transition-all
                         flex items-center gap-1 w-full justify-center"
              aria-label={sidebarOpen ? 'Hide Controls' : 'Show Controls'}
            >
              {sidebarOpen ? 'Hide Controls' : 'Show Controls'}
            </button>
          </div>
        </div>

        {/* Right Side - Controls */}
        {sidebarOpen && (
          <div className="
            w-full md:w-1/3 md:min-w-[320px] bg-white
            border-t md:border-t-0 md:border-l border-gray-200 p-4 md:p-6 
            flex flex-col gap-4 overflow-y-auto relative
          ">
            {/* Desktop toggle button - inside the sidebar */}
            <div className="hidden md:block">
              <button
                onClick={toggleSidebar}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm
                           px-3 py-1.5 rounded-md shadow-md z-10 transition-all
                           flex items-center gap-1"
                aria-label="Hide Controls"
              >
                Hide Controls <span className="text-lg leading-none">→</span>
              </button>
            </div>
            
            <CollapsiblePanel 
              title="Fretboard Settings" 
              defaultOpen={false}
              isOpen={fretboardSettingsOpen}
              onToggle={() => setFretboardSettingsOpen(!fretboardSettingsOpen)}
            >
              <FretboardSettings 
                numFrets={numFrets}
                onFretsChange={handleFretsChange}
              />
            </CollapsiblePanel>
            
            <CollapsiblePanel 
              title="Note Selection" 
              defaultOpen={false}
              isOpen={noteSelectionOpen}
              onToggle={() => setNoteSelectionOpen(!noteSelectionOpen)}
            >
              <NoteSelector 
                selectedNotes={selectedNotes}
                useFlats={useFlats}
                allSelected={allSelected}
                onToggleNote={toggleNote}
                onToggleAllNotes={toggleAllNotes}
                onClearSelection={clearSelection}
                onFlatsToggle={toggleFlats}
              />
            </CollapsiblePanel>
            
            <CollapsiblePanel 
              title="Quiz Mode" 
              defaultOpen={false}
              isOpen={quizModeOpen}
              onToggle={() => setQuizModeOpen(!quizModeOpen)}
            >
              <div className="space-y-4">
                {quizState === 'active' && currentQuestion && !showFeedback && (
                  <>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">
                        Question {questionNumber} of 12
                      </div>
                      <div className="text-lg font-semibold text-gray-800">
                        {quizMode === 'find-note'
                          ? `Find all ${displayNote(currentQuestion.note, useFlats)} positions${
                              selectedQuizStrings.length > 0
                                ? ` on selected strings${formatSelectedStrings(selectedQuizStrings)}`
                                : ''
                            }`
                          : `What note is highlighted on the fretboard?${
                              selectedQuizStrings.length > 0
                                ? ` (selected strings${formatSelectedStrings(selectedQuizStrings)})`
                                : ''
                            }`
                        }
                      </div>
                    </div>
                    
                    {quizMode === 'name-note' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2">
                          {allNotes.map(note => (
                            <button
                              key={note}
                              onClick={() => setSelectedNoteAnswer(note)}
                              className={`px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                                selectedNoteAnswer === note
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {displayNoteWithBothNotations(note)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center space-y-2">
                      <button
                        onClick={submitAnswer}
                        disabled={quizMode === 'name-note' && !selectedNoteAnswer}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium"
                      >
                        Submit Answer
                      </button>
                      <div>
                        <button
                          onClick={quitQuiz}
                          className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                          Quit Quiz
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {showFeedback && currentQuestion && (
                  <div className="text-center space-y-4">
                    <div className={`text-2xl font-bold ${lastAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {lastAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    
                    {!lastAnswerCorrect && (
                      <div className="text-lg text-gray-700">
                        <div className="mb-2">The correct answer is:</div>
                        <div className="font-bold text-indigo-600">
                          {displayNote(currentQuestion.note, useFlats)}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={proceedToNext}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
                    >
                      {questionNumber >= 12 ? 'See Results' : 'Next Question'}
                    </button>
                  </div>
                )}
                
                {quizState !== 'active' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quiz Mode
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="quizMode"
                            value="find-note"
                            checked={quizMode === 'find-note'}
                            onChange={(e) => setQuizMode(e.target.value as QuizMode)}
                            className="mr-2"
                          />
                          Find the Note
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="quizMode"
                            value="name-note"
                            checked={quizMode === 'name-note'}
                            onChange={(e) => setQuizMode(e.target.value as QuizMode)}
                            className="mr-2"
                          />
                          Name the Note
                        </label>
                      </div>
                    </div>

                    <div>
                      <StringSelector
                        selectedStrings={selectedQuizStrings}
                        onToggleString={toggleQuizString}
                        onSelectAll={selectAllQuizStrings}
                        onClearAll={clearAllQuizStrings}
                        strings={standardTuning}
                      />
                    </div>

                    <button
                      onClick={startQuiz}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
              </div>
            </CollapsiblePanel>
            
            <CollapsiblePanel title="How to Use" defaultOpen={true}>
              <HowToUse 
                onShowTips={() => setShowTipsModal(true)} 
                tipType="notes"
              />
            </CollapsiblePanel>
          </div>
        )}
      </div>
      
      <TipsModal 
        isOpen={showTipsModal} 
        onClose={() => setShowTipsModal(false)}
        tipType="notes" 
      />
      
      {/* Score Modal */}
      {showScoreModal && (
        <div className="fixed inset-0 bg-neutral-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Quiz Complete!</h2>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {score} out of 12
              </div>
              <div className="text-lg text-gray-600">
                {Math.round((score / 12) * 100)}% correct
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => setShowScoreModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;