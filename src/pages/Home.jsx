import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollTicker from '../components/ScrollTicker'
import GoldParticles from '../components/GoldParticles'

gsap.registerPlugin(ScrollTrigger)

// ── GF&B Infinity Logo (SVG lemniscate) ──────────────────────────
function InfinityLogo({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      style={style}
      aria-label="GF&B infinity logo"
      role="img"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9922A" />
          <stop offset="50%" stopColor="#F0C060" />
          <stop offset="100%" stopColor="#C9922A" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Lemniscate path (infinity symbol) */}
      <path
        d="M100,50 C100,50 130,15 155,15 C178,15 195,30 195,50 C195,70 178,85 155,85 C130,85 100,50 100,50 C100,50 70,15 45,15 C22,15 5,30 5,50 C5,70 22,85 45,85 C70,85 100,50 100,50 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      {/* Inner shimmer highlight */}
      <path
        d="M100,50 C100,50 130,20 155,20 C175,20 190,33 190,50 C190,67 175,80 155,80 C130,80 100,50 100,50 C100,50 70,20 45,20 C25,20 10,33 10,50 C10,67 25,80 45,80 C70,80 100,50 100,50 Z"
        fill="none"
        stroke="rgba(240,192,96,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Typewriter hook ───────────────────────────────────────────────
function useTypewriter(text, speed = 60, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let timeout
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ── Animated Counter ─────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const [heroPhase, setHeroPhase] = useState(0)
  // 0: black screen, 1: logo visible, 2: text visible, 3: transition done

  const splitRef = useRef(null)
  const [splitActive, setSplitActive] = useState(false)
  const splitInView = useInView(splitRef, { threshold: 0.3, once: true })

  const rootsRef = useRef(null)
  const rootsInView = useInView(rootsRef, { threshold: 0.25, once: true })

  const craftRef = useRef(null)
  const craftInView = useInView(craftRef, { threshold: 0.25, once: true })

  // Hero typewriter text
  const { displayed: brandText, done: brandDone } = useTypewriter(
    'GLOBAL FOOD & BEVERAGES',
    70,
    2200
  )
  const { displayed: subText } = useTypewriter(
    'Born in Assam. Crafted for India.',
    45,
    brandDone ? 200 : 99999
  )

  // Hero animation phases
  useEffect(() => {
    const t1 = setTimeout(() => setHeroPhase(1), 400)   // logo fades in
    const t2 = setTimeout(() => setHeroPhase(2), 2200)  // text starts
    const t3 = setTimeout(() => setHeroPhase(3), 5500)  // bg transitions
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  // Brand split activation
  useEffect(() => {
    if (splitInView) {
      const t = setTimeout(() => setSplitActive(true), 200)
      return () => clearTimeout(t)
    }
  }, [splitInView])

  // Navigate with page transition
  const goToArunas = () => {
    navigate('/arunas')
  }
  const goToShreeKunj = () => {
    navigate('/shreekunj')
  }

  const craftItems = [
    {
      icon: '🌿',
      title: 'Heritage Recipes',
      desc: 'Passed down through generations',
    },
    {
      icon: '🤲',
      title: 'Handcrafted',
      desc: 'Made with care, not machines',
    },
    {
      icon: '📍',
      title: 'Made in Assam',
      desc: 'From the heart of Northeast India',
    },
  ]

  return (
    <div className="font-dm text-gfb-cream overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 0 — HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center transition-colors duration-[2s] noise-texture"
        style={{
          background:
            heroPhase >= 3
              ? 'linear-gradient(160deg, #0D1F12 0%, #1A2E18 50%, #0A1A10 100%)'
              : '#000000',
        }}
      >
        {/* Gold grain overlay when bg transitions */}
        {heroPhase >= 3 && (
          <div className="absolute inset-0 pointer-events-none sk-grain opacity-40" aria-hidden="true" />
        )}

        {/* Infinity logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={heroPhase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-6"
        >
          <InfinityLogo className="w-40 md:w-56 animate-float" />

          {/* Brand name typewriter */}
          <AnimatePresence>
            {heroPhase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h1
                  className="font-playfair text-2xl md:text-4xl lg:text-5xl tracking-[0.25em] uppercase text-gfb-cream"
                  aria-label="Global Food and Beverages"
                >
                  {brandText}
                  <span className="animate-pulse">|</span>
                </h1>

                {/* Subtitle */}
                {subText && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 font-dm text-base md:text-xl text-gfb-gold/80 tracking-wider italic"
                  >
                    {subText}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
        {heroPhase >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="font-dm text-xs tracking-[0.3em] uppercase text-gfb-gold/40">
              Scroll to explore
            </span>
            <div
              className="w-[1px] h-10 bg-gradient-to-b from-gfb-gold/50 to-transparent"
              style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }}
            />
          </motion.div>
        )}
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 1 — OUR ROOTS (Parallax Tea Garden)
      ══════════════════════════════════════════════ */}
      <section
        ref={rootsRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-label="Our Roots section"
      >
        {/* Tea garden parallax background (CSS gradients) */}
        <div className="absolute inset-0">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0C060] via-[#C9922A]/60 to-transparent" />
          {/* Mist layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8BA888]/30 to-transparent" />
          {/* Rolling hills */}
          <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-[#0D1F12] via-[#1A3A12] to-[#2D5016]/80" />
          {/* Foreground dark ground */}
          <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-[#060F08] to-[#0D1F12]" />
          {/* Mist wisps */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(ellipse 80% 30% at 50% 40%, rgba(240,192,96,0.15) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Gamosa-inspired decorative border frame */}
        <div className="absolute inset-6 border border-arunas-red/30 pointer-events-none" aria-hidden="true">
          {/* Corner accents */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8 border-2 border-arunas-red/60`}
              style={{
                borderRight: i % 2 === 0 ? 'none' : '',
                borderLeft: i % 2 !== 0 ? 'none' : '',
                borderBottom: i < 2 ? 'none' : '',
                borderTop: i >= 2 ? 'none' : '',
              }}
            />
          ))}
          {/* Gamosa stripe along top and bottom */}
          <div className="absolute top-0 left-8 right-8 h-3 overflow-hidden">
            {Array(20).fill(0).map((_, i) => (
              <div
                key={i}
                className="inline-block h-full"
                style={{
                  width: 16,
                  background: i % 2 === 0 ? '#C0281A' : '#FDF6EC',
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-8 right-8 h-3 overflow-hidden">
            {Array(20).fill(0).map((_, i) => (
              <div
                key={i}
                className="inline-block h-full"
                style={{
                  width: 16,
                  background: i % 2 === 0 ? '#C0281A' : '#FDF6EC',
                }}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-3xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={rootsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-playfair text-xs md:text-sm tracking-[0.4em] uppercase text-gfb-gold mb-4">
              Our Roots
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-gfb-cream leading-tight mb-6 text-shadow-gold">
              From the land of the{' '}
              <span className="italic text-gfb-gold-light">Brahmaputra</span>
            </h2>
            <p className="font-dm text-lg md:text-xl text-gfb-cream/80 leading-relaxed max-w-xl">
              Where flavors are as rich as the soil — Assam's tea gardens, festivals, 
              and ancient recipes have nurtured a tradition of bold, authentic taste. 
              We carry that legacy in every packet.
            </p>

            {/* Decorative gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={rootsInView ? { width: '6rem' } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="h-[2px] bg-gradient-to-r from-gfb-gold to-gfb-gold-light mt-8"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — THE PHILOSOPHY (Counters)
      ══════════════════════════════════════════════ */}
      <section
        className="relative py-28 bg-gfb-charcoal noise-texture"
        aria-label="Our philosophy section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,146,42,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-playfair text-xs tracking-[0.4em] uppercase text-gfb-gold mb-12"
          >
            The Philosophy
          </motion.p>

          {/* Counter stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mb-16">
            {[
              { target: 44, suffix: '+', label: 'Products', sub: 'Arunas varieties' },
              { target: 7, suffix: '', label: 'Premium Creations', sub: 'Shree Kunj collection' },
              { target: 1, suffix: '', label: 'Assam Story', sub: 'Born & made here' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <span
                  className="font-playfair text-6xl md:text-7xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #C9922A, #F0C060)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="font-playfair text-xl text-gfb-cream mt-2">{stat.label}</span>
                <span className="font-dm text-sm text-gfb-cream/40 mt-1">{stat.sub}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-gfb-gold/40 to-transparent mb-6"
          />
        </div>

        {/* Scroll ticker */}
        <ScrollTicker
          className="text-gfb-gold/30 font-dm text-sm tracking-[0.2em] py-3"
        />
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — THE CRAFT (3 pillars)
      ══════════════════════════════════════════════ */}
      <section
        ref={craftRef}
        className="relative py-28 sk-grain"
        style={{ background: '#0D1F12' }}
        aria-label="Our craft section"
      >
        {/* Gold grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,146,42,0.04) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={craftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-playfair text-xs tracking-[0.4em] uppercase text-gfb-gold mb-3">
              The Craft
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-gfb-cream">
              What makes us different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {craftItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={craftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
                className="relative group text-center p-8 rounded-2xl border border-gfb-gold/10 
                           hover:border-gfb-gold/30 transition-all duration-500 
                           bg-black/20 backdrop-blur-sm"
              >
                {/* Gold gradient top line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gfb-gold/50 to-transparent" />

                <span className="text-4xl mb-5 block" aria-hidden="true">{item.icon}</span>
                <h3 className="font-playfair text-xl text-gfb-gold mb-3">{item.title}</h3>
                <p className="font-dm text-gfb-cream/60 text-base leading-relaxed">{item.desc}</p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gfb-gold/0 group-hover:bg-gfb-gold/[0.02] transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — TWO WORLDS, ONE FAMILY (Brand Split)
      ══════════════════════════════════════════════ */}
      <section
        ref={splitRef}
        className="relative min-h-screen flex flex-col"
        aria-label="Choose your brand experience"
        id="brand-split"
      >
        {/* "Choose your experience" label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={splitActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center"
        >
          <p className="font-playfair text-xs md:text-sm tracking-[0.4em] uppercase text-gfb-cream/50">
            Two Worlds, One Family
          </p>
          <p className="font-playfair italic text-gfb-gold/70 text-base mt-1">
            Choose your experience
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row flex-1 min-h-screen">

          {/* ── LEFT: ARUNAS ── */}
          <motion.button
            initial={{ x: '-100%', opacity: 0 }}
            animate={splitActive ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={goToArunas}
            className="relative flex-1 flex flex-col items-center justify-center
                       min-h-[50vh] md:min-h-screen cursor-pointer group
                       focus:outline-none focus:ring-4 focus:ring-arunas-orange/50"
            style={{
              background: 'linear-gradient(145deg, #E8650A 0%, #F5C200 60%, #C0281A 100%)',
            }}
            aria-label="Explore Arunas snacks"
          >
            {/* Diagonal stripe texture */}
            <div className="absolute inset-0 diagonal-stripe opacity-100" aria-hidden="true" />

            {/* Hover scale */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-all duration-400" />

            <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-12 text-center">
              {/* Circular badge logo */}
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-arunas-brown 
                            flex items-center justify-center border-4 border-arunas-yellow/60
                            shadow-2xl group-hover:scale-105 transition-transform duration-400"
              >
                <span className="font-poppins font-bold text-2xl md:text-3xl text-arunas-yellow tracking-wider">
                  ARUNAS
                </span>
              </div>

              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white drop-shadow-lg">
                Arunas Snacks
              </h2>

              <p className="font-poppins font-semibold text-lg text-white/90 italic">
                "Every Bite, Every Budget"
              </p>

              <p className="font-nunito text-base text-white/80 max-w-xs leading-relaxed">
                44+ varieties of authentic Indian snacks — from Aloo Bhujia to Jhal Muri.
                Real flavors, real value.
              </p>

              <div
                className="mt-2 px-8 py-3 bg-arunas-brown text-arunas-yellow font-poppins 
                            font-bold rounded-full text-sm tracking-wider
                            group-hover:bg-arunas-brown/90 group-hover:shadow-xl
                            transition-all duration-300 flex items-center gap-2"
              >
                EXPLORE ARUNAS
                <span aria-hidden="true">→</span>
              </div>
            </div>

            {/* Hover warm glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(245,194,0,0.15) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
          </motion.button>

          {/* ── CENTER GOLD DIVIDER ── */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={splitActive ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:flex w-[2px] bg-gradient-to-b from-transparent via-gfb-gold to-transparent 
                       self-stretch items-center justify-center relative z-20"
            style={{ animation: splitActive ? 'goldPulse 3s ease-in-out infinite' : 'none' }}
            aria-hidden="true"
          />

          {/* ── RIGHT: SHREE KUNJ ── */}
          <motion.button
            initial={{ x: '100%', opacity: 0 }}
            animate={splitActive ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={goToShreeKunj}
            className="relative flex-1 flex flex-col items-center justify-center
                       min-h-[50vh] md:min-h-screen cursor-pointer group 
                       focus:outline-none focus:ring-4 focus:ring-gfb-gold/50"
            style={{ background: '#0B0B0F' }}
            aria-label="Enter Shree Kunj premium snacks"
          >
            {/* SK motif background */}
            <div className="absolute inset-0 sk-motif-bg opacity-20" aria-hidden="true" />

            {/* Gold particles */}
            <GoldParticles count={25} />

            {/* Hover gold radial */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,146,42,0.08) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-12 text-center">
              {/* Shree Kunj logo (image) */}
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden
                            border-2 border-gfb-gold/50 shadow-2xl
                            group-hover:border-gfb-gold/80 transition-all duration-400
                            flex items-center justify-center bg-gfb-gold/5"
              >
                <img
                  src="/src/assets/images/shreekunj-logo.jpeg"
                  alt="Shree Kunj logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2
                className="font-cormorant font-semibold text-3xl md:text-4xl"
                style={{
                  background: 'linear-gradient(135deg, #C9922A, #F0C060)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Shree Kunj
              </h2>

              <p className="font-cormorant italic text-lg text-sk-ivory/80">
                "Seven Creations. No Compromises."
              </p>

              <p className="font-jost text-sm text-sk-ivory/60 max-w-xs leading-relaxed">
                A curated collection of handcrafted premium snacks, made with heritage 
                recipes and the finest ingredients.
              </p>

              <div
                className="mt-2 px-8 py-3 border border-gfb-gold/60 text-gfb-gold 
                            font-cormorant text-base tracking-[0.2em]
                            group-hover:border-gfb-gold group-hover:shadow-[0_0_20px_rgba(201,146,42,0.3)]
                            transition-all duration-300 flex items-center gap-2"
              >
                ENTER SHREE KUNJ
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </motion.button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER — Slim strip
      ══════════════════════════════════════════════ */}
      <footer
        className="bg-[#0A0A0A] py-4 px-6 flex flex-col md:flex-row items-center 
                   justify-between gap-2 border-t border-white/5"
        aria-label="Site footer"
      >
        <p className="font-dm text-xs text-white/30 text-center">
          © {new Date().getFullYear()} Global Food & Beverages, Assam, India
        </p>
        <div className="flex items-center gap-4" aria-label="Social media links">
          {['Instagram', 'Facebook', 'Twitter'].map((social) => (
            <a
              key={social}
              href="#"
              aria-label={social}
              className="w-6 h-6 rounded-full border border-white/20 flex items-center 
                         justify-center text-white/30 hover:text-gfb-gold hover:border-gfb-gold/50
                         transition-all duration-300 text-[10px] font-bold"
            >
              {social[0]}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
