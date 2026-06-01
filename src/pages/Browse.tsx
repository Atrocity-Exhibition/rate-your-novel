import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getNovels, type GetNovelsOptions } from '@/firebase/novels'
import type { Novel } from '@/types'
import NovelCard from '@/components/NovelCard'

const GENRES = ['Xianxia', 'Isekai', 'LitRPG', 'Fantasy', 'Action', 'Mystery', 'Horror', 'Romance', 'Apocalypse', 'System', 'Cultivation', 'Steampunk']
const STATUSES = ['ongoing', 'completed', 'hiatus']

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [novels, setNovels] = useState<Novel[]>([])
  const [loading, setLoading] = useState(true)

  const genre = searchParams.get('genre') || ''
  const status = searchParams.get('status') || ''
  const sort = (searchParams.get('sort') as GetNovelsOptions['sortBy']) || 'avgRating'
  const q = searchParams.get('q') || ''

  const loadNovels = useCallback(async () => {
    setLoading(true)
    const { novels: data } = await getNovels({ genre: genre || undefined, status: status || undefined, sortBy: sort, pageSize: 24 })
    const filtered = q ? data.filter((n) => n.title.toLowerCase().includes(q.toLowerCase()) || n.author.toLowerCase().includes(q.toLowerCase())) : data
    setNovels(filtered)
    setLoading(false)
  }, [genre, status, sort, q])

  useEffect(() => { loadNovels() }, [loadNovels])

  const setFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Browse Novels</h1>
          {q && <p className="mt-1 text-neutral-400">Search results for "<span className="text-white">{q}</span>"</p>}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20 flex flex-col gap-6">
              {/* Sort */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">Sort By</h3>
                <div className="flex flex-col gap-1">
                  {[
                    { value: 'avgRating', label: 'Highest Rated' },
                    { value: 'reviewCount', label: 'Most Reviewed' },
                    { value: 'addedAt', label: 'Recently Added' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFilter('sort', opt.value)}
                      className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                        sort === opt.value
                          ? 'bg-rose-600/20 text-rose-300 font-medium'
                          : 'text-neutral-400 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">Status</h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setFilter('status', '')}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition ${!status ? 'bg-rose-600/20 text-rose-300 font-medium' : 'text-neutral-400 hover:bg-white/6 hover:text-white'}`}
                  >
                    All
                  </button>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter('status', s)}
                      className={`rounded-lg px-3 py-2 text-left text-sm capitalize transition ${status === s ? 'bg-rose-600/20 text-rose-300 font-medium' : 'text-neutral-400 hover:bg-white/6 hover:text-white'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">Genre</h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setFilter('genre', '')}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition ${!genre ? 'bg-rose-600/20 text-rose-300 font-medium' : 'text-neutral-400 hover:bg-white/6 hover:text-white'}`}
                  >
                    All Genres
                  </button>
                  {GENRES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilter('genre', g)}
                      className={`rounded-lg px-3 py-2 text-left text-sm transition ${genre === g ? 'bg-rose-600/20 text-rose-300 font-medium' : 'text-neutral-400 hover:bg-white/6 hover:text-white'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Mobile filter row */}
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              <select
                value={sort}
                onChange={(e) => setFilter('sort', e.target.value)}
                className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-sm text-white"
              >
                <option value="avgRating">Top Rated</option>
                <option value="reviewCount">Most Reviewed</option>
                <option value="addedAt">Newest</option>
              </select>
              <select
                value={status}
                onChange={(e) => setFilter('status', e.target.value)}
                className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-sm text-white"
              >
                <option value="">All Status</option>
                {STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
              <select
                value={genre}
                onChange={(e) => setFilter('genre', e.target.value)}
                className="rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-sm text-white"
              >
                <option value="">All Genres</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-white/6" />
                ))}
              </div>
            ) : novels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl">📚</div>
                <h3 className="mt-4 text-lg font-semibold text-white">No novels found</h3>
                <p className="mt-1 text-sm text-neutral-500">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {novels.map((novel) => (
                    <NovelCard key={novel.id} novel={novel} />
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-neutral-500">
                  Showing {novels.length} novel{novels.length !== 1 ? 's' : ''}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
