// src/pages/LessonsPage.tsx
import { useNavigate } from 'react-router-dom';

interface LessonCard {
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  comingSoon: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const LessonsPage = () => {
  const navigate = useNavigate();

  const lessons: LessonCard[] = [
    {
      title: 'Learning Your First Three Notes',
      description: 'Start by learning C, D, and E on all strings.',
      icon: '🎸',
      path: '/lessons/first-three-notes',
      color: 'from-blue-500 to-indigo-600',
      comingSoon: false,
      difficulty: 'beginner'
    },
    {
      title: 'Learn the Major Scale on One String',
      description: 'Master the C major scale on the B string - a perfect introduction to scale patterns.',
      icon: '🎵',
      path: '/lessons/major-scale-one-string',
      color: 'from-green-500 to-emerald-600',
      comingSoon: false,
      difficulty: 'beginner'
    },
    {
      title: 'Switching Between Scale Patterns',
      description: 'Learn to transition smoothly between 3-notes-per-string patterns in G major.',
      icon: '🔄',
      path: '/lessons/switching-scale-patterns',
      color: 'from-purple-500 to-violet-600',
      comingSoon: false,
      difficulty: 'intermediate'
    },
    {
      title: 'Two Note Per String Arpeggios',
      description: 'Master G major 7 arpeggios using two-note-per-string patterns.',
      icon: '🎹',
      path: '/lessons/two-note-arpeggios',
      color: 'from-pink-500 to-rose-600',
      comingSoon: false,
      difficulty: 'intermediate'
    },
    {
      title: 'Learn the Fretboard with Triads',
      description: 'Learn C major triads across the fretboard using full voicings and three-string shapes.',
      icon: '🎶',
      path: '/lessons/fretboard-triads',
      color: 'from-amber-500 to-orange-600',
      comingSoon: false,
      difficulty: 'intermediate'
    },
    // Future lessons will be added here
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Lessons
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Structured lessons that combine notes, triads, scales, and more into a comprehensive learning path.
          Perfect for building your guitar knowledge step by step.
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Lessons Coming Soon
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We're working on creating comprehensive lessons that will guide you through
            mastering the guitar. Check back soon!
          </p>
          <p className="text-sm text-gray-500">
            In the meantime, explore the individual topics from the navigation menu above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.path}
              onClick={() => !lesson.comingSoon && navigate(lesson.path)}
              className={`group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all
                       duration-300 transform hover:-translate-y-1 overflow-hidden
                       ${lesson.comingSoon ? 'cursor-default opacity-75' : 'cursor-pointer'}`}
            >
              {/* Color gradient header */}
              <div className={`h-2 bg-gradient-to-r ${lesson.color}`} />

              <div className="p-6 relative">
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {lesson.difficulty && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full
                      ${lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : ''}
                      ${lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${lesson.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                    </span>
                  )}
                  {lesson.comingSoon && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className={`text-4xl mb-3 transition-transform ${!lesson.comingSoon && 'transform group-hover:scale-110'}`}>
                  {lesson.icon}
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors ${!lesson.comingSoon && 'group-hover:text-indigo-600'}`}>
                  {lesson.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lesson.description}
                </p>
                {!lesson.comingSoon && (
                  <div className="mt-4 text-indigo-600 text-sm font-semibold flex items-center gap-2">
                    Start Lesson
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
