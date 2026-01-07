"use client"

import { Card } from "@/components/ui/card"
import { Youtube, Linkedin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Testimonials() {
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

  const contentHighlights = [
    {
      icon: Youtube,
      title: "YouTube Content",
      description:
        "Teaching programming fundamentals and technical concepts. Explaining tools, frameworks, and engineering decisions. Creating content while learning and building.",
    },
    {
      icon: Linkedin,
      title: "Short-Form Content",
      description:
        "Breaking down complex technical topics into digestible formats. Sharing insights from projects and learning journey. Focus on clarity over production.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="content"
      className={`py-40 px-6 lg:px-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Content & <span className="text-primary">Teaching</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Sharing knowledge while building and learning. Content creation as a supporting skill.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {contentHighlights.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="group p-10 bg-card border-border/50 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)] hover:shadow-primary/10 transition-all duration-700 hover:-translate-y-1 cursor-pointer"
              >
                <Icon className="absolute top-8 right-8 w-16 h-16 text-primary/5 group-hover:text-primary/10 transition-colors duration-700" />

                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-700">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
