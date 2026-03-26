// src/pages/paths/BeginnerPathPage.tsx
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

interface Step {
  title: string;
  description: string;
  path: string;
  type: 'lesson' | 'tool';
}

interface Section {
  title: string;
  steps: Step[];
}

const sections: Section[] = [
  {
    title: 'Guitar Basics',
    steps: [
      {
        title: 'Learning the String Names',
        description: 'Learn the names and numbers of all six strings — essential for reading any guitar diagram or tab.',
        path: '/lessons/string-names',
        type: 'lesson',
      },
      {
        title: 'The Grid',
        description: 'Learn how any fretboard position is described by its string and fret number.',
        path: '/lessons/the-grid',
        type: 'lesson',
      },
      {
        title: 'How to Read Chord Diagrams',
        description: 'Learn what the lines, dots, and symbols in a chord diagram mean so you can learn any chord on your own.',
        path: '/lessons/how-to-read-chord-diagrams',
        type: 'lesson',
      },
    ],
  },
  {
    title: 'Open Position',
    steps: [
      {
        title: 'Open Chords',
        description: 'Learn all the open major and minor chord shapes — E, A, D, G, C, Em, Am, and Dm.',
        path: '/lessons/open-chords',
        type: 'lesson',
      },
      {
        title: 'Open 7th Chords',
        description: 'Learn dominant, minor, and major 7th chord shapes in open position.',
        path: '/lessons/open-seventh-chords',
        type: 'lesson',
      },
      {
        title: 'Open C Major Chord and Scale',
        description: 'Learn the open C major chord shape and the C major scale in first position.',
        path: '/lessons/c-major-chord-and-scale',
        type: 'lesson',
      },
    ],
  },
  {
    title: 'Scales & Patterns',
    steps: [
      {
        title: 'Major Scale on One String',
        description: 'Learn the major scale along a single string — a great way to hear the intervals clearly.',
        path: '/lessons/major-scale-one-string',
        type: 'lesson',
      },
      {
        title: 'Practice Scale Patterns',
        description: 'Explore the five major scale positions up and down the neck.',
        path: '/scales',
        type: 'tool',
      },
    ],
  },
];

const BeginnerPathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm mb-10" style={{ color: colors.medNavy }}>
        A step-by-step guide to getting started on guitar — open position, first notes, and basic scales.
      </p>

      <div className="flex flex-col gap-10">
        {sections.map((section, sIdx) => (
          <div key={section.title}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: colors.sage }}>
              {String(sIdx + 1).padStart(2, '0')} — {section.title}
            </h2>
            <div className="flex flex-col gap-3">
              {section.steps.map((step) => (
                <div
                  key={step.path}
                  onClick={() => navigate(step.path)}
                  className="group rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-start gap-4 p-5"
                  style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={
                          step.type === 'lesson'
                            ? { background: colors.medNavy, color: colors.cream }
                            : { background: colors.darkNavy, color: colors.sage }
                        }
                      >
                        {step.type === 'lesson' ? 'Lesson' : 'Tool'}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: colors.darkNavy }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
                      {step.description}
                    </p>
                  </div>
                  <div className="text-sm font-semibold flex items-center gap-1 mt-1 shrink-0" style={{ color: colors.medNavy }}>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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

export default BeginnerPathPage;
