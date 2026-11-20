export type TemplateId = 'minimal' | 'bento' | 'notebook'

export interface Project {
  id: string
  title: string
  description: string
}

export interface Portfolio {
  name: string
  title: string
  about: string
  skills: string[]
  projects: Project[]
  template: TemplateId
}

export const newProject = (): Project => ({ id: crypto.randomUUID(), title: '', description: '' })

export const emptyPortfolio = (): Portfolio => ({
  name: '',
  title: '',
  about: '',
  skills: [],
  projects: [newProject()],
  template: 'minimal',
})

export const isEmpty = (p: Portfolio) =>
  !p.name && !p.title && !p.about && !p.skills.length && !p.projects.some((x) => x.title || x.description)

/** Share of the 5 core sections that are filled in. */
export const completeness = (p: Portfolio) => {
  const done = [p.name && p.title, p.about, p.skills.length, p.projects.some((x) => x.title && x.description)]
  return Math.round((done.filter(Boolean).length / done.length) * 100)
}
