"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-40 px-6 lg:px-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
          Let's <span className="text-primary">Connect</span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          Open to opportunities in data science and analytics. Follow the journey as I build toward AI engineering.
        </p>

        <div className="flex flex-col items-center justify-center gap-5 pt-10">
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToProjects}
            className="border-border/50 hover:bg-primary/5 hover:border-primary/30 text-lg px-8 bg-transparent transition-all duration-700 hover:-translate-y-0.5"
          >
            View Projects
          </Button>
        </div>

        <div className="pt-16 space-y-4">
          <p className="text-lg text-foreground/90">bdiaa248@gmail.com</p>
          <a
            href="mailto:bdiaa248@gmail.com"
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-500 hover:underline underline-offset-4"
          >
            <Mail className="mr-2 w-4 h-4" />
            Send Email
          </a>
        </div>
      </div>
    </section>
  )
}
