// components/PaymentOptions.tsx
'use client'

import { useState } from 'react'

interface PaymentOptionsProps {
  price: string
  onPaymentSuccess: () => void
}

export default function PaymentOptions({ price, onPaymentSuccess }: PaymentOptionsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: '/icons/paypal.png' },
    { id: 'gpay', name: 'GPay', icon: '/icons/gpay.png' },
    { id: 'cinetpay', name: 'CinetPay', icon: '/icons/cinetpay.png' },
    { id: 'card', name: 'Credit Card', icon: '/icons/card.png' },
  ]

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSuccess()
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select Payment Method</h4>
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <img src={method.icon} alt={method.name} className="h-6 w-6 mr-2" />
              <span>{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-500 dark:text-gray-400">Total Amount</span>
        <span className="text-xl font-bold text-gray-900 dark:text-white">{price}</span>
      </div>

      <button
        disabled={!selectedMethod}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          selectedMethod
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={handlePayment}
      >
        Complete Payment
      </button>
    </div>
  )
}