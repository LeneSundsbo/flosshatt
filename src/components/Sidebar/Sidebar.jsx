import { useState } from 'react'
import './Sidebar.css'

// ─── Accordion-logikk — PORTABLE TO VANILLA JS ───────────────────────────────
// openGroup er én streng (seksjonsnavn) eller null — kun én åpen om gangen.
// Vanilla JS-bruk: kall funksjonene og oppdater DOM manuelt etterpå.

/** Starter med ingen åpen seksjon. */
export function initAccordion() {
  return null
}

/** Åpner seksjonen, eller lukker den hvis den allerede er åpen. */
export function toggleAccordionGroup(openGroup, section) {
  return openGroup === section ? null : section
}

/** Er denne gruppen åpen? */
export function isGroupOpen(openGroup, section, accordion) {
  return !accordion || openGroup === section
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sidebar — venstremeny for showcase-apper.
 *
 * Props:
 *   variant     'full' | 'floating'
 *               full:     strekker seg fra topp til bunn, festet til venstre kant (standard)
 *               floating: panel med skygge og border-radius, sticky under topbar
 *
 *   logo        ReactNode   — f.eks. <Logo height={28} />
 *   logoTag     string      — undertekst under logoen
 *   topSlot     ReactNode   — valgfritt element mellom logo og nav, f.eks. <ThemeToggle />
 *
 *   nav         array av grupper:
 *               [{
 *                 section: 'Tokens',       // visningsnavn
 *                 id: 'tokens',            // valgfritt – gjør label klikkbar (navigasjon)
 *                 items: [{ id, label }],  // valgfritt
 *               }]
 *
 *   active      string      — id til aktivt element
 *   onSelect    (id) => void
 *
 *   accordion   boolean
 *               false (standard): alt ekspandert, kan ikke kollapses
 *               true: seksjonslabel klikkes for å ekspandere/kollapse (starter kollapset)
 */
export function Sidebar({
  variant = 'full',
  logo,
  logoTag,
  topSlot,
  nav = [],
  active,
  onSelect,
  accordion = false,
}) {
  // React-laget: state + trigger. Logikken bor i funksjonene over.
  const [openGroup, setOpenGroup] = useState(initAccordion)

  function handleToggle(section) {
    setOpenGroup(prev => toggleAccordionGroup(prev, section))
  }

  return (
    <aside className={`sidebar sidebar--${variant}`}>

      {(logo || logoTag) && (
        <div className="sidebar-logo">
          {logo}
          {logoTag && <span className="sidebar-logo-tag">{logoTag}</span>}
        </div>
      )}

      {topSlot && <div className="sidebar-top-slot">{topSlot}</div>}

      <nav className="sidebar-nav">
        {nav.map((group) => {
          const open = isGroupOpen(openGroup, group.section, accordion)
          const groupHasActive = group.id === active || group.items?.some(i => i.id === active)

          return (
            <div key={group.section} className="sidebar-group">

              {accordion ? (
                <button
                  className={[
                    'sidebar-section-label',
                    'sidebar-section-label--btn',
                    groupHasActive ? 'sidebar-section-label--active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleToggle(group.section)}
                >
                  {group.section}
                </button>
              ) : group.id ? (
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
                <p className="sidebar-section-label">{group.section}</p>
              )}

              {open && group.items?.map((item) => (
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
