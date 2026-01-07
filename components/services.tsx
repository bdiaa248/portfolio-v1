
"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, Database, FileText, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Services() {
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

  const services = [
    {
      icon: BarChart3,
      title: "Data Analysis",
      description:
        "Extracting patterns from complex datasets. Identifying trends and building insights that inform business decisions. Focus on clarity and actionable recommendations.",
    },
    {
      icon: Database,
      title: "Business Analytics",
      description:
        "Connecting data to real-world problems. Experience analyzing customer behavior, revenue drivers, and operational efficiency with a focus on measurable impact.",
    },
    {
      icon: FileText,
      title: "Technical Communication",
      description:
        "Explaining complex concepts in plain language. Bridging the gap between technical findings and stakeholder understanding. Making data accessible.",
    },
    {
      icon: Video,
      title: "Content Creation",
      description:
        "Teaching programming and technical concepts through video content. Sharing what I learn while building projects. Focused on clarity over production value.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`py-40 px-6 lg:px-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            What I <span className="text-primary">Do</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Skills built through consistent practice and applied to real problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="glass-card group p-10 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-700 group-hover:shadow-[0_0_20px_rgba(242,138,73,0.2)] border border-primary/10">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
