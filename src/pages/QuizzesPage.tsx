// src/pages/QuizzesPage.tsx
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const difficultyStyle: Record<string, React.CSSProperties> = {
  beginner: { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` },
  intermediate: { background: colors.medNavy, color: colors.cream },
  advanced: { background: colors.darkNavy, color: colors.cream },
};

interface QuizCard {
  title: string;
  description: string;
  path: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const QuizzesPage = () => {
  const navigate = useNavigate();

  const quizzes: QuizCard[] = [
    {
      title: 'Major Key Signatures',
      description: 'Identify key signatures from key names and vice versa.',
      path: '/quizzes/major-key-signatures',
      difficulty: 'beginner'
    },
    {
      title: 'Triads',
      description: 'Given a triad, identify its notes — or given notes, name the triad. Augmented triads accept all enharmonic roots.',
      path: '/quizzes/triads',
      difficulty: 'intermediate'
    },
    {
      title: 'Chords in the Major Key',
      description: 'Identify diatonic chords by Roman numeral across all major keys — both directions.',
      path: '/quizzes/chords-in-major-key',
      difficulty: 'intermediate'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {quizzes.map((quiz) => (
        <div
          key={quiz.path}
          onClick={() => navigate(quiz.path)}
          className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
        >
          <div className="p-6">
            {quiz.difficulty && (
              <span
                className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3"
                style={difficultyStyle[quiz.difficulty]}
              >
                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
              </span>
            )}
            <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: colors.darkNavy }}>
              {quiz.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
              {quiz.description}
            </p>
            <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.medNavy }}>
              Start Quiz
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizzesPage;
