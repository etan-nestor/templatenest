'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedText = ({
  text,
  className = '',
}: {
  text: string
  className?: string
}) => {
  const [animatedText, setAnimatedText] = useState('')

  useEffect(() => {
    let currentText = ''
    let i = 0

    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text.charAt(i)
        setAnimatedText(currentText)
        i++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [text])

  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {animatedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="ml-1 inline-block h-6 w-1 bg-current align-middle"
      />
    </motion.h2>
  )
}

export default AnimatedText