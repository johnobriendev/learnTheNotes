// src/pages/LandingPage.tsx
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Lessons',
      description: 'Structured lessons combining all concepts into a comprehensive learning path. Perfect for beginners and intermediate players.',
      icon: '📚',
      path: '/lessons',
      color: 'from-cyan-500 to-blue-600',
      comingSoon: false
    },
    {
      title: 'Notes',
      description: 'Master the fretboard by learning where every note lives. Interactive visualization and quiz modes to test your knowledge.',
      icon: '🎵',
      path: '/notes',
      color: 'from-blue-500 to-indigo-600',
      comingSoon: false
    },
    {
      title: 'Triads',
      description: 'Learn major, minor, diminished, and augmented triads across the entire fretboard with multiple voicings.',
      icon: '🎸',
      path: '/triads',
      color: 'from-purple-500 to-pink-600',
      comingSoon: false
    },
    {
      title: 'Scales',
      description: 'Explore scale patterns, positions, and fingerings. Practice scales in any key with visual guides.',
      icon: '🎼',
      path: '/scales',
      color: 'from-green-500 to-teal-600',
      comingSoon: false
    },
    {
      title: 'Keys',
      description: 'Understand key signatures, the circle of fifths, and relationships between keys.',
      icon: '🔑',
      path: '/keys',
      color: 'from-orange-500 to-red-600',
      comingSoon: false
    },
    {
      title: 'Intervals',
      description: 'Train your ear and learn to identify intervals by sight and sound on the guitar.',
      icon: '🎹',
      path: '/intervals',
      color: 'from-yellow-500 to-orange-600',
      comingSoon: false
    },
    {
      title: 'Quizzes',
      description: 'Test your music theory knowledge with interactive quizzes on key signatures, intervals, triads, and more.',
      icon: '🧠',
      path: '/quizzes',
      color: 'from-violet-500 to-purple-600',
      comingSoon: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-8 sm:pt-12">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-3 sm:mb-4">
            You Can Learn Guitar
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Learn at your own pace with interactive tools to help you visualize, practice, and truly understand
            the fretboard with built-in quizzes and exercises.
          </p>
          <button
            onClick={() => navigate('/lessons')}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                     px-8 py-3 rounded-lg text-lg transition-all transform hover:scale-105
                     shadow-lg hover:shadow-xl"
          >
            Start Learning
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.path}
              onClick={() => !feature.comingSoon && navigate(feature.path)}
              className={`group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all
                       duration-300 transform hover:-translate-y-1 overflow-hidden
                       ${feature.comingSoon ? 'cursor-default opacity-75' : 'cursor-pointer'}`}
            >
              {/* Color gradient header */}
              <div className={`h-2 bg-gradient-to-r ${feature.color}`} />

              <div className="p-5 relative">
                {feature.comingSoon && (
                  <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
                <div className={`text-4xl mb-3 transition-transform ${!feature.comingSoon && 'transform group-hover:scale-110'}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors ${!feature.comingSoon && 'group-hover:text-indigo-600'}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
                {!feature.comingSoon && (
                  <div className="mt-3 text-indigo-600 text-sm font-semibold flex items-center gap-2">
                    Explore {feature.title}
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
