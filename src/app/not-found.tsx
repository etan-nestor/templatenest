'use client';

import { motion } from 'framer-motion';
import { Home, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Predefined configurations for animations
  const floatingElements = [
    { size: 180, x: 15, y: 20, color: 'bg-blue-600' },
    { size: 220, x: 80, y: 5, color: 'bg-blue-700' },
    { size: 150, x: 30, y: 60, color: 'bg-blue-500' },
    { size: 200, x: 70, y: 30, color: 'bg-blue-600' },
    { size: 170, x: 40, y: 10, color: 'bg-blue-700' },
    { size: 190, x: 60, y: 50, color: 'bg-blue-500' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      {/* Animated elegant background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
      </div>

      {/* Floating elements - Client only */}
      {isMounted && floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${el.color} opacity-10`}
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, i % 2 === 0 ? -30 : 30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        {/* 404 Animation - Client only */}
        {isMounted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                y: [0, -25, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            >
              <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                <motion.path
                  d="M100 20C144.2 20 180 55.8 180 100C180 144.2 144.2 180 100 180C55.8 180 20 144.2 20 100C20 55.8 55.8 20 100 20Z"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                />
                <motion.text
                  x="100"
                  y="115"
                  textAnchor="middle"
                  fill="#F27438"
                  fontSize="90"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  404
                </motion.text>
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <div className="mb-12">
            <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
              <path
                d="M100 20C144.2 20 180 55.8 180 100C180 144.2 144.2 180 100 180C55.8 180 20 144.2 20 100C20 55.8 55.8 20 100 20Z"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text x="100" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="90" fontWeight="bold">
                404
              </text>
            </svg>
          </div>
        )}

        {/* Title and text */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4">
            Oops! Page Not Found
          </h1>
          <p className="max-w-md mx-auto text-lg text-blue-200 md:text-xl">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Return button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 gap-x-3 hover:gap-x-4 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Home size={20} />
            Return to Home
          </Link>
        </motion.div>

        {/* Contact information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isMounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm text-blue-300"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4 md:gap-8">
            <a
              href="tel:+22665033742"
              className="flex items-center gap-2 px-4 py-2 transition-all rounded-lg hover:text-white hover:bg-blue-900/30"
            >
              <Phone size={18} />
              +226 65 03 37 42
            </a>
            <a
              href="mailto:contact@opennumeric.com"
              className="flex items-center gap-2 px-4 py-2 transition-all rounded-lg hover:text-white hover:bg-blue-900/30"
            >
              <Mail size={18} />
              contact@opennumeric.com
            </a>
          </div>
          <div className="text-blue-400">
            © {new Date().getFullYear()} OpenNumeric. All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;