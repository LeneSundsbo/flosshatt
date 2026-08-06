import { useState } from 'react'
import './PricingTable.css'

const TIERS = [
  { id: 'small',  label: '0–50 ansatte' },
  { id: 'medium', label: '51–500 ansatte' },
  { id: 'large',  label: 'Over 500 ansatte' },
]

const BASE_MONTHLY_PRICES = {
  small:  499,
  medium: 1499,
  large:  2499,
}

const ANNUAL_DISCOUNT = 0.15

function calcPrices(baseMonthly) {
  const monthly     = baseMonthly
  const annualMthly = Math.round(baseMonthly * (1 - ANNUAL_DISCOUNT))
  const monthlyYear = monthly * 12
  const annualYear  = annualMthly * 12
  const savings     = monthlyYear - annualYear
  return { monthly, annualMthly, monthlyYear, annualYear, savings }
}

function formatNOK(amount) {
  return amount.toLocaleString('nb-NO') + ' kr'
}

/* ── Toggle variant (original) ─────────────────────────────── */

function PricingTableToggle() {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="pt-wrapper">
      <div className="pt-header">
        <h2 className="pt-title">Jobbi Premium</h2>
        <p className="pt-subtitle">Velg abonnementsperiode</p>

        <div className="pt-toggle" role="group" aria-label="Abonnementsperiode">
          <button
            className={`pt-toggle-btn${billing === 'monthly' ? ' pt-toggle-btn--active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Månedlig
          </button>
          <button
            className={`pt-toggle-btn${billing === 'annual' ? ' pt-toggle-btn--active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Årlig
            <span className="pt-badge">Spar 15%</span>
          </button>
        </div>
      </div>

      <div className="pt-cards">
        {TIERS.map((tier) => {
          const prices = calcPrices(BASE_MONTHLY_PRICES[tier.id])
          const isAnnual = billing === 'annual'
          const displayMonthly = isAnnual ? prices.annualMthly : prices.monthly
          const displayYearly  = isAnnual ? prices.annualYear  : prices.monthlyYear

          return (
            <div key={tier.id} className="pt-card">
              <div className="pt-card-label">{tier.label}</div>
              <div className="pt-price-main">
                <span className="pt-price-amount">{formatNOK(displayMonthly)}</span>
                <span className="pt-price-period">/mnd</span>
              </div>
              <div className="pt-price-annual">{formatNOK(displayYearly)} per år</div>
              {isAnnual && (
                <div className="pt-savings">
                  Du sparer {formatNOK(prices.savings)} vs. månedlig
                </div>
              )}
              {!isAnnual && (
                <div className="pt-savings-hint">
                  Eller {formatNOK(prices.annualMthly)}/mnd ved årlig binding
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="pt-vat-note">Alle priser er ekskl. mva.</p>
    </div>
  )
}

/* ── Matrix variant (alle priser synlige) ──────────────────── */

function PricingTableMatrix() {
  return (
    <div className="pt-wrapper">
      <div className="pt-header">
        <h2 className="pt-title">Jobbi Premium</h2>
        <p className="pt-subtitle">Alle priser ekskl. mva.</p>
      </div>

      <div className="pt-matrix">
        {/* Header row */}
        <div className="pt-matrix-cell pt-matrix-corner" />
        <div className="pt-matrix-cell pt-matrix-col-header">
          Månedlig
        </div>
        <div className="pt-matrix-cell pt-matrix-col-header pt-matrix-col-header--annual">
          Årlig
          <span className="pt-badge">Spar 15%</span>
        </div>

        {/* Tier rows */}
        {TIERS.map((tier) => {
          const p = calcPrices(BASE_MONTHLY_PRICES[tier.id])
          return (
            <>
              <div key={`${tier.id}-label`} className="pt-matrix-cell pt-matrix-row-header">
                {tier.label}
              </div>

              <div key={`${tier.id}-monthly`} className="pt-matrix-cell pt-matrix-price">
                <span className="pt-price-amount">{formatNOK(p.monthly)}</span>
                <span className="pt-price-period">/mnd</span>
                <div className="pt-price-annual">{formatNOK(p.monthlyYear)}/år</div>
              </div>

              <div key={`${tier.id}-annual`} className="pt-matrix-cell pt-matrix-price pt-matrix-price--annual">
                <span className="pt-price-amount">{formatNOK(p.annualMthly)}</span>
                <span className="pt-price-period">/mnd</span>
                <div className="pt-price-annual">{formatNOK(p.annualYear)}/år</div>
                <div className="pt-savings">Spar {formatNOK(p.savings)}</div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

/* ── Eksport med variant-prop ──────────────────────────────── */

export function PricingTable({ variant = 'toggle' }) {
  if (variant === 'matrix') return <PricingTableMatrix />
  return <PricingTableToggle />
}
