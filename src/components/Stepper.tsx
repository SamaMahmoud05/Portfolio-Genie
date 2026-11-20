export function Stepper({ steps, current, onSelect }: { steps: string[]; current: number; onSelect: (i: number) => void }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Steps">
      {steps.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <button
            key={s}
            onClick={() => onSelect(i)}
            aria-current={active ? 'step' : undefined}
            className={`flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-medium dark:bg-night-card ${
              active ? 'border-2 border-brand dark:border-brand-light' : 'border-[#e6e4f5] dark:border-white/10'
            }`}
          >
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                done ? 'bg-ok text-white' : active ? 'bg-brand text-white dark:bg-brand-light dark:text-night' : 'bg-chip text-ink'
              }`}
            >
              {done ? '✓' : i + 1}
            </span>
            {s}
          </button>
        )
      })}
    </nav>
  )
}
