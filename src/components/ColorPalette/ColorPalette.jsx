import { useEffect, useState } from 'react'
import './ColorPalette.css'

const PALETTES = [
  {
    name: 'First',
    vars:    ['--color-first-1',    '--color-first-2',    '--color-first-3',    '--color-first-7',    '--color-first-8',    '--color-first-9'],
    darkVars:['--color-first-1-dk', '--color-first-2-dk', '--color-first-3-dk', '--color-first-7-dk', '--color-first-8-dk', '--color-first-9-dk'],
  },
  {
    name: 'Second',
    vars:    ['--color-second-1',    '--color-second-2',    '--color-second-3',    '--color-second-7',    '--color-second-8',    '--color-second-9'],
    darkVars:['--color-second-1-dk', '--color-second-2-dk', '--color-second-3-dk', '--color-second-7-dk', '--color-second-8-dk', '--color-second-9-dk'],
  },
  {
    name: 'Neutral',
    vars:    ['--color-neutral-0',    '--color-neutral-1',    '--color-neutral-2',    '--color-neutral-3',    '--color-neutral-7',    '--color-neutral-8',    '--color-neutral-9'],
    darkVars:['--color-neutral-0-dk', '--color-neutral-1-dk', '--color-neutral-2-dk', '--color-neutral-3-dk', '--color-neutral-7-dk', '--color-neutral-8-dk', '--color-neutral-9-dk'],
  },
  {
    name: 'Success',
    vars:    ['--color-success-1',    '--color-success-2',    '--color-success-3',    '--color-success-7',    '--color-success-8',    '--color-success-9'],
    darkVars:['--color-success-1-dk', '--color-success-2-dk', '--color-success-3-dk', '--color-success-7-dk', '--color-success-8-dk', '--color-success-9-dk'],
  },
  {
    name: 'Warning',
    vars:    ['--color-warning-1',    '--color-warning-2',    '--color-warning-3',    '--color-warning-7',    '--color-warning-8',    '--color-warning-9'],
    darkVars:['--color-warning-1-dk', '--color-warning-2-dk', '--color-warning-3-dk', '--color-warning-7-dk', '--color-warning-8-dk', '--color-warning-9-dk'],
  },
  {
    name: 'Error',
    vars:    ['--color-error-1',    '--color-error-2',    '--color-error-3',    '--color-error-7',    '--color-error-8',    '--color-error-9'],
    darkVars:['--color-error-1-dk', '--color-error-2-dk', '--color-error-3-dk', '--color-error-7-dk', '--color-error-8-dk', '--color-error-9-dk'],
  },
]

function readCssVar(el, name) {
  return getComputedStyle(el).getPropertyValue(name).trim()
}

function ColLabel({ varName, bandRef }) {
  const [hex, setHex] = useState('')

  useEffect(() => {
    if (bandRef?.current) setHex(readCssVar(bandRef.current, varName))
  }, [varName, bandRef])

  const label = varName.replace('--color-', '').replace('-dk', '')

  return (
    <div className="cp-label">
      <span className="cp-label-name">{label}</span>
      <span className="cp-label-hex">{hex}</span>
    </div>
  )
}

function Band({ vars, theme, cols }) {
  const ref = useState(null)
  const bandRef = { current: null }

  return (
    <div
      className={`cp-band cp-band--${theme}`}
      data-theme={theme}
      style={{ '--cp-cols': cols }}
      ref={(el) => { bandRef.current = el }}
    >
      <div className="cp-row cp-row--labels">
        {vars.map((v) => (
          <ColLabel key={v} varName={v} bandRef={bandRef} />
        ))}
      </div>
      <div className="cp-row cp-row--chips">
        {vars.map((v) => (
          <button
            key={v}
            className="cp-chip"
            style={{ background: `var(${v})` }}
            onClick={() => {
              const hex = bandRef.current
                ? readCssVar(bandRef.current, v)
                : ''
              navigator.clipboard.writeText(hex)
            }}
            title="Klikk for å kopiere"
          />
        ))}
      </div>
    </div>
  )
}

export function ColorPalette() {
  return (
    <div className="cp-wrapper">
      {PALETTES.map((palette) => {
        const lightCols = palette.vars.length
        const darkCols  = palette.darkVars.length
        return (
          <section key={palette.name} className="cp-group">
            <h3 className="cp-group-title">{palette.name}</h3>
            <div className="cp-block">
              <Band vars={palette.vars}     theme="light" cols={lightCols} />
              <Band vars={palette.darkVars} theme="dark"  cols={darkCols}  />
            </div>
          </section>
        )
      })}
      <p className="cp-hint">Klikk en farge for å kopiere hex-koden</p>
    </div>
  )
}
