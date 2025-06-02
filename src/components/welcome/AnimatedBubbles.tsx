'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, JSX } from 'react'
import { AngularIcon, DjangoIcon, FlaskIcon, NextJsIcon, ReactIcon, SvelteIcon, VueIcon } from '../ui/Icons'


const icons = [
  { icon: <ReactIcon />, name: 'React' },
  { icon: <NextJsIcon />, name: 'Next.js' },
  { icon: <AngularIcon />, name: 'Angular' },
  { icon: <VueIcon />, name: 'Vue' },
  { icon: <SvelteIcon />, name: 'Svelte' },
  { icon: <DjangoIcon />, name: 'Django' },
  { icon: <FlaskIcon />, name: 'Flask' },
]

const AnimatedBubbles = () => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    icon: JSX.Element | null
  }>>([])

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 15 }, (_, i) => {
        const hasIcon = Math.random() > 0.7
        const iconIndex = Math.floor(Math.random() * icons.length)
        
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 2,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 5,
          icon: hasIcon ? icons[iconIndex].icon : null,
        }
      })
      setBubbles(newBubbles)
    }

    generateBubbles()
  }, [])

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full flex items-center justify-center
            ${bubble.icon ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5'}`}
          style={{
            width: `${bubble.size}rem`,
            height: `${bubble.size}rem`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          whileHover={{ scale: 1.2 }}
        >
          {bubble.icon && (
            <div className="text-white/80 text-xl">
              {bubble.icon}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedBubbles