import { Link } from 'react-router-dom'
import type { Novel } from '@/types'
import ScoreBadge from './ScoreBadge'

interface NovelCardProps {
  novel: Novel
}

export default function NovelCard({ novel }: NovelCardProps) {
  return (
    <Link
      to={`/novel/${novel.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/8 bg-[#141414] transition duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-2xl hover:shadow-black/50"
    >
      {/* Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
        <img
          src={novel.coverUrl}
          alt={novel.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/200x300/1a1a1a/444?text=${encodeURIComponent(novel.title)}`
          }}
          loading="lazy"
        />
        {/* Score overlay */}
        <div className="absolute top-2 right-2">
          <ScoreBadge score={novel.avgRating} size="sm" />
        </div>
        {/* Status badge */}
        <div className="absolute bottom-2 left-2">
          <span
            className={`rounded px-1.5 py-0.5 text-xs font-medium ${
              novel.status === 'completed'
                ? 'bg-emerald-950/80 text-emerald-400'
                : novel.status === 'hiatus'
                ? 'bg-amber-950/80 text-amber-400'
                : 'bg-blue-950/80 text-blue-400'
            }`}
          >
            {novel.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white group-hover:text-rose-300 transition">
          {novel.title}
        </h3>
        <p className="text-xs text-neutral-500">{novel.author}</p>
        {/* Genres */}
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {novel.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="rounded px-1.5 py-0.5 text-xs text-neutral-400 ring-1 ring-white/10"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
