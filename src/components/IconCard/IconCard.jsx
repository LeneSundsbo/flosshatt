import './IconCard.css'

export function IconCard({ icon, heading, children }) {
  return (
    <div className="icc-card">
      <span className="icc-icon" aria-hidden="true">{icon}</span>
      <div className="icc-text">
        {heading && <p className="icc-heading">{heading}</p>}
        {children && <p className="icc-body">{children}</p>}
      </div>
    </div>
  )
}

export function IconCardGroup({ children, layout = 'grid' }) {
  return (
    <div className={`icc-group icc-group--${layout}`}>
      {children}
    </div>
  )
}
