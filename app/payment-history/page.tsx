"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface PaymentRecord {
  orderId: string
  amount: number
  plan: string
  creditsAdded: number
  date: string
}

export default function PaymentHistoryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }

    if (user) {
      fetchPaymentHistory()
    }
  }, [user, loading, router])

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/credits/payment-history`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch payment history")
      }

      const data = await response.json()
      setPaymentHistory(data.paymentHistory || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment History</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {paymentHistory.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-400">You haven't made any payments yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-6 text-left">Date</th>
                    <th className="py-4 px-6 text-left">Plan</th>
                    <th className="py-4 px-6 text-left">Amount</th>
                    <th className="py-4 px-6 text-left">Credits Added</th>
                    <th className="py-4 px-6 text-left">Order ID</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                      <td className="py-4 px-6">{format(new Date(payment.date), "MMM d, yyyy")}</td>
                      <td className="py-4 px-6">{payment.plan}</td>
                      <td className="py-4 px-6">₹{payment.amount.toLocaleString()}</td>
                      <td className="py-4 px-6">{payment.creditsAdded.toLocaleString()}</td>
                      <td className="py-4 px-6 text-gray-500">{payment.orderId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
