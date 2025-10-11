'use client'

import { motion } from 'framer-motion'

interface HeaderProps {
  onTryItOut: () => void
}

export default function Header({ onTryItOut }: HeaderProps) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-charcoal"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="/gifbeat-logo.png" 
              alt="GifBeat Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-3 text-2xl font-bold text-accent">
              GifBeat
            </span>
          </motion.div>

          {/* Try it out button */}
          <motion.button
            onClick={onTryItOut}
            className="px-6 py-2 bg-accent text-black font-semibold rounded-full hover:bg-accent/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try it out
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
