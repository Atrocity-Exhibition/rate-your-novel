interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  count?: number
}

export default function ScoreBadge({ score, size = 'md', count }: ScoreBadgeProps) {
  const rounded = Math.round(score * 10) / 10

  const color =
    score >= 8.5
      ? 'bg-emerald-600/20 text-emerald-400 ring-emerald-600/40'
      : score >= 7
      ? 'bg-amber-600/20 text-amber-400 ring-amber-600/40'
      : score >= 5
      ? 'bg-orange-600/20 text-orange-400 ring-orange-600/40'
      : 'bg-rose-600/20 text-rose-400 ring-rose-600/40'

  const sizeClass =
    size === 'lg'
      ? 'text-4xl font-black px-4 py-2 ring-2'
      : size === 'sm'
      ? 'text-xs font-bold px-2 py-0.5 ring-1'
      : 'text-sm font-bold px-2.5 py-1 ring-1'

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`rounded-lg ${color} ${sizeClass} tabular-nums`}>
        {score === 0 ? 'NR' : rounded.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-neutral-500">{count.toLocaleString()} ratings</span>
      )}
    </div>
  )
}
