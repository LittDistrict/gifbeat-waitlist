'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer className="py-16 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main footer content */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              © GifBeat 2025
            </h3>
            <p className="text-lg text-gray-400 mb-8">
              Cinematic GIFs built for emotion.
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-8 mb-8">
            <motion.a
              href="https://instagram.com/gifbeatstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">📷</span>
              <span className="ml-2 text-sm">Instagram</span>
            </motion.a>
            
            <motion.a
              href="https://tiktok.com/@gifbeatstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">🎵</span>
              <span className="ml-2 text-sm">TikTok</span>
            </motion.a>
            
            <motion.a
              href="mailto:gifbeatstudios@gmail.com"
              className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">✉️</span>
              <span className="ml-2 text-sm">Email</span>
            </motion.a>
          </div>

          {/* Contact info */}
          <div className="text-gray-500 text-sm">
            <p className="mb-2">gifbeatstudios@gmail.com</p>
            <p>Building the future of cinematic storytelling</p>
          </div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-orange-500/20 rounded-full flex items-center justify-center"
            >
              <div className="w-8 h-8 border border-orange-500/40 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
