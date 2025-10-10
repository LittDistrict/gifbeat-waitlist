'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    id: 1,
    title: "Find Emotion",
    description: "Browse thousands of cinematic GIFs, from legendary films to original art.",
    image: "/gifs/step1-emotion.jpg",
    icon: "🎬"
  },
  {
    id: 2,
    title: "Create Instantly",
    description: "Combine clips, add sound, and build short edits with a drag-and-drop timeline.",
    image: "/gifs/step2-create.jpg",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Own the Mood",
    description: "Save your creations, share them, and discover a new way to tell stories.",
    image: "/gifs/step3-own.jpg",
    icon: "🌌"
  }
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transform your creative vision into cinematic art
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative">
                {/* Step Image */}
                <div className="relative overflow-hidden rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-500">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-6xl mb-4">{step.icon}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Fallback for missing images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">{step.icon}</div>
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                  {step.id}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent transform -translate-y-1/2" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border border-orange-500/20 rounded-full flex items-center justify-center"
          >
            <div className="w-16 h-16 border border-orange-500/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
