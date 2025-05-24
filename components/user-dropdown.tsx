"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Mail, Settings, LogOut, User, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/app/context/AuthContext"
import Link from "next/link"

interface UserDropdownProps {
  email: string
  onSignOut: () => void
}

export function UserDropdown({ email, onSignOut }: UserDropdownProps) {
  const [showSettings, setShowSettings] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Mail className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{email}</p>
              {user?.role === "admin" && <p className="text-xs text-gray-400">Administrator</p>}
            </div>
          </div>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
            <User className="mr-2 h-4 w-4" />
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
            <CreditCard className="mr-2 h-4 w-4" />
            <Link href="/payment-history">Payment History</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800" onClick={onSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
            <DialogDescription className="text-gray-400">
              Manage your account settings and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Account</h3>
              <div className="flex items-center justify-between rounded-lg border border-gray-800 p-3">
                <div className="space-y-0.5">
                  <p>Profile Information</p>
                  <p className="text-sm text-gray-400">Manage your personal details</p>
                </div>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Edit
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Preferences</h3>
              <div className="flex items-center justify-between rounded-lg border border-gray-800 p-3">
                <div className="space-y-0.5">
                  <p>Appearance</p>
                  <p className="text-sm text-gray-400">Customize the interface</p>
                </div>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-800 p-3">
                <div className="space-y-0.5">
                  <p>Notifications</p>
                  <p className="text-sm text-gray-400">Configure email notifications</p>
                </div>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
