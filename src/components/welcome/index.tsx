'use client'

import { motion } from 'framer-motion'
import InteractiveBackground from './InteractiveBackground'
import WelcomeContent from './WelcomeContent'
import AnimatedBubbles from './AnimatedBubbles'

const Welcome = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background avec interaction */}
      <InteractiveBackground />
      
      {/* Bulles animées */}
      <AnimatedBubbles />
      
      {/* Contenu principal */}
      <WelcomeContent />
    </div>
  )
}

export default Welcome