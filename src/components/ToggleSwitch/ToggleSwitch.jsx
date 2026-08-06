import { useState, useRef, useEffect } from 'react'
import './ToggleSwitch.css'

export function ToggleSwitch({
  offLabel = 'Av',
  onLabel  = 'På',
  defaultChecked = false,
  variant = 'success', // 'success' | 'neutral'
  bordered = false,
  onChange,
}) {
  const [on, setOn] = useState(defaultChecked)
  const containerRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeBtn = container.querySelector('.ts-btn--active')
    if (!activeBtn) return
    const cRect = container.getBoundingClientRect()
    const bRect = activeBtn.getBoundingClientRect()
    setPill({ left: bRect.left - cRect.left, width: bRect.width, ready: true })
  }, [on])

  function toggle() {
    const next = !on
    setOn(next)
    onChange?.(next)
  }

  const cls = [
    'ts-row',
    `ts-row--${variant}`,
    on ? 'ts-row--on' : '',
    bordered ? 'ts-row--bordered' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cls} ref={containerRef} role="group">
      {pill.ready && (
        <div
          className="ts-pill"
          style={{ left: pill.left, width: pill.width }}
        />
      )}

      <button
        className={`ts-btn${!on ? ' ts-btn--active' : ''}`}
        onClick={toggle}
      >
        {offLabel}
      </button>

      <button
        className={`ts-btn${on ? ' ts-btn--active' : ''}`}
        onClick={toggle}
      >
        {onLabel}
      </button>
    </div>
  )
}
