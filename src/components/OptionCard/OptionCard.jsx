import { useState } from 'react'
import './OptionCard.css'

export function OptionCard({ label, defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked)

  function handleClick() {
    const next = !checked
    setChecked(next)
    onChange?.(next)
  }

  return (
    <button
      className={`oc-card${checked ? ' oc-card--checked' : ''}`}
      onClick={handleClick}
      aria-pressed={checked}
    >
      <span className="oc-label">{label}</span>
    </button>
  )
}

export function OptionCardGroup({ children }) {
  return <div className="oc-group">{children}</div>
}
