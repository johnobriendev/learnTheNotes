// src/pages/paths/IntermediatePathPage.tsx
const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
};

const IntermediatePathPage = () => (
  <div className="max-w-2xl mx-auto">
    <div
      className="rounded-xl p-10 text-center"
      style={{ background: colors.lightGray, border: `1px solid ${colors.sage}` }}
    >
      <h2 className="text-xl font-bold mb-3" style={{ color: colors.darkNavy }}>Coming Soon</h2>
      <p className="text-sm leading-relaxed" style={{ color: colors.medNavy }}>
        The intermediate path — covering barre chords, scale positions across the neck, and seventh chord voicings — is in progress.
      </p>
    </div>
  </div>
);

export default IntermediatePathPage;
