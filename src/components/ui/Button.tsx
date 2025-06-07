'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode, MouseEvent } from 'react'

const Button = ({
  children,
  href,
  onClick,
  size = 'md',
  className = '',
}: {
  children: ReactNode
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const buttonClass = `relative inline-flex items-center justify-center rounded-md 
    bg-white/10 font-medium text-white backdrop-blur-sm transition-all 
    hover:bg-white/20 ${sizeClasses[size]} ${className}`

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {href ? (
        <Link href={href} className={buttonClass}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={buttonClass}>
          {children}
        </button>
      )}
    </motion.div>
  )
}

export default Button