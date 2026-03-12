import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
}

const SignupPage = () => {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signUp(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setConfirmed(true)
    }
  }

  const handleGoogle = async () => {
    setError('')
    const { error } = await signInWithGoogle()
    if (error) setError(error.message)
  }

  if (confirmed) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div
          className="w-full max-w-sm rounded-xl p-8 shadow-lg text-center"
          style={{ background: colors.darkNavy }}
        >
          <h2 className="text-xl font-bold mb-3" style={{ color: colors.cream }}>Check your email</h2>
          <p style={{ color: colors.sage }}>
            We sent a confirmation link to <strong style={{ color: colors.cream }}>{email}</strong>.
            Click it to activate your account.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="mt-6 underline text-sm"
            style={{ color: colors.sage }}
          >
            Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div
        className="w-full max-w-sm rounded-xl p-8 shadow-lg"
        style={{ background: colors.darkNavy }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.cream }}>
          Create Account
        </h1>

        <button
          onClick={handleGoogle}
          className="w-full py-2.5 rounded-lg font-medium mb-5 transition-opacity hover:opacity-90"
          style={{ background: colors.medNavy, color: colors.cream }}
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: colors.medNavy }} />
          <span className="text-sm" style={{ color: colors.sage }}>or</span>
          <div className="flex-1 h-px" style={{ background: colors.medNavy }} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg outline-none text-sm"
            style={{ background: colors.medNavy, color: colors.cream }}
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-lg outline-none text-sm"
            style={{ background: colors.medNavy, color: colors.cream }}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: colors.sage, color: colors.darkNavy }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center mt-5" style={{ color: colors.sage }}>
          Already have an account?{' '}
          <Link to="/login" className="underline" style={{ color: colors.cream }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
