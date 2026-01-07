
"use client"

import { Database, BarChart3, Map, FileSpreadsheet, TrendingUp, Code } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion as motionBase } from "framer-motion"

const motion = motionBase as any

export function TechStack() {
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

  const skills = [
    {
      name: "Python",
      description: "Pandas, NumPy",
      icon: Code,
      brandColor: "#3776AB",
      hoverColor: "#FFD43B",
    },
    {
      name: "SQL",
      description: "Relational Databases",
      icon: Database,
      brandColor: "#336791",
      hoverColor: "#4A90E2",
    },
    {
      name: "Tableau",
      description: "Data Storytelling",
      icon: BarChart3,
      brandColor: "#E97627",
      hoverColor: "#FF8C42",
    },
    {
      name: "ArcGIS / QGIS",
      description: "Spatial Analysis",
      icon: Map,
      brandColor: "#00B2FF",
      hoverColor: "#589632",
    },
    {
      name: "Excel",
      description: "Advanced Analysis",
      icon: FileSpreadsheet,
      brandColor: "#217346",
      hoverColor: "#1D6F42",
    },
    {
      name: "Data Visualization",
      description: "Visual Analytics",
      icon: TrendingUp,
      brandColor: "#6366F1",
      hoverColor: "#8B5CF6",
    },
  ]

  // Ensure ID is set on the ref element
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.id = "tech-stack"
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      data-section-id="tech-stack"
      className="py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-24 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold tracking-tight text-balance"
            variants={itemVariants}
          >
            Tech Stack & <span className="text-primary">Tools</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl text-pretty"
            variants={itemVariants}
          >
            Technologies and tools I use to transform data into insights and build analytical solutions.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                // Glass card class here
                className="glass-card group relative overflow-hidden rounded-xl p-6"
              >
                <div className="flex flex-col items-start space-y-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500 border border-white/10"
                    whileHover={{ scale: 1.1 }}
                    style={{
                      boxShadow: "0 0 0 rgba(0,0,0,0)",
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    >
                      <Icon
                        className="w-7 h-7 transition-all duration-500"
                        style={{
                          color: "rgb(161 161 170)",
                          filter: "grayscale(100%)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = "grayscale(0%)"
                          e.currentTarget.style.color = skill.brandColor
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = "grayscale(100%)"
                          e.currentTarget.style.color = "rgb(161 161 170)"
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-500">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--brand-color)]/5 via-transparent to-transparent"
                    style={{
                      background: `linear-gradient(to bottom right, ${skill.brandColor}08, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
