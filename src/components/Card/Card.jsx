import './Card.css'

export function Card({ title, subtitle, children, variant = 'light' }) {
  const showHeader = title || subtitle
  return (
    <div className={`c-card c-card--${variant}`}>
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
}

export function CardGroup({ children }) {
  return <div className="c-group">{children}</div>
}
