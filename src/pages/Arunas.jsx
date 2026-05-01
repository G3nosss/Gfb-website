import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { arunasProducts, arunasCategories, arunasSizes } from '../data/arunasProducts'

// ── Snack icon strip (animated bouncing icons) ────────────────────
const SNACK_ICONS = ['🥜', '🌾', '🫙', '🌶️', '🫘', '🥔', '🌽', '🫚', '🧂', '🥨']

function SnackIconStrip() {
  return (
    <div className="flex items-center justify-center gap-4 py-3 overflow-hidden" aria-hidden="true">
      {SNACK_ICONS.concat(SNACK_ICONS).map((icon, i) => (
        <span
          key={i}
          className="text-2xl"
          style={{
            display: 'inline-block',
            animation: `bounce ${1.5 + (i % 5) * 0.15}s ease-in-out ${(i * 0.12) % 1}s infinite`,
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  )
}

// ── Inquiry Form ──────────────────────────────────────────────────
function InquiryForm({ inquiredProducts }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    products: inquiredProducts.map((p) => p.name),
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-orange-200 bg-white font-nunito text-arunas-brown ' +
    'focus:outline-none focus:border-arunas-orange transition-colors duration-200 placeholder-orange-200'

  return (
    <section
      className="bg-arunas-cream py-20 px-6"
      aria-label="Product inquiry form"
      id="inquiry"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="font-poppins text-xs tracking-[0.3em] uppercase text-arunas-orange mb-2">
            Get In Touch
          </p>
          <h2 className="font-poppins font-bold text-3xl text-arunas-brown">
            Wholesale Inquiry
          </h2>
          <p className="font-nunito text-arunas-brown/60 mt-3">
            Interested in stocking Arunas? Send us your details and we'll get back within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-lg border border-green-200"
          >
            <span className="text-5xl block mb-4">✅</span>
            <h3 className="font-poppins font-bold text-xl text-arunas-brown">Inquiry Sent!</h3>
            <p className="font-nunito text-arunas-brown/60 mt-2">
              We'll contact you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-5 border border-orange-100"
          >
            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="inq-name" className="font-poppins text-xs text-arunas-brown/70 mb-1.5 block font-semibold tracking-wide">
                  Your Name *
                </label>
                <input
                  id="inq-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Rajesh Kumar"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="inq-phone" className="font-poppins text-xs text-arunas-brown/70 mb-1.5 block font-semibold tracking-wide">
                  Phone Number *
                </label>
                <input
                  id="inq-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="inq-city" className="font-poppins text-xs text-arunas-brown/70 mb-1.5 block font-semibold tracking-wide">
                City / State *
              </label>
              <input
                id="inq-city"
                name="city"
                type="text"
                required
                placeholder="Guwahati, Assam"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Products multi-select info */}
            <div>
              <label className="font-poppins text-xs text-arunas-brown/70 mb-1.5 block font-semibold tracking-wide">
                Products of Interest
              </label>
              {inquiredProducts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {inquiredProducts.map((p) => (
                    <span
                      key={p.id}
                      className="bg-orange-100 text-arunas-orange font-nunito text-sm px-3 py-1 rounded-full border border-orange-200"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-nunito text-sm text-arunas-brown/40 italic">
                  Click "Add to Inquiry" on any product cards above to select products
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="inq-message" className="font-poppins text-xs text-arunas-brown/70 mb-1.5 block font-semibold tracking-wide">
                Message
              </label>
              <textarea
                id="inq-message"
                name="message"
                rows={4}
                placeholder="Tell us about your requirements — quantities, pack sizes, delivery location..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-arunas-orange text-white font-poppins font-bold text-base 
                         rounded-xl hover:bg-arunas-red transition-colors duration-300
                         focus:outline-none focus:ring-4 focus:ring-arunas-orange/40
                         shadow-lg hover:shadow-xl"
            >
              Send Inquiry →
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
export default function Arunas() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSize, setActiveSize] = useState('All')
  const [inquiredProducts, setInquiredProducts] = useState([])
  const filterRef = useRef(null)

  // Filter products
  const filtered = arunasProducts.filter((p) => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory
    const sizeMatch =
      activeSize === 'All' || p.sizes.some((s) => s.weight === activeSize)
    return catMatch && sizeMatch
  })

  const handleInquiry = (product) => {
    setInquiredProducts((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    )
  }

  return (
    <div className="font-nunito bg-arunas-cream min-h-screen">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm"
        aria-label="Arunas navigation"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back link */}
          <Link
            to="/"
            className="font-poppins text-sm text-arunas-brown/60 hover:text-arunas-orange 
                       transition-colors duration-200 flex items-center gap-1.5 shrink-0"
            aria-label="Back to GF&B home"
          >
            <span aria-hidden="true">←</span> GF&B Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full bg-arunas-orange flex items-center justify-center
                         font-poppins font-bold text-white text-xs shadow-md"
            >
              A
            </div>
            <span className="font-poppins font-bold text-arunas-brown text-lg hidden sm:block">
              ARUNAS
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {['Products', 'About', 'Inquiry'].map((link) => (
              <a
                key={link}
                href={link === 'Inquiry' ? '#inquiry' : '#products'}
                className="font-poppins text-sm text-arunas-brown/70 hover:text-arunas-orange 
                           transition-colors duration-200 relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-arunas-orange 
                                 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #E8650A 0%, #F5C200 50%, #C0281A 100%)',
        }}
        aria-label="Arunas hero banner"
      >
        {/* Diagonal stripe texture */}
        <div className="absolute inset-0 diagonal-stripe opacity-100" aria-hidden="true" />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6">
          {/* Est. badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm 
                       rounded-full px-4 py-1.5 mb-6 border border-white/30"
          >
            <span className="text-lg">🌿</span>
            <span className="font-poppins font-semibold text-white text-sm tracking-wider">
              Est. in Assam
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl text-white 
                       drop-shadow-lg leading-tight"
          >
            ARUNAS SNACKS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-nunito text-lg md:text-2xl text-white/90 mt-3 font-semibold tracking-wide"
          >
            Authentic. Affordable. Irresistible.
          </motion.p>

          {/* Snack icons strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <SnackIconStrip />
          </motion.div>
        </div>
      </header>

      {/* ── FILTER BAR ─────────────────────────────────────────── */}
      <div
        ref={filterRef}
        className="sticky top-16 z-40 bg-white border-b border-orange-100 shadow-sm"
        id="products"
        aria-label="Product filters"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 space-y-2">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Filter by category">
            <span className="font-poppins text-xs text-arunas-brown/40 shrink-0 mr-1">Category:</span>
            {arunasCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-poppins font-semibold 
                            transition-all duration-200 border whitespace-nowrap
                            focus:outline-none focus:ring-2 focus:ring-arunas-orange/50
                            ${
                              activeCategory === cat
                                ? 'bg-arunas-orange text-white border-arunas-orange shadow-sm'
                                : 'bg-transparent text-arunas-brown/70 border-orange-200 hover:border-arunas-orange hover:text-arunas-orange'
                            }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Size pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide" role="group" aria-label="Filter by size">
            <span className="font-poppins text-xs text-arunas-brown/40 shrink-0 mr-1">Size:</span>
            {arunasSizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(size)}
                aria-pressed={activeSize === size}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-poppins font-semibold 
                            transition-all duration-200 border whitespace-nowrap
                            focus:outline-none focus:ring-2 focus:ring-arunas-orange/50
                            ${
                              activeSize === size
                                ? 'bg-arunas-yellow text-arunas-brown border-arunas-yellow shadow-sm'
                                : 'bg-transparent text-arunas-brown/70 border-orange-200 hover:border-arunas-yellow'
                            }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ───────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10" aria-label="Product catalog">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-nunito text-sm text-arunas-brown/50">
            Showing{' '}
            <span className="font-semibold text-arunas-orange">{filtered.length}</span>{' '}
            products
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {activeSize !== 'All' && ` (${activeSize})`}
          </p>

          {/* Inquiry cart summary */}
          {inquiredProducts.length > 0 && (
            <a
              href="#inquiry"
              className="flex items-center gap-2 bg-arunas-orange text-white 
                         font-poppins font-semibold text-xs px-4 py-2 rounded-full
                         hover:bg-arunas-red transition-colors duration-200 shadow-md"
              aria-label={`${inquiredProducts.length} products in inquiry`}
            >
              📋 {inquiredProducts.length} in Inquiry
            </a>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="font-poppins text-arunas-brown/50 text-lg">
              No products match this filter combination.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setActiveSize('All') }}
              className="mt-4 text-arunas-orange font-poppins font-semibold text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
              >
                <ProductCard product={product} onInquiry={handleInquiry} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ── INQUIRY FORM ───────────────────────────────────────── */}
      <InquiryForm inquiredProducts={inquiredProducts} />

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="bg-arunas-brown py-6 px-6 text-center"
        aria-label="Arunas footer"
      >
        <p className="font-nunito text-sm text-arunas-yellow/70">
          © {new Date().getFullYear()} Arunas — Global Food & Beverages, Assam, India
        </p>
        <div className="mt-3 flex justify-center gap-6">
          <Link
            to="/"
            className="font-poppins text-xs text-arunas-yellow/50 hover:text-arunas-yellow transition-colors"
          >
            ← GF&B Home
          </Link>
          <Link
            to="/shreekunj"
            className="font-poppins text-xs text-arunas-yellow/50 hover:text-arunas-yellow transition-colors"
          >
            Visit Shree Kunj →
          </Link>
        </div>
      </footer>
    </div>
  )
}
