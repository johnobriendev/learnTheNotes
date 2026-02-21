// src/pages/LandingPage.tsx
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Guitar Lessons',
      description: 'Structured lessons combining all concepts into a comprehensive learning path. Perfect for beginners and intermediate players.',
      icon: '📚',
      path: '/lessons',
    },
    {
      title: 'Learn the Notes on the Fretboard',
      description: 'Master the fretboard by learning where every note lives. Interactive visualization and quiz modes to test your knowledge.',
      icon: '🎵',
      path: '/notes',
    },
    {
      title: 'Learn the Triads on the Fretboard',
      description: 'Learn major, minor, diminished, and augmented triads across the entire fretboard with multiple voicings.',
      icon: '🎸',
      path: '/triads',
    },
    {
      title: 'Learn Scale Patterns for Guitar',
      description: 'Explore scale patterns, positions, and fingerings. Practice scales in any key with visual guides.',
      icon: '🎼',
      path: '/scales',
    },
    {
      title: 'Learn the Key Signatures with the Circle of Fifths',
      description: 'Understand key signatures, the circle of fifths, and relationships between keys.',
      icon: '🔑',
      path: '/keys',
    },
    {
      title: 'Ear Training with Intervals',
      description: 'Train your ear and learn to identify intervals by sight and sound on the guitar.',
      icon: '🎹',
      path: '/intervals',
    },
    {
      title: 'Music Theory Quizzes',
      description: 'Test your music theory knowledge with interactive quizzes on key signatures, intervals, triads, and more.',
      icon: '🧠',
      path: '/quizzes',
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ background: colors.darkNavy }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6" style={{ color: colors.cream }}>
          You Can Learn Guitar
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: colors.sage }}>
          Learn at your own pace with interactive tools to help you visualize, practice, and truly understand
          the fretboard with built-in quizzes and exercises.
        </p>
        <button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-semibold px-10 py-4 rounded-lg text-lg transition-all transform hover:scale-105 hover:opacity-90"
          style={{ background: colors.medNavy, color: colors.cream, border: `2px solid ${colors.sage}` }}
        >
          Start Learning
        </button>
        <div className="mt-16 animate-bounce" style={{ color: colors.sage }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.path}
              onClick={() => navigate(feature.path)}
              className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
            >
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: colors.darkNavy }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
                  {feature.description}
                </p>
                <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.medNavy }}>
                  Explore
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
