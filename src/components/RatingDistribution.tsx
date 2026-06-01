interface RatingDistributionProps {
  distribution: Record<number, number>
}

export default function RatingDistribution({ distribution }: RatingDistributionProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)
  if (total === 0) return null
  const max = Math.max(...Object.values(distribution))

  return (
    <div className="flex flex-col gap-1">
      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => {
        const count = distribution[score] ?? 0
        const pct = max > 0 ? (count / max) * 100 : 0
        const totalPct = total > 0 ? Math.round((count / total) * 100) : 0
        return (
          <div key={score} className="flex items-center gap-2">
            <span className="w-4 text-right text-xs text-neutral-500">{score}</span>
            <div className="flex-1 h-2 rounded-full bg-white/6">
              <div
                className="h-2 rounded-full bg-rose-600 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-7 text-right text-xs text-neutral-500">{totalPct}%</span>
          </div>
        )
      })}
    </div>
  )
}
