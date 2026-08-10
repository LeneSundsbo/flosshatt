import './DefinitionList.css'

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
