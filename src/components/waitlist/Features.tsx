'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: "🎞",
    title: "Access to thousands of cinematic GIFs",
    description: "Curated collection from legendary films and original art"
  },
  {
    icon: "🎬",
    title: "Drag-and-drop timeline editor",
    description: "Intuitive editing tools for seamless creativity"
  },
  {
    icon: "🌌",
    title: "Private library for your favorite visuals",
    description: "Save and organize your most inspiring moments"
  },
  {
    icon: "🧠",
    title: "AI suggestions for emotion-based clips",
    description: "Smart recommendations based on mood and feeling"
  }
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create cinematic art, coming to you first
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Founders Gift Pack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 backdrop-blur-sm">
            <div className="text-6xl mb-6">🎁</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              And one more thing —
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              early members get a free <span className="text-orange-400 font-bold">Founders Gift Pack</span> when we launch.
            </p>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center space-x-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border border-orange-500/20 rounded-full flex items-center justify-center"
          >
            <div className="w-12 h-12 border border-orange-500/40 rounded-full" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border border-purple-500/20 rounded-full flex items-center justify-center"
          >
            <div className="w-8 h-8 border border-purple-500/40 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
