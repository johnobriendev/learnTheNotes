import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
}

const ProtectedLesson = ({ children }: { children: ReactNode }) => {
  const { user, isPremium, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-sm" style={{ color: colors.sage }}>Loading…</div>
      </div>
    )
  }

  if (isPremium) return <>{children}</>

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div
        className="w-full max-w-sm rounded-xl p-8 shadow-lg text-center"
        style={{ background: colors.darkNavy }}
      >
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: colors.cream }}>
          Premium Lesson
        </h2>
        <p className="text-sm mb-6" style={{ color: colors.sage }}>
          Subscribe to unlock all premium lessons.
        </p>
        <button
          onClick={() => navigate('/pricing')}
          className="w-full py-2.5 rounded-lg font-medium mb-3 transition-opacity hover:opacity-90"
          style={{ background: colors.sage, color: colors.darkNavy }}
        >
          Subscribe — $10/mo
        </button>
        {!user && (
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90"
            style={{ background: colors.medNavy, color: colors.cream }}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  )
}

export default ProtectedLesson
