'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-md">
      <div className="text-center">
        {/* Animation de chargement élégante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Loader2 className="h-16 w-16 text-cyan-400" />
          </motion.div>
        </motion.div>

        {/* Texte animé */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Loading Premium Experience</h2>
          <p className="text-gray-400">Preparing your templates...</p>
        </motion.div>

        {/* Barre de progression */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="mt-8 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
        />
      </div>
    </div>
  )
}

export default LoadingScreen