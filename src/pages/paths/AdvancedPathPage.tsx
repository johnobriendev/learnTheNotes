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
    title: 'Chord Voicings',
    steps: [
      {
        title: 'Drop 2 Minor Seventh Voicings (Cm7)',
        description: 'Learn drop 2 minor seventh chord voicings across all string sets.',
        path: '/lessons/drop2-minor-seventh-voicings',
        type: 'lesson',
      },
      {
        title: 'Drop 2 Dominant Seventh Voicings (Bb7)',
        description: 'Learn drop 2 dominant seventh chord voicings across all string sets.',
        path: '/lessons/drop2-dominant-seventh-voicings',
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

const AdvancedPathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-sm mb-10" style={{ color: colors.medNavy }}>
        Push further with advanced techniques, extended patterns, and jazz-oriented vocabulary.
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

export default AdvancedPathPage;
