import type { ComponentType } from 'react'
import type { Portfolio, TemplateId } from '../types'
import { Bento } from './Bento'
import { Minimal } from './Minimal'
import { Notebook } from './Notebook'

export const TEMPLATES: { id: TemplateId; label: string; Component: ComponentType<{ p: Portfolio }> }[] = [
  { id: 'minimal', label: 'Minimal', Component: Minimal },
  { id: 'bento', label: 'Bento grid', Component: Bento },
  { id: 'notebook', label: 'Notebook', Component: Notebook },
]

export function PortfolioView({ p }: { p: Portfolio }) {
  const T = (TEMPLATES.find((t) => t.id === p.template) ?? TEMPLATES[0]).Component
  return <T p={p} />
}
