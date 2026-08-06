import { useState, useRef } from 'react'
import './ExpandableCard.css'

function ChevronIcon({ open }) {
  return (
    <svg
      className={`ec-chevron${open ? ' ec-chevron--open' : ''}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExpandableCard({ title, subtitle, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const contentRef = useRef(null)

  return (
    <div className={`ec-card${open ? ' ec-card--open' : ''}`}>
      <button
        className="ec-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="ec-header-text">
          <span className="ec-title">{title}</span>
          {subtitle && <span className="ec-subtitle">{subtitle}</span>}
        </div>
        <ChevronIcon open={open} />
      </button>

      <div
        className="ec-body"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight + 'px' : '0px',
        }}
      >
        <div className="ec-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Showcase-wrapper: viser flere kort som en gruppe
export function ExpandableCardGroup({ children }) {
  return <div className="ec-group">{children}</div>
}
