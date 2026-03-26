// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GuitarLessonsPage from './pages/GuitarLessonsPage';
import FirstThreeNotes from './pages/guitar-lessons/FirstThreeNotes';
import MSOneString from './pages/guitar-lessons/MSOneString';
import SwitchingScalePatterns from './pages/guitar-lessons/SwitchingScalePatterns';
import TwoNoteArpeggios from './pages/guitar-lessons/TwoNoteArpeggios';
import FretboardTriads from './pages/guitar-lessons/FretboardTriads';
import RootPositionSeventhChords from './pages/guitar-lessons/RootPositionSeventhChords';
import F6Dm7Arpeggio from './pages/guitar-lessons/F6Dm7Arpeggio';
import Drop2MinorSeventhVoicings from './pages/guitar-lessons/Drop2MinorSeventhVoicings';
import Drop2DominantSeventhVoicings from './pages/guitar-lessons/Drop2DominantSeventhVoicings';
import StringNames from './pages/guitar-lessons/StringNames';
import TheGrid from './pages/guitar-lessons/TheGrid';
import CMajorChordAndScale from './pages/guitar-lessons/CMajorChordAndScale';
import HowToReadChordDiagrams from './pages/guitar-lessons/HowToReadChordDiagrams';
import NotesPage from './pages/NotesPage';
import TriadsPage from './pages/TriadsPage';
import ScalePage from './pages/ScalePage';
import KeysPage from './pages/KeysPage';
import IntervalTrainerPage from './pages/IntervalTrainerPage';
import QuizzesPage from './pages/QuizzesPage';
import MusicTheoryPage from './pages/MusicTheoryPage';
import MajorScaleHarmony from './pages/music-theory/MajorScaleHarmony';
import BuildingSeventhChords from './pages/music-theory/BuildingSeventhChords';
import MajorKeySignaturesQuiz from './pages/quizzes/MajorKeySignaturesQuiz';
import ChordsInMajorKeyQuiz from './pages/quizzes/ChordsInMajorKeyQuiz';
import TriadsQuiz from './pages/quizzes/TriadsQuiz';
import PathsPage from './pages/PathsPage';
import BeginnerPathPage from './pages/paths/BeginnerPathPage';
import IntermediatePathPage from './pages/paths/IntermediatePathPage';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const pageTitles: Record<string, string> = {
  '/lessons': 'Guitar Lessons',
  '/lessons/string-names': 'Learning the String Names',
  '/lessons/the-grid': 'The Grid',
  '/lessons/c-major-chord-and-scale': 'Open C Major Chord and Scale',
  '/lessons/how-to-read-chord-diagrams': 'How to Read Chord Diagrams',
  '/lessons/first-three-notes': 'Learn the Same Phrase in Different Positions',
  '/lessons/major-scale-one-string': 'Learn the Major Scale on One String',
  '/lessons/switching-scale-patterns': 'Switching Between Scale Patterns',
  '/lessons/two-note-arpeggios': 'Two Note Per String Arpeggios',
  '/lessons/fretboard-triads': 'Learn the Fretboard with Triads',
  '/lessons/root-position-seventh-chords': 'Root Position Seventh Chords',
  '/lessons/f6-dm7-arpeggio': 'F6/Dm7 Arpeggio',
  '/lessons/drop2-minor-seventh-voicings': 'Drop 2 Minor Seventh Voicings (Cm7)',
  '/lessons/drop2-dominant-seventh-voicings': 'Drop 2 Dominant Seventh Voicings (Bb7)',
  '/notes': 'Learn the Notes',
  '/triads': 'Triad Visualizer',
  '/scales': 'Scale Patterns for Guitar',
  '/keys': 'Key Signatures with the Circle of Fifths',
  '/intervals': 'Ear Training with Intervals',
  '/paths': 'Guided Learning Paths',
  '/paths/beginner': 'Beginner Path',
  '/paths/intermediate': 'Intermediate Path',
  '/music-theory': 'Music Theory Lessons',
  '/music-theory/major-scale-harmony': 'Major Scale Harmony',
  '/music-theory/building-seventh-chords': 'Building 7th Chords',
  '/quizzes': 'Music Theory Quizzes',
  '/quizzes/major-key-signatures': 'Major Key Signatures Quiz',
  '/quizzes/chords-in-major-key': 'Chords in Major Key Quiz',
  '/quizzes/triads': 'Triads Quiz',
};

const navSections = [
  {
    label: 'Fretboard Tools',
    items: [
      { path: '/notes', label: 'Learn the Notes' },
      { path: '/triads', label: 'Triad Visualizer' },
      { path: '/scales', label: 'Scale Patterns for Guitar' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { path: '/lessons', label: 'Guitar Lessons' },
      { path: '/music-theory', label: 'Music Theory' },
      { path: '/intervals', label: 'Ear Training' },
      { path: '/quizzes', label: 'Quizzes' },
      { path: '/paths', label: 'Guided Learning Paths' },
    ],
  },
];

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
        style={{ color: colors.sage, background: isOpen ? colors.medNavy : 'transparent' }}
      >
        Menu
        <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-50 mt-2 w-80 rounded-lg shadow-lg py-1 border"
          style={{ background: colors.darkNavy, borderColor: colors.medNavy }}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-opacity-50"
            style={{ color: location.pathname === '/' ? colors.cream : colors.sage }}
            onMouseEnter={e => (e.currentTarget.style.background = colors.medNavy)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            onClick={() => handleNavigate('/')}
          >
            Home
          </button>
          {navSections.map((section) => (
            <div key={section.label}>
              <div className="my-1 border-t" style={{ borderColor: colors.medNavy }} />
              <div className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.sage, opacity: 0.6 }}>
                {section.label}
              </div>
              {section.items.map(item => (
                <button
                  key={item.path}
                  className="block w-full text-left px-4 py-2 text-sm transition-colors"
                  style={{ color: location.pathname.startsWith(item.path) ? colors.cream : colors.sage }}
                  onMouseEnter={e => (e.currentTarget.style.background = colors.medNavy)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RootLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <Outlet key={location.key} />;
  }

  const title = pageTitles[location.pathname] || '';

  return (
    <div className="flex flex-col min-h-screen" style={{ background: colors.lightGray }}>
      <header
        className="flex items-center px-4 py-2 border-b"
        style={{ background: colors.darkNavy, borderColor: colors.medNavy, position: 'relative' }}
      >
        {/* Dropdown on the left */}
        <div style={{ position: 'absolute', left: '16px' }}>
          <NavDropdown />
        </div>

        {/* Title centered across full header */}
        <div className="flex-1 text-center">
          <span className="font-bold text-base" style={{ color: colors.cream }}>{title}</span>
        </div>
      </header>

      <main className="flex-1 w-full px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8">
        <Outlet key={location.key} />
      </main>
    </div>
  );
};

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
    <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      Go Home
    </Link>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'lessons', element: <GuitarLessonsPage /> },
      { path: 'music-theory', element: <MusicTheoryPage /> },
      { path: 'music-theory/major-scale-harmony', element: <MajorScaleHarmony /> },
      { path: 'music-theory/building-seventh-chords', element: <BuildingSeventhChords /> },
      { path: 'lessons/string-names', element: <StringNames /> },
      { path: 'lessons/the-grid', element: <TheGrid /> },
      { path: 'lessons/c-major-chord-and-scale', element: <CMajorChordAndScale /> },
      { path: 'lessons/how-to-read-chord-diagrams', element: <HowToReadChordDiagrams /> },
      { path: 'lessons/first-three-notes', element: <FirstThreeNotes /> },
      { path: 'lessons/major-scale-one-string', element: <MSOneString /> },
      { path: 'lessons/switching-scale-patterns', element: <SwitchingScalePatterns /> },
      { path: 'lessons/two-note-arpeggios', element: <TwoNoteArpeggios /> },
      { path: 'lessons/fretboard-triads', element: <FretboardTriads /> },
      { path: 'lessons/root-position-seventh-chords', element: <RootPositionSeventhChords /> },
      { path: 'lessons/f6-dm7-arpeggio', element: <F6Dm7Arpeggio /> },
      { path: 'lessons/drop2-minor-seventh-voicings', element: <Drop2MinorSeventhVoicings /> },
      { path: 'lessons/drop2-dominant-seventh-voicings', element: <Drop2DominantSeventhVoicings /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'triads', element: <TriadsPage /> },
      { path: 'scales', element: <ScalePage /> },
      { path: 'keys', element: <KeysPage /> },
      { path: 'intervals', element: <IntervalTrainerPage /> },
      { path: 'quizzes', element: <QuizzesPage /> },
      { path: 'quizzes/major-key-signatures', element: <MajorKeySignaturesQuiz /> },
      { path: 'quizzes/chords-in-major-key', element: <ChordsInMajorKeyQuiz /> },
      { path: 'quizzes/triads', element: <TriadsQuiz /> },
      { path: 'paths', element: <PathsPage /> },
      { path: 'paths/beginner', element: <BeginnerPathPage /> },
      { path: 'paths/intermediate', element: <IntermediatePathPage /> },
    ]
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
