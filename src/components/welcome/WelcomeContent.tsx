'use client'

import { motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'
import Button from '@/components/ui/Button'
import AnimatedText from '@/components/ui/AnimatedText'

const WelcomeContent = () => {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              TemplateNest
            </span>
          </h1>
        </motion.div>

        {/* Texte animé */}
        <AnimatedText
          text="Premium Templates for Modern Web Development"
          className="mb-8 text-lg text-gray-300 md:text-xl"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 text-gray-400"
        >
          Discover high-quality templates for React, Next.js, Vue, Angular and more.
          <br />
          Boost your productivity with our professionally designed components.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            href="/main"
            size="lg"
            className="group relative overflow-hidden rounded-lg px-8 py-4 text-lg font-semibold"
          >
            <span className="relative z-10">Explore Templates</span>
            <motion.span
              className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'linear',
              }}
            />
            <MousePointerClick className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Instruction interactive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Move your cursor around to interact with the background</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WelcomeContent