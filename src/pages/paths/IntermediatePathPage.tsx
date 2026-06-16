// src/pages/paths/IntermediatePathPage.tsx
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
  comingSoon?: boolean;
}

interface Section {
  title: string;
  steps: Step[];
}

const sections: Section[] = [
  {
    title: 'Barre Chords',
    steps: [
      {
        title: 'E-Shape Barre Chord',
        description: 'Learn the moveable E-shape barre chord — the foundation for playing chords all the way up the neck.',
        path: '/lessons/e-shape-barre-chord',
        type: 'lesson',
      },
      {
        title: 'A-Shape Barre Chord',
        description: 'Learn the moveable A-shape barre chord to unlock Bb, B, C, and more across the fretboard.',
        path: '/lessons/a-shape-barre-chord',
        type: 'lesson',
      },
      {
        title: 'Minor Barre Chords',
        description: 'Learn the Em-shape and Am-shape barre chords — the minor counterparts to the two essential barre shapes.',
        path: '/lessons/minor-barre-chords',
        type: 'lesson',
      },
      {
        title: 'Barre Chord Progressions',
        description: 'Apply barre chords in I–IV–V and I–V–vi–IV progressions — the most common chord movement in Western music.',
        path: '/lessons/barre-chord-progressions',
        type: 'lesson',
      },
    ],
  },
  {
    title: 'The CAGED System',
    steps: [
      {
        title: 'CAGED Chord Shapes',
        description: 'Understand how the five open chord shapes — C, A, G, E, D — repeat across the entire neck.',
        path: '/lessons/caged-chord-shapes',
        type: 'lesson',
        comingSoon: true,
      },
      {
        title: 'CAGED Scale Positions',
        description: 'Use the CAGED system to map major scale patterns to each of the five chord positions across the neck.',
        path: '/lessons/caged-scale-positions',
        type: 'lesson',
        comingSoon: true,
      },
    ],
  },
  {
    title: 'Scales Across the Neck',
    steps: [
      {
        title: 'Pentatonic Scales',
        description: 'Learn the major and minor pentatonic scales — the most essential scales for soloing and improvisation.',
        path: '/lessons/pentatonic-scales',
        type: 'lesson',
        comingSoon: true,
      },
      {
        title: 'Learn the Same Phrase in Different Positions',
        description: 'Play the same melodic phrase in multiple positions up the neck to internalize how scale patterns connect.',
        path: '/lessons/first-three-notes',
        type: 'lesson',
      },
      {
        title: 'Switching Between Scale Patterns',
        description: 'Practice moving between adjacent scale positions smoothly — the key to navigating the full neck.',
        path: '/lessons/switching-scale-patterns',
        type: 'lesson',
      },
    ],
  },
  {
    title: 'Chord Voicings',
    steps: [
      {
        title: 'Learn the Fretboard with Triads',
        description: 'Use triad shapes to learn the notes on every string and unlock new chord voicings across the neck.',
        path: '/lessons/fretboard-triads',
        type: 'lesson',
      },
      {
        title: 'Root Position Seventh Chords',
        description: 'Learn major 7th, dominant 7th, and minor 7th chord shapes rooted on every string group.',
        path: '/lessons/root-position-seventh-chords',
        type: 'lesson',
      },
    ],
  },
  {
    title: 'Arpeggios',
    steps: [
      {
        title: 'Two Note Per String Arpeggios',
        description: 'Build fluid arpeggio technique using two-note-per-string patterns across common chord types.',
        path: '/lessons/two-note-arpeggios',
        type: 'lesson',
      },
      {
        title: 'F6/Dm7 Arpeggio',
        description: 'Apply two-note-per-string arpeggios to the F6/Dm7 chord — a rich, jazz-flavored sound.',
        path: '/lessons/f6-dm7-arpeggio',
        type: 'lesson',
      },
    ],
  },
];

const IntermediatePathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm mb-10" style={{ color: colors.medNavy }}>
        Build on the basics with barre chords, scale patterns across the neck, and seventh chord voicings.
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
                  onClick={() => !step.comingSoon && navigate(step.path)}
                  className={`group rounded-xl shadow-sm transition-all duration-200 flex items-start gap-4 p-5 ${
                    step.comingSoon
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer'
                  }`}
                  style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {step.comingSoon ? (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: colors.sage, color: colors.darkNavy }}
                        >
                          Coming Soon
                        </span>
                      ) : (
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
                      )}
                    </div>
                    <h3 className="font-bold text-base mb-1" style={{ color: colors.darkNavy }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
                      {step.description}
                    </p>
                  </div>
                  {!step.comingSoon && (
                    <div className="text-sm font-semibold flex items-center gap-1 mt-1 shrink-0" style={{ color: colors.medNavy }}>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntermediatePathPage;
