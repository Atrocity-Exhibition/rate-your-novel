import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { logout } from '@/firebase/auth'

export default function Navbar() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/browse?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0d0d0d]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight text-white"
        >
          <span className="text-rose-500 text-lg">■</span>
          <span>Rate Your Novel</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/browse"
            className="rounded px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-white/8 hover:text-white"
          >
            Browse
          </Link>
          <Link
            to="/browse?sort=avgRating"
            className="rounded px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-white/8 hover:text-white"
          >
            Charts
          </Link>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="ml-auto flex flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search novels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30"
          />
        </form>

        {/* Auth */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-white/8"
            >
              <img
                src={profile?.avatarUrl || `https://api.dicebear.com/9.x/initials/svg?seed=${profile?.username}`}
                alt="avatar"
                className="h-7 w-7 rounded-full ring-1 ring-white/20"
              />
              <span className="hidden text-sm text-neutral-300 sm:block">{profile?.username}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl">
                <Link
                  to={`/user/${user.uid}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-neutral-300 transition hover:bg-white/8 hover:text-white"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-neutral-400 transition hover:bg-white/8 hover:text-rose-400"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
