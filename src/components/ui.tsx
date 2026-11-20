import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export function Button({
  variant = 'primary',
  className,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }) {
  return (
    <button
      {...p}
      className={cx(
        'rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
        variant === 'primary'
          ? 'bg-brand text-white hover:bg-brand/90 dark:bg-brand-light dark:text-night'
          : 'border border-[#e3e1f3] bg-white text-ink hover:bg-chip/50 dark:border-white/10 dark:bg-night-card dark:text-white',
        className,
      )}
    />
  )
}

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section
    className={cx(
      'rounded-2xl border border-[#e6e4f5] bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-night-card',
      className,
    )}
  >
    {children}
  </section>
)

const fieldBase =
  'w-full rounded-lg border border-[#e3e1f3] bg-canvas px-4 py-3 text-sm placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 dark:border-white/10 dark:bg-night dark:placeholder:text-white/40'

export function Field({ label, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="mb-4 block text-sm font-semibold">
      {label}
      <input {...p} className={cx(fieldBase, 'mt-2 font-normal', p.className)} />
    </label>
  )
}

export function TextArea({ label, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="mb-4 block text-sm font-semibold">
      {label}
      <textarea {...p} rows={4} className={cx(fieldBase, 'mt-2 resize-y font-normal', p.className)} />
    </label>
  )
}

export const Chip = ({ children, onRemove }: { children: ReactNode; onRemove?: () => void }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-chip px-3 py-1 text-xs font-medium text-brand dark:bg-brand/20 dark:text-brand-light">
    {children}
    {onRemove && (
      <button onClick={onRemove} aria-label="Remove" className="ml-1 leading-none opacity-60 hover:opacity-100">
        ×
      </button>
    )}
  </span>
)

export const ProgressBar = ({ value }: { value: number }) => (
  <div
    role="progressbar"
    aria-valuenow={value}
    className="h-2 w-full overflow-hidden rounded-full bg-chip dark:bg-white/10"
  >
    <div className="h-full rounded-full bg-brand transition-all dark:bg-brand-light" style={{ width: `${value}%` }} />
  </div>
)

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-[#e3e1f3] bg-white dark:border-white/10 dark:bg-night-card">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cx(
            'px-3 py-2 text-sm font-medium sm:px-4',
            o.id === value ? 'bg-brand text-white dark:bg-brand-light dark:text-night' : 'hover:bg-chip/50 dark:hover:bg-white/5',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
