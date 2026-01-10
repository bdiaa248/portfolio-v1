
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Target } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion as motionBase } from "framer-motion"
import HyperText from "@/components/HyperText";

const motion = motionBase as any

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section ref={sectionRef} id="home" className={`min-h-screen flex items-center justify-center px-6 lg:px-12 py-32 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="max-w-7xl w-full">
        <div className="glass-card rounded-[3rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] border-white/5 group">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-10 lg:p-24 relative z-10">
            
            <div className="flex flex-col justify-center space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black tracking-[0.4em] text-[10px] uppercase">
                  <Target className="size-4" /> Abdelrahman Diaa // Diaa Shousha
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[0.85]">
                  <HyperText text="GEOAI" />
                  <br />
                  <span className="text-primary italic">
                    <HyperText text="ENGINEER" />
                  </span>
                </h1>
              </div>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-lg font-medium border-l-2 border-primary/20 pl-6">
                Bridging the gap between <span className="text-white">Spatial Intelligence</span> and <span className="text-white">AI Engineering</span>. Specializing in high-precision deployment.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={scrollToProjects} className="bg-primary hover:bg-primary/90 text-primary-foreground h-16 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-3">
                    PROJECT ARCHIVE <Zap className="size-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={scrollToContact} className="border-white/10 hover:bg-white/5 h-16 px-10 rounded-2xl text-lg font-bold text-zinc-400">
                    OPEN COMM CHANNEL
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="relative h-[450px] lg:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
              <Image
                src="/me.jpg"
                alt="Diaa Shousha Profile"
                fill
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
