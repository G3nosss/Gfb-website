import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ThreeDModel from './ThreeDModel'

// One full-viewport product section for Shree Kunj scroll story
export default function ShreeKunjSection({ product, index, isMobile }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { threshold: 0.45, once: false })
  const [lineDrawn, setLineDrawn] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setLineDrawn(true), 900)
      return () => clearTimeout(timer)
    } else {
      setLineDrawn(false)
    }
  }, [isInView])

  // Alternating layout: odd index → image left, even → image right
  const isReversed = index % 2 !== 0

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden"
      style={{ backgroundColor: product.colorWash + 'CC' }} // with slight transparency
      aria-label={`${product.name} product section`}
      id={`product-${product.slug}`}
    >
      {/* Full-screen colour wash background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${product.colorWash}40 0%, #0B0B0F 80%)`,
        }}
      />

      {/* SK motif overlay */}
      <div className="absolute inset-0 sk-motif-bg opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Inner layout */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20 
                    flex flex-col gap-10
                    ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                    items-center`}
      >
        {/* ── Product Name + Text (slides from right) ── */}
        <div className="flex-1 flex flex-col justify-center order-2 lg:order-none">
          {/* Veg dot + tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            {product.vegDot && (
              <span
                className="w-5 h-5 border-2 border-green-500 rounded-sm flex items-center justify-center bg-transparent"
                aria-label="Vegetarian"
                title="Pure Vegetarian"
              >
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full block" />
              </span>
            )}
            <span className="font-jost text-xs tracking-[0.2em] uppercase text-gfb-gold/70">
              {product.tag}
            </span>
          </motion.div>

          {/* Product name — slides in from right */}
          <motion.h2
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight 
                       text-shadow-gold mb-6"
            style={{
              background: 'linear-gradient(135deg, #C9922A, #F0C060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {product.name}
          </motion.h2>

          {/* Gold divider line draws across */}
          <div className="relative h-[1px] w-full mb-6 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-gfb-gold to-gfb-gold-light transition-all duration-1000 ease-out"
              style={{ width: lineDrawn ? '100%' : '0%' }}
            />
          </div>

          {/* Description — fades up */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-jost text-sk-ivory/80 text-lg leading-relaxed max-w-md"
          >
            {product.description}
          </motion.p>

          {/* Badges (Makhana special) */}
          {product.badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-2 mt-5"
            >
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="font-jost text-xs tracking-widest uppercase px-3 py-1.5 
                             border border-gfb-gold/50 text-gfb-gold rounded-full"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          )}

          {/* Index number — decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.07 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-8 right-8 font-cormorant text-[12rem] font-bold leading-none 
                       text-gfb-gold pointer-events-none hidden lg:block"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </div>

        {/* ── Product Image / 3D Model ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 flex items-center justify-center min-h-[45vh] lg:min-h-[65vh] order-1 lg:order-none"
        >
          <ThreeDModel
            glbPath={product.glbPath}
            image={product.image}
            name={product.name}
            isActive={isInView}
            isMobile={isMobile}
          />
        </motion.div>
      </div>

      {/* Bottom scroll hint (only on first product) */}
      {index === 0 && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-jost text-xs tracking-[0.3em] uppercase text-gfb-gold/40">
            Scroll
          </span>
          <div
            className="w-[1px] h-10 bg-gradient-to-b from-gfb-gold/60 to-transparent"
            style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }}
          />
        </div>
      )}
    </section>
  )
}
