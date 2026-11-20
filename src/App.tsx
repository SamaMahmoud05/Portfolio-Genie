import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Button } from './components/ui'
import { decodePortfolio } from './lib/share'
import { useLocalStorage } from './lib/storage'
import { Builder } from './pages/Builder'
import { Landing } from './pages/Landing'
import { PortfolioView } from './templates'
import { emptyPortfolio, isEmpty, type Portfolio } from './types'

const useHash = () => {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const on = () => setHash(location.hash)
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return hash
}
const go = (h: string) => (location.hash = h)

export default function App() {
  const [p, setP] = useLocalStorage<Portfolio>('pg:portfolio', emptyPortfolio)
  const [dark, setDark] = useLocalStorage('pg:dark', () => matchMedia('(prefers-color-scheme: dark)').matches)
  const hash = useHash()
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  const toggleDark = () => setDark((d) => !d)

  if (hash.startsWith('#/p/')) {
    const shared = decodePortfolio(hash.slice(4))
    return (
      <main className="mx-auto max-w-3xl p-4">
        {shared ? (
          <PortfolioView p={shared} />
        ) : (
          <div className="py-24 text-center">
            <p className="mb-4">This portfolio link is invalid or incomplete.</p>
            <Button onClick={() => go('')}>Go to PortfolioGenie</Button>
          </div>
        )}
      </main>
    )
  }

  if (hash !== '#/build')
    return <Landing hasDraft={!isEmpty(p)} onStart={() => go('#/build')} dark={dark} onToggleDark={toggleDark} />

  return (
    <>
      <Header
        dark={dark}
        onToggleDark={toggleDark}
        onHome={() => go('')}
        onNew={() => confirm('Start over? Your current draft will be cleared.') && setP(emptyPortfolio)}
      />
      <Builder p={p} setP={setP} onExit={() => go('')} />
    </>
  )
}
