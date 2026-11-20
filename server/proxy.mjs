import http from 'node:http'

const PROMPTS = {
  about:
    'Rewrite the text as a concise, professional About Me (2-3 sentences, first person) for a portfolio.',
  project:
    'Rewrite the text as a concise project description (1-2 sentences) starting with a strong action verb.',
}

const RULES =
  'You edit portfolio text for students and entry-level professionals. Never invent facts, numbers, technologies, employers or results. Return only the rewritten text.'

http.createServer(async (req, res) => {
  const send = (code, body) => {
    res.writeHead(code, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(body))
  }

  if (req.method !== 'POST' || req.url !== '/api/improve') {
    return send(404, { error: 'Not found' })
  }

  if (!process.env.GEMINI_API_KEY) {
    return send(500, { error: 'GEMINI_API_KEY is not set in .env' })
  }

  try {
    let raw = ''
    for await (const chunk of req) raw += chunk

    const { kind, text, context } = JSON.parse(raw)

    if (!PROMPTS[kind] || typeof text !== 'string' || !text.trim()) {
      return send(400, { error: 'Invalid request' })
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/interactions',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemini-3.8-flash',
          input: `${RULES}\n${PROMPTS[kind]}\n\nContext: ${String(context ?? '').slice(0, 300)}\n\nText:\n${text.slice(0, 2000)}`,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini error:', data)
      return send(502, {
        error: data.error?.message ?? 'Gemini API error',
      })
    }

    const result = data.steps
      ?.filter(step => step.type === 'model_output')
      .flatMap(step => step.content ?? [])
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('')

    send(200, { text: result?.trim() ?? '' })

  } catch (error) {
    console.error(error)
    send(500, { error: 'Server error' })
  }
}).listen(8787, () => {
  console.log('Gemini AI proxy running on port 8787')
})