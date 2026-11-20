const ENDPOINT = import.meta.env.VITE_AI_ENDPOINT ?? '/api/improve'

export type AIKind = 'about' | 'project'

export async function improveText(kind: AIKind, text: string, context: string): Promise<string> {
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, text, context }),
    })
  } catch {
    throw new Error('Could not reach the AI service. Is the proxy running (npm run api)?')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error ?? `AI request failed (${res.status})`)
  if (!data.text) throw new Error('The AI returned an empty response.')
  return data.text as string
}
