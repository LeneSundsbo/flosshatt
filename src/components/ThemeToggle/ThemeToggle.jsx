import { useState, useRef, useEffect } from 'react'
import { Sun, Moon } from '@phosphor-icons/react'
import './ThemeToggle.css'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const containerRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeBtn = container.querySelector('.tt-btn--active')
    if (!activeBtn) return
    const cRect = container.getBoundingClientRect()
    const bRect = activeBtn.getBoundingClientRect()
    setPill({ left: bRect.left - cRect.left, width: bRect.width, ready: true })
  }, [dark])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  return (
    <div className="tt-wrap" ref={containerRef} role="group" aria-label="Fargemodus">
      {pill.ready && (
        <div className="tt-pill" style={{ left: pill.left, width: pill.width }} />
      )}
      <button
        className={`tt-btn${!dark ? ' tt-btn--active' : ''}`}
        onClick={toggle}
        aria-label="Lys modus"
      >
        <Sun size={16} weight="bold" />
      </button>
      <button
        className={`tt-btn${dark ? ' tt-btn--active' : ''}`}
        onClick={toggle}
        aria-label="Mørk modus"
      >
        <Moon size={16} weight="bold" />
      </button>
    </div>
  )
}
