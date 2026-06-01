import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginWithEmail, loginWithGoogle } from '@/firebase/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setError('')
    setLoading(true)
    try {
      await loginWithEmail(email, password)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white">
            <span className="text-rose-500 text-lg">■</span> Rate Your Novel
          </Link>
          <h1 className="mt-6 text-2xl font-black text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-neutral-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-xs text-neutral-600">or</span>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/6 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-60"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-rose-400 hover:text-rose-300 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
