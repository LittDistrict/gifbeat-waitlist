'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { getSupabase } from '@/lib/supabase/client'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const supabase = getSupabase()
      if (!supabase) {
        throw new Error('Database connection not available')
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            created_at: new Date().toISOString()
          }
        ])

      if (error) {
        if (error.code === '23505') {
          setError('This email is already on our waitlist!')
        } else {
          throw error
        }
      } else {
        setIsSuccess(true)
        setEmail('')
      }
    } catch (err) {
      console.error('Error adding to waitlist:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      setError(`Something went wrong: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="waitlist-form" className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="p-12 rounded-3xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 backdrop-blur-sm"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              You're in!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Welcome to the GifBeat family. We'll be in touch soon with your exclusive surprise.
            </p>
            <motion.button
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Add Another Email
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist-form" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Be First to Feel It.
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the waitlist now and receive an exclusive surprise when GifBeat launches.
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                disabled={isLoading}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !email}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {isLoading ? 'Joining...' : 'Join & Claim Gift'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Cinematic pulse animation */}
              <motion.div
                className="absolute inset-0 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}

            <p className="mt-6 text-sm text-gray-500">
              No spam. Just art, emotion, and early access.
            </p>
          </motion.form>
        </motion.div>

        {/* Ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  )
}
