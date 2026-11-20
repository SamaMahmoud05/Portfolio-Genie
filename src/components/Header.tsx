import { Button } from './ui'

export const Logo = ({ light }: { light?: boolean }) => (
  <span className="flex items-center gap-2.5 text-lg font-bold">
    <span className={`grid h-9 w-9 place-items-center rounded-lg ${light ? 'bg-white text-brand' : 'bg-brand text-white'}`}>✦</span>
    <span className={light ? 'text-white' : ''}>PortfolioGenie</span>
  </span>
)

export function Header({
  dark,
  onToggleDark,
  onNew,
  onHome,
}: {
  dark: boolean
  onToggleDark: () => void
  onNew: () => void
  onHome: () => void
}) {
  return (
    <header className="border-b border-[#e6e4f5] bg-white dark:border-white/10 dark:bg-night">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <button onClick={onHome} aria-label="Home">
          <Logo />
        </button>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onToggleDark}>
            {dark ? 'Light mode' : 'Dark mode'}
          </Button>
          <Button onClick={onNew}>New portfolio</Button>
        </div>
      </div>
    </header>
  )
}
