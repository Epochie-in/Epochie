"use client"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare, Settings } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  chatHistory: Array<{
    id: string
    title: string
    timestamp: Date
  }>
  onNewChat: () => void
  onSelectChat: (id: string) => void
  selectedChatId: string | null
}

export function ChatSidebar({ chatHistory, onNewChat, onSelectChat, selectedChatId }: ChatSidebarProps) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-900 border-r border-gray-800">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Grok Chat</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
      <Button
        onClick={onNewChat}
        className="mx-4 flex items-center justify-start gap-2 rounded-md bg-blue-600 hover:bg-blue-700"
      >
        <PlusCircle className="h-4 w-4" />
        New Chat
      </Button>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                selectedChatId === chat.id ? "bg-gray-800" : "hover:bg-gray-800",
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
