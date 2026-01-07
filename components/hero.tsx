
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion as motionBase } from "framer-motion"
import HyperText from "@/components/HyperText";

const motion = motionBase as any

export function Hero() {
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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`min-h-screen flex items-center justify-center px-6 lg:px-12 py-32 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl w-full">
        {/* تم تغيير bg-card إلى glass-card */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-10 lg:p-20 relative z-10">
            <div className="flex flex-col justify-center space-y-8">
              <p className="text-sm uppercase tracking-wider text-primary font-medium">Abdelrahman Diaa</p>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
                <HyperText text="Data Scientist" />
                <br />
                <span className="text-primary">
                  <HyperText text="Building Toward AI" />
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
                Self-taught data scientist building the foundation for AI engineering. Background in GIS and remote
                sensing. Focused on solving real business problems with clarity and precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    onClick={scrollToProjects}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(242,138,73,0.3)]"
                  >
                    View Work
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToContact}
                    className="border-white/10 hover:bg-white/10 hover:border-primary/30 bg-transparent transition-all duration-500"
                  >
                    Contact
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent z-10" />
              <Image
                src="/me.jpg"
                alt="Diaa Shousha"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
