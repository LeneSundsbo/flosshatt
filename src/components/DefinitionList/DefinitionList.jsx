import './DefinitionList.css'

// ─── HTML-byggere — PORTABLE TO VANILLA JS ───────────────────────────────────
// Returnerer HTML-strenger. Ingen React-avhengigheter.
// Vanilla JS-bruk:
//   el.innerHTML = buildDefinitionList(items)

/** Bygger én rad: <div class="dl-row"><dt>…</dt><dd>…</dd></div> */
export function buildDefinitionListRow({ term, description }) {
  const paragraphs = Array.isArray(description) ? description : [description]
  const ps = paragraphs.map(p => `<p>${p}</p>`).join('')
  return `<div class="dl-row"><dt class="dl-term">${term}</dt><dd class="dl-desc">${ps}</dd></div>`
}

/** Bygger hele listen: <dl class="dl">…</dl> */
export function buildDefinitionList(items) {
  return `<dl class="dl">${items.map(buildDefinitionListRow).join('')}</dl>`
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * DefinitionList — to-kolonne-liste for begrep og forklaringer.
 *
 * Props:
 *   items   array av { term, description }
 *           term:        string
 *           description: string | string[]  (array = flere avsnitt)
 */
export function DefinitionList({ items = [] }) {
  return (
    <dl className="dl">
      {items.map((item, i) => (
        <div key={i} className="dl-row">
          <dt className="dl-term">{item.term}</dt>
          <dd className="dl-desc">
            {Array.isArray(item.description)
              ? item.description.map((p, j) => <p key={j}>{p}</p>)
              : <p>{item.description}</p>
            }
          </dd>
        </div>
      ))}
    </dl>
  )
}
