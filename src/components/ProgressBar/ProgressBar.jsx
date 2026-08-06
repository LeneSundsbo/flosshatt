import './ProgressBar.css'

export function ProgressBar({ value = 1, max = 7, title }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className="pb-wrap">
      <div className="pb-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div className="pb-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="pb-meta">
        {title && <span className="pb-title">{title}</span>}
        <span className="pb-fraction">{value}/{max}</span>
      </div>
    </div>
  )
}
