import { User, List } from '@phosphor-icons/react'
import { Logo } from '../../graphics/Logo'
import './FloatingMenu.css'

export function FloatingMenu({
  items = [],
  onUser,
  onMenuOpen,
  contained = false,
  variant = 'light',
}) {
  return (
    <div className={`fm-bar fm-bar--${variant}${contained ? ' fm-bar--contained' : ''}`}>
      <Logo height={18} className="fm-logo" />

      <nav className="fm-nav" aria-label="Hovednavigasjon">
        {items.map((item, i) => (
          <button key={i} className="fm-nav-item" onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="fm-actions">
        <button className="fm-user-btn" onClick={onUser} aria-label="Brukerprofil">
          <User size={26} weight="light" />
        </button>
        <button className="fm-menu-btn" onClick={onMenuOpen} aria-label="Åpne meny">
          <List size={18} weight="bold" />
          <span>Meny</span>
        </button>
      </div>
    </div>
  )
}
