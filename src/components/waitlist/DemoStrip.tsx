'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Sample cinematic GIFs for the demo strip
const demoGifs = [
  { src: '/gifs/demo-1.gif', alt: 'Cinematic moment 1' },
  { src: '/gifs/demo-2.gif', alt: 'Cinematic moment 2' },
  { src: '/gifs/demo-3.gif', alt: 'Cinematic moment 3' },
  { src: '/gifs/demo-4.gif', alt: 'Cinematic moment 4' },
  { src: '/gifs/demo-5.gif', alt: 'Cinematic moment 5' },
  { src: '/gifs/demo-6.gif', alt: 'Cinematic moment 6' },
  { src: '/gifs/demo-7.gif', alt: 'Cinematic moment 7' },
  { src: '/gifs/demo-8.gif', alt: 'Cinematic moment 8' },
  { src: '/gifs/demo-9.gif', alt: 'Cinematic moment 9' },
  { src: '/gifs/demo-10.gif', alt: 'Cinematic moment 10' },
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
            animate={{ x: [0, -100 * demoGifs.length] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate the GIFs for seamless loop */}
            {[...demoGifs, ...demoGifs].map((gif, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden shadow-2xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  {/* Placeholder for missing GIFs */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 animate-pulse" />
                  <div className="text-4xl opacity-50">🎬</div>
                  
                  {/* Actual GIF would go here */}
                  <img
                    src={gif.src}
                    alt={gif.alt}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
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
