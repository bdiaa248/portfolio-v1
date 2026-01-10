
"use client"

import { useEffect, useState } from "react"
import { motion as motionBase, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

const motion = motionBase as any

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('diaa-theme')
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(true)
    
    const detectTheme = () => {
      if (typeof document !== 'undefined') {
        const html = document.documentElement
        if (html.classList.contains('light')) return 'light'
        if (html.classList.contains('dark')) return 'dark'
        if (html.classList.contains('diaa-theme')) return 'diaa-theme'
        return 'diaa-theme'
      }
      return 'diaa-theme'
    }

    setTheme(detectTheme())
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const step = prev < 30 ? Math.random() * 12 : Math.random() * 6;
        return prev + step
      })
    }, 100)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3200) 

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  const themeConfig = {
    light: {
      background: '#ffffff',
      primaryColor: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.2)',
      textColor: '#1e293b',
    },
    dark: {
      background: '#0a0a0a',
      primaryColor: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.2)',
      textColor: '#ffffff',
    },
    'diaa-theme': {
      background: '#050a18',
      primaryColor: '#4f7cff',
      glowColor: 'rgba(79, 124, 255, 0.25)',
      textColor: '#ffffff',
    },
  }

  if (!mounted) return null
  const activeTheme = themeConfig[theme as keyof typeof themeConfig] || themeConfig['diaa-theme']

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: activeTheme.background }}
        >
          {/* --- BACKGROUND ELEMENTS --- */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <motion.div 
              animate={{ y: [0, -60] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="w-full h-[200%]"
              style={{
                backgroundImage: `linear-gradient(${activeTheme.primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${activeTheme.primaryColor} 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                willChange: "transform"
              }}
            />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, transparent 70%)`,
                filter: isMobile ? 'blur(50px)' : 'blur(120px)',
                willChange: "transform, opacity"
              }}
            />
          </div>

          {/* --- LOGO CORE (DS ANIMATION) --- */}
          <div className="relative z-10 flex flex-col items-center gap-14 w-full max-w-sm px-10">
            
            <div className="relative">
              {/* Ripple Rings */}
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.15, 0], scale: [1, 2.2, 2.8] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 1.5,
                    ease: "easeOut" 
                  }}
                  className="absolute inset-0 rounded-[2.5rem] border border-primary/20 pointer-events-none"
                  style={{ borderColor: activeTheme.primaryColor }}
                />
              ))}

              {/* Logo Container */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-32 h-32 rounded-[2.5rem] flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* COMPOSITED ANIMATION: Using translateY instead of top */}
                <motion.div 
                   animate={{ y: ['-100%', '300%'] }}
                   transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-primary/10 to-transparent z-0"
                />

                {/* --- CUSTOM DS SVG --- */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-20 h-20 relative z-10"
                  fill="none"
                  stroke={activeTheme.primaryColor}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {/* Letter D */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                    d="M25 25 V75 C25 75 65 75 65 50 C65 25 25 25 25 25 Z"
                  />
                  {/* Letter S */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
                    d="M75 35 C75 25 45 25 45 40 C45 55 75 55 75 70 C75 85 45 85 45 75"
                  />
                </motion.svg>
              </motion.div>
            </div>

            {/* Brand Information */}
            <div className="text-center space-y-8 w-full">
              <div className="space-y-2">
                <motion.h1
                  initial={{ letterSpacing: "0.6em", opacity: 0, y: 10 }}
                  animate={{ letterSpacing: "0.15em", opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-4xl font-black tracking-tighter text-white"
                >
                  DIA<span className="text-primary">.</span>SHOUSHA
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1 }}
                  className="text-[9px] font-mono text-primary uppercase tracking-[0.4em]"
                >
                  Architecting Neural Solutions
                </motion.p>
              </div>

              {/* Progress Bar & Status */}
              <div className="relative max-w-[240px] mx-auto">
                <div className="h-[1.5px] w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                    className="h-full absolute left-0 top-0"
                    style={{ 
                      background: activeTheme.primaryColor,
                      boxShadow: `0 0 12px ${activeTheme.primaryColor}`,
                      willChange: "width"
                    }}
                  />
                </div>
                
                <div className="mt-5 flex justify-between items-center font-mono text-[8px] text-white/30 uppercase tracking-widest px-0.5">
                  <motion.span 
                    animate={{ opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Establishing Link...
                  </motion.span>
                  <span className="text-primary font-bold tabular-nums">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Version Footer */}
          <div className="absolute bottom-10 font-mono text-[7px] text-white/10 tracking-[0.8em] uppercase">
            Encrypted Session // Level 5 Admin
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
