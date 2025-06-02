'use client'

import { motion } from 'framer-motion'
import { Search, Upload, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState, FormEvent } from 'react'

interface NavbarProps {
  onSearch: (query: string) => void;
  isCollapsed: boolean;
}

const Navbar = ({ onSearch, isCollapsed }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80"
      style={{ left: isCollapsed ? '80px' : '280px' }}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <motion.div whileHover={{ scale: 1.01 }} className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Template
          </motion.button>

          <Link href="/donate">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700"
            >
              <Heart className="mr-2 h-4 w-4" />
              Donate
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar