import { useState } from 'react'
import './Sidebar.css'

/**
 * Sidebar — venstremeny for showcase-apper.
 *
 * Props:
 *   logo        ReactNode   — f.eks. <Logo height={28} />
 *   logoTag     string      — undertekst under logoen, f.eks. "Designsystem"
 *   topSlot     ReactNode   — valgfritt element mellom logo og nav, f.eks. <ThemeToggle />
 *   nav         array       — navigasjonsstruktur:
 *                             [{
 *                               section: 'Tokens',       // visningsnavn
 *                               id: 'tokens',            // valgfritt – gjør label klikkbar (navigasjon)
 *                               items: [{ id, label }],  // valgfritt
 *                             }]
 *   active      string      — id til aktivt element (seksjon eller item)
 *   onSelect    (id) => void
 *   accordion   boolean     — false (standard): alt ekspandert, kan ikke kollapses
 *                             true: seksjonslabel klikkes for å ekspandere/kollapse
 */
export function Sidebar({ logo, logoTag, topSlot, nav = [], active, onSelect, accordion = false }) {
  // Alle grupper starter åpne
  const [openGroups, setOpenGroups] = useState(() => new Set(nav.map(g => g.section)))

  function toggleGroup(section) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(section) ? next.delete(section) : next.add(section)
      return next
    })
  }

  return (
    <aside className="sidebar">

      {(logo || logoTag) && (
        <div className="sidebar-logo">
          {logo}
          {logoTag && <span className="sidebar-logo-tag">{logoTag}</span>}
        </div>
      )}

      {topSlot && <div className="sidebar-top-slot">{topSlot}</div>}

      <nav className="sidebar-nav">
        {nav.map((group) => {
          const isOpen = !accordion || openGroups.has(group.section)
          const groupHasActive = group.id === active || group.items?.some(i => i.id === active)

          return (
            <div key={group.section} className="sidebar-group">

              {accordion ? (
                /* Accordion-modus: label er alltid klikkbar og toggles gruppen */
                <button
                  className={[
                    'sidebar-section-label',
                    'sidebar-section-label--btn',
                    groupHasActive ? 'sidebar-section-label--active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => toggleGroup(group.section)}
                >
                  {group.section}
                </button>
              ) : group.id ? (
                /* Navigasjonsmodus: label er klikkbar og navigerer */
                <button
                  className={[
                    'sidebar-section-label',
                    'sidebar-section-label--btn',
                    active === group.id ? 'sidebar-section-label--active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onSelect?.(group.id)}
                >
                  {group.section}
                </button>
              ) : (
                /* Standard: ikke-klikkbar label */
                <p className="sidebar-section-label">{group.section}</p>
              )}

              {isOpen && group.items?.map((item) => (
                <button
                  key={item.id}
                  className={`sidebar-item${active === item.id ? ' sidebar-item--active' : ''}`}
                  onClick={() => onSelect?.(item.id)}
                >
                  {item.label}
                </button>
              ))}

            </div>
          )
        })}
      </nav>

    </aside>
  )
}
