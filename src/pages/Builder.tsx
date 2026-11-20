import { useRef, useState, type KeyboardEvent } from 'react'
import { AISuggest } from '../components/AISuggest'
import { Preview } from '../components/Preview'
import { Stepper } from '../components/Stepper'
import { Button, Card, Chip, Field, ProgressBar, TextArea } from '../components/ui'
import { TEMPLATES } from '../templates'
import { downloadHtml, shareUrl } from '../lib/share'
import { completeness, isEmpty, newProject, type Portfolio, type TemplateId } from '../types'

const STEPS = ['Info', 'About', 'Skills', 'Projects', 'Publish']
const sub = 'mb-4 text-sm text-muted dark:text-white/60'

interface Props {
  p: Portfolio
  setP: (fn: (p: Portfolio) => Portfolio) => void
  onExit: () => void
}

export function Builder({ p, setP, onExit }: Props) {
  const [step, setStep] = useState(0)
  const [skill, setSkill] = useState('')
  const [notice, setNotice] = useState('')
  const previewRef = useRef<HTMLDivElement>(null)
  const set = <K extends keyof Portfolio>(k: K, v: Portfolio[K]) => setP((x) => ({ ...x, [k]: v }))
  const setProject = (id: string, patch: Partial<Portfolio['projects'][number]>) =>
    set('projects', p.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)))

  function addSkill(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' && e.key !== ',') return
    e.preventDefault()
    const s = skill.trim()
    if (s && !p.skills.some((x) => x.toLowerCase() === s.toLowerCase())) set('skills', [...p.skills, s])
    setSkill('')
  }

  function download() {
    if (!previewRef.current) return
    downloadHtml(previewRef.current, p.name)
    setNotice('Downloaded. Your portfolio is still saved in this browser.')
  }

  async function copyLink() {
    const url = shareUrl(p)
    try {
      if (navigator.share) await navigator.share({ title: p.name, url })
      else {
        await navigator.clipboard.writeText(url)
        setNotice('Link copied. Anyone with it can view your portfolio.')
      }
    } catch {
      setNotice('Could not share. Select and copy the link manually: ' + url)
    }
  }

  const nav = (
    <div className="mt-2 flex items-center justify-between">
      <Button variant="secondary" onClick={() => (step === 0 ? onExit() : setStep(step - 1))}>
        Back
      </Button>
      <Button onClick={() => (step === STEPS.length - 1 ? download() : setStep(step + 1))} disabled={step === STEPS.length - 1 && isEmpty(p)}>
        {step === STEPS.length - 1 ? 'Finish' : 'Save and continue'}
      </Button>
    </div>
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Build your portfolio</h1>
          <p className="text-muted dark:text-white/60">
            Step {step + 1} of {STEPS.length} · Saved automatically
          </p>
        </div>
        <div className="w-full sm:w-72">
          <p className="mb-1 text-sm text-muted dark:text-white/60">Portfolio completeness</p>
          <ProgressBar value={completeness(p)} />
        </div>
      </div>
      <div className="mb-6">
        <Stepper steps={STEPS} current={step} onSelect={setStep} />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card>
          {step === 0 && (
            <>
              <h2 className="text-xl font-bold">Basic info</h2>
              <p className={sub}>Who are you and what do you do?</p>
              <Field label="Full name" value={p.name} onChange={(e) => set('name', e.target.value)} placeholder="Sarah Chen" />
              <Field label="Job title" value={p.title} onChange={(e) => set('title', e.target.value)} placeholder="Backend Engineer" />
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold">About you</h2>
              <p className={sub}>Write a rough draft. The AI will polish it.</p>
              <TextArea label="About me" value={p.about} onChange={(e) => set('about', e.target.value)} />
              <AISuggest kind="about" label="Improve with AI" text={p.about} context={`${p.name}, ${p.title}. Skills: ${p.skills.join(', ')}`} onApply={(t) => set('about', t)} />
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold">Skills</h2>
              <p className={sub}>Add the tools you use. Press Enter to add.</p>
              <Field label="Add a skill" value={skill} onChange={(e) => setSkill(e.target.value)} onKeyDown={addSkill} placeholder="e.g. Go" />
              <div className="-mt-2 mb-4 flex flex-wrap gap-2">
                {p.skills.length === 0 && <span className="text-sm text-muted dark:text-white/60">No skills yet.</span>}
                {p.skills.map((s) => (
                  <Chip key={s} onRemove={() => set('skills', p.skills.filter((x) => x !== s))}>
                    {s}
                  </Chip>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold">Projects</h2>
              <p className={sub}>Describe what you built and the result.</p>
              {p.projects.map((x, i) => (
                <div key={x.id} className={i > 0 ? 'mt-6 border-t border-[#e6e4f5] pt-5 dark:border-white/10' : ''}>
                  <Field label="Project title" value={x.title} onChange={(e) => setProject(x.id, { title: e.target.value })} />
                  <TextArea label="What did you do?" value={x.description} onChange={(e) => setProject(x.id, { description: e.target.value })} />
                  <AISuggest kind="project" label="Rewrite with action verbs" text={x.description} context={`Project: ${x.title}. Role: ${p.title}`} onApply={(t) => setProject(x.id, { description: t })} />
                  {p.projects.length > 1 && (
                    <button className="mb-4 text-sm text-red-600 hover:underline dark:text-red-400" onClick={() => set('projects', p.projects.filter((y) => y.id !== x.id))}>
                      Remove project
                    </button>
                  )}
                </div>
              ))}
              <Button variant="secondary" className="mb-4" onClick={() => set('projects', [...p.projects, newProject()])}>
                + Add project
              </Button>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-xl font-bold">Template and publish</h2>
              <p className={sub}>Switching template never deletes your data.</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => set('template', t.id as TemplateId)}
                    aria-pressed={p.template === t.id}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                      p.template === t.id ? 'bg-brand text-white dark:bg-brand-light dark:text-night' : 'bg-chip text-ink hover:bg-chip/70 dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                <Button disabled={isEmpty(p)} onClick={download}>
                  Download HTML
                </Button>
                <Button variant="secondary" onClick={copyLink}>
                  Share link
                </Button>
              </div>
              {isEmpty(p) && <p className="mb-3 text-xs text-muted dark:text-white/60">Add some content to enable download.</p>}
              {notice && <p role="status" className="mb-3 break-all text-sm text-ok dark:text-emerald-300">{notice}</p>}
            </>
          )}
          {nav}
        </Card>
        <Preview ref={previewRef} p={p} />
      </div>
    </main>
  )
}
