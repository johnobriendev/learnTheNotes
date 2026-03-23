// src/pages/GuitarLessonsPage.tsx
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

interface LessonCard {
  title: string;
  description: string;
  path: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const difficultyStyle = {
  beginner: { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` },
  intermediate: { background: colors.medNavy, color: colors.cream, border: 'none' },
  advanced: { background: colors.darkNavy, color: colors.cream, border: 'none' },
};

const GuitarLessonsPage = () => {
  const navigate = useNavigate();

  const lessons: LessonCard[] = [
    {
      title: 'Learn the Same Phrase in Different Positions',
      description: 'Play C, D, and E across all strings and positions to build fretboard awareness.',
      path: '/lessons/first-three-notes',
      difficulty: 'intermediate'
    },
    {
      title: 'Learning the String Names',
      description: 'Learn the names and numbers of all six strings — the foundation for reading any guitar diagram.',
      path: '/lessons/string-names',
      difficulty: 'beginner'
    },
    {
      title: 'The Grid',
      description: 'Understand how any note on the fretboard can be described by its string and fret number.',
      path: '/lessons/the-grid',
      difficulty: 'beginner'
    },
    {
      title: 'Open C Major Chord and Scale',
      description: 'Learn the open C major chord shape and the C major scale in first position.',
      path: '/lessons/c-major-chord-and-scale',
      difficulty: 'beginner'
    },
    {
      title: 'Learn the Major Scale on One String',
      description: 'Master the C major scale on the B string - a perfect introduction to scale patterns.',
      path: '/lessons/major-scale-one-string',
      difficulty: 'beginner'
    },
    {
      title: 'Switching Between Scale Patterns',
      description: 'Learn to transition smoothly between 3-notes-per-string patterns in G major.',
      path: '/lessons/switching-scale-patterns',
      difficulty: 'intermediate'
    },
    {
      title: 'Two Note Per String Arpeggios',
      description: 'Master G major 7 arpeggios using two-note-per-string patterns.',
      path: '/lessons/two-note-arpeggios',
      difficulty: 'intermediate'
    },
    {
      title: 'Learn the Fretboard with Triads',
      description: 'Learn C major triads across the fretboard using full voicings and three-string shapes.',
      path: '/lessons/fretboard-triads',
      difficulty: 'intermediate'
    },
    {
      title: 'Root Position Seventh Chords',
      description: 'Learn drop 2 (5th string root) and drop 3 (6th string root) seventh chord voicings.',
      path: '/lessons/root-position-seventh-chords',
      difficulty: 'intermediate'
    },
    {
      title: 'F6/Dm7 Arpeggio',
      description: 'Learn F6/Dm7 arpeggio across two positions on the fretboard.',
      path: '/lessons/f6-dm7-arpeggio',
      difficulty: 'intermediate'
    },
    {
      title: 'Drop 2 Minor Seventh Voicings (Cm7)',
      description: 'Learn drop 2 minor seventh chord voicings across all string sets.',
      path: '/lessons/drop2-minor-seventh-voicings',
      difficulty: 'advanced'
    },
    {
      title: 'Drop 2 Dominant Seventh Voicings (Bb7)',
      description: 'Learn drop 2 dominant seventh chord voicings across all string sets.',
      path: '/lessons/drop2-dominant-seventh-voicings',
      difficulty: 'advanced'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {lessons.map((lesson) => (
        <div
          key={lesson.path}
          onClick={() => navigate(lesson.path)}
          className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
        >
          <div className="p-6">
            {lesson.difficulty && (
              <span
                className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3"
                style={difficultyStyle[lesson.difficulty]}
              >
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </span>
            )}
            <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: colors.darkNavy }}>
              {lesson.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
              {lesson.description}
            </p>
            <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.medNavy }}>
              Start Lesson
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuitarLessonsPage;
