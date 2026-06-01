interface RatingPickerProps {
  value: number
  onChange: (score: number) => void
  disabled?: boolean
}

export default function RatingPicker({ value, onChange, disabled = false }: RatingPickerProps) {
  const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5">
        {scores.map((s) => (
          <button
            key={s}
            onClick={() => !disabled && onChange(s)}
            disabled={disabled}
            className={`h-8 w-8 rounded-lg text-sm font-bold transition ${
              s <= value
                ? s >= 9
                  ? 'bg-emerald-600 text-white'
                  : s >= 7
                  ? 'bg-amber-600 text-white'
                  : 'bg-rose-700 text-white'
                : 'bg-white/8 text-neutral-500 hover:bg-white/14 hover:text-white'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            {s}
          </button>
        ))}
      </div>
      {value > 0 && (
        <p className="text-xs text-neutral-400">
          Your score:{' '}
          <span className="font-bold text-white">{value}</span>
          /10
        </p>
      )}
    </div>
  )
}
