"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import Script from "next/script"
import dotenv from "dotenv"
dotenv.config()// Load environment variables

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PricingPage() {
  const { user, credits, updateCredits } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const router = useRouter()

  const handlePayment = async (plan: string, amount: number) => {
    if (!user) {
      router.push("/?signin=true")
      return
    }

    setIsLoading(true)
    setMessage({ type: "", text: "" })

    try {
      // Create order
      const response = await fetch("http://epochie.duckdns.org:5000/api/credits/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ plan, amount }),
        },
      ).catch((error) => {
        console.error("Error creating order:", error)
        setMessage({
          type: "error",
          text: "Failed to create order. Please try again later.",
        })
        setIsLoading(false)
        return null
      })
      if (!response) {
        return
      }
      console.log("Response from create-order:", response)
      const orderData = await response.json()

      if (!response.ok) {
        throw new Error(orderData.message || "Failed to create order")
      }

      console.log("hello: ",process.env.RAZORPAY_KEY_ID)
      // Initialize Razorpay
      const options = {
        key: "rzp_test_xsO2YXEJiNnEMm",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "x.ai",
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://epochie.duckdns.org:5000/api"}/credits/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  plan,
                }),
              },
            )

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.message || "Payment verification failed")
            }

            updateCredits(verifyData.credits)
            setMessage({ type: "success", text: verifyData.message })
          } catch (error) {
            setMessage({
              type: "error",
              text: error instanceof Error ? error.message : "Payment verification failed",
            })
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#3399cc",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to initiate payment",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-black text-white">
        {/* Header section */}
        <section className="container mx-auto pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
              Pricing
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Simple, transparent pricing for everyone. Choose the plan that works best for you.
            </p>
            {message.text && (
              <Alert
                variant={message.type === "error" ? "destructive" : "default"}
                className={
                  message.type === "error"
                    ? "bg-red-900/50 border-red-800 text-white mb-6"
                    : "bg-green-900/50 border-green-800 text-white mb-6"
                }
              >
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
            {user && (
              <div className="mb-8 text-center">
                <p className="text-lg">
                  You currently have <span className="font-bold text-xl">{credits}</span> credits
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing plans */}
        <section className="blue-gradient-middle py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Basic</h3>
                  <p className="text-gray-400 mb-4">For individuals and small projects</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹999</span>
                    <span className="text-gray-400 ml-2">/ month</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">2,000 credits included</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Access to Grok AI assistant</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Standard response time</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Basic support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>1 credit per generation</span>
                  </li>
                </ul>
                <Button
                  className="rounded-full bg-white text-black hover:bg-gray-200 w-full"
                  onClick={() => handlePayment("basic", 999)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Get Started"}
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-white text-black px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <p className="text-gray-400 mb-4">For professionals and teams</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹1,999</span>
                    <span className="text-gray-400 ml-2">/ month</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">3,000 credits included</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Priority response time</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Advanced features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  className="rounded-full bg-white text-black hover:bg-gray-200 w-full"
                  onClick={() => handlePayment("pro", 1999)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Get Started"}
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-400 mb-4">For large organizations</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹4,999</span>
                    <span className="text-gray-400 ml-2">/ month</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">5,000 credits included</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>SLA guarantees</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Custom training</span>
                  </li>
                </ul>
                <Button
                  className="rounded-full bg-white text-black hover:bg-gray-200 w-full"
                  onClick={() => handlePayment("enterprise", 4999)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Get Started"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "What are credits and how do they work?",
                  answer:
                    "Credits are used to generate content with our AI models. Each generation (like a chat message or API call) consumes 1 credit. When you run out of credits, you'll need to purchase more to continue using our services.",
                },
                {
                  question: "Do credits expire?",
                  answer: "No, your credits don't expire. They remain in your account until you use them.",
                },
                {
                  question: "Can I switch plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, debit cards, and UPI payments through Razorpay.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, all new users receive 10 free credits to try our services.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

      </div>
    </>
  )
}
