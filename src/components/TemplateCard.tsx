// components/TemplateCard.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Template } from '@/services/templateService'
import PreviewModal from './PreviewModal'
import DownloadModal from './DownloadModal'

const TemplateCard = ({ template }: { template: Template }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)

  const hasImage = template.imageUrl && template.imageUrl.trim() !== ''

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      >

        <div className="relative h-48 overflow-hidden">
          {hasImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              <Image
                src={template.imageUrl}
                alt={template.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500 text-sm">No preview available</span>
            </div>
          )}

          {/* Badge */}
          <div className="absolute left-3 top-3 z-10">
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${template.isPremium
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
              {template.price}
            </span>
          </div>

          {/* Actions */}
          <div className="absolute inset-0 flex items-end justify-center opacity-0 transition-opacity hover:opacity-100">
            <div className="mb-4 flex w-full max-w-[90%] space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 items-center justify-center rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm hover:bg-white"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="mr-1 h-4 w-4" />
                Preview
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => setIsDownloadOpen(true)}
              >
                <Download className="mr-1 h-4 w-4" />
                Download
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {template.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {template.framework} • {template.category}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {template.rating.toFixed(1)} <span className="text-gray-400">({template.downloads})</span>
              </span>
            </div>

            <Link
              href={`/templates/${template.slug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View details
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={template.slug}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        template={{
          title: template.title,
          gitCloneLink: template.gitCloneLink,
          isPremium: template.isPremium,
          price: template.price
        }}
      />
    </>
  )
}

export default TemplateCard