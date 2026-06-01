import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNovel, getUserRating, rateNovel, getReviews, addReview, getRatingDistribution } from '@/firebase/novels'
import type { Novel, Review } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import ScoreBadge from '@/components/ScoreBadge'
import RatingPicker from '@/components/RatingPicker'
import RatingDistribution from '@/components/RatingDistribution'
import ReviewCard from '@/components/ReviewCard'

export default function NovelDetail() {
  const { id } = useParams<{ id: string }>()
  const { user, profile } = useAuth()
  const [novel, setNovel] = useState<Novel | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [distribution, setDistribution] = useState<Record<number, number>>({})
  const [userScore, setUserScore] = useState(0)
  const [pendingScore, setPendingScore] = useState(0)
  const [ratingLoading, setRatingLoading] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewBody, setReviewBody] = useState('')
  const [reviewScore, setReviewScore] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [tab, setTab] = useState<'overview' | 'reviews'>('overview')

  useEffect(() => {
    if (!id) return
    async function load() {
      const [n, rv, dist] = await Promise.all([
        getNovel(id!),
        getReviews(id!),
        getRatingDistribution(id!),
      ])
      setNovel(n)
      setReviews(rv)
      setDistribution(dist)

      if (user) {
        const r = await getUserRating(id!, user.uid)
        if (r) { setUserScore(r.score); setPendingScore(r.score) }
      }
    }
    load()
  }, [id, user])

  const handleRate = async () => {
    if (!user || !id || pendingScore === 0 || pendingScore === userScore) return
    setRatingLoading(true)
    await rateNovel(id, user.uid, pendingScore)
    setUserScore(pendingScore)
    const updatedNovel = await getNovel(id)
    if (updatedNovel) setNovel(updatedNovel)
    const dist = await getRatingDistribution(id)
    setDistribution(dist)
    setRatingLoading(false)
  }

  const handleSubmitReview = async () => {
    if (!user || !id || !profile || !reviewBody.trim() || reviewScore === 0) return
    setSubmitting(true)
    await addReview(id, {
      novelId: id,
      userId: user.uid,
      username: profile.username,
      userAvatar: profile.avatarUrl,
      score: reviewScore,
      title: reviewTitle,
      body: reviewBody,
    })
    const updated = await getReviews(id)
    setReviews(updated)
    setReviewTitle('')
    setReviewBody('')
    setReviewScore(0)
    setShowReviewForm(false)
    setSubmitting(false)
  }

  if (!novel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-rose-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Hero banner */}
      <div className="relative h-48 overflow-hidden sm:h-64">
        <img
          src={novel.coverUrl}
          alt=""
          className="h-full w-full object-cover blur-xl opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0d0d]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main info block */}
        <div className="-mt-24 flex gap-6 pb-8 sm:-mt-32">
          {/* Cover */}
          <div className="shrink-0">
            <img
              src={novel.coverUrl}
              alt={novel.title}
              className="h-48 w-32 rounded-xl object-cover shadow-2xl ring-2 ring-white/10 sm:h-64 sm:w-44"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/176x256/1a1a1a/444?text=${encodeURIComponent(novel.title)}`
              }}
            />
          </div>

          {/* Metadata */}
          <div className="mt-auto flex flex-1 flex-col gap-2 pb-1 min-w-0">
            <div className="flex flex-wrap gap-2">
              {novel.genres.map((g) => (
                <Link key={g} to={`/browse?genre=${encodeURIComponent(g)}`}
                  className="rounded px-2 py-0.5 text-xs text-rose-300 ring-1 ring-rose-500/30 hover:bg-rose-500/10 transition">
                  {g}
                </Link>
              ))}
            </div>
            <h1 className="text-2xl font-black leading-tight sm:text-3xl">{novel.title}</h1>
            <p className="text-neutral-400">by <span className="text-white font-medium">{novel.author}</span></p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span className="capitalize">{novel.status}</span>
              <span>{novel.totalChapters.toLocaleString()} chapters</span>
              <span>{novel.year}</span>
            </div>
            {novel.sourceUrl && (
              <a href={novel.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-white/6 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white">
                Read Online ↗
              </a>
            )}
          </div>
        </div>

        {/* Score + rating row */}
        <div className="mb-8 flex flex-wrap items-start gap-8 rounded-2xl border border-white/8 bg-[#141414] p-6">
          {/* Community score */}
          <div className="flex flex-col items-center gap-1">
            <ScoreBadge score={novel.avgRating} size="lg" count={novel.ratingCount} />
            <p className="text-xs text-neutral-500">Community Score</p>
          </div>

          {/* Separator */}
          <div className="hidden h-24 w-px bg-white/8 sm:block" />

          {/* Distribution */}
          <div className="flex-1 min-w-48">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">Rating Breakdown</p>
            <RatingDistribution distribution={distribution} />
          </div>

          {/* Separator */}
          <div className="hidden h-24 w-px bg-white/8 sm:block" />

          {/* Your rating */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              {user ? 'Your Rating' : 'Sign in to Rate'}
            </p>
            {user ? (
              <div className="flex flex-col gap-3">
                <RatingPicker value={pendingScore} onChange={setPendingScore} />
                {pendingScore !== userScore && pendingScore > 0 && (
                  <button
                    onClick={handleRate}
                    disabled={ratingLoading}
                    className="rounded-lg bg-rose-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-50"
                  >
                    {ratingLoading ? 'Saving…' : userScore > 0 ? 'Update Rating' : 'Submit Rating'}
                  </button>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm text-rose-400 hover:text-rose-300 transition">Sign In →</Link>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-white/8">
          {(['overview', 'reviews'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium capitalize transition ${
                tab === t ? 'border-rose-500 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {t}{t === 'reviews' ? ` (${reviews.length})` : ''}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <div className="max-w-3xl">
            <h2 className="mb-3 text-lg font-bold text-white">Synopsis</h2>
            <p className="leading-relaxed text-neutral-300">{novel.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {novel.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="max-w-3xl">
            {/* Write review CTA */}
            {user && (
              <div className="mb-6">
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="rounded-xl border border-white/10 bg-[#141414] px-5 py-3 text-sm font-medium text-neutral-300 transition hover:border-rose-500/40 hover:text-white"
                  >
                    + Write a Review
                  </button>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-[#141414] p-5 flex flex-col gap-4">
                    <h3 className="font-semibold text-white">Write a Review</h3>
                    <div>
                      <p className="mb-2 text-xs text-neutral-500">Your Score</p>
                      <RatingPicker value={reviewScore} onChange={setReviewScore} />
                    </div>
                    <input
                      type="text"
                      placeholder="Review title (optional)"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30"
                    />
                    <textarea
                      placeholder="Share your thoughts…"
                      value={reviewBody}
                      onChange={(e) => setReviewBody(e.target.value)}
                      rows={5}
                      className="rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSubmitReview}
                        disabled={submitting || !reviewBody.trim() || reviewScore === 0}
                        className="rounded-lg bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-50"
                      >
                        {submitting ? 'Submitting…' : 'Post Review'}
                      </button>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="rounded-lg border border-white/10 px-5 py-2 text-sm text-neutral-400 transition hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-neutral-500">No reviews yet. Be the first!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            )}
          </div>
        )}

        <div className="h-16" />
      </div>
    </div>
  )
}
