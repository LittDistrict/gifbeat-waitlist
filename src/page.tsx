'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { getSupabase } from '@/lib/supabase/client'
import Image from 'next/image'

// GIF imports - using placeholder GIFs (replace with your actual GIFs)
import gif1 from '/public/gifs/iron-giant.gif'
import gif2 from '/public/gifs/up-flying.gif'
import gif3 from '/public/gifs/bambi-movie-thumper.gif'
import gif4 from '/public/gifs/icegif-1373.gif'
import gif5 from '/public/gifs/gif-dps.gif'
import gif6 from '/public/gifs/source.gif'

export default function GifbeatWaitlist() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentStep, setCurrentStep] = useState(0)
  const [showHeartbeat, setShowHeartbeat] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Animation transforms based on scroll
  const gifScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.8, 0.6, 0.5])
  const gifOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 0.8, 0.6, 0.3])
  const step1Y = useTransform(scrollYProgress, [0.2, 0.4], [0, -100])
  const step2Y = useTransform(scrollYProgress, [0.4, 0.6], [0, -150])
  const step3Y = useTransform(scrollYProgress, [0.6, 0.8], [0, -200])

  // GIFs array
  const gifs = [
    { src: gif1, alt: 'Iron Giant animation' },
    { src: gif2, alt: 'Up flying scene' },
    { src: gif3, alt: 'Bambi movie scene' },
    { src: gif4, alt: 'Ice animation' },
    { src: gif5, alt: 'GIF animation' },
    { src: gif6, alt: 'Source animation' }
  ]

  // Handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const supabase = getSupabase()
    if (!supabase) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, created_at: new Date().toISOString() }])

      if (error) throw error
      
      setSubmitStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error submitting email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Scroll to waitlist section
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    waitlistSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Heartbeat animation effect
  useEffect(() => {
    if (currentStep === 2) {
      setShowHeartbeat(true)
    }
  }, [currentStep])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">GB</span>
            </div>
            <span className="text-xl font-bold text-white">Gifbeat</span>
          </div>
          
          <motion.button
            onClick={scrollToWaitlist}
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try it out
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Create</span>{' '}
            <span className="text-yellow-500">Amazing</span>{' '}
            <span className="text-white">GIFs</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your favorite moments into stunning animated GIFs with music and captions. 
            The future of social media content creation is here.
          </motion.p>

          {/* Floating GIFs */}
          <div className="relative h-96 mb-16">
            {gifs.map((gif, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: `${15 + (index * 15)}%`,
                  top: `${20 + (index % 2) * 40}%`,
                  scale: gifScale,
                  opacity: gifOpacity,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-32 h-32 rounded-lg overflow-hidden shadow-2xl border-2 border-yellow-500/30">
                  <Image
                    src={gif.src}
                    alt={gif.alt}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={scrollToWaitlist}
            className="bg-yellow-500 text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Waitlist
          </motion.button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>

          {/* Step 1: Choose your GIFs */}
          <motion.div 
            className="mb-32"
            style={{ y: step1Y }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">Step 1: Choose your GIFs</h3>
              <p className="text-gray-300 text-lg">Select from our library or upload your own</p>
            </div>
            
            {/* Studio-like static image */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {gifs.slice(0, 6).map((gif, index) => (
                <motion.div
                  key={index}
                  className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800 border border-gray-600"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={gif.src}
                    alt={gif.alt}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover opacity-70"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Step 2: Edit */}
          <motion.div 
            className="mb-32"
            style={{ y: step2Y }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">Step 2: Edit</h3>
              <p className="text-gray-300 text-lg">Choose your music and add captions</p>
            </div>
            
            {/* Second studio still */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {gifs.slice(0, 3).map((gif, index) => (
                <motion.div
                  key={index}
                  className="w-32 h-32 rounded-lg overflow-hidden bg-gray-800 border border-gray-600 relative"
                  initial={{ scale: 1, opacity: 0.7 }}
                  whileInView={{ scale: 0.9, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Image
                    src={gif.src}
                    alt={gif.alt}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded px-2 py-1">
                      <div className="text-xs text-white font-medium">Caption {index + 1}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Step 3: Ready to post */}
          <motion.div 
            className="mb-32"
            style={{ y: step3Y }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-yellow-500 mb-4">Step 3: You are ready to post</h3>
              <p className="text-gray-300 text-lg">Your masterpiece is ready to share</p>
            </div>
            
            {/* Sequential GIFs */}
            <div className="flex justify-center space-x-4 mb-12">
              {gifs.slice(0, 3).map((gif, index) => (
                <motion.div
                  key={index}
                  className="w-40 h-40 rounded-lg overflow-hidden bg-gray-800 border-2 border-yellow-500/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                >
                  <Image
                    src={gif.src}
                    alt={gif.alt}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Heartbeat Animation */}
            <AnimatePresence>
              {showHeartbeat && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <motion.div
                    className="text-6xl md:text-8xl font-bold"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.span
                      className="text-yellow-500"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Gif
                    </motion.span>
                    <motion.span
                      className="text-white ml-4"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      Beat
                    </motion.span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-6 bg-gray-900/50">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Join the <span className="text-yellow-500">Revolution</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Be among the first to experience the future of GIF creation
          </motion.p>

          {/* Waitlist Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-gray-800 border-2 border-gray-600 rounded-full text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Joining...' : 'Join the waitlist and claim gift'}
            </motion.button>
          </motion.form>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
              >
                <p className="text-green-400">Welcome to the waitlist! Check your email for confirmation.</p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
              >
                <p className="text-red-400">Something went wrong. Please try again.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launch Info */}
          <motion.div 
            className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg font-semibold text-yellow-500 mb-2">Launching Soon!</p>
            <p className="text-gray-300">
              The first 1000 sign ups will receive a Founders Free Plan and early access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <motion.h3 
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Follow Our Journey
          </motion.h3>
          
          <div className="flex justify-center space-x-8">
            <motion.a
              href="https://instagram.com/thegifbeat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">IG</span>
              </div>
              <span className="text-white font-medium">@thegifbeat</span>
            </motion.a>
            
            <motion.a
              href="https://tiktok.com/@gifbeat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-800 px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-black border border-white rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <span className="text-white font-medium">@gifbeat.com</span>
            </motion.a>
          </div>
          
          <motion.div 
            className="mt-12 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>Questions? Contact us at <a href="mailto:gifbeatstudios@gmail.com" className="text-yellow-500 hover:text-yellow-400">gifbeatstudios@gmail.com</a></p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 Gifbeat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
