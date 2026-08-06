import { useState, useRef, useEffect } from 'react'
import './ToggleRow.css'

export function ToggleRow({ options, defaultValue, onChange }) {
  const [active, setActive] = useState(defaultValue ?? options[0]?.value)
  const containerRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  // Flytt pillen til aktiv knapp
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeBtn = container.querySelector('.tr-btn--active')
    if (!activeBtn) return
    const cRect = container.getBoundingClientRect()
    const bRect = activeBtn.getBoundingClientRect()
    setPill({
      left:  bRect.left - cRect.left,
      width: bRect.width,
      ready: true,
    })
  }, [active])

  function handleSelect(value) {
    setActive(value)
    onChange?.(value)
  }

  return (
    <div className="tr-row" ref={containerRef} role="group">
      {pill.ready && (
        <div
          className="tr-pill"
          style={{ left: pill.left, width: pill.width }}
        />
      )}
      {options.map((option) => (
        <button
          key={option.value}
          className={`tr-btn${active === option.value ? ' tr-btn--active' : ''}`}
          onClick={() => handleSelect(option.value)}
          aria-pressed={active === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
