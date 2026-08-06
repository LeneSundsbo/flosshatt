import { useState, useEffect, useRef, useCallback } from 'react'
import './Drops.css'

let nextId = 0

function spawnTrail(x, y, size, parent) {
  const trail = document.createElement('div')
  trail.className = 'drop-trail'
  trail.style.left   = `${x + size * 0.3}px`  // sentrert under dråpen
  trail.style.top    = `${y + size * 0.8}px`   // litt nedenfor midten
  trail.style.width  = `${size * 0.6}px`       // nærmere dråpebredde
  trail.style.height = `${size * 0.8}px`       // litt høy
  parent.appendChild(trail)
  setTimeout(() => trail.parentNode?.removeChild(trail), 3000)
}

function Drop({ x, size, onRemove }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let y             = -size * 1.6
    let speed         = 0
    let wobble        = 0
    let hanging       = true
    let hangLeft      = 600 + Math.random() * 2400
    let trailAccum    = 0   // akkumulert distanse siden siste spor
    let rafId

    function tick() {
      if (!ref.current) return

      if (hanging) {
        hangLeft -= 16
        wobble = Math.sin(Date.now() / 180) * 0.6
        el.style.transform = `translateX(${wobble}px)`

        if (hangLeft <= 0) {
          hanging = false
          speed   = (0.05 + (size / 20) * 0.35) + Math.random() * 0.1
        }
      } else {
        // Rykkete dråpefysikk
        if (Math.random() < 0.04) {
          const savedSpeed = speed
          speed = 0
          setTimeout(() => { speed = savedSpeed + Math.random() * 2 }, 80 + Math.random() * 250)
        } else {
          speed = Math.min(speed * 1.012, 2.5)
        }

        wobble += (Math.random() - 0.5) * 0.4
        wobble *= 0.93

        const dy = speed + Math.random() * 0.4
        y += dy
        trailAccum += dy

        el.style.top       = `${y}px`
        el.style.transform = `translateX(${wobble}px)`

        // Spawn spor hver ~10px bevegelse
        if (trailAccum >= 10 && el.parentElement) {
          spawnTrail(x + wobble, y, size, el.parentElement)
          trailAccum = 0
        }

        if (y > window.innerHeight + 120) {
          onRemove()
          return
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    el.style.top  = `${y}px`
    el.style.left = `${x}px`
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className="drop-item"
      style={{ width: `${size}px`, height: `${size * 1.2}px` }}
      aria-hidden="true"
    />
  )
}

export function DropsLayer() {
  const [drops, setDrops] = useState([])

  const addDrop = useCallback(() => {
    setDrops(prev => {
      if (prev.length >= 14) return prev
      const size = 12 + Math.random() * 8
      const x    = Math.random() * (window.innerWidth - size)
      return [...prev, { id: ++nextId, x, size }]
    })
  }, [])

  const removeDrop = useCallback((id) => {
    setDrops(prev => prev.filter(d => d.id !== id))
  }, [])

  useEffect(() => {
    let tid

    function scheduleNext() {
      tid = setTimeout(() => {
        addDrop()
        scheduleNext()
      }, 300 + Math.random() * 1800)
    }

    scheduleNext()
    return () => clearTimeout(tid)
  }, [addDrop])

  return (
    <div className="drops-layer" aria-hidden="true">
      {drops.map(d => (
        <Drop
          key={d.id}
          x={d.x}
          size={d.size}
          onRemove={() => removeDrop(d.id)}
        />
      ))}
    </div>
  )
}
