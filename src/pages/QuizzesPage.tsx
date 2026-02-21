// src/pages/QuizzesPage.tsx
import { useNavigate } from 'react-router-dom';

interface QuizCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  comingSoon: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface QuizSection {
  title: string;
  icon: string;
  quizzes: QuizCard[];
}

const QuizzesPage = () => {
  const navigate = useNavigate();

  const sections: QuizSection[] = [
    {
      title: 'Keys',
      icon: '🔑',
      quizzes: [
        {
          title: 'Major Key Signatures',
          description: 'Identify key signatures from key names and vice versa.',
          icon: '🎼',
          path: '/quizzes/major-key-signatures',
          color: 'from-orange-500 to-red-600',
          comingSoon: false,
          difficulty: 'beginner'
        }
      ]
    },
    {
      title: 'Intervals',
      icon: '📏',
      quizzes: [
        {
          title: 'Interval Recognition',
          description: 'Identify intervals by name and size.',
          icon: '🎵',
          path: '/quizzes/intervals',
          color: 'from-blue-500 to-indigo-600',
          comingSoon: true
        }
      ]
    },
    {
      title: 'Triads',
      icon: '🎸',
      quizzes: [
        {
          title: 'Triads',
          description: 'Given a triad, identify its notes — or given notes, name the triad. Augmented triads accept all enharmonic roots.',
          icon: '🎶',
          path: '/quizzes/triads',
          color: 'from-purple-500 to-pink-600',
          comingSoon: false,
          difficulty: 'intermediate' as const
        }
      ]
    },
    {
      title: 'Chords',
      icon: '🎹',
      quizzes: [
        {
          title: 'Chords in the Major Key',
          description: 'Identify diatonic chords by Roman numeral across all major keys — both directions.',
          icon: '🎼',
          path: '/quizzes/chords-in-major-key',
          color: 'from-green-500 to-teal-600',
          comingSoon: false,
          difficulty: 'intermediate' as const
        }
      ]
    }
  ];

  const difficultyBadge = (difficulty?: string) => {
    if (!difficulty) return null;
    const styles: Record<string, string> = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[difficulty]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Music Theory Quizzes</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Test and reinforce your music theory knowledge with interactive quizzes. Answer with buttons — no typing required.
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>{section.icon}</span>
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.quizzes.map((quiz) => (
                <div
                  key={quiz.path}
                  onClick={() => !quiz.comingSoon && navigate(quiz.path)}
                  className={`group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all
                           duration-300 transform hover:-translate-y-1 overflow-hidden
                           ${quiz.comingSoon ? 'cursor-default opacity-75' : 'cursor-pointer'}`}
                >
                  <div className={`h-2 bg-gradient-to-r ${quiz.color}`} />
                  <div className="p-6 relative">
                    <div className="absolute top-3 right-3 flex gap-2">
                      {quiz.difficulty && difficultyBadge(quiz.difficulty)}
                      {quiz.comingSoon && (
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div className={`text-4xl mb-3 transition-transform ${!quiz.comingSoon && 'transform group-hover:scale-110'}`}>
                      {quiz.icon}
                    </div>
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors ${!quiz.comingSoon && 'group-hover:text-indigo-600'}`}>
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{quiz.description}</p>
                    {!quiz.comingSoon && (
                      <div className="mt-4 text-indigo-600 text-sm font-semibold flex items-center gap-2">
                        Start Quiz
                        <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesPage;
