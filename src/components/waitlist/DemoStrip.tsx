'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Cinematic demo placeholders - no actual GIFs needed
const demoItems = [
  { id: 1, emoji: '🎬', title: 'Cinematic Moment 1' },
  { id: 2, emoji: '✨', title: 'Cinematic Moment 2' },
  { id: 3, emoji: '🎭', title: 'Cinematic Moment 3' },
  { id: 4, emoji: '🌟', title: 'Cinematic Moment 4' },
  { id: 5, emoji: '🎪', title: 'Cinematic Moment 5' },
  { id: 6, emoji: '🎨', title: 'Cinematic Moment 6' },
  { id: 7, emoji: '🎵', title: 'Cinematic Moment 7' },
  { id: 8, emoji: '🎯', title: 'Cinematic Moment 8' },
  { id: 9, emoji: '🎪', title: 'Cinematic Moment 9' },
  { id: 10, emoji: '🎭', title: 'Cinematic Moment 10' },
]

export default function DemoStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
      
      <div className="relative z-20">
        {/* Scrolling GIF strip */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="flex space-x-6"
            animate={{ x: [0, -100 * demoItems.length] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate the demo items for seamless loop */}
            {[...demoItems, ...demoItems].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden shadow-2xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  {/* Beautiful animated placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 animate-pulse" />
                  <div className="text-6xl opacity-80 hover:opacity-100 transition-opacity duration-300">
                    {item.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm font-medium opacity-70">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Overlay text */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Every frame feels alive
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              — cinematic lighting, subtle motion, deep emotion.
            </motion.p>
          </div>
        </motion.div>

        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </section>
  )
}
