"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { ghostLogin } from "@/app/actions/auth"
import { toast } from "sonner"

interface GhostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GhostModal({ isOpen, onClose }: GhostModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    const result = await ghostLogin(formData)
    
    if (result.success) {
      toast.success("Welcome back, Diaa.")
      // Force a hard navigation to ensure cookies are picked up immediately by middleware
      window.location.href = "/admin"
      onClose()
    } else {
      toast.error("Incorrect password.")
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/10 text-foreground sm:rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
            <Lock className="w-5 h-5 text-primary" />
            <span>Admin Access</span>
          </DialogTitle>
        </DialogHeader>
        
        <form action={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Input 
              name="password" 
              type="password" 
              placeholder="Enter Password"
              className="bg-background/50 border-white/10 focus-visible:ring-primary/50 text-center text-lg tracking-widest"
              autoFocus
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            {isLoading ? "Verifying..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}