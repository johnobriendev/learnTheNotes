// src/pages/LessonsPage.tsx
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

const LessonsPage = () => {
  const navigate = useNavigate();

  const lessons: LessonCard[] = [
    {
      title: 'Learning Your First Three Notes',
      description: 'Start by learning C, D, and E on all strings.',
      path: '/lessons/first-three-notes',
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

export default LessonsPage;
