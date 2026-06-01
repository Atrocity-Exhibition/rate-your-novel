import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Review } from '@/types'
import ScoreBadge from './ScoreBadge'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.body.length > 300

  const date = review.createdAt instanceof Date
    ? review.createdAt
    : (review.createdAt as unknown as { toDate?: () => Date })?.toDate?.() ?? new Date()

  return (
    <div className="rounded-xl border border-white/8 bg-[#141414] p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(review.username)}`}
            alt={review.username}
            className="h-8 w-8 rounded-full ring-1 ring-white/12"
          />
          <div>
            <Link
              to={`/user/${review.userId}`}
              className="text-sm font-medium text-white hover:text-rose-300 transition"
            >
              {review.username}
            </Link>
            <p className="text-xs text-neutral-500">
              {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <ScoreBadge score={review.score} size="sm" />
      </div>

      {/* Title */}
      {review.title && (
        <h4 className="mt-3 font-semibold text-white">{review.title}</h4>
      )}

      {/* Body */}
      <div className="mt-2">
        <p
          className={`text-sm leading-relaxed text-neutral-300 ${
            !expanded && isLong ? 'line-clamp-4' : ''
          }`}
        >
          {review.body}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs text-rose-400 hover:text-rose-300 transition"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  )
}
