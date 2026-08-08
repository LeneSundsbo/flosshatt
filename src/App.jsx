import { useState } from 'react'
import { FloatingNav } from './components/FloatingNav/FloatingNav'
import { ProgressBar } from './components/ProgressBar/ProgressBar'
import { FloatingMenu } from './components/FloatingMenu/FloatingMenu'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle'
import { Logo } from './graphics/Logo'
import { DropsLayer } from './components/Drops/Drops'
import { StickyNote } from './components/StickyNote/StickyNote'
import { ColorPalette } from './components/ColorPalette/ColorPalette'
import { ExpandableCard, ExpandableCardGroup } from './components/ExpandableCard/ExpandableCard'
import { ToggleRow } from './components/ToggleRow/ToggleRow'
import { ToggleSwitch } from './components/ToggleSwitch/ToggleSwitch'
import { Button } from './components/Button/Button'
import { OptionCard, OptionCardGroup } from './components/OptionCard/OptionCard'
import { Card, CardGroup } from './components/Card/Card'
import { IconCard, IconCardGroup } from './components/IconCard/IconCard'
import { Shield, Clock, Users, ChartLine } from '@phosphor-icons/react'
import './App.css'

const NAV = [
  {
    section: 'Tokens',
    items: [
      { id: 'colors', label: 'Farger', component: <ColorPalette /> },
      { id: 'theme-toggle', label: 'Theme Toggle', component: <ThemeToggle /> },
      {
        id: 'shadows',
        label: 'Skygger',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {[
              { name: '--shadow-sm', label: 'shadow-sm' },
              { name: '--shadow-md', label: 'shadow-md' },
              { name: '--shadow-lg', label: 'shadow-lg' },
            ].map(({ name, label }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                <div style={{
                  width: '120px', height: '80px', flexShrink: 0,
                  background: 'var(--color-neutral-0)',
                  borderRadius: 'var(--radius-m)',
                  boxShadow: `var(${name})`,
                }} />
                <div>
                  <p style={{ margin: 0, fontFamily: 'var(--font-family-mono, monospace)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-9)', fontWeight: 'var(--font-weight-semibold)' }}>{label}</p>
                  <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-family-mono, monospace)', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-7)' }}>{`var(${name})`}</p>
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        id: 'prose',
        label: 'Prose',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Standard (md)</p>
              <div className="prose">
                <h1>Overskrift h1</h1>
                <h2>Overskrift h2</h2>
                <h3>Overskrift h3</h3>
                <p>Dette er et avsnitt med brødtekst i standard størrelse. Teksten følger <strong>optimal linjelengde</strong> på 65 tegn og har god linjehøyde for lesbarhet.</p>
                <p>Et nytt avsnitt får automatisk riktig avstand over seg. Du kan også bruke <em>kursiv</em> og <a href="#">lenker med understreking</a>.</p>
                <ul>
                  <li>Første punkt i en liste</li>
                  <li>Andre punkt med litt mer tekst</li>
                  <li>Tredje punkt</li>
                </ul>
                <small>Fotnote: Kun for fine print som juridisk tekst eller forbehold. Ikke bruk på brødtekst.</small>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Stor (lg)</p>
              <div className="prose prose--lg">
                <p>Dette er et avsnitt i stor størrelse, egnet for ingress eller fremhevet innhold der teksten skal ha ekstra tyngde.</p>
                <p>Fluid skalering sørger for at teksten er behagelig å lese på alle skjermstørrelser.</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    section: 'Komponenter',
    items: [
      {
        id: 'button',
        label: 'Button',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>

            {/* Varianter */}
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Varianter</p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Størrelser */}
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Størrelser</p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button size="sm">Liten</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Stor</Button>
              </div>
            </div>

            {/* Med ikoner */}
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Med ikon</p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary" iconLeft={<Shield size={16} weight="bold" />}>Med ikon venstre</Button>
                <Button variant="secondary" iconRight={<ChartLine size={16} weight="bold" />}>Med ikon høyre</Button>
                <Button variant="ghost" iconLeft={<Users size={16} weight="bold" />}>Ghost med ikon</Button>
              </div>
            </div>

            {/* Deaktivert */}
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Deaktivert</p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary" disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="ghost" disabled>Ghost</Button>
              </div>
            </div>

            {/* Full bredde */}
            <div>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-4)' }}>Full bredde</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '320px' }}>
                <Button variant="primary" fullWidth>Full bredde</Button>
                <Button variant="ghost" fullWidth>Full bredde ghost</Button>
              </div>
            </div>

          </div>
        ),
      },
      {
        id: 'option-card',
        label: 'Option Card',
        component: (
          <OptionCardGroup>
            <OptionCard label="Jeg er selvstendig næringsdrivende eller frilanser" />
            <OptionCard label="Jeg er ansatt i en bedrift med færre enn 50 personer" />
            <OptionCard label="Jeg er ansatt i en bedrift med 50–500 ansatte" />
            <OptionCard label="Jeg representerer en større organisasjon eller konsern" />
          </OptionCardGroup>
        ),
      },
      {
        id: 'icon-card',
        label: 'Icon Card — Grid',
        component: (
          <IconCardGroup layout="grid">
            <IconCard
              icon={<Shield size={32} weight="duotone" />}
              heading="Sikkerhet"
            >
              All data er kryptert og lagret i henhold til gjeldende personvernlovgivning.
            </IconCard>
            <IconCard
              icon={<Clock size={32} weight="duotone" />}
              heading="Alltid tilgjengelig"
            >
              Plattformen er tilgjengelig 24/7 med 99,9 % oppetid garantert.
            </IconCard>
            <IconCard
              icon={<Users size={32} weight="duotone" />}
              heading="Teamtilgang"
            >
              Inviter hele teamet og styr tilganger per bruker eller rolle.
            </IconCard>
            <IconCard
              icon={<ChartLine size={32} weight="duotone" />}
              heading="Sanntidsdata"
            >
              Se statistikk og innsikt oppdatert i sanntid direkte i dashbordet.
            </IconCard>
          </IconCardGroup>
        ),
      },
      {
        id: 'icon-card-list',
        label: 'Icon Card — List',
        component: (
          <IconCardGroup layout="list">
            <IconCard
              icon={<Shield size={32} weight="duotone" />}
              heading="Sikkerhet"
            >
              All data er kryptert og lagret i henhold til gjeldende personvernlovgivning.
            </IconCard>
            <IconCard
              icon={<Clock size={32} weight="duotone" />}
              heading="Alltid tilgjengelig"
            >
              Plattformen er tilgjengelig 24/7 med 99,9 % oppetid garantert.
            </IconCard>
            <IconCard
              icon={<Users size={32} weight="duotone" />}
              heading="Teamtilgang"
            >
              Inviter hele teamet og styr tilganger per bruker eller rolle.
            </IconCard>
          </IconCardGroup>
        ),
      },
      {
        id: 'card',
        label: 'Card',
        component: (
          <CardGroup>
            <Card title="Hva er inkludert i Premium?" subtitle="Abonnement">
              Premium gir deg tilgang til alle funksjoner i Jobbi, inkludert avansert søk,
              ubegrenset antall stillingsannonser og prioritert kundestøtte.
            </Card>
            <Card title="Kan jeg bytte plan underveis?">
              Ja, du kan oppgradere eller nedgradere planen din når som helst.
              Endringer trer i kraft ved neste faktureringsperiode.
            </Card>
            <Card>
              Uten header — bare innhold.
            </Card>
            <Card variant="dark" title="Mørk variant">
              Tekst og header i hvitt på neutral-7 bakgrunn.
            </Card>
            <Card variant="dark">
              Mørk uten header.
            </Card>
            <Card variant="glass" title="Glass-variant">
              Frosted glass med blur og gjennomsiktig bakgrunn.
            </Card>
            <Card variant="glass">
              Glass uten header.
            </Card>
          </CardGroup>
        ),
      },
      {
        id: 'expandable-card',
        label: 'Expandable Card',
        component: (
          <ExpandableCardGroup>
            <ExpandableCard title="Hva er inkludert i Premium?" defaultOpen>
              Premium gir deg tilgang til alle funksjoner i Jobbi, inkludert avansert søk,
              ubegrenset antall stillingsannonser og prioritert kundestøtte.
            </ExpandableCard>
            <ExpandableCard title="Kan jeg bytte plan underveis?" subtitle="Fakturering og abonnement">
              Ja, du kan oppgradere eller nedgradere planen din når som helst.
              Endringer trer i kraft ved neste faktureringsperiode.
            </ExpandableCard>
            <ExpandableCard title="Hva skjer når prøveperioden utløper?">
              Etter 14 dager vil du bli bedt om å velge en betalingsplan.
              Ingen automatisk belastning — du velger selv om du vil fortsette.
            </ExpandableCard>
          </ExpandableCardGroup>
        ),
      },
      {
        id: 'toggle-row',
        label: 'Toggle Row',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ToggleRow options={[
              { label: 'Dag',   value: 'day' },
              { label: 'Uke',   value: 'week' },
              { label: 'Måned', value: 'month' },
            ]} />
            <ToggleRow options={[
              { label: 'Liten',  value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Stor',   value: 'lg' },
            ]} defaultValue="md" />
            <ToggleRow options={[
              { label: 'Månedlig', value: 'monthly' },
              { label: 'Halvårlig', value: 'biannual' },
              { label: 'Årlig',    value: 'annual' },
            ]} />
          </div>
        ),
      },
      {
        id: 'toggle-switch',
        label: 'Toggle Switch',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)' }}>Success (standard)</p>
              <ToggleSwitch />
              <ToggleSwitch offLabel="Inaktiv" onLabel="Aktiv" defaultChecked />
              <ToggleSwitch offLabel="Skjult" onLabel="Synlig" />
              <ToggleSwitch bordered />
              <ToggleSwitch offLabel="Inaktiv" onLabel="Aktiv" defaultChecked bordered />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)' }}>Neutral</p>
              <ToggleSwitch variant="neutral" />
              <ToggleSwitch variant="neutral" offLabel="Nei" onLabel="Ja" defaultChecked />
              <ToggleSwitch variant="neutral" bordered />
              <ToggleSwitch variant="neutral" offLabel="Nei" onLabel="Ja" defaultChecked bordered />
            </div>
          </div>
        ),
      },
      {
        id: 'progress-bar',
        label: 'Progress Bar',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '480px' }}>
            <ProgressBar value={1} max={7} title="Introduksjon" />
            <ProgressBar value={3} max={7} title="Navigasjon og manøvrering" />
            <ProgressBar value={7} max={7} title="Fullført" />
          </div>
        ),
      },
      {
        id: 'floating-nav',
        label: 'Floating Nav',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {[
              { variant: 'light', label: 'light (default)' },
              { variant: 'glass', label: 'glass' },
              { variant: 'dark',  label: 'dark' },
              { variant: 'first', label: 'first' },
            ].map(({ variant, label }) => (
              <div key={variant}>
                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-3)' }}>{label}</p>
                <FloatingNav
                  contained
                  variant={variant}
                  prevLabel="Forrige"
                  nextLabel="Neste"
                  onPrev={() => {}}
                  onNext={() => {}}
                  onMenu={() => {}}
                />
              </div>
            ))}
          </div>
        ),
      },
      {
        id: 'floating-menu',
        label: 'Floating Menu',
        component: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {[
              { variant: 'light', label: 'light (default)' },
              { variant: 'glass', label: 'glass' },
            ].map(({ variant, label }) => (
              <div key={variant}>
                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-neutral-7)', marginBottom: 'var(--space-3)' }}>{label}</p>
                <FloatingMenu
                  contained
                  variant={variant}
                  items={[
                    { label: 'Oversikt' },
                    { label: 'Komponenter' },
                    { label: 'Tokens' },
                    { label: 'Om' },
                  ]}
                  onUser={() => {}}
                  onMenuOpen={() => {}}
                />
              </div>
            ))}
          </div>
        ),
      },
      { id: 'drops', label: 'Dråper ✦' },
      {
        id: 'sticky-note',
        label: 'Sticky Note',
        component: (
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <StickyNote>Husk å sende kontrakt til kunde</StickyNote>
            <StickyNote defaultChecked>Bestill blomster til kontoret</StickyNote>
            <StickyNote>Ring Ole etter lunsj</StickyNote>
          </div>
        ),
      },
    ],
  },
]

const ALL_ITEMS = NAV.flatMap((g) => g.items)

export default function App() {
  const [active, setActive] = useState('colors')
  const [navPage, setNavPage] = useState(1)
  const [dropsOn, setDropsOn] = useState(false)
  const NAV_PAGES = 5

  const current = ALL_ITEMS.find((c) => c.id === active)

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Logo height={28} className="sidebar-logo-svg" />
          <span className="sidebar-logo-tag">Designsystem</span>
        </div>

        <ThemeToggle />

        <nav className="sidebar-nav">
          {NAV.map((group) => (
            <div key={group.section} className="sidebar-group">
              <p className="sidebar-section-label">{group.section}</p>
              {group.items.map((c) => (
                <button
                  key={c.id}
                  className={`sidebar-item${active === c.id ? ' sidebar-item--active' : ''}`}
                  onClick={() => setActive(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {dropsOn && <DropsLayer />}

{active === 'floating-nav' && (
        <FloatingNav
          prevDisabled={navPage === 1}
          nextDisabled={navPage === NAV_PAGES}
          onPrev={() => setNavPage((p) => Math.max(1, p - 1))}
          onNext={() => setNavPage((p) => Math.min(NAV_PAGES, p + 1))}
          onMenu={() => alert('Åpner oversikt')}
        />
      )}

      <main className="canvas">
        <div className="canvas-header">
          <h1 className="canvas-title">{current?.label}</h1>
        </div>
        <div className="canvas-content">
          {active === 'drops' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-neutral-7)', maxWidth: '55ch' }}>
                Animerte vanndråper som faller over innholdet. Tilfeldige størrelser, hastigheter og hengetider. Glass/linse-effekt via backdrop-filter.
              </p>
              <button
                onClick={() => setDropsOn(v => !v)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                  width: 'fit-content', padding: 'var(--space-3) var(--space-6)',
                  background: dropsOn ? 'var(--color-neutral-9)' : 'var(--color-neutral-2)',
                  color: dropsOn ? 'var(--color-neutral-0)' : 'var(--color-neutral-9)',
                  border: 'none', borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-md)',
                  fontWeight: 'var(--font-weight-medium)', cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {dropsOn ? 'Stopp dråpene' : 'Start dråpene'}
              </button>
            </div>
          ) : (
            current?.component
          )}
        </div>
      </main>
    </div>
  )
}
