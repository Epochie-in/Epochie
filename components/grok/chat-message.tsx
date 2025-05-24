import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
  isLoading?: boolean
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  return (
    <div
      className={cn("flex items-start gap-4 py-4", message.role === "assistant" ? "bg-gray-900/30" : "bg-transparent")}
    >
      <Avatar className="mt-1">
        {message.role === "user" ? (
          <AvatarFallback className="bg-gray-700">
            <User className="h-4 w-4" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="bg-blue-600">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="font-semibold">{message.role === "user" ? "You" : "Grok"}</div>
        <div className="prose prose-invert max-w-none">
          {isLoading && message.role === "assistant" ? (
            <div className="flex items-center">
              <div className="animate-pulse flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
      </div>
    </div>
  )
}
