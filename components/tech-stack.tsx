
"use client"

import { Database, BarChart3, Map, FileSpreadsheet, TrendingUp, Code, Brain, Terminal, Cpu } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const stackGroups = [
    {
      title: "Intelligence & Logic",
      icon: Brain,
      items: [
        { name: "Python", desc: "Pandas, ML, LLMs", icon: Code, color: "#3776AB" },
        { name: "Prompt Eng.", desc: "System Design", icon: Terminal, color: "#4f7cff" }
      ],
      className: "md:col-span-2"
    },
    {
      title: "Data Engineering",
      icon: Database,
      items: [
        { name: "SQL", desc: "Architecture", icon: Database, color: "#336791" },
        { name: "PostgreSQL", desc: "Storage", icon: Cpu, color: "#336791" }
      ],
      className: "md:col-span-1"
    },
    {
      title: "Visualization",
      icon: TrendingUp,
      items: [
        { name: "Tableau", desc: "Storytelling", icon: BarChart3, color: "#E97627" },
        { name: "D3.js", desc: "Interactive", icon: Sparkles, color: "#F97316" }
      ],
      className: "md:col-span-1"
    },
    {
      title: "Spatial Intelligence",
      icon: Map,
      items: [
        { name: "ArcGIS", desc: "GIS Analysis", icon: Map, color: "#00B2FF" },
        { name: "QGIS", desc: "Spatial Ops", icon: Map, color: "#589632" }
      ],
      className: "md:col-span-2"
    },
    {
        title: "Analytics Core",
        icon: FileSpreadsheet,
        items: [
          { name: "Excel", desc: "Deep Modeling", icon: FileSpreadsheet, color: "#217346" }
        ],
        className: "md:col-span-2"
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight">
            The <span className="text-primary">Ecosystem.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A specialized stack curated for data intelligence and engineering scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stackGroups.map((group, gIdx) => (
            <div key={gIdx} className={group.className}>
              <div className="glass-card p-8 rounded-[2rem] h-full border-white/5 hover:border-primary/20 transition-all flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary">
                        <group.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{group.title}</span>
                </div>

                <div className="space-y-6">
                    {group.items.map((skill, sIdx) => (
                        <div key={sIdx} className="group/skill flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-all group-hover/skill:scale-110 group-hover/skill:border-primary/40">
                                <skill.icon className="w-5 h-5 text-zinc-400 group-hover/skill:text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-zinc-200 group-hover/skill:text-white transition-colors">{skill.name}</h4>
                                <p className="text-xs text-zinc-500 font-mono">{skill.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Sparkles(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    )
  }
