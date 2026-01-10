
"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, Database, FileText, Video, BrainCircuit, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

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
      icon: BrainCircuit,
      title: "AI Engineering",
      description: "Building intelligent systems with LLMs and custom ML models. Bridging the gap between theory and production-ready AI tools.",
      className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/20",
      highlight: true
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Extracting patterns from complex datasets and building actionable business insights.",
      className: "md:col-span-2",
    },
    {
      icon: Database,
      title: "Business Intelligence",
      description: "Connecting raw data to strategic decision-making with high-impact dashboards.",
      className: "md:col-span-1",
    },
    {
      icon: Video,
      title: "Tech Creation",
      description: "Sharing knowledge through video, breaking down complex engineering topics for the community.",
      className: "md:col-span-1",
    },
    {
      icon: FileText,
      title: "Technical Writing",
      description: "Documenting systems and making data findings accessible to all stakeholders.",
      className: "md:col-span-2",
    }
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             <Sparkles className="w-3 h-3" /> Core Capabilities
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-balance">
            Expertise <span className="text-primary">&</span> Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
            Advanced technical skillsets combined to solve modern business complexities.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={service.className}
              >
                <Card
                  className="glass-card group h-full p-8 md:p-10 cursor-pointer flex flex-col justify-between overflow-hidden relative"
                >
                  {service.highlight && (
                     <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BrainCircuit className="size-32" />
                     </div>
                  )}
                  
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500 border border-primary/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-bold mb-4 group-hover:text-primary transition-colors duration-500 ${service.highlight ? "text-3xl" : "text-xl"}`}>
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                        {service.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
                    <span>Explore Methodology</span>
                    <div className="h-px flex-1 bg-white/5 group-hover:bg-primary/40 transition-colors" />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
