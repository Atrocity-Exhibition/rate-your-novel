import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopNovels, getNewReleases } from '@/firebase/novels'
import type { Novel } from '@/types'
import ChartRow from '@/components/ChartRow'
import NovelCard from '@/components/NovelCard'

export default function Home() {
  const [topNovels, setTopNovels] = useState<Novel[]>([])
  const [newReleases, setNewReleases] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [top, recent] = await Promise.all([getTopNovels(10), getNewReleases(8)])
      setTopNovels(top)
      setNewReleases(recent)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 py-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-600/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-2xl px-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/8 px-3 py-1 text-xs font-medium text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Community Ratings &amp; Reviews
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            The definitive guide to
            <span className="block text-rose-400">web novels.</span>
          </h1>
          <p className="mt-4 text-base text-neutral-400">
            Discover, rate, and review web novels. Track your reading, build lists, and connect with readers who share your taste.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/browse"
              className="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Browse Novels
            </Link>
            <Link
              to="/browse?sort=avgRating"
              className="rounded-xl border border-white/12 bg-white/6 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Charts
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Main column */}
          <div className="flex flex-col gap-12">
            {/* New Releases */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recently Added</h2>
                <Link to="/browse" className="text-sm text-rose-400 hover:text-rose-300 transition">
                  View all →
                </Link>
              </div>
              {loading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-white/6" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {newReleases.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar — Charts */}
          <aside>
            <div className="sticky top-20">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Top Rated</h2>
                <Link to="/browse?sort=avgRating" className="text-sm text-rose-400 hover:text-rose-300 transition">
                  Full chart →
                </Link>
              </div>
              {loading ? (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-20 animate-pulse rounded-xl bg-white/6" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {topNovels.map((novel, i) => (
                    <ChartRow key={novel.id} novel={novel} rank={i + 1} />
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-white/8 bg-[#141414] p-8 text-center">
          <div>
            <p className="text-3xl font-black text-rose-400">15+</p>
            <p className="mt-1 text-sm text-neutral-500">Novels Catalogued</p>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-400">50K+</p>
            <p className="mt-1 text-sm text-neutral-500">Community Ratings</p>
          </div>
          <div>
            <p className="text-3xl font-black text-rose-400">Free</p>
            <p className="mt-1 text-sm text-neutral-500">Always</p>
          </div>
        </div>
      </div>
    </div>
  )
}
