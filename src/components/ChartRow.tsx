import { Link } from 'react-router-dom'
import type { Novel } from '@/types'
import ScoreBadge from './ScoreBadge'

interface ChartRowProps {
  novel: Novel
  rank: number
}

export default function ChartRow({ novel, rank }: ChartRowProps) {
  return (
    <Link
      to={`/novel/${novel.id}`}
      className="group flex items-center gap-4 rounded-xl border border-white/6 bg-[#141414] p-3 transition duration-200 hover:border-white/14 hover:bg-[#1a1a1a]"
    >
      {/* Rank */}
      <span
        className={`w-8 shrink-0 text-center text-lg font-black tabular-nums ${
          rank <= 3 ? 'text-rose-500' : 'text-neutral-600'
        }`}
      >
        {rank}
      </span>

      {/* Cover thumbnail */}
      <img
        src={novel.coverUrl}
        alt={novel.title}
        className="h-16 w-11 shrink-0 rounded object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/44x64/1a1a1a/444?text=?`
        }}
        loading="lazy"
      />

      {/* Info */}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <h3 className="truncate text-sm font-semibold text-white group-hover:text-rose-300 transition">
          {novel.title}
        </h3>
        <p className="text-xs text-neutral-500">{novel.author}</p>
        <div className="flex gap-1 flex-wrap mt-1">
          {novel.genres.slice(0, 3).map((g) => (
            <span key={g} className="rounded px-1.5 py-0.5 text-xs text-neutral-500 ring-1 ring-white/8">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Score */}
      <div className="shrink-0">
        <ScoreBadge score={novel.avgRating} size="md" />
        <p className="mt-1 text-center text-xs text-neutral-600">{novel.reviewCount} reviews</p>
      </div>
    </Link>
  )
}
