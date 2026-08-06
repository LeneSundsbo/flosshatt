import { useState, useRef } from 'react'
import { Check } from '@phosphor-icons/react'
import './StickyNote.css'

export function StickyNote({ children, defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked)
  const rotation = useRef(Math.random() * 6 - 3)
  const size = useRef(Math.round(220 + Math.random() * 40))

  function handleCheck() {
    const next = !checked
    setChecked(next)
    onChange?.(next)
  }

  const style = {
    '--sn-size': `${size.current}px`,
    transform: `rotate(${rotation.current}deg)`,
  }

  return (
    <div className={`sn-note${checked ? ' sn-note--checked' : ''}`} style={style}>
      <p className="sn-text">{children}</p>
      <button
        className="sn-checkbox"
        onClick={handleCheck}
        aria-pressed={checked}
        aria-label="Merk som fullført"
      >
        {checked && <Check size={14} weight="bold" />}
      </button>
    </div>
  )
}
