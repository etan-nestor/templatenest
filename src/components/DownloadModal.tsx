// components/DownloadModal.tsx
'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { X, Copy, Download as DownloadIcon } from 'lucide-react'
import PaymentOptions from './PaymentOptions'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    title: string
    gitCloneLink: string
    isPremium: boolean
    price: string
  }
}

export default function DownloadModal({ isOpen, onClose, template }: DownloadModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template.gitCloneLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {template.isPremium ? 'Purchase Template' : 'Download Template'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {template.isPremium ? (
                  <PaymentOptions 
                    price={template.price} 
                    onPaymentSuccess={() => {
                      // Handle successful payment
                      onClose()
                    }} 
                  />
                ) : (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        You're about to download <span className="font-medium text-gray-900 dark:text-white">{template.title}</span>
                      </p>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm font-mono text-gray-900 dark:text-gray-200 truncate mr-2">
                          {template.gitCloneLink}
                        </span>
                        <button
                          onClick={copyToClipboard}
                          className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <span className="text-green-500">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                      <a
                        href={template.gitCloneLink}
                        download
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={onClose}
                      >
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}