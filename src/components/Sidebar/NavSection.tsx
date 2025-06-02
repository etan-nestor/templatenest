'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

interface NavSectionProps {
  title: string
  items: Array<{ name: string; icon: string | ReactNode }>
  isCollapsed: boolean
  isActive: boolean
  onToggle: () => void
  onItemClick?: (item: string) => void
  selectedItem?: string | null
}

const NavSection = ({
  title,
  items,
  isCollapsed,
  isActive,
  onToggle,
  onItemClick,
  selectedItem
}: NavSectionProps) => {
  return (
    <div className="space-y-1">
      <motion.div
        whileHover={{ scale: isCollapsed ? 1.05 : 1 }}
        className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isCollapsed ? 'justify-center' : 'justify-between'
        } ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
        onClick={onToggle}
      >
        <div className="flex items-center">
          {typeof items[0].icon === 'string' ? (
            <div className="h-5 w-5">
              <Image 
                src={items[0].icon as string} 
                alt={title} 
                width={20} 
                height={20} 
                className="object-contain"
              />
            </div>
          ) : (
            <div className="h-5 w-5 text-blue-400">
              {items[0].icon}
            </div>
          )}
          {!isCollapsed && <span className="ml-3 text-gray-200">{title}</span>}
        </div>
        {!isCollapsed && (
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
          >
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isActive && !isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pl-11">
              {items.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    selectedItem === item.name
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => onItemClick && onItemClick(item.name)}
                >
                  {typeof item.icon === 'string' ? (
                    <div className="mr-2 h-4 w-4">
                      <Image 
                        src={item.icon} 
                        alt={item.name} 
                        width={16} 
                        height={16} 
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mr-2 text-blue-400">
                      {item.icon}
                    </div>
                  )}
                  <span>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavSection