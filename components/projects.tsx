
"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Box, Zap } from "lucide-react"
import Image from "next/image"
import React, { useRef, useMemo } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Link from "next/link"

type Project = {
  id: string | number
  title: string
  subtitle?: string
  description: string
  image: string
  tags: string[]
  link?: string
}

interface ProjectsProps {
  initialProjects?: Project[]
}

export function Projects({ initialProjects = [] }: ProjectsProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const projects = initialProjects.length > 0 ? initialProjects : []
  
  const dynamicHeight = useMemo(() => {
    return `${projects.length * 80 + 100}vh`
  }, [projects.length])

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 75}%`])

  return (
    <div id="projects" className="relative bg-background">
      
      {/* --- DESKTOP STICKY SCROLL --- */}
      <section 
        ref={targetRef} 
        className="hidden md:block relative"
        style={{ height: dynamicHeight }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="absolute top-24 left-12 z-20">
             <h2 className="text-7xl font-black tracking-tighter text-white/5 uppercase select-none pointer-events-none">
               Portfolio <span className="text-white/10">Archive</span>
             </h2>
          </div>

          <motion.div 
            style={{ x }} 
            className="flex gap-20 px-[15vw] items-center"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            <div className="w-[20vw] shrink-0 h-1" />
          </motion.div>
        </div>
      </section>

      {/* --- MOBILE LIST VIEW --- */}
      <div className="block md:hidden py-24 px-6 space-y-12">
        <h2 className="text-5xl font-bold tracking-tighter uppercase">Selected <span className="text-primary italic">Works.</span></h2>
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isMobile={true} />
          ))}
        </div>
      </div>

    </div>
  )
}

function ProjectCard({ project, index, isMobile = false }: { project: Project, index: number, isMobile?: boolean }) {
    return (
        <Link href={`/work/${project.id}`} className="block outline-none">
            <motion.div 
              whileHover={isMobile ? {} : { y: -20, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-[3rem] bg-zinc-900 border border-white/5 cursor-pointer overflow-hidden transition-all duration-500
                ${!isMobile 
                    ? "h-[60vh] w-[48vw] shrink-0 hover:border-primary/60 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)]" 
                    : "w-full aspect-[16/10]" 
                }
              `}
            >
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-110 opacity-50 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <span className="text-primary font-mono text-[10px] font-black tracking-[0.5em] uppercase">Operation // 0{index + 1}</span>
                           <div className="h-px w-12 bg-primary/30 group-hover:w-20 transition-all duration-500" />
                        </div>
                        <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.8] max-w-2xl transition-transform group-hover:-translate-y-2 duration-500">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-zinc-500 group-hover:text-white transition-all pt-4">
                            <div className="size-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">View Dossier</span>
                        </div>
                    </div>
                </div>

                {/* Glassy overlay on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </Link>
    )
}
