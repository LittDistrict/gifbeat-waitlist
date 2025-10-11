'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm">
            © GifBeat 2025 ·{' '}
            <a 
              href="https://instagram.com/thegifbeat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              Instagram
            </a>
            {' · '}
            <a 
              href="https://www.tiktok.com/@gifbeat.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
            >
              TikTok
            </a>
            {' · '}
            <a 
              href="mailto:gifbeatstudios@gmail.com"
              className="hover:text-accent transition-colors duration-200"
            >
              gifbeatstudios@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
