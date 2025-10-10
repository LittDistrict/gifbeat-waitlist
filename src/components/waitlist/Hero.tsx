'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface FloatingGif {
  id: number
  src: string
  x: number
  y: number
  size: number
  rotation: number
}

export default function WaitlistHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingGifs, setFloatingGifs] = useState<FloatingGif[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample cinematic GIFs for floating effect - memoized to prevent re-renders
  const sampleGifs = useMemo(() => [
    '/gifs/cinematic-1.gif',
    '/gifs/cinematic-2.gif',
    '/gifs/cinematic-3.gif',
    '/gifs/cinematic-4.gif',
    '/gifs/cinematic-5.gif',
    '/gifs/cinematic-6.gif',
  ], [])

  useEffect(() => {
    // Initialize floating GIFs
    const gifs = sampleGifs.map((src, index) => ({
      id: index,
      src,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 40,
      rotation: Math.random() * 360,
    }))
    setFloatingGifs(gifs)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToForm = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/5 to-transparent animate-pulse" />
      </div>

      {/* Floating GIFs */}
      {floatingGifs.map((gif) => (
        <motion.div
          key={gif.id}
          className="absolute pointer-events-none opacity-30 blur-sm"
          style={{
            left: `${gif.x}%`,
            top: `${gif.y}%`,
            width: `${gif.size}px`,
            height: `${gif.size}px`,
          }}
          animate={{
            x: [0, (mousePosition.x - gif.x) * 0.1, 0],
            y: [0, (mousePosition.y - gif.y) * 0.1, 0],
            rotate: [gif.rotation, gif.rotation + 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <Image 
              src={gif.src} 
              alt="Cinematic GIF" 
              width={gif.size}
              height={gif.size}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder if GIF doesn't exist
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiNGRkY0MDAiLz4KPC9zdmc+'
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Cinematic glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Headline */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Cinematic GIFs.
            <br />
            <span className="text-orange-400">Built for Emotion.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            GifBeat is the new creative tool turning film moments into poetry — edit, combine, and create short-form art in seconds.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToForm}
            className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join the Waitlist</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-orange-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
