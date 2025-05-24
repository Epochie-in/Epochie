"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { ChatMessage } from "@/components/grok/chat-message"
import { ChatInput } from "@/components/grok/chat-input"
import { ChatSidebar } from "@/components/grok/chat-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function GrokChatPage() {
  const { user, loading, error: authError, credits, useCredit } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; timestamp: Date }>>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [creditUsed, setCreditUsed] = useState<boolean>(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }

    // Fetch chat history
    if (user) {
      fetchChatHistory()
    }
  }, [user, loading, router])

  const fetchChatHistory = async () => {
    try {
      // This would be replaced with an actual API call
      setChatHistory([
        { id: "1", title: "Understanding quantum computing", timestamp: new Date() },
        { id: "2", title: "AI ethics discussion", timestamp: new Date() },
        { id: "3", title: "Space exploration technologies", timestamp: new Date() },
      ])
    } catch (err) {
      console.error("Failed to fetch chat history:", err)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Check if user has credits
    if (credits <= 0) {
      setError("You've run out of credits. Please purchase more to continue using Grok.")
      return
    }

    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)
    setError(null)

    try {
      // Use a credit
      setCreditUsed(await useCredit())

      if (!creditUsed) {
        throw new Error("Failed to use credit")
      }

      // In a real implementation, this would call your backend API
      // const response = await fetch('/api/grok/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user?.token}`
      //   },
      //   body: JSON.stringify({ prompt: content })
      // });

      // Simulate API call for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate response
      const grokResponse = {
        role: "assistant" as const,
        content: generateMockResponse(content),
      }

      setMessages((prev) => [...prev, grokResponse])
    } catch (err) {
      console.error("Failed to get Grok response:", err)
      setError("Failed to get a response from Grok. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleNewChat = () => {
    setMessages([])
    setSelectedChatId(null)
  }

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id)
    // In a real implementation, this would fetch the messages for the selected chat
    setMessages([
      { role: "user", content: "Tell me about " + chatHistory.find((chat) => chat.id === id)?.title.toLowerCase() },
      {
        role: "assistant",
        content:
          "I'd be happy to discuss " +
          chatHistory.find((chat) => chat.id === id)?.title.toLowerCase() +
          ". What specific aspects are you interested in?",
      },
    ])
  }

  // Mock response generator for demonstration
  const generateMockResponse = (prompt: string): string => {
    const responses = [
      `I understand you're asking about "${prompt}". This is a fascinating topic! Let me elaborate on a few key points...`,
      `Great question about "${prompt}"! Here's what I know based on my training data...`,
      `Regarding "${prompt}", there are several perspectives to consider. First, let's establish some context...`,
      `"${prompt}" is an interesting query. While I don't have real-time data, I can share what I know from my training...`,
      `I'd be happy to discuss "${prompt}". This is a topic with many dimensions to explore...`,
    ]
    return (
      responses[Math.floor(Math.random() * responses.length)] +
      "\n\nAs an AI assistant, I aim to provide helpful, harmonic, and accurate information. If you'd like to explore this topic further, please let me know what specific aspects interest you most."
    )
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-black pt-16">
      {/* Sidebar */}
      <div className="hidden md:block w-64 h-full">
        <ChatSidebar
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          selectedChatId={selectedChatId}
        />
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col h-full">
        {/* Credit warning */}
        {credits <= 0 && (
          <div className="bg-yellow-900/50 border-yellow-800 p-4 text-center">
            <p className="text-yellow-200 mb-2">You've run out of credits!</p>
            <Link href="/pricing">
              <Button className="rounded-full bg-white text-black hover:bg-gray-200">Purchase Credits</Button>
            </Link>
          </div>
        )}

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md text-center">
                <h2 className="text-2xl font-bold mb-2">Welcome to Grok</h2>
                <p className="text-gray-400 mb-4">
                  Ask me anything! I'm an AI assistant with a touch of humor and personality.
                </p>
                <p className="text-sm text-gray-500">
                  Each message uses 1 credit. You have {credits} credits remaining.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isLoading={isProcessing && index === messages.length - 1 && message.role === "user"}
                />
              ))}
              {isProcessing && <ChatMessage message={{ role: "assistant", content: "" }} isLoading={true} />}
            </div>
          )}
        </ScrollArea>

        {/* Error message */}
        {(error || authError) && (
          <Alert variant="destructive" className="mx-4 my-2 bg-red-900/50 border-red-800 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || authError}</AlertDescription>
          </Alert>
        )}

        <Separator className="bg-gray-800" />

        {/* Input area */}
        <div className="p-4 max-w-3xl mx-auto w-full">
          <ChatInput onSend={handleSendMessage} isLoading={isProcessing} />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Grok may produce inaccurate information about people, places, or facts.
            </p>
            <p className="text-xs text-gray-500">
              Credits remaining: <span className="font-bold">{credits}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
