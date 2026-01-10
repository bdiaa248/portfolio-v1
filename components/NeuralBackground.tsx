
"use client"

import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false }) // Performance optimization
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 30 : 60 // Optimized density
    const connectionDistance = 140
    const mouse = { x: -1000, y: -1000 }

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      pulse: number; pulseSpeed: number;
      
      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.size = Math.random() * 1.5 + 0.5
        this.pulse = Math.random() * Math.PI
        this.pulseSpeed = 0.01 + Math.random() * 0.02
      }

      update(w: number, h: number) {
        this.x += this.vx
        this.y += this.vy
        this.pulse += this.pulseSpeed

        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }
    }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const draw = () => {
      // Manual background fill for better perf with alpha:false
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const isDiaa = theme === 'diaa-theme'
      const dotColor = isDiaa ? '59, 130, 246' : '249, 115, 22'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.update(canvas.width, canvas.height)
        
        const opacity = (Math.sin(p.pulse) + 1) / 2 * 0.3 + 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor}, ${opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distSq = dx * dx + dy * dy
          const limitSq = connectionDistance * connectionDistance

          if (distSq < limitSq) {
            ctx.beginPath()
            const linkOpacity = (1 - Math.sqrt(distSq) / connectionDistance) * 0.12
            ctx.strokeStyle = `rgba(${dotColor}, ${linkOpacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('resize', init)
    window.addEventListener('mousemove', handleMouseMove)
    init()
    draw()

    return () => {
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
