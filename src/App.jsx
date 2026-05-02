import { Link, useLocation, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Arunas from './pages/Arunas'
import ShreeKunj from './pages/ShreeKunj'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/arunas" element={<Arunas />} />
        <Route path="/shreekunj" element={<ShreeKunj />} />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gfb-charcoal flex flex-col items-center justify-center text-center px-6">
              <h1 className="font-playfair text-6xl text-gfb-gold mb-4">404</h1>
              <p className="font-dm text-gfb-cream/60 text-lg mb-8">
                This page doesn't exist yet.
              </p>
              <Link to="/">
                <div className="font-dm text-gfb-gold border border-gfb-gold/40 px-6 py-2.5 
                           hover:bg-gfb-gold/10 transition-all duration-300">
                ← Back to GF&B Home
            </div>
              </Link>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}
