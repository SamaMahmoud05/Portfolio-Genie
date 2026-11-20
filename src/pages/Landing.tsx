import { Logo } from '../components/Header'
import { Button } from '../components/ui'

const FEATURES = [
  'Fill in a short form: name, skills and projects',
  'Polish your About me and project text with AI',
  'Pick a template and watch the preview update live',
  'Download a ready-to-host HTML file or share a link',
]

export function Landing({ hasDraft, onStart, onToggleDark, dark }: { hasDraft: boolean; onStart: () => void; onToggleDark: () => void; dark: boolean }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="flex flex-col justify-between bg-gradient-to-b from-[#3d33b5] to-[#7366e6] p-8 text-white sm:p-12">
        <Logo light />
        <div className="my-16 max-w-xl">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Turn your projects into a portfolio recruiters remember.</h1>
          <p className="mt-5 text-lg text-white/80">No code, no design skills. Your draft is saved in this browser automatically.</p>
        </div>
        <p className="text-sm text-white/70">Free to use · No account needed</p>
      </section>
      <section className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold">Build yours in minutes</h2>
          <ul className="my-6 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3 text-muted dark:text-white/70">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok text-xs text-white">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Button className="w-full py-3.5 text-base" onClick={onStart}>
            {hasDraft ? 'Continue your portfolio' : 'Start building'}
          </Button>
          <Button variant="secondary" className="mt-3 w-full" onClick={onToggleDark}>
            {dark ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </section>
    </div>
  )
}
