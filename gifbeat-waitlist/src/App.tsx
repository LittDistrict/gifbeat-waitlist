import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Instagram, Music, Type, Zap } from 'lucide-react'
import { addToWaitlist } from './lib/supabase'
import './App.css'

// GIF URLs - you'll need to upload these to your public folder
const GIFS = [
  '/gif1.gif', // Batman gif
  '/gif2.gif', // Boxing anime gif  
  '/gif3.gif', // Spider-man gif
  '/gif4.gif', // Add your other 3 gifs here
  '/gif5.gif',
  '/gif6.gif'
]

const App: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { scrollYProgress } = useScroll()
  const waitlistRef = useRef<HTMLDivElement>(null)

  // Transform scroll progress into animation states
  const gifScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])
  const gifOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const step1Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const step2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const step3Opacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')
    
    const result = await addToWaitlist(email)
    
    if (result.success) {
      setIsSubmitted(true)
      setEmail('')
    } else {
      setError(result.error || 'Failed to join waitlist')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="app">
      {/* Background GIFs */}
      <div className="background-gifs">
        {GIFS.map((gif, index) => (
          <motion.img
            key={index}
            src={gif}
            alt={`GIF ${index + 1}`}
            className={`gif-bg gif-${index + 1}`}
            style={{
              scale: gifScale,
              opacity: gifOpacity,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="logo-container"
        >
          <img src="/logo.svg" alt="Gifbeat" className="logo" />
          <h1 className="brand-name">Gifbeat</h1>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToWaitlist}
          className="try-button"
        >
          Try it out
        </motion.button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-content"
        >
          <h2 className="hero-title">
            Transform Your <span className="highlight">GIFs</span>
          </h2>
          <p className="hero-subtitle">
            Add music, captions, and create viral content that beats with rhythm
          </p>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        {/* Step 1 */}
        <motion.div
          style={{ opacity: step1Opacity }}
          className="step-container"
        >
          <div className="step-content">
            <h3 className="step-title">Choose your GIFs</h3>
            <p className="step-description">
              Select from your collection or upload new ones
            </p>
            <div className="gif-studio">
              {GIFS.slice(0, 6).map((gif, index) => (
                <motion.img
                  key={index}
                  src={gif}
                  alt={`Studio GIF ${index + 1}`}
                  className="studio-gif"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          style={{ opacity: step2Opacity }}
          className="step-container"
        >
          <div className="step-content">
            <h3 className="step-title">Edit: choose your music, choose your captions</h3>
            <p className="step-description">
              Sync your GIFs with perfect beats and engaging text
            </p>
            <div className="editing-tools">
              <motion.div
                className="tool-item"
                whileHover={{ scale: 1.05 }}
              >
                <Music size={32} />
                <span>Music</span>
              </motion.div>
              <motion.div
                className="tool-item"
                whileHover={{ scale: 1.05 }}
              >
                <Type size={32} />
                <span>Captions</span>
              </motion.div>
              <motion.div
                className="tool-item"
                whileHover={{ scale: 1.05 }}
              >
                <Zap size={32} />
                <span>Effects</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          style={{ opacity: step3Opacity }}
          className="step-container"
        >
          <div className="step-content">
            <h3 className="step-title">You are ready to post</h3>
            <p className="step-description">
              Your content is ready to go viral
            </p>
            <div className="final-gifs">
              {GIFS.slice(0, 3).map((gif, index) => (
                <motion.img
                  key={index}
                  src={gif}
                  alt={`Final GIF ${index + 1}`}
                  className="final-gif"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                />
              ))}
            </div>
            <AnimatePresence>
              <motion.div
                className="neon-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="neon-gif"
                >
                  Gif
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="neon-beat"
                >
                  Beat
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Waitlist Section */}
      <section ref={waitlistRef} className="waitlist-section">
        <div className="waitlist-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="waitlist-content"
          >
            <h2 className="waitlist-title">Join the Revolution</h2>
            <p className="waitlist-subtitle">
              Launching Soon! The first 1000 sign ups will receive a Founders Free Plan and early access.
            </p>
            
            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="input-group">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="email-input"
                  disabled={isLoading}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading}
                className="join-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? 'Joining...' : 'Join the waitlist and claim gift'}
              </motion.button>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="error-message"
                >
                  {error}
                </motion.p>
              )}
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  🎉 Welcome to the waitlist! Check your email for confirmation.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <motion.a
              href="https://instagram.com/thegifbeat"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="social-link"
            >
              <Instagram size={24} />
              <span>@thegifbeat</span>
            </motion.a>
            <motion.a
              href="https://tiktok.com/@gifbeat.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="social-link"
            >
              <Music size={24} />
              <span>@gifbeat.com</span>
            </motion.a>
          </div>
          <div className="contact-info">
            <a href="mailto:gifbeatstudios@gmail.com" className="email-link">
              gifbeatstudios@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
