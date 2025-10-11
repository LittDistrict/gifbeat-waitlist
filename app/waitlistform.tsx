'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isButtonLocked, setIsButtonLocked] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isButtonLocked) return
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      addToast('Please enter a valid email address', 'error')
      return
    }

    setIsLoading(true)
    setIsButtonLocked(true)

    try {
      if (!supabase) {
        addToast('Supabase not configured. Please check environment variables.', 'error')
        return
      }

      const { data, error } = await supabase
        .from('waitlist_emails')
        .insert([{ email: email.toLowerCase().trim() }])
        .select()

      if (error) {
        if (error.code === '23505') {
          addToast("You're already on the list.", 'success')
        } else {
          throw error
        }
      } else {
        addToast('Welcome to the waitlist! We\'ll notify you when we launch.', 'success')
        setEmail('')
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error)
      addToast('Something went wrong. Please try again.', 'error')
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setIsButtonLocked(false)
      }, 3000)
    }
  }

  return (
    <section id="waitlist" className="min-h-screen flex items-center justify-center px-4 bg-charcoal">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-accent">
            Be first to feel it.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-16">
            Join the waitlist now and claim a Founders gift at launch.
          </p>
          
          {/* Waitlist Form */}
          <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-accent/20">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                required
                disabled={isLoading}
                className="w-full px-6 py-4 bg-charcoal border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-center disabled:opacity-50"
              />
              
              <button
                type="submit"
                disabled={isLoading || isButtonLocked}
                className="w-full px-8 py-4 bg-accent text-black font-bold text-lg rounded-full hover:bg-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Joining...' : 'Join the waitlist and claim gift'}
              </button>
            </form>
            
            <p className="mt-6 text-gray-400 text-sm">
              No spam, just one early access notification.
            </p>
            
            <p className="mt-4 text-accent font-medium">
              Launching soon. First 1,000 sign-ups receive a Founders Free Plan and early access.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
              className={`px-6 py-4 rounded-lg shadow-lg max-w-sm ${
                toast.type === 'success' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
