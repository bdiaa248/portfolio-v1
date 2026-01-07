
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, CheckCircle2, ShieldCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion as motionBase } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const motion = motionBase as any

interface Certificate {
  title: string
  issuer: string
  date: string
  skills: string[]
  description: string
  verifyUrl: string
  color: string
}

interface CertificationsProps {
  initialCertificates?: Certificate[]
}

export function Certifications({ initialCertificates = [] }: CertificationsProps) {
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

  const certifications = initialCertificates.length > 0 ? initialCertificates : []

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      id="certifications"
      className="py-40 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="space-y-4">
            <motion.h2
              className="text-4xl lg:text-6xl font-bold tracking-tight"
              variants={itemVariants}
            >
              Certified <span className="text-primary">Expertise</span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-xl"
              variants={itemVariants}
            >
              Official validations of my technical skills and continuous learning path.
            </motion.p>
          </div>
          
          <motion.div variants={itemVariants} className="hidden md:block">
             <div className="flex items-center gap-2 text-sm text-muted-foreground border border-white/10 px-4 py-2 rounded-full glass">
                <ShieldCheck className="w-4 h-4 text-green-500" /> 100% Verified Credentials
             </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {certifications.map((cert, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-1 transition-all duration-500 hover:border-primary/50 hover:bg-white/10">
                    {/* Glowing effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative h-full rounded-xl bg-background/40 backdrop-blur-xl p-6 flex flex-col justify-between gap-6">
                      
                      <div className="flex justify-between items-start">
                         <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.color || 'from-blue-500/20 to-cyan-500/20'} border border-white/10`}>
                            <Award className="w-6 h-6 text-foreground" />
                         </div>
                         <Badge variant="secondary" className="bg-background/50 border-white/10 backdrop-blur-sm text-[10px] uppercase tracking-wider">
                            {cert.date}
                         </Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                          {cert.issuer}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">View Credential</span>
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
                            <ExternalLink className="w-4 h-4" />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>

              {/* MODAL CONTENT */}
              <DialogContent className="glass border-white/10 max-w-2xl p-0 overflow-hidden sm:rounded-3xl">
                  <div className="relative">
                    {/* Header Background */}
                    <div className={`absolute inset-0 h-32 bg-gradient-to-r ${cert.color || 'from-primary/20 to-secondary/20'} opacity-30`} />
                    
                    <div className="relative p-8 pt-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-background/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
                           <Award className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                {cert.title}
                            </DialogTitle>
                            <p className="text-lg text-muted-foreground">
                                {cert.issuer}
                            </p>
                        </div>
                      </div>

                      <div className="bg-background/60 backdrop-blur-2xl rounded-2xl border border-white/5 p-6 space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium uppercase text-muted-foreground flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Verification
                            </h4>
                            <DialogDescription className="text-base text-foreground/90">
                                {cert.description || "This certification verifies proficiency in advanced data analytics techniques and tool usage."}
                            </DialogDescription>
                        </div>

                        {cert.skills && cert.skills.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium uppercase text-muted-foreground">Skills Earned</h4>
                                <div className="flex flex-wrap gap-2">
                                {cert.skills.map((skill) => (
                                    <Badge key={skill} variant="outline" className="px-3 py-1 bg-white/5 border-white/10">
                                    <CheckCircle2 className="w-3 h-3 mr-2 text-primary" />
                                    {skill}
                                    </Badge>
                                ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-4 flex justify-end">
                            <Button asChild className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                            <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                                Verify Authentic Credential <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                            </Button>
                        </div>
                      </div>
                    </div>
                  </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
