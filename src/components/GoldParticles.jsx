import { useEffect, useRef } from 'react'

// CSS-based floating gold particles — no canvas needed, performant
export default function GoldParticles({ count = 30, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing
    container.innerHTML = ''

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div')
      const size = Math.random() * 3 + 1        // 1–4px
      const left = Math.random() * 100          // 0–100%
      const delay = Math.random() * 8            // 0–8s delay
      const duration = Math.random() * 6 + 6   // 6–12s duration
      const opacity = Math.random() * 0.5 + 0.2 // 0.2–0.7

      dot.style.cssText = `
        position: absolute;
        bottom: 0;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #F0C060, #C9922A);
        opacity: 0;
        animation: goldParticle ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
        will-change: transform, opacity;
      `
      container.appendChild(dot)
    }
  }, [count])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  )
}
