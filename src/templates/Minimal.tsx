import type { Portfolio } from '../types'

export function Minimal({ p }: { p: Portfolio }) {
  const projects = p.projects.filter((x) => x.title || x.description)
  return (
    <article className="rounded-xl bg-white p-6 text-ink shadow-sm">
      <h1 className="text-2xl font-bold">{p.name}</h1>
      <p className="mb-4 text-muted">{p.title}</p>
      {p.about && (
        <>
          <h2 className="mb-2 font-semibold">About</h2>
          <p className="mb-5 text-sm leading-relaxed">{p.about}</p>
        </>
      )}
      {p.skills.length > 0 && (
        <>
          <h2 className="mb-2 font-semibold">Skills</h2>
          <div className="mb-5 flex flex-wrap gap-2">
            {p.skills.map((s) => (
              <span key={s} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-brand">
                {s}
              </span>
            ))}
          </div>
        </>
      )}
      {projects.map((x) => (
        <div key={x.id} className="mb-5">
          <h2 className="mb-1 font-semibold">{x.title}</h2>
          <p className="text-sm leading-relaxed">{x.description}</p>
        </div>
      ))}
    </article>
  )
}
