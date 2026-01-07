// TEST COMMIT
// TEST COMMIT
// TEST COMMIT

"use client"

import { useEffect, useState } from "react"
import { motion as motionBase, AnimatePresence } from "framer-motion"

const motion = motionBase as any

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('diaa-theme')

  useEffect(() => {
    setMounted(true)
    
    // Detect theme from HTML class
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
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 120)

    // Hide preloader after everything loads
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  // Theme configurations
  const themeConfig = {
    light: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #fafafa 100%)',
      primaryColor: '#f97316',
      secondaryColor: '#fb923c',
      textColor: '#1e293b',
      subtextColor: '#64748b',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      orbOpacity: 0.08,
    },
    dark: {
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      primaryColor: '#f97316',
      secondaryColor: '#fb923c',
      textColor: '#ffffff',
      subtextColor: '#9ca3af',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      orbOpacity: 0.08,
    },
    'diaa-theme': {
      background: 'linear-gradient(135deg, #0a0f24 0%, #141b3d 50%, #0a0f24 100%)',
      primaryColor: '#4f7cff',
      secondaryColor: '#6b93ff',
      textColor: '#ffffff',
      subtextColor: '#8b9dc3',
      glowColor: 'rgba(79, 124, 255, 0.25)',
      orbOpacity: 0.12,
    },
  }

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return null
  }

  const activeTheme = themeConfig[theme as keyof typeof themeConfig] || themeConfig['diaa-theme']

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: activeTheme.background,
          }}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0" style={{ opacity: 0.03 }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(${activeTheme.primaryColor}80 1px, transparent 1px), linear-gradient(90deg, ${activeTheme.primaryColor}80 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [activeTheme.orbOpacity, activeTheme.orbOpacity * 1.5, activeTheme.orbOpacity],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
              style={{ background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, transparent 70%)` }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [activeTheme.orbOpacity * 1.2, activeTheme.orbOpacity * 1.8, activeTheme.orbOpacity * 1.2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
              style={{ background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, transparent 70%)` }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-20 px-8 w-full max-w-3xl">
            
            {/* Logo and brand */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Logo mark */}
              <motion.div
                initial={{ scale: 0.8, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Outer glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${activeTheme.primaryColor}20 25%, transparent 50%, ${activeTheme.primaryColor}20 75%, transparent 100%)`,
                  }}
                />

                {/* Main logo container */}
                <div className="relative w-32 h-32 rounded-3xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${activeTheme.primaryColor}25 0%, ${activeTheme.primaryColor}15 100%)`,
                    border: `1px solid ${activeTheme.primaryColor}30`,
                    boxShadow: `0 20px 60px ${activeTheme.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                  }}
                >
                  <motion.svg
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={activeTheme.primaryColor}
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </motion.svg>

                  {/* Pulse effect */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: `2px solid ${activeTheme.primaryColor}99`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Brand text */}
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, letterSpacing: '0.5em' }}
                  animate={{ opacity: 1, letterSpacing: '0.1em' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-sm font-semibold tracking-[0.1em] uppercase"
                  style={{ color: `${activeTheme.primaryColor}cc` }}
                >
                  Portfolio
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl md:text-6xl font-bold tracking-tight"
                  style={{
                    color: activeTheme.textColor,
                  }}
                >
                  ABDELRAHMAN DIAA
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-base md:text-lg font-medium"
                  style={{ color: activeTheme.subtextColor }}
                >
                  Data Scientist • AI Engineer
                </motion.p>
              </div>
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="w-full max-w-lg space-y-5"
            >
              {/* Progress bar */}
              <div className="relative h-1.5 rounded-full overflow-hidden"
                style={{
                  background: theme === 'light' ? 'rgba(226, 232, 240, 0.6)' : 'rgba(30, 41, 59, 0.6)',
                  border: `1px solid ${activeTheme.primaryColor}20`,
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full relative"
                  style={{
                    background: `linear-gradient(90deg, ${activeTheme.primaryColor} 0%, ${activeTheme.secondaryColor} 100%)`,
                    boxShadow: `0 0 20px ${activeTheme.glowColor}`,
                  }}
                >
                  {/* Glowing edge */}
                  <div className="absolute right-0 top-0 w-12 h-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5))',
                    }}
                  />
                </motion.div>
              </div>

              {/* Status text */}
              <div className="flex items-center justify-between">
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-medium tracking-wide uppercase"
                  style={{ color: activeTheme.subtextColor }}
                >
                  Loading Experience
                </motion.span>
                
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xl font-bold font-mono tabular-nums"
                  style={{ color: activeTheme.primaryColor }}
                >
                  {Math.floor(Math.min(progress, 100))}%
                </motion.span>
              </div>
            </motion.div>

          </div>

          {/* Floating orbs */}
          {[
            { size: 4, x: 15, y: 20, duration: 8, delay: 0 },
            { size: 6, x: 85, y: 30, duration: 10, delay: 1 },
            { size: 3, x: 10, y: 70, duration: 12, delay: 2 },
            { size: 5, x: 90, y: 75, duration: 9, delay: 1.5 },
            { size: 4, x: 50, y: 10, duration: 11, delay: 0.5 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, activeTheme.orbOpacity * 2, 0],
                scale: [0, 1, 0],
                x: [`${orb.x}%`, `${orb.x + (Math.sin(i) * 5)}%`, `${orb.x}%`],
                y: [`${orb.y}%`, `${orb.y - 10}%`, `${orb.y}%`],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                delay: orb.delay,
                ease: "easeInOut"
              }}
              className="absolute rounded-full"
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                background: `radial-gradient(circle, ${activeTheme.primaryColor}cc 0%, transparent 70%)`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}