'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

const Button = ({
  children,
  href,
  size = 'md',
  className = '',
}: {
  children: ReactNode
  href: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`relative inline-flex items-center justify-center rounded-md 
          bg-white/10 font-medium text-white backdrop-blur-sm transition-all 
          hover:bg-white/20 ${sizeClasses[size]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}

export default Button