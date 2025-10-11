'use client'

import { motion } from 'framer-motion'

export default function StepScenes() {

  return (
    <div className="relative">
      {/* Step 1: Choose your GIFs */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <span className="text-6xl md:text-8xl font-bold text-accent">1</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white">
                Choose your GIFs.
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start from a library with a soul choose your favorite GIFs to begin the journey
            </p>
            
            {/* Step 1 Image */}
            <div className="max-w-2xl mx-auto mb-8">
              <img 
                src="/step1-image.jpg" 
                alt="Choose your GIFs - Step 1" 
                className="w-full h-auto rounded-lg shadow-lg border border-accent/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step 2: Edit the feeling */}
      <section className="min-h-screen flex items-center justify-center px-4 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <span className="text-6xl md:text-8xl font-bold text-accent">2</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white">
                The studio is your canvas
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Pick music, add captions, arrange beats. A studio built for character.
            </p>
            
            {/* Step 2 Image */}
            <div className="max-w-2xl mx-auto mb-8">
              <img 
                src="/step2-image.jpg" 
                alt="Edit the feeling - Step 2" 
                className="w-full h-auto rounded-lg shadow-lg border border-accent/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step 3: Post with presence */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <span className="text-6xl md:text-8xl font-bold text-accent">3</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white">
                Post with presence.
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Export a short that speaks. Not stock, a language.
            </p>
            
            {/* Step 3 Video */}
            <div className="max-w-2xl mx-auto mb-8">
              <video 
                src="/step3-video.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg shadow-lg border border-accent/20"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
