import { useRef, useEffect, useState } from 'react'
import './Card.css'

// ─── Chamfer path builder ─────────────────────────────────────────────────────
// Portable: same logic works in vanilla JS for non-React apps (e.g. Båtfører'n).
// W, H, r, c, re: all in pixels.
//   r  = corner radius (the three rounded corners)
//   c  = chamfer size (how much is cut from top-right, measured along each edge)
//   re = endpoint rounding radius (rounds the two ends of the diagonal cut)
export function buildChamferPath(W, H, r, c, re) {
  const SB  = re * (Math.SQRT2 - 1)   // set-back from virtual corner along edge
  const SBD = SB / Math.SQRT2          // set-back per axis along the diagonal

  return [
    `M ${r} 0`,
    `L ${W - c - SB} 0`,
    `A ${re} ${re} 0 0 1 ${W - c + SBD} ${SBD}`,
    `L ${W - SBD} ${c - SBD}`,
    `A ${re} ${re} 0 0 1 ${W} ${c + SB}`,
    `L ${W} ${H - r}`,
    `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
    `L ${r} ${H}`,
    `A ${r} ${r} 0 0 1 0 ${H - r}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z',
  ].join(' ')
}

// Resolves a CSS custom property value to pixels (handles px and rem).
export function resolveVarPx(el, varName, fallback = 0) {
  const raw = getComputedStyle(el).getPropertyValue(varName).trim()
  if (!raw) return fallback
  if (raw.endsWith('px'))  return parseFloat(raw)
  if (raw.endsWith('rem')) {
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return parseFloat(raw) * rootPx
  }
  return parseFloat(raw) || fallback
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ title, subtitle, children, variant = 'light', chamfer = false }) {
  const showHeader = title || subtitle
  const cardRef    = useRef(null)
  const [clipPath, setClipPath] = useState('')

  useEffect(() => {
    if (!chamfer) return
    const el = cardRef.current
    if (!el) return

    function update() {
      const { width: W, height: H } = el.getBoundingClientRect()
      const r  = resolveVarPx(el, '--radius-xl', 24)
      const c  = resolveVarPx(el, '--card-chamfer-size', 40)
      const re = resolveVarPx(el, '--card-chamfer-radius', r)
      setClipPath(`path('${buildChamferPath(W, H, r, c, re)}')`)
    }

    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [chamfer])

  const card = (
    <div
      className={`c-card c-card--${variant}${chamfer ? ' c-card--chamfer' : ''}`}
      ref={cardRef}
      style={clipPath ? { clipPath } : undefined}
    >
      {showHeader && (
        <div className="c-header">
          <div className="c-header-text">
            {title && <span className="c-title">{title}</span>}
            {subtitle && <span className="c-subtitle">{subtitle}</span>}
          </div>
        </div>
      )}
      <div className="c-content">
        {children}
      </div>
    </div>
  )

  // Chamfer: filter: drop-shadow() må ligge på et wrapper-element utenpå clip-path,
  // ellers klipper clip-path skyggen bort.
  return chamfer ? <div className="c-card-chamfer-wrap">{card}</div> : card
}

export function CardGroup({ children }) {
  return <div className="c-group">{children}</div>
}
