import type { Portfolio } from '../types'

const label = 'mb-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500'

export function Notebook({ p }: { p: Portfolio }) {
  const projects = p.projects.filter((x) => x.title || x.description)
  return (
    <article className="rounded-md border border-stone-300 bg-[#f7f4ea] p-6 font-serif text-stone-900 sm:p-8">
      <h1 className="text-3xl font-bold">{p.name}</h1>
      <p className="mb-5 border-b border-stone-300 pb-4 italic text-stone-600">{p.title}</p>
      {p.about && (
        <section className="mb-6">
          <h2 className={label}>About</h2>
          <p className="leading-relaxed">{p.about}</p>
        </section>
      )}
      {p.skills.length > 0 && (
        <section className="mb-6">
          <h2 className={label}>Skills</h2>
          <p>{p.skills.join(' · ')}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section>
          <h2 className={label}>Projects</h2>
          <ol className="list-decimal space-y-3 pl-5">
            {projects.map((x) => (
              <li key={x.id}>
                <b>{x.title}</b>
                <p className="leading-relaxed">{x.description}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}
