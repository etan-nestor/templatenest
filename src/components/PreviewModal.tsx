// components/PreviewModal.tsx
'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { X, ExternalLink, ArrowRight, AppWindow } from 'lucide-react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  previewUrl: string
}

export default function PreviewModal({ isOpen, onClose, previewUrl }: PreviewModalProps) {
  const [iframeBlocked, setIframeBlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [attemptCount, setAttemptCount] = useState(0)
  const [showFloatMenu, setShowFloatMenu] = useState(false)

  const getFullUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  const fullUrl = getFullUrl(previewUrl)

  useEffect(() => {
    if (!isOpen) {
      // Reset states when closing modal
      setAttemptCount(0)
      setIframeBlocked(false)
      setIsLoading(true)
      setShowFloatMenu(false)
      return
    }

    // Only attempt loading if not already blocked
    if (!iframeBlocked && attemptCount < 3) {
      const timer = setTimeout(() => {
        if (isLoading) {
          if (attemptCount < 2) {
            setAttemptCount(prev => prev + 1)
          } else {
            setIframeBlocked(true)
            setIsLoading(false)
          }
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, isLoading, attemptCount, iframeBlocked])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setIframeBlocked(false)
  }

  const handleIframeError = () => {
    if (attemptCount < 2) {
      setAttemptCount(prev => prev + 1)
    } else {
      setIframeBlocked(true)
      setIsLoading(false)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[95vw] h-[95vh] transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-0 text-left align-middle shadow-xl transition-all relative">

                {/* Floating action button */}
                <div className="absolute right-4 top-65 z-10">
                  <div className="relative">
                    <button
                      onClick={() => setShowFloatMenu(!showFloatMenu)}
                      className="rounded-full p-2 bg-white dark:bg-green-600 shadow-md hover:bg-orange-600 dark:hover:bg-orange-600 transition-colors"
                    >
                      <AppWindow className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    {showFloatMenu && (
                      <div className="absolute right-0 mt-2 w-10 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                        <button
                          onClick={() => window.open(fullUrl, '_blank')}
                          className="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-md flex justify-center"
                          title="Open in new tab"
                        >
                          <ExternalLink className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-md flex justify-center"
                          title="Close"
                        >
                          <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-full relative">
                  {isLoading && !iframeBlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="text-center">
                        <div className="animate-pulse text-gray-500 dark:text-gray-400 mb-2">
                          Loading attempt {attemptCount + 1} of 3...
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${33 * (attemptCount + 1)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {iframeBlocked && (
                    <div className="h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
                      <div className="mb-6 text-gray-600 dark:text-gray-300 max-w-md">
                        <div className="relative mb-8">
                          <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                            <ExternalLink className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                          </div>
                          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                            <div className="animate-bounce flex items-center">
                              <ArrowRight className="h-6 w-6 text-blue-500 mr-1" />
                              <span className="text-sm font-medium">Click below</span>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Direct Access Required</h3>
                        <p className="text-sm mb-4">
                          This website requires direct browser access for security reasons.
                        </p>
                        <button
                          onClick={() => window.open(fullUrl, '_blank')}
                          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open Website in New Tab
                        </button>
                      </div>
                    </div>
                  )}

                  {!iframeBlocked && (
                    <iframe
                      src={fullUrl}
                      className="w-full h-full border-0 rounded-lg"
                      title="Website Preview"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}