import { forwardRef, useState } from 'react'
import { PortfolioView } from '../templates'
import { isEmpty, type Portfolio } from '../types'
import { Card, Segmented } from './ui'

type Device = 'desktop' | 'tablet' | 'mobile'
const WIDTH: Record<Device, string> = { desktop: '100%', tablet: '640px', mobile: '375px' }

export const Preview = forwardRef<HTMLDivElement, { p: Portfolio }>(function Preview({ p }, ref) {
  const [device, setDevice] = useState<Device>('desktop')
  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Live preview</h2>
        <Segmented<Device>
          value={device}
          onChange={setDevice}
          options={[
            { id: 'desktop', label: 'Desktop' },
            { id: 'tablet', label: 'Tablet' },
            { id: 'mobile', label: 'Mobile' },
          ]}
        />
      </div>
      <div className="rounded-xl border border-dashed border-[#d9d6ef] p-3 sm:p-4 dark:border-white/15">
        {isEmpty(p) ? (
          <p className="py-16 text-center text-sm text-muted dark:text-white/60">
            Start filling in the form and your portfolio appears here.
          </p>
        ) : (
          <div className="mx-auto transition-all" style={{ maxWidth: WIDTH[device] }}>
            <div ref={ref}>
              <PortfolioView p={p} />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
})
