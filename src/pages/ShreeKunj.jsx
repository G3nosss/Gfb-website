import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ShreeKunjSection from '../components/ShreeKunjSection'
import GoldParticles from '../components/GoldParticles'
import { shreeKunjProducts } from '../data/shreeKunjProducts'
import skLogo from '../assets/images/shreekunj-logo.jpeg'

// ── Gold Curtain Entry animation ──────────────────────────────────
function CurtainEntry({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 700)
    }, 1000)
    return () => clearTimeout(t)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] flex pointer-events-none">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="flex-1 h-full"
        style={{ background: 'linear-gradient(135deg, #C9922A, #F0C060)' }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="flex-1 h-full bg-sk-dark"
        aria-hidden="true"
      />
    </div>
  )
}

// ── SK Navbar ─────────────────────────────────────────────────────
function SKNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sk-dark/95 backdrop-blur-md border-b border-gfb-gold/10 shadow-lg'
          : 'bg-transparent'
      }`}
      aria-label="Shree Kunj navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Back link */}
        <Link
          to="/"
          className="font-jost text-xs tracking-[0.2em] text-sk-ivory/40 hover:text-gfb-gold 
                     transition-colors duration-300 flex items-center gap-1.5"
          aria-label="Back to GF&B home"
        >
          <span aria-hidden="true">←</span> GF&B
        </Link>

        {/* Center logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gfb-gold/40">
            <img src={skLogo} alt="Shree Kunj" className="w-full h-full object-cover" />
          </div>
          <span
            className="font-cormorant font-semibold text-lg tracking-widest"
            style={{
              background: 'linear-gradient(135deg, #C9922A, #F0C060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SHREE KUNJ
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'Our Story', href: '#hero' },
            { label: 'Products', href: '#products' },
            { label: 'Contact', href: '#contact' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-jost text-xs tracking-[0.15em] text-sk-ivory/50 
                         hover:text-gfb-gold transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ── Hero Section ──────────────────────────────────────────────────
function SKHero({ curtainDone }) {
  const [showTagline, setShowTagline] = useState(false)
  const [taglineText, setTaglineText] = useState('')
  const fullTagline = 'Seven Creations. No Compromises.'

  useEffect(() => {
    if (!curtainDone) return
    const t = setTimeout(() => setShowTagline(true), 600)
    return () => clearTimeout(t)
  }, [curtainDone])

  useEffect(() => {
    if (!showTagline) return
    let i = 0
    const interval = setInterval(() => {
      setTaglineText(fullTagline.slice(0, i + 1))
      i++
      if (i >= fullTagline.length) clearInterval(interval)
    }, 55)
    return () => clearInterval(interval)
  }, [showTagline])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center sk-grain sk-motif-bg"
      style={{ background: '#0B0B0F' }}
      id="hero"
      aria-label="Shree Kunj hero"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,146,42,0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <GoldParticles count={40} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={curtainDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto
                        border-2 border-gfb-gold/40 shadow-[0_0_40px_rgba(201,146,42,0.2)]"
          >
            <img src={skLogo} alt="Shree Kunj" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Tagline typewriter */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={showTagline ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-cormorant italic text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
          style={{
            background: 'linear-gradient(135deg, #C9922A, #F0C060, #C9922A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          aria-label={fullTagline}
        >
          {taglineText}
          {taglineText.length < fullTagline.length && (
            <span className="animate-pulse" aria-hidden="true">|</span>
          )}
        </motion.h1>

        {/* Micro text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={curtainDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.8 }}
          className="font-jost text-base md:text-lg text-sk-ivory/50 max-w-lg leading-relaxed"
        >
          Handcrafted premium snacks from Assam — where tradition meets refinement.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={curtainDone ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-gfb-gold/30">
            Discover the collection
          </span>
          {/* Animated gold scroll line */}
          <div className="relative w-[1px] h-16 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-gfb-gold to-transparent"
              style={{
                height: '100%',
                animation: 'scrollIndicator 2s ease-in-out infinite',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Brand Outro ───────────────────────────────────────────────────
function SKOutro() {
  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center 
                 bg-sk-dark sk-motif-bg text-center px-6 py-24"
      id="contact"
      aria-label="Brand outro"
    >
      <GoldParticles count={20} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,146,42,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        {/* Pulsing GF&B infinity mark */}
        <div className="mb-10 flex justify-center" aria-hidden="true">
          <svg
            viewBox="0 0 200 100"
            className="w-24 md:w-32 animate-pulse-slow"
            role="presentation"
          >
            <defs>
              <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9922A" />
                <stop offset="50%" stopColor="#F0C060" />
                <stop offset="100%" stopColor="#C9922A" />
              </linearGradient>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M100,50 C100,50 130,15 155,15 C178,15 195,30 195,50 C195,70 178,85 155,85 C130,85 100,50 100,50 C100,50 70,15 45,15 C22,15 5,30 5,50 C5,70 22,85 45,85 C70,85 100,50 100,50 Z"
              fill="none"
              stroke="url(#goldGrad2)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow2)"
            />
          </svg>
        </div>

        <h2
          className="font-cormorant font-semibold text-4xl md:text-5xl lg:text-6xl mb-4"
          style={{
            background: 'linear-gradient(135deg, #C9922A, #F0C060)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Taste the story of Assam.
        </h2>

        <p className="font-jost text-sk-ivory/40 text-base max-w-md mx-auto mb-12 leading-relaxed">
          Every creation carries the warmth of Assam's heritage — in every bite,
          a memory of something timeless.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/arunas"
            className="px-8 py-3.5 border border-gfb-gold/40 text-gfb-gold font-cormorant 
                       text-sm tracking-[0.2em] hover:border-gfb-gold hover:bg-gfb-gold/5
                       transition-all duration-300 flex items-center gap-2"
            aria-label="Explore Arunas snacks"
          >
            ← Explore Arunas
          </Link>
          <a
            href="mailto:contact@gfb-india.com"
            className="px-8 py-3.5 bg-gradient-to-r from-gfb-gold to-gfb-gold-light
                       text-sk-dark font-jost font-semibold text-sm tracking-wider
                       hover:shadow-[0_0_25px_rgba(201,146,42,0.4)] transition-all duration-300"
            aria-label="Contact us"
          >
            Contact Us
          </a>
        </div>
      </motion.div>

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 py-4 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-jost text-xs text-sk-ivory/20">
            © {new Date().getFullYear()} Shree Kunj — Global Food & Beverages, Assam, India
          </p>
          <div className="flex items-center gap-4">
            {['Instagram', 'Facebook'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="font-jost text-xs text-sk-ivory/20 hover:text-gfb-gold transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function ShreeKunj() {
  const [curtainDone, setCurtainDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="font-jost min-h-screen"
      style={{ background: '#0B0B0F', color: '#F5EDD6' }}
    >
      {/* Curtain entry */}
      <CurtainEntry onComplete={() => setCurtainDone(true)} />

      {/* Navbar */}
      <SKNavbar />

      {/* Hero */}
      <SKHero curtainDone={curtainDone} />

      {/* 7 Product Sections */}
      <div id="products" aria-label="Shree Kunj products">
        {shreeKunjProducts.map((product, index) => (
          <ShreeKunjSection
            key={product.id}
            product={product}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Brand Outro */}
      <SKOutro />
    </div>
  )
}
