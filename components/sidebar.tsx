
"use client"

import { Home, Briefcase, Code, Route, Award, Layers, Mail, Linkedin, Github, Youtube } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { GhostModal } from "@/components/admin-ghost-modal"

function MagneticIcon({ children, href, label }: { children: React.ReactNode, href: string, label: string }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

    function handleMouseMove(e: React.MouseEvent) {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set((e.clientX - centerX) * 0.4)
        mouseY.set((e.clientY - centerY) * 0.4)
    }

    function handleMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="p-3 rounded-xl hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors duration-300"
        >
            {children}
        </motion.a>
    )
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRatiosRef = useRef<Map<string, number>>(new Map())
  const [clickCount, setClickCount] = useState(0)
  const [isGhostModalOpen, setIsGhostModalOpen] = useState(false)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => setClickCount(0), 2000)
    if (clickCount + 1 >= 5) {
      setIsGhostModalOpen(true)
      setClickCount(0)
    }
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -70% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        let id = element.id || ""
        if (entry.isIntersecting) {
          sectionRatiosRef.current.set(id, entry.intersectionRatio)
        } else {
          sectionRatiosRef.current.delete(id)
        }
      })

      let maxRatio = 0
      let activeId = "home"
      sectionRatiosRef.current.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio
          activeId = id
        }
      })
      if (maxRatio > 0) setActiveSection(activeId)
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = ["home", "services", "projects", "journey", "certifications", "tech-stack", "contact"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "services", icon: Briefcase, label: "Capabilities" },
    { id: "projects", icon: Code, label: "Work" },
    { id: "journey", icon: Route, label: "Journey" },
    { id: "certifications", icon: Award, label: "Certifications" },
    { id: "tech-stack", icon: Layers, label: "Tech Stack" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <GhostModal isOpen={isGhostModalOpen} onClose={() => setIsGhostModalOpen(false)} />
      
      <aside className="glass fixed left-0 top-0 h-screen w-20 lg:w-64 border-r border-white/10 z-50 flex flex-col items-center lg:items-start py-8 px-4 transition-all duration-500">
        <div className="mb-12 flex flex-col items-center lg:items-start w-full space-y-3">
          <div 
            className="flex items-center justify-center lg:justify-start w-full cursor-pointer select-none"
            onClick={handleLogoClick}
            role="button"
          >
            <span className="text-2xl font-extrabold tracking-tighter text-primary">DS.</span>
            <span className="hidden lg:block ml-3 text-lg font-semibold uppercase tracking-tighter">Shousha</span>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-center lg:justify-start px-4 py-3 rounded-xl transition-all duration-700 group ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-[0_0_20px] shadow-primary/20 backdrop-blur-sm"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon className={`size-5 ${isActive ? "text-primary" : "group-hover:text-primary"}`} />
                <span className="hidden lg:block ml-3 text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* --- MAGNETIC DOCK --- */}
        <div className="mt-auto flex flex-col items-center lg:items-start w-full gap-2 border-t border-white/5 pt-6">
            <span className="hidden lg:block text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-2 px-4">Social Uplinks</span>
            <div className="flex flex-col lg:flex-row items-center gap-1">
                <MagneticIcon href="https://www.linkedin.com/in/abdelrahman-diaa-080496334/" label="LinkedIn">
                    <Linkedin className="size-5" />
                </MagneticIcon>
                <MagneticIcon href="https://github.com/AbdelrahmanDiaa" label="GitHub">
                    <Github className="size-5" />
                </MagneticIcon>
                <MagneticIcon href="https://www.youtube.com/@DiaaShousha" label="YouTube">
                    <Youtube className="size-5" />
                </MagneticIcon>
            </div>
        </div>
      </aside>
    </>
  )
}
