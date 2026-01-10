
"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion as motionBase, AnimatePresence } from "framer-motion"
import { X, Bot, RefreshCcw, Cpu, Terminal, ShieldCheck, Zap } from "lucide-react"

const motion = motionBase as any

// --- THE REMASTERED SCRIPT (Tactical Edition) ---
const BOT_SCRIPT: Record<string, any> = {
  start: {
    message: "Identity verified. Neural Link established. I am Diaa’s Digital Proxy v1.0. I hold his tactical record and technical DNA. Which parameter should we analyze?",
    options: [
      { label: "🎯 Why Hire Diaa?", next: "hiring" },
      { label: "🌍 GeoAI & Spatial Intel", next: "gis" },
      { label: "⚔️ Tech Arsenal", next: "tech" },
      { label: "🚀 Future Trajectory", next: "vision" },
      { label: "📡 Contact Uplink", next: "contact" }
    ]
  },
  hiring: {
    message: "Diaa operates at the intersection of Data Science and Strategy. While others just train models, Diaa engineers ROI. He doesn't just write code; he solves business friction with mathematical precision.",
    options: [
      { label: "Check Arsenal", next: "tech" },
      { label: "↩️ Main Menu", next: "start" }
    ]
  },
  gis: {
    message: "Location is the new variable. With a specialized core in Remote Sensing & GIS, Diaa fuses spatial data with Machine Learning. He sees patterns where others only see maps. This is the power of GeoAI.",
    options: [
      { label: "Technical Stack", next: "tech" },
      { label: "↩️ Main Menu", next: "start" }
    ]
  },
  tech: {
    message: "Accessing Armory... Core: Python (The Engine). Intelligence: LLMs, RAG, Prompt Engineering. Spatial: ArcGIS, QGIS. Data Ops: PostgreSQL, Pandas. Status: Deployment Ready.",
    options: [
      { label: "Contact Protocols", next: "contact" },
      { label: "↩️ Main Menu", next: "start" }
    ]
  },
  vision: {
    message: "Trajectory locked: Evolving from Data Science to full-scale AI Architecture. The mission is to build intelligent systems that don't just compute, but think. You are inviting a future leader to your team.",
    options: [
      { label: "Why hire him?", next: "hiring" },
      { label: "↩️ Main Menu", next: "start" }
    ]
  },
  contact: {
    message: "Secure channel open. Direct Uplink: bdiaa248@gmail.com | Network: LinkedIn/Abdelrahman-Diaa | Latency: Near-zero. Expect a response within 12 neural cycles.",
    options: [
      { label: "Open LinkedIn", action: "https://www.linkedin.com/in/abdelrahman-diaa-080496334/" },
      { label: "Send Email", action: "mailto:bdiaa248@gmail.com" },
      { label: "↩️ Main Menu", next: "start" }
    ]
  }
}

export function ScriptedBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<{ type: 'bot' | 'user', text: string }[]>([])
  const [currentStep, setCurrentStep] = useState("start")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, isTyping])

  useEffect(() => {
    if (isOpen && history.length === 0) {
      triggerBotResponse("start")
    }
  }, [isOpen])

  const triggerBotResponse = (stepKey: string) => {
    setIsTyping(true)
    setTimeout(() => {
      if (BOT_SCRIPT[stepKey]) {
        setHistory(prev => [...prev, { type: 'bot', text: BOT_SCRIPT[stepKey].message }])
        setCurrentStep(stepKey)
      }
      setIsTyping(false)
    }, 800)
  }

  const handleOptionClick = (option: { label: string, next?: string, action?: string }) => {
    setHistory(prev => [...prev, { type: 'user', text: option.label }])
    if (option.action) {
      window.open(option.action, '_blank')
      setTimeout(() => triggerBotResponse(currentStep), 400)
    } else if (option.next) {
      triggerBotResponse(option.next)
    }
  }

  const resetChat = () => {
    setHistory([])
    triggerBotResponse("start")
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
      {/* --- Toggle Button --- */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        className="absolute bottom-20 right-0 pointer-events-auto size-14 rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(var(--primary),0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/20"
        aria-label="Activate Neural Proxy"
      >
        <Bot className="size-7" />
        <span className="absolute -top-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </motion.button>

      {/* --- Chat Window --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-0 right-0 pointer-events-auto w-[92vw] md:w-[400px] h-[580px] glass-card rounded-[2.5rem] flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 relative">
                  <Cpu className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-tight text-white uppercase">Neural Link v1.0</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={resetChat} className="p-2 text-zinc-500 hover:text-white transition-colors">
                  <RefreshCcw className="size-3.5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
                ref={scrollRef} 
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar scroll-smooth relative bg-black/20"
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                    backgroundSize: '100% 2px, 3px 100%'
                }}
            >
              {history.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.type === 'bot' 
                      ? 'bg-zinc-900 border border-white/5 text-zinc-200 rounded-tl-none' 
                      : 'bg-primary text-primary-foreground font-bold rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1.5">
                      <span className="size-1 bg-primary rounded-full animate-bounce" />
                      <span className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="size-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Interaction */}
            <div className="p-5 bg-black/60 border-t border-white/5 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {!isTyping && BOT_SCRIPT[currentStep].options.map((opt: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 flex items-center gap-2"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center justify-center pt-1 border-t border-white/5">
                <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
                    Intelligence Streamed By
                    </span>
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.1em] flex items-center gap-1">
                    <Zap className="size-2 fill-primary" /> Diaa Shousha
                    </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
