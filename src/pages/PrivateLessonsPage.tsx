const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
}

const PrivateLessonsPage = () => (
  <div className="max-w-lg mx-auto py-8">
    <div className="rounded-xl p-8 shadow-lg" style={{ background: colors.darkNavy }}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: colors.cream }}>
        Private Lessons
      </h1>
      <p className="text-sm leading-relaxed mb-8" style={{ color: colors.sage }}>
        One-on-one guitar lessons via video call. Whether you're a complete beginner
        or looking to level up your playing, sessions are tailored to your goals.
        Book a time below — no account needed.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href={import.meta.env.VITE_STRIPE_HALFHOUR_LINK || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-lg font-medium text-center transition-opacity hover:opacity-90"
          style={{ background: colors.sage, color: colors.darkNavy }}
        >
          Half-Hour Session — $40
        </a>
        <a
          href={import.meta.env.VITE_STRIPE_HOUR_LINK || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-lg font-medium text-center transition-opacity hover:opacity-90"
          style={{ background: colors.medNavy, color: colors.cream }}
        >
          Hour Session — $75
        </a>
      </div>
    </div>
  </div>
)

export default PrivateLessonsPage
