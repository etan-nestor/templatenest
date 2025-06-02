'use client'

import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion'
import { useEffect } from 'react'

const colors = [
  '#13FFAA', '#1E67C6', '#CE84CF', '#DD335C',
  '#00ccff', '#00ff66', '#ff00cc', '#ff0066'
]

const InteractiveBackground = () => {
  const color = useMotionValue(colors[0])
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0 4px 24px ${color}`

  useEffect(() => {
    animate(color, colors, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    })
  }, [])

  return (
    <motion.div 
      className="absolute inset-0 h-full w-full opacity-30"
      style={{ backgroundImage }}
    />
  )
}

export default InteractiveBackground