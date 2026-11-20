import { useState } from 'react'
import { improveText, type AIKind } from '../lib/ai'
import { Button } from './ui'

interface Props {
  kind: AIKind
  text: string
  context: string
  label: string
  onApply: (text: string) => void
}

export function AISuggest({ kind, text, context, label, onApply }: Props) {
  const [state, setState] = useState<'idle' | 'loading'>('idle')
  const [suggestion, setSuggestion] = useState('')
  const [error, setError] = useState('')

  async function run() {
    setState('loading')
    setError('')
    try {
      setSuggestion(await improveText(kind, text, context))
    } catch (e) {
      setSuggestion('')
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setState('idle')
    }
  }

  return (
    <div className="mb-4">
      <Button onClick={run} disabled={!text.trim() || state === 'loading'}>
        {state === 'loading' ? 'Thinking…' : label}
      </Button>
      {!text.trim() && <p className="mt-2 text-xs text-muted dark:text-white/60">Write a rough draft first.</p>}
      {error && (
        <p role="alert" className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/30 dark:text-amber-200">
          {error}
        </p>
      )}
      {suggestion && (
        <div className="mt-3 rounded-lg bg-chip p-4 text-sm dark:bg-white/5">
          <b className="text-ok dark:text-emerald-300">Suggested rewrite: </b>
          {suggestion}
          <div className="mt-3 flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                onApply(suggestion)
                setSuggestion('')
              }}
            >
              Use this version
            </Button>
            <Button variant="secondary" onClick={() => setSuggestion('')}>
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
