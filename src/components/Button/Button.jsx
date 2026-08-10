import './Button.css'

export function Button({
  children,
  variant = 'primary',
  color = 'first',   // 'first' | 'second'  – kun primary-varianten bruker dette
  shade = 'light',   // 'light' | 'dark'
  size = 'md',
  disabled = false,
  type = 'button',
  iconLeft,
  iconRight,
  fullWidth = false,
  onClick,
}) {
  const schemeClass = variant === 'primary' ? `btn--${color}-${shade}` : ''

  const classes = [
    'btn',
    `btn--${variant}`,
    schemeClass,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft && <span className="btn-icon">{iconLeft}</span>}
      <span className="btn-label">{children}</span>
      {iconRight && <span className="btn-icon">{iconRight}</span>}
    </button>
  )
}
