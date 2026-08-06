import { ArrowLeft, ArrowRight, ListBullets } from '@phosphor-icons/react'
import './FloatingNav.css'

export function FloatingNav({
  onPrev,
  onNext,
  onMenu,
  menuLabel    = 'Oversikt',
  prevLabel    = 'Forrige',
  nextLabel    = 'Neste',
  prevDisabled = false,
  nextDisabled = false,
  variant      = 'light',
  contained    = false,
}) {
  return (
    <nav className={`fn-bar fn-bar--${variant}${contained ? ' fn-bar--contained' : ''}`} aria-label="Sidenavigasjon">
      <button
        className="fn-btn fn-btn--ghost"
        onClick={onPrev}
        disabled={prevDisabled}
      >
        <ArrowLeft size={18} weight="bold" />
        <span className="fn-label">{prevLabel}</span>
      </button>

      <button
        className="fn-btn fn-btn--ghost fn-btn--menu"
        onClick={onMenu}
      >
        <ListBullets size={18} weight="bold" />
        <span className="fn-label fn-label--menu">{menuLabel}</span>
      </button>

      <button
        className="fn-btn fn-btn--primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        <span className="fn-label">{nextLabel}</span>
        <ArrowRight size={18} weight="bold" />
      </button>
    </nav>
  )
}
