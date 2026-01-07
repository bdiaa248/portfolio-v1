
"use client"

import { Home, Briefcase, Code, Route, Award, Layers, Mail } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { GhostModal } from "@/components/admin-ghost-modal"

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRatiosRef = useRef<Map<string, number>>(new Map())
  
  // Ghost Trigger State
  const [clickCount, setClickCount] = useState(0)
  const [isGhostModalOpen, setIsGhostModalOpen] = useState(false)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Ghost Trigger Logic
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    
    // Reset count if user stops clicking for 2 seconds
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
        let id = element.id || element.getAttribute("id") || ""
        
        if (!id) {
          id = element.getAttribute("data-section-id") || ""
        }
        
        if (id && typeof id === "string" && id.trim().length > 0) {
          id = id.trim()
          
          if (entry.isIntersecting) {
            sectionRatiosRef.current.set(id, entry.intersectionRatio)
          } else {
            sectionRatiosRef.current.delete(id)
          }
        }
      })

      let maxRatio = 0
      let activeId = "home"

      sectionRatiosRef.current.forEach((ratio, id) => {
        if (ratio > maxRatio && id && id.trim().length > 0) {
          maxRatio = ratio
          activeId = id.trim()
        }
      })

      if (maxRatio > 0 && activeId) {
        setActiveSection(activeId)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = ["home", "services", "projects", "journey", "certifications", "tech-stack", "contact"]
    
    const observeSections = () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          if (element.id !== id) {
            element.id = id
          }
          observer.observe(element)
        }
      })
    }

    observeSections()

    const timeoutId1 = setTimeout(() => {
      observeSections()
    }, 100)
    
    const timeoutId2 = setTimeout(() => {
      observeSections()
    }, 500)

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      observer.disconnect()
    }
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <GhostModal isOpen={isGhostModalOpen} onClose={() => setIsGhostModalOpen(false)} />
      
      <aside className="glass fixed left-0 top-0 h-screen w-20 lg:w-64 border-r border-white/10 z-50 flex flex-col items-center lg:items-start py-8 px-4 transition-all duration-500">
        <div className="mb-12 flex flex-col items-center lg:items-start w-full space-y-3">
          <div 
            className="flex items-center justify-center lg:justify-start w-full cursor-pointer select-none"
            onClick={handleLogoClick}
          >
            <span className="text-2xl font-extrabold tracking-tighter text-primary transition-colors duration-500">DS.</span>
            <span className="hidden lg:block ml-3 text-lg font-semibold">Portfolio</span>
          </div>
          <span className="hidden lg:block text-sm text-muted-foreground">Abdelrahman Diaa</span>
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
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:-translate-y-0.5"
                }`}
              >
                <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-primary" : "group-hover:text-primary"}`} />
                <span className="hidden lg:block ml-3 text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="hidden lg:flex flex-col items-start w-full space-y-3 text-xs text-muted-foreground">
          <a
            href="https://www.linkedin.com/in/abdelrahman-diaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:opacity-70 transition-all duration-500 hover:translate-x-1"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/AbdelrahmanDiaa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:opacity-70 transition-all duration-500 hover:translate-x-1"
          >
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@DiaaShousha"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:opacity-70 transition-all duration-500 hover:translate-x-1"
          >
            YouTube
          </a>
        </div>
      </aside>
    </>
  )
}
