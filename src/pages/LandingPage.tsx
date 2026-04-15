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

  const tools = [
    {
      title: 'Learn the Notes',
      description: 'Master the fretboard by learning where every note lives. Interactive visualization and quiz modes to test your knowledge.',
      path: '/notes',
    },
    {
      title: 'Triad Visualizer',
      description: 'Learn major, minor, diminished, and augmented triads across the entire fretboard with multiple voicings.',
      path: '/triads',
    },
    {
      title: 'Scale Patterns for Guitar',
      description: 'Explore scale patterns, positions, and fingerings. Practice scales in any key with visual guides.',
      path: '/scales',
    },
  ];

  const eduCards = [
    {
      title: 'Guitar Lessons',
      description: 'Structured lessons combining technique and theory — from your first notes to advanced voicings.',
      path: '/lessons',
    },
    {
      title: 'Music Theory',
      description: 'Understand the theory behind the music. Harmony, chord construction, key signatures, and more.',
      path: '/music-theory',
    },
    {
      title: 'Guided Learning Paths',
      description: 'Structured roadmaps for every level — follow step-by-step guides from beginner basics to intermediate techniques.',
      path: '/paths',
    },
    {
      title: 'Ear Training',
      description: 'Train your ear to identify intervals by sight and sound on the guitar.',
      path: '/intervals',
    },
    {
      title: 'Quizzes',
      description: 'Test your music theory knowledge with interactive quizzes on key signatures, triads, and more.',
      path: '/quizzes',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>
      {/* Hero */}
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ background: colors.darkNavy }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6" style={{ color: colors.cream }}>
          You Can Learn Guitar
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: colors.sage }}>
          Learn at your own pace with interactive tools that help you visualize the fretboard.
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

      {/* Beginner CTA */}
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.cream }}>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-lg font-bold uppercase tracking-widest mb-4" style={{ color: colors.sage }}>New to guitar?</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.darkNavy }}>
            Try our beginner course
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: colors.medNavy }}>
            A step-by-step path built for players just starting out — no experience required.
          </p>
          <button
            onClick={() => navigate('/paths/beginner')}
            className="font-semibold px-10 py-4 rounded-lg text-lg transition-all transform hover:scale-105 hover:opacity-90"
            style={{ background: colors.darkNavy, color: colors.cream, border: `2px solid ${colors.sage}` }}
          >
            Start the beginner path →
          </button>
        </div>
      </div>

      {/* Fretboard Tools */}
      <div id="features" className="min-h-screen flex items-center" style={{ background: colors.medNavy }}>
        <div className="max-w-6xl mx-auto px-4 py-16 w-full">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.cream }}>Fretboard Tools</h2>
          <p className="text-sm mb-8" style={{ color: colors.sage }}>Interactive visualizers to explore the guitar neck</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <div
                key={tool.path}
                onClick={() => navigate(tool.path)}
                className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                style={{ background: colors.darkNavy, border: `1px solid ${colors.sage}` }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: colors.cream }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.sage }}>
                    {tool.description}
                  </p>
                  <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.sage }}>
                    Open Tool
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learn */}
      <div className="min-h-screen flex items-center" style={{ background: colors.cream }}>
        <div className="max-w-6xl mx-auto px-4 py-16 w-full">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.darkNavy }}>Learn</h2>
          <p className="text-sm mb-8" style={{ color: colors.medNavy }}>Lessons, theory, quizzes, and guided learning paths</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eduCards.map((card) => (
              <div
                key={card.path}
                onClick={() => navigate(card.path)}
                className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: colors.darkNavy }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
                    {card.description}
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
    </div>
  );
};

export default LandingPage;
