
"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])

  // نستخدم useScroll لتتبع السكرول داخل السكشن ده بس
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // تحويل نسبة السكرول إلى رقم المرحلة (Index)
  const milestones = useMemo(() => [
    {
      year: "2021",
      title: "The Genesis: Python",
      description:
        "My journey began with a single line of code. I dove into Python, learning the syntax, logic, and the immense power of automation. It wasn't just learning a language; it was learning how to think like a computer.",
      skills: ["Python Basics", "Scripting", "Problem Solving"],
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      year: "2022",
      title: "The University Era: GIS & Remote Sensing",
      description:
        "Entered university specializing in GIS and Remote Sensing. Here, I learned to see the world through data—analyzing satellite imagery and spatial patterns. This connected my coding skills to the physical world.",
      skills: ["ArcGIS", "QGIS", "Spatial Data", "Remote Sensing"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      year: "2023-2024",
      title: "The Analyst: Decoding Data",
      description:
        "Transitioned into pure Data Analytics. I mastered SQL for database management and Tableau for visualization. I built projects analyzing customer churn and business metrics, turning raw numbers into strategic insights.",
      skills: ["SQL", "Tableau", "Pandas", "Excel"],
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      year: "2025+",
      title: "The Future: AI Engineering",
      description:
        "Now, I am bridging the gap between Data Science and Software Engineering. I am building Machine Learning models and exploring LLMs, aiming to become a full-fledged AI Engineer who builds intelligent systems, not just models.",
      skills: ["Machine Learning", "Deep Learning", "LLMs", "AI Systems"],
      color: "from-purple-500/20 to-pink-500/20",
    },
  ], [])

  // تحديث المرحلة النشطة بناءً على السكرول
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // بنقسم السكرول لشرائح متساوية
      const step = 1 / milestones.length
      const newIndex = Math.min(
        Math.floor(latest / step),
        milestones.length - 1
      )
      setActiveIndex(newIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress, milestones.length])

  // خلفية متحركة (رقم السنة بيتحرك ببطء)
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacityBackground = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.1, 0.1, 0])

  // Return a stable placeholder if not mounted (hydration mismatch prevention)
  if (!mounted) {
    return <section ref={sectionRef} id="journey" className="h-[400vh] bg-background relative opacity-0" />
  }

  return (
    // السكشن ده طويل جداً (400vh) عشان يسمح بالسكرول براحتنا
    // المحتوى جواه هيكون Sticky
    <section 
      ref={sectionRef} 
      id="journey" 
      className="relative h-[400vh] bg-background"
    >
      {/* 
         FIX: Added bg-background here too for safety, 
         although sticky container is usually opaque by default if it fills screen.
         Added z-10 explicitly.
      */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 z-10 bg-background">
        
        {/* خلفية جمالية: السنة الحالية ضخمة جداً في الخلفية */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          style={{ y: yBackground, opacity: opacityBackground }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 0.05, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-[20vw] font-bold text-foreground leading-none tracking-tighter"
            >
              {milestones[activeIndex].year}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* العنوان الرئيسي للرحلة */}
        <div className="absolute top-10 lg:top-20 z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            My <span className="text-primary">Evolution</span>
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base">
            A timeline of continuous learning and growth.
          </p>
        </div>

        {/* المحتوى المتغير (الكروت) */}
        <div className="relative w-full max-w-4xl z-10 flex items-center justify-center h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* الجزء الشمال: السنة والخط */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
                  <div className="relative">
                    <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/0 font-mono tracking-tighter">
                      {milestones[activeIndex].year}
                    </span>
                    {/* خط ديكوري */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="h-1 bg-primary mt-2 ml-auto" 
                    />
                  </div>
                </div>

                {/* الجزء اليمين: التفاصيل - GLASS CARD HERE */}
                <div className="relative glass-card p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.2)]">
                  {/* تأثير التوهج الخلفي للكارت */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br -z-10 blur-xl transition-colors duration-700",
                    milestones[activeIndex].color
                  )} />
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                    {milestones[activeIndex].title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {milestones[activeIndex].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {milestones[activeIndex].skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/10"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* مؤشر التقدم (Progress Bar) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center">
          {milestones.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-500",
                index === activeIndex ? "bg-primary h-8 scale-110" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
