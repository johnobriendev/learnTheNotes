import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const colors = {
  sage: '#b4b8ab',
  darkNavy: '#153243',
  medNavy: '#284b63',
  cream: '#f4f9e9',
  lightGray: '#eef0eb',
}

const PricingPage = () => {
  const { user, isPremium, loading, refreshSubscription } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('success') === 'true') refreshSubscription()
  }, [])
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const success = searchParams.get('success') === 'true'
  const canceled = searchParams.get('canceled') === 'true'

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login?from=/pricing')
      return
    }
    setCheckoutError('')
    setCheckoutLoading(true)
    const { data, error } = await supabase.functions.invoke('create-checkout-session')
    setCheckoutLoading(false)
    if (error || !data?.url) {
      setCheckoutError('Something went wrong. Please try again.')
      return
    }
    window.location.href = data.url
  }

  return (
    <div className="max-w-2xl mx-auto py-8 flex flex-col gap-6">

      {success && (
        <div
          className="rounded-xl p-4 text-center font-medium"
          style={{ background: colors.medNavy, color: colors.cream }}
        >
          Subscription active! Welcome to Premium.
        </div>
      )}
      {canceled && (
        <div
          className="rounded-xl p-4 text-center font-medium"
          style={{ background: colors.darkNavy, color: colors.sage }}
        >
          Checkout canceled — no charge was made.
        </div>
      )}

      {/* Premium subscription */}
      <div className="rounded-xl p-8 shadow-lg" style={{ background: colors.darkNavy }}>
        <h2 className="text-2xl font-bold mb-1" style={{ color: colors.cream }}>
          Premium
        </h2>
        <p className="text-3xl font-bold mb-6" style={{ color: colors.sage }}>
          $10<span className="text-base font-normal">/mo</span>
        </p>

        <ul className="flex flex-col gap-2 mb-8 text-sm" style={{ color: colors.sage }}>
          <li>✓ All premium guitar lessons</li>
          <li>✓ New lessons added regularly</li>
          <li>✓ Cancel anytime</li>
        </ul>

        {!loading && (
          isPremium ? (
            <div
              className="w-full py-2.5 rounded-lg font-medium text-center"
              style={{ background: colors.medNavy, color: colors.sage }}
            >
              You're subscribed!
            </div>
          ) : (
            <>
              <button
                onClick={handleSubscribe}
                disabled={checkoutLoading}
                className="w-full py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ background: colors.sage, color: colors.darkNavy }}
              >
                {checkoutLoading ? 'Redirecting…' : 'Subscribe — $10/mo'}
              </button>
              {!user && (
                <p className="text-xs text-center mt-3" style={{ color: colors.sage }}>
                  <Link to="/login" className="underline" style={{ color: colors.cream }}>Log in</Link>
                  {' '}or{' '}
                  <Link to="/signup" className="underline" style={{ color: colors.cream }}>create an account</Link>
                  {' '}to subscribe.
                </p>
              )}
              {checkoutError && (
                <p className="text-red-400 text-sm text-center mt-3">{checkoutError}</p>
              )}
            </>
          )
        )}
      </div>

      {/* Private lessons */}
      <div className="rounded-xl p-8 shadow-lg" style={{ background: colors.darkNavy }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.cream }}>
          Private Lessons
        </h2>
        <p className="text-sm mb-6" style={{ color: colors.sage }}>
          One-on-one lessons via video call, tailored to your goals. No account needed — book below.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={import.meta.env.VITE_STRIPE_HALFHOUR_LINK || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 rounded-lg font-medium text-center transition-opacity hover:opacity-90"
            style={{ background: colors.sage, color: colors.darkNavy }}
          >
            Book Half-Hour — $40
          </a>
          <a
            href={import.meta.env.VITE_STRIPE_HOUR_LINK || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 rounded-lg font-medium text-center transition-opacity hover:opacity-90"
            style={{ background: colors.medNavy, color: colors.cream }}
          >
            Book Hour — $75
          </a>
        </div>
      </div>

    </div>
  )
}

export default PricingPage
