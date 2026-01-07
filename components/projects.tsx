
"use client"

import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowUpRight, Github, X, Calendar, Layers } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useMemo } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type Project = {
  title: string
  subtitle?: string
  description: string
  image: string
  tags: string[]
  link?: string
  content?: React.ReactNode
}

interface ProjectsProps {
  initialProjects?: Project[]
}

export function Projects({ initialProjects = [] }: ProjectsProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const projects = initialProjects.length > 0 ? initialProjects : []
  
  // TASK 1: Dynamic Scroll Calculation
  // ---------------------------------------------------------
  // Calculate the total scrollable height based on number of projects.
  // Less projects = shorter scroll track.
  // Base 150vh + 60vh per project gives a comfortable scroll velocity.
  const dynamicHeight = useMemo(() => {
    return `${100 + (projects.length * 60)}vh`
  }, [projects.length])

  // Calculate the horizontal offset. 
  // We assume each card is roughly 45vw + gap. 
  // We start at 10vw (padding) and end so the last card is fully visible.
  const xRangeEnd = useMemo(() => {
    if (projects.length <= 1) return "0vw";
    // Formula: -(Number of projects * Card Width) + Buffer to keep last card on screen
    return `-${(projects.length * 45) - 40}vw`
  }, [projects.length])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Map vertical scroll progress to horizontal translation in Viewport Width (vw)
  const x = useTransform(scrollYProgress, [0, 1], ["10vw", xRangeEnd])

  return (
    <div id="projects" className="relative bg-background">
      
      {/* --- DESKTOP SCROLL TRACK (Visible only on md+) --- */}
      <section 
        ref={targetRef} 
        className="hidden md:block relative"
        style={{ height: dynamicHeight }} // Dynamic Height
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Section Title - Stays fixed on left until pushed out */}
          <div className="absolute top-12 left-12 z-20 pointer-events-none mix-blend-difference text-white">
             <h2 className="text-6xl font-bold tracking-tighter mb-2">
               Selected <span className="opacity-50">Works</span>
             </h2>
             <p className="text-lg flex items-center gap-2 opacity-70">
               <span className="w-10 h-[1px] bg-white"></span>
               {projects.length} Projects
             </p>
          </div>

          {/* 
             THE MOVING TRAIN 
             Using w-max so it calculates width based on content, not percentage.
          */}
          <motion.div 
            style={{ x }} 
            className="flex gap-16 items-center w-max h-full pl-[5vw]"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
            
            {/* "More Coming Soon" Card */}
            <div className="h-[65vh] w-[30vw] shrink-0 flex items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 backdrop-blur-sm mr-[20vw]">
               <div className="text-center space-y-4 p-8">
                  <h3 className="text-3xl font-bold text-muted-foreground">Lab</h3>
                  <p className="text-base text-muted-foreground/60">More experiments in progress.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MOBILE LIST VIEW (Visible only on sm) --- */}
      <div className="block md:hidden py-20 px-6">
        <div className="mb-10">
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
             Selected <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground">
             A curation of data science projects and intelligent systems.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isMobile={true} />
          ))}
        </div>
      </div>

    </div>
  )
}

function ProjectCard({ project, index, isMobile = false }: { project: Project, index: number, isMobile?: boolean }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div 
                  className={`group relative overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/10 cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(var(--primary),0.3)]
                    ${!isMobile ? "h-[65vh] w-[45vw] shrink-0" : "h-[400px] w-full"}
                  `}
                >
                    {/* Image Background */}
                    <div className="absolute inset-0">
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="flex items-center justify-between mb-6">
                                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md px-3 py-1 text-xs lg:text-sm">
                                    0{index + 1}
                                </Badge>
                                <div className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>
                            
                            <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                                {project.title}
                            </h3>
                            
                            <p className="text-gray-300 line-clamp-2 text-sm lg:text-base mb-8 max-w-xl">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-xs font-mono text-white/80 bg-black/40 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="text-xs font-mono text-white/60 px-3 py-1.5 backdrop-blur-sm">+{project.tags.length - 3}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            {/* 
               TASK 2: Cinema Style Modal
               -------------------------------------------------
               Wide layout, huge image, glassmorphism, clean typography.
            */}
            <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden bg-black/80 backdrop-blur-2xl border-white/10 sm:rounded-3xl shadow-2xl z-[100] max-h-[90vh] flex flex-col">
                {/* 
                   Sticky Close Button (Z-Index high to sit over image) 
                */}
                <DialogClose className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white text-white hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-md">
                    <X className="w-6 h-6" />
                </DialogClose>

                <div className="overflow-y-auto no-scrollbar">
                    
                    {/* Hero Banner Section */}
                    <div className="relative w-full aspect-video md:h-[50vh]">
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay for text readability at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                             <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1">Featured Project</Badge>
                                <span className="text-white/60 text-sm font-mono flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> 2024
                                </span>
                             </div>
                             <DialogTitle className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none mb-2 drop-shadow-lg">
                                {project.title}
                             </DialogTitle>
                             {project.subtitle && <p className="text-xl text-zinc-300 font-medium">{project.subtitle}</p>}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 grid md:grid-cols-3 gap-12 bg-black/40">
                        
                        {/* Left Column: Metadata (1/3 width) */}
                        <div className="md:col-span-1 space-y-8">
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge 
                                            key={tag} 
                                            variant="secondary" 
                                            className="px-3 py-1.5 text-sm bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="flex flex-col gap-3">
                                {project.link && (
                                    <Button asChild size="lg" className="w-full bg-white text-black hover:bg-zinc-200 font-semibold h-12 text-base shadow-lg shadow-white/5">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            Live Demo <ArrowUpRight className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                )}
                                <Button asChild variant="outline" size="lg" className="w-full border-white/10 hover:bg-white/5 text-zinc-300 h-12 text-base">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 w-4 h-4" /> Source Code
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: Description (2/3 width) */}
                        <div className="md:col-span-2 space-y-6">
                            <DialogDescription className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                                {project.description}
                            </DialogDescription>
                            
                            <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
                                <p>
                                    This project was built to solve specific challenges in data processing. 
                                    It leverages modern architecture to ensure scalability and performance. 
                                    The focus was not just on code, but on delivering actionable insights through clean interfaces.
                                </p>
                                <p>
                                    Key challenges included optimizing query performance for large datasets and creating an 
                                    intuitive visualization layer that transforms raw numbers into a narrative.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
