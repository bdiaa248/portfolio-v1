
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Clock, MapPin, Download, Copy, Check, ShieldCheck, Zap } from "lucide-react"
import { toast } from "sonner"

export function CTA() {
  const [time, setTime] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { 
        timeZone: "Africa/Cairo", 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText("bdiaa248@gmail.com")
    setCopied(true)
    toast.success("Frequency Copied: bdiaa248@gmail.com")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-24 md:py-40 px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* --- Tactical Background Map --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full scale-150">
          <path d="M150,100 L200,120 L250,110 L300,150 L350,130 L400,180 L450,160 L500,200 L550,180 L600,220 L650,200 L700,240" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="400" cy="200" r="2" fill="var(--primary)" />
          <circle cx="400" cy="200" r="10" className="radar-ring" stroke="var(--primary)" fill="none" />
          <circle cx="400" cy="200" r="20" className="radar-ring" style={{ animationDelay: '0.5s' }} stroke="var(--primary)" fill="none" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16 space-y-4 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter uppercase">COMMAND <span className="text-primary italic">CENTER.</span></h2>
          <p className="text-muted-foreground text-sm md:text-lg font-mono uppercase tracking-widest">Awaiting Communication Uplink</p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Main Inquiry Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-card p-6 md:p-10 flex flex-col justify-between group"
          >
            <div className="space-y-6">
              <div className="size-12 md:size-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Zap className="size-5 md:size-6 text-primary animate-pulse" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight">Ready to architect <br className="hidden md:block" /><span className="text-primary">neural solutions?</span></h3>
              <p className="text-zinc-500 text-base md:text-lg max-w-md">Open for high-impact collaborations in Data Science, GeoAI, and Machine Learning.</p>
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={copyEmail}
                className="bg-primary text-primary-foreground h-14 md:h-16 px-6 md:px-8 rounded-2xl font-bold text-base md:text-lg gap-3 shadow-lg shadow-primary/20 flex-1 sm:flex-none"
              >
                {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                {copied ? "SIGNAL COPIED" : "COPY FREQUENCY"}
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-white/10 h-14 md:h-16 px-6 md:px-8 rounded-2xl font-bold text-base md:text-lg hover:bg-white/5 flex-1 sm:flex-none"
              >
                <a href="mailto:bdiaa248@gmail.com">DIRECT MAIL <Mail className="ml-2 size-5" /></a>
              </Button>
            </div>
          </motion.div>

          {/* Time & Location Container */}
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-2 md:gap-4 h-full">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                <Clock className="size-3" /> Local Ops Time
              </div>
              <div className="text-4xl md:text-5xl font-mono font-black text-primary tabular-nums tracking-tighter flex overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={time}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {time || "00:00:00"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cairo_Node // Egypt</div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-2 md:gap-4 h-full">
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                <MapPin className="size-3" /> Target Coordinates
              </div>
              <div className="text-xl md:text-2xl font-mono font-bold text-white tracking-tight leading-tight">
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  30.0444° N <br /> 31.2357° E
                </motion.span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] font-bold uppercase mt-1">
                <span className="size-1.5 rounded-full bg-green-500 animate-ping" /> Signal Stable
              </div>
            </motion.div>
          </div>

          {/* CV & Status Grid */}
          <motion.div whileHover={{ y: -5 }} className="glass-card p-6 md:p-8 flex flex-col justify-between bg-primary/5 border-primary/20 min-h-[160px]">
             <div className="space-y-2">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">System Status</div>
                <div className="text-xl md:text-2xl font-bold">Online & <br />Training Models</div>
             </div>
             <div className="text-[10px] font-mono text-zinc-600 flex items-center gap-2 uppercase tracking-widest mt-4">
                Pulse: Stable <Zap className="size-3 text-primary animate-pulse" />
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 glass-card p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between group overflow-hidden gap-6"
          >
            <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                <div className="size-14 md:size-16 rounded-[1.5rem] md:rounded-[2rem] bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-7 md:size-8 text-zinc-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                    <h4 className="text-lg md:text-xl font-bold truncate max-w-[200px] sm:max-w-none">Diaa_Credential_v1.pdf</h4>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Encrypted // 2.4 MB</p>
                </div>
            </div>
            <Button size="lg" className="rounded-2xl h-14 px-8 w-full sm:w-auto bg-white text-black hover:bg-primary hover:text-white transition-all font-bold shadow-xl">
                DOWNLOAD <Download className="ml-2 size-4" />
            </Button>
          </motion.div>

        </div>

        <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest text-center md:text-left">Protocol: Secure Encryption Enabled</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] md:tracking-[0.5em] text-center">
                End of Transmission
            </div>
        </div>
      </div>
    </section>
  )
}
