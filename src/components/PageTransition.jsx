import { motion } from 'framer-motion'

// Shared page transition wrapper using Framer Motion
// Used inside AnimatePresence in App.jsx
export default function PageTransition({ children, variant = 'fade' }) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    curtainLeft: {
      // Orange Arunas curtain — expands from left half
      initial: { clipPath: 'inset(0 50% 0 0)', opacity: 0 },
      animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
      exit: { clipPath: 'inset(0 50% 0 0)', opacity: 0 },
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
    },
    curtainRight: {
      // Gold/Dark Shree Kunj curtain — expands from right half
      initial: { clipPath: 'inset(0 0 0 50%)', opacity: 0 },
      animate: { clipPath: 'inset(0 0 0 0%)', opacity: 1 },
      exit: { clipPath: 'inset(0 0 0 50%)', opacity: 0 },
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
    },
    slideUp: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  }

  const v = variants[variant] || variants.fade

  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={v.transition}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
