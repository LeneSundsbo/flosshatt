# Drops — Design System Spec

## WCAG 2.1 AA — Sjekkliste for design og komponenter

Alle komponenter og design som legges inn i Drops skal verifiseres mot disse kravene før de godkjennes.

---

### 1.4.3 Kontrast — tekst (AA)
- Normal tekst (under 18pt/24px): minimum **4.5:1** kontrastratio
- Stor tekst (18pt/24px og over, eller 14pt/18.67px bold): minimum **3:1**
- Verktøy: [coolors.co/contrast-checker](https://coolors.co/contrast-checker)
- **Regel i Drops:** `neutral-1`, `neutral-2`, `neutral-3` skal aldri brukes som tekstfarge på lys bakgrunn

### 1.4.4 Skalerbar tekst (AA)
- Tekst skal kunne skaleres til 200 % uten tap av innhold eller funksjonalitet
- **Regel i Drops:** Bruk alltid `rem`-baserte font-tokens, aldri `px` direkte på tekst

### 1.4.8 Linjelengde (AAA — beste praksis)
- Maksimalt **80 tegn** per linje for løpende tekst
- **Regel i Drops:** Bruk `--width-prose: 65ch` som standard, `--width-content: 80ch` som maks

### 1.4.10 Reflow (AA)
- Innhold skal ikke kreve horisontal scrolling ved 320px bredde
- **Regel i Drops:** Test alle komponenter ved 320px viewport

### 1.4.12 Tekstspacing (AA)
Layouten skal ikke brekke når brukeren overstyrer:

| Egenskap | Minimum |
|---|---|
| Linjehøyde | 1.5 × font-size |
| Avstand mellom avsnitt | 2 × font-size |
| Tegnspacing (letter-spacing) | 0.12em |
| Ordspacing (word-spacing) | 0.16em |

- **Regel i Drops — Prose:** `line-height: 1.75` ✅ / `p + p margin-top: space-8 (32px)` ✅

### 1.4.3 Kontrast — ikke-tekst (AA)
- UI-komponenter og ikoner: minimum **3:1** mot bakgrunn
- Gjelder: knappekanter, input-borders, ikonlinjer, indikatorer

### 2.4.7 Fokus synlig (AA)
- Alle interaktive elementer skal ha synlig fokusindikator
- **Regel i Drops:** Aldri `outline: none` uten å erstatte med et tydelig alternativ

### 4.1.2 Navn, rolle, verdi (AA)
- Alle interaktive elementer skal ha riktig ARIA-rolle og lesbar label
- **Regel i Drops:**
  - Knapper bruker `aria-pressed` (toggle-knapper) eller standard `<button>`
  - Ikoner som er dekorative får `aria-hidden="true"`
  - Ikoner som formidler mening får `aria-label`

---

## Størrelser

### Tekst
- Brødtekst (hovedinnhold): minimum **16px** (`--font-size-md`) — aldri `font-size-sm` på løpende tekst
- `font-size-sm` (14px): kun for UI-labels, knapptekst, metadata og støttetekst
- `font-size-xs` (12px): kun for badges, chips og svært sekundær info

### Spacing
- Liten spacing (`space-0-5` → `space-6`): fast
- Stor spacing (`space-8` → `space-64`): fluid via `clamp()`, skalerer mellom 480px og 1280px

### Farger — nøytrale
- `neutral-1`, `neutral-2`, `neutral-3`: kun bakgrunn og border — **ikke tekstfarge på lys bakgrunn**
- `neutral-7`: støttetekst og metadata
- `neutral-9`: primær tekstfarge

---

## Komponent-konvensjoner

- Ny komponent krever: JSX-fil, CSS-fil, showcase-oppføring i App.jsx
- CSS-klassenavn: prefiks per komponent (`ec-`, `ts-`, `icc-`, `oc-`, `c-`)
- Varianter styres via `variant`-prop og CSS-modifier (`.komponent--variant`)
- Layout-varianter styres på gruppe-nivå (`.icc-group--grid`, `.icc-group--list`)
- Ikoner som er rent dekorative: `aria-hidden="true"`
