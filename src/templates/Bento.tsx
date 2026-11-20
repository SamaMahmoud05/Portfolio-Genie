import type { Portfolio } from '../types'

const tile = 'rounded-2xl bg-white p-5 text-ink shadow-sm'

export function Bento({ p }: { p: Portfolio }) {
  const projects = p.projects.filter((x) => x.title || x.description)
  return (
    <article className="rounded-3xl bg-gradient-to-br from-brand to-emerald-500 p-3 sm:p-4">
      <div className="p-3 text-white">
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <p className="opacity-90">{p.title}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {p.about && (
          <div className={`${tile} sm:col-span-2`}>
            <h2 className="mb-1 text-xs font-bold uppercase tracking-wide text-brand">About</h2>
            <p className="text-sm leading-relaxed">{p.about}</p>
          </div>
        )}
        {p.skills.length > 0 && (
          <div className={`${tile} sm:col-span-2`}>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-brand">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <span key={s} className="rounded-lg bg-chip px-2.5 py-1 text-xs font-semibold text-brand">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {projects.map((x) => (
          <div key={x.id} className={tile}>
            <h2 className="mb-1 font-semibold">{x.title}</h2>
            <p className="text-sm leading-relaxed text-muted">{x.description}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
