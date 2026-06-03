// src/pages/GuitarLessonsPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

interface LessonCard {
  title: string;
  description: string;
  path: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  dateCreated: string;
}

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type SortOrder = 'default' | 'newest' | 'oldest';

const difficultyStyle = {
  beginner: { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` },
  intermediate: { background: colors.medNavy, color: colors.cream, border: 'none' },
  advanced: { background: colors.darkNavy, color: colors.cream, border: 'none' },
};

const lessons: LessonCard[] = [
  { title: 'Learn the Same Phrase in Different Positions', description: 'Play C, D, and E across all strings and positions to build fretboard awareness.', path: '/lessons/first-three-notes', difficulty: 'intermediate', dateCreated: '2025-11-22' },
  { title: 'Learning the String Names', description: 'Learn the names and numbers of all six strings — the foundation for reading any guitar diagram.', path: '/lessons/string-names', difficulty: 'beginner', dateCreated: '2026-03-22' },
  { title: 'The Grid', description: 'Understand how any note on the fretboard can be described by its string and fret number.', path: '/lessons/the-grid', difficulty: 'beginner', dateCreated: '2026-03-22' },
  { title: 'Open Chords', description: 'Learn all the open major and minor chord shapes — E, A, D, G, C, F, Em, Am, and Dm.', path: '/lessons/open-chords', difficulty: 'beginner', dateCreated: '2026-03-26' },
  { title: 'How to Read Chord Diagrams', description: 'Learn what the lines, dots, and symbols in a chord diagram mean so you can learn any chord on your own.', path: '/lessons/how-to-read-chord-diagrams', difficulty: 'beginner', dateCreated: '2026-03-26' },
  { title: 'The I–IV Progression', description: 'Learn the I–IV chord progression in every open key — C, G, D, A, and E.', path: '/lessons/i-iv-progression', difficulty: 'beginner', dateCreated: '2026-03-26' },
  { title: 'Learn the Notes in Open Position', description: 'Learn where every natural note falls in the first five frets, and understand where sharps and flats fit in.', path: '/lessons/notes-in-open-position', difficulty: 'beginner', dateCreated: '2026-03-26' },
  { title: 'Open 7th Chords', description: 'Learn dominant, minor, and major 7th chord shapes in open position — E7, A7, D7, G7, B7, Em7, Am7, Dm7, Cmaj7, and more.', path: '/lessons/open-seventh-chords', difficulty: 'beginner', dateCreated: '2026-03-26' },
  { title: 'Open C Major Chord and Scale', description: 'Learn the open C major chord shape and the C major scale in first position.', path: '/lessons/c-major-chord-and-scale', difficulty: 'beginner', dateCreated: '2026-03-22' },
  { title: 'Learn the Major Scale on One String', description: 'Master the C major scale on the B string - a perfect introduction to scale patterns.', path: '/lessons/major-scale-one-string', difficulty: 'beginner', dateCreated: '2025-12-17' },
  { title: 'Switching Between Scale Patterns', description: 'Learn to transition smoothly between 3-notes-per-string patterns in G major.', path: '/lessons/switching-scale-patterns', difficulty: 'intermediate', dateCreated: '2025-12-17' },
  { title: 'Two Note Per String Arpeggios', description: 'Master G major 7 arpeggios using two-note-per-string patterns.', path: '/lessons/two-note-arpeggios', difficulty: 'intermediate', dateCreated: '2025-12-17' },
  { title: 'Learn the Fretboard with Triads', description: 'Learn C major triads across the fretboard using full voicings and three-string shapes.', path: '/lessons/fretboard-triads', difficulty: 'intermediate', dateCreated: '2026-01-28' },
  { title: 'Root Position Seventh Chords', description: 'Learn drop 2 (5th string root) and drop 3 (6th string root) seventh chord voicings.', path: '/lessons/root-position-seventh-chords', difficulty: 'intermediate', dateCreated: '2026-02-22' },
  { title: 'F6/Dm7 Arpeggio', description: 'Learn F6/Dm7 arpeggio across two positions on the fretboard.', path: '/lessons/f6-dm7-arpeggio', difficulty: 'intermediate', dateCreated: '2026-02-25' },
  { title: 'Drop 2 Minor Seventh Voicings (Cm7)', description: 'Learn drop 2 minor seventh chord voicings across all string sets.', path: '/lessons/drop2-minor-seventh-voicings', difficulty: 'advanced', dateCreated: '2026-03-19' },
  { title: 'Drop 2 Dominant Seventh Voicings (Bb7)', description: 'Learn drop 2 dominant seventh chord voicings across all string sets.', path: '/lessons/drop2-dominant-seventh-voicings', difficulty: 'advanced', dateCreated: '2026-03-19' },
];

const GuitarLessonsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ difficulty: DifficultyFilter }>({ difficulty: 'all' });
  const [sort, setSort] = useState<SortOrder>('default');

  let displayed = lessons.filter(l => filters.difficulty === 'all' || l.difficulty === filters.difficulty);
  if (sort === 'oldest' || sort === 'newest') displayed = [...displayed].sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
  if (sort === 'newest') displayed = [...displayed].reverse();

  const difficultyOptions: DifficultyFilter[] = ['all', 'beginner', 'intermediate', 'advanced'];
  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'newest', label: 'Newest' },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {difficultyOptions.map(opt => {
            const active = filters.difficulty === opt;
            const activeStyle: Record<DifficultyFilter, React.CSSProperties> = {
              all: { background: colors.darkNavy, color: colors.cream, border: 'none' },
              beginner: { background: colors.sage, color: colors.darkNavy, border: 'none' },
              intermediate: difficultyStyle.intermediate,
              advanced: difficultyStyle.advanced,
            };
            const inactiveStyle: React.CSSProperties = { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` };
            const style = active ? activeStyle[opt] : inactiveStyle;
            return (
              <button
                key={opt}
                onClick={() => setFilters(f => ({ ...f, difficulty: opt }))}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
                style={style}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex gap-2">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-150"
              style={sort === opt.value
                ? { background: colors.medNavy, color: colors.cream, border: 'none' }
                : { background: colors.lightGray, color: colors.darkNavy, border: `1px solid ${colors.sage}` }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {displayed.map((lesson) => (
        <div
          key={lesson.path}
          onClick={() => navigate(lesson.path)}
          className="group rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
        >
          <div className="p-6">
            {lesson.difficulty && (
              <span
                className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3"
                style={difficultyStyle[lesson.difficulty]}
              >
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </span>
            )}
            <h3 className="text-lg font-bold mb-2 leading-snug" style={{ color: colors.darkNavy }}>
              {lesson.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
              {lesson.description}
            </p>
            <div className="mt-4 text-sm font-semibold flex items-center gap-2" style={{ color: colors.medNavy }}>
              Start Lesson
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default GuitarLessonsPage;
