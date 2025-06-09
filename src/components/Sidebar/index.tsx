'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Home, 
  Briefcase, 
  Palette, 
  HeartHandshake,
  Drill,
  Wheat,
  Hospital,
  BookOpen,
  Gem,
  CheckSquare,
  Cat,
  ChevronDown,
  Settings,
  
  Banknote,
  Building,
  BusFront,
  CalendarDays,
  Camera,
  Cpu,
  MapPin,
  Scissors,
  Utensils,
  Wrench
} from 'lucide-react'
import Image from 'next/image'
import NavSection from './NavSection'

interface SidebarProps {
  onFilterChange: (filters: {
    framework: string | null;
    category: string | null;
    isPremium: boolean | null;
  }) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const frameworks = [
  { name: 'React', icon: '/images/react-icon.png' },
  { name: 'Next.js', icon: '/images/nextjs-icon.png' },
  { name: 'Angular', icon: '/images/angularjs-icon.png' },
  { name: 'Vue', icon: '/images/vuejs-icon.png' },
  { name: 'Svelte', icon: '/images/sveltejs-icon.png' },
  { name: 'Astro', icon: '/images/astrojs-icon.png' },
  { name: 'React Native', icon: '/images/react-icon.png' },
  { name: 'Expo', icon: '/images/expo.png' },
  { name: 'SolidJS', icon: '/images/solidJS.png' },
  { name: 'Qwik', icon: '/images/qwik.png' },
  { name: 'Fastify', icon: '/images/fastify.png' },
  { name: 'Hapi.js', icon: '/images/hapi.png' },
  { name: 'Koa', icon: '/images/koa.png' },
  { name: 'AdonisJS', icon: '/images/Adonis.png' },
  { name: 'Flutter', icon: '/images/flutter.png' },
  { name: 'Remix', icon: '/images/remix.png' },
  { name: 'Blitz.js', icon: '/images/blitz.png' },
  { name: 'RedwoodJS', icon: '/images/redwood.png' },
  { name: 'Meteor', icon: '/images/meteor.png' },
  { name: 'Django', icon: '/images/django.png' },
  { name: 'Flask', icon: '/images/flask-icon.png' },
  { name: 'Nuxt.js', icon: '/images/nuxt.png' },
  { name: 'NestJS', icon: '/images/nest.png' },
  { name: 'Express.js', icon: '/images/express.png' },
  { name: 'Laravel', icon: '/images/laravel.png' },
  { name: 'Symfony', icon: '/images/symfony.png' },
  { name: 'Ruby on Rails', icon: '/images/rails.png' },
  { name: 'Spring Boot', icon: '/images/spring.png' },
  { name: 'Phoenix', icon: '/images/phonix.png' },
]

const categories = [
  { name: 'E-commerce', icon: <ShoppingCart className="h-4 w-4" /> },
  { name: 'Landing Page', icon: <Home className="h-4 w-4" /> },
  { name: 'Business', icon: <Briefcase className="h-4 w-4" /> },
  { name: 'Portfolio', icon: <Palette className="h-4 w-4" /> },
  { name: 'Humanitaire', icon: <HeartHandshake className="h-4 w-4" /> },
  { name: 'Mines', icon: <Drill className="h-4 w-4" /> },
  { name: 'Élevage', icon: <Cat className="h-4 w-4" /> },
  { name: 'Agriculture', icon: <Wheat className="h-4 w-4" /> },
  { name: 'Santé', icon: <Hospital className="h-4 w-4" /> },
  { name: 'Éducation', icon: <BookOpen className="h-4 w-4" /> },
  { name: 'Tourisme', icon: <MapPin className="h-4 w-4" /> },
  { name: 'Finance', icon: <Banknote className="h-4 w-4" /> },
  { name: 'Immobilier', icon: <Building className="h-4 w-4" /> },
  { name: 'Technologie', icon: <Cpu className="h-4 w-4" /> },
  { name: 'Transports', icon: <BusFront className="h-4 w-4" /> },
  { name: 'Événementiel', icon: <CalendarDays className="h-4 w-4" /> },
  { name: 'Mode & Beauté', icon: <Scissors className="h-4 w-4" /> },
  { name: 'Restauration', icon: <Utensils className="h-4 w-4" /> },
  { name: 'Médias', icon: <Camera className="h-4 w-4" /> },
  { name: 'Services', icon: <Wrench className="h-4 w-4" /> },
]


const Sidebar = ({ onFilterChange, isCollapsed, toggleCollapse }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showPremium, setShowPremium] = useState<boolean | null>(null)

  const handleFrameworkSelect = (framework: string) => {
    const newValue = selectedFramework === framework ? null : framework
    setSelectedFramework(newValue)
    onFilterChange({
      framework: newValue,
      category: selectedCategory,
      isPremium: showPremium
    })
  }

  const handleCategorySelect = (category: string) => {
    const newValue = selectedCategory === category ? null : category
    setSelectedCategory(newValue)
    onFilterChange({
      framework: selectedFramework,
      category: newValue,
      isPremium: showPremium
    })
  }

  const handleTypeSelect = (type: 'free' | 'premium') => {
    const newValue = type === 'premium' ? true : false
    setShowPremium(prev => prev === newValue ? null : newValue)
    onFilterChange({
      framework: selectedFramework,
      category: selectedCategory,
      isPremium: newValue
    })
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-full bg-gray-900 shadow-xl"
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">TemplateHub</h1>
          )}
          <button
            onClick={toggleCollapse}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            {isCollapsed ? (
              <ChevronDown className="h-5 w-5 rotate-90 transform" />
            ) : (
              <ChevronDown className="h-5 w-5 -rotate-90 transform" />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <div className="space-y-2 px-3">
            <motion.div
              whileHover={{ scale: isCollapsed ? 1.05 : 1 }}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isCollapsed ? 'justify-center' : ''
              } hover:bg-gray-800`}
            >
              <LayoutDashboard className="h-5 w-5 text-blue-400" />
              {!isCollapsed && <span className="ml-3 text-gray-200">Dashboard</span>}
            </motion.div>

            {/* Frameworks Section */}
            <NavSection
              title="Frameworks"
              items={frameworks.map(f => ({ name: f.name, icon: f.icon }))}
              isCollapsed={isCollapsed}
              isActive={activeSection === 'frameworks'}
              onToggle={() => toggleSection('frameworks')}
              onItemClick={handleFrameworkSelect}
              selectedItem={selectedFramework}
            />

            {/* Categories Section */}
            <NavSection
              title="Categories"
              items={categories.map(c => ({ name: c.name, icon: c.icon }))}
              isCollapsed={isCollapsed}
              isActive={activeSection === 'categories'}
              onToggle={() => toggleSection('categories')}
              onItemClick={handleCategorySelect}
              selectedItem={selectedCategory}
            />

            {/* Template Type Section */}
            <div className="space-y-1">
              <motion.div
                whileHover={{ scale: isCollapsed ? 1.05 : 1 }}
                className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isCollapsed ? 'justify-center' : 'justify-between'
                } ${activeSection === 'type' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                onClick={() => toggleSection('type')}
              >
                <div className="flex items-center">
                  <CheckSquare className="h-5 w-5 text-green-400" />
                  {!isCollapsed && <span className="ml-3 text-gray-200">Template Type</span>}
                </div>
                {!isCollapsed && (
                  <motion.div animate={{ rotate: activeSection === 'type' ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </motion.div>
                )}
              </motion.div>

              <AnimatePresence>
                {activeSection === 'type' && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 pl-11">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                          showPremium === false 
                            ? 'bg-blue-700 text-white' 
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                        onClick={() => handleTypeSelect('free')}
                      >
                        <span className="mr-2 text-green-400">✓</span>
                        <span>Free Templates</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                          showPremium === true 
                            ? 'bg-blue-700 text-white' 
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                        onClick={() => handleTypeSelect('premium')}
                      >
                        <Gem className="mr-2 h-4 w-4 text-yellow-400" />
                        <span>Premium Templates</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-800 p-4">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-700">
                  <Image src='/images/OpenNumeric.png' alt="Avatar" height={40} width={40} className="h-full w-full rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Open Numeric</p>
                  <p className="text-xs text-gray-400">contact@opennumeric.com</p>
                </div>
              </div>
              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-700"></div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar