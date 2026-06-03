// src/pages/PathsPage.tsx
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const paths = [
  {
    title: 'Beginner Path',
    description: 'Start here. Learn the essentials — open position notes, basic scales, and your first chords.',
    path: '/paths/beginner',
    level: 'Beginner',
    available: true,
  },
  {
    title: 'Intermediate Path',
    description: 'Build on the basics with barre chords, scale patterns across the neck, and seventh chord voicings.',
    path: '/paths/intermediate',
    level: 'Intermediate',
    available: false,
  },
];

const PathsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-sm mb-8" style={{ color: colors.medNavy }}>
        Structured roadmaps that guide you step by step through lessons and tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {paths.map((p) => (
          <div
            key={p.path}
            onClick={() => p.available && navigate(p.path)}
            className={`group rounded-xl shadow-md transition-all duration-300 overflow-hidden ${p.available ? 'hover:shadow-xl transform hover:-translate-y-1 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: colors.medNavy, color: colors.cream }}
                >
                  {p.level}
                </span>
                {!p.available && (
                  <span
                    className="inline-block text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: colors.sage, color: colors.darkNavy }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: colors.darkNavy }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
                {p.description}
              </p>
              {p.available && (
                <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.medNavy }}>
                  View Path
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathsPage;
