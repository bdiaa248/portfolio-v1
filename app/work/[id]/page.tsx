
import { getProjectById } from "@/app/actions/public"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Terminal, Cpu, Layout, Layers, ShieldCheck, Zap, BarChart3, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import * as motion from "framer-motion/client"

export const dynamic = 'force-dynamic'

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  // Animation variants for staggering children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-background pb-32 selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      
      {/* --- TACTICAL NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2 font-bold uppercase tracking-widest text-[10px] group">
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" /> Back to Base
            </Button>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest leading-none">Security Level</span>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Level 5 Access</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest leading-none">Status</span>
                <span className="text-[10px] font-mono text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse" /> Deployed
                </span>
            </div>
          </div>
        </div>
      </nav>

      <motion.main 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 lg:px-12 pt-20"
      >
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- LEFT COLUMN: INTEL & ARCHITECTURE --- */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Header Section */}
            <motion.header variants={item} className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary font-black tracking-[0.6em] text-[10px] uppercase">
                  <Zap className="size-4 animate-pulse" /> Dossier ID // P-{project.id.toString().padStart(3, '0')}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter uppercase leading-[0.85] text-balance">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-primary italic block md:inline" : "text-white block md:inline"}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                {[
                  { label: "Operation Role", value: "Lead GeoAI Engineer", icon: ShieldCheck },
                  { label: "Core Logic", value: "Machine Learning", icon: Cpu },
                  { label: "Environment", value: "Spatial/Business", icon: Globe },
                  { label: "ROI Index", value: "High Precision", icon: BarChart3 },
                ].map((stat, i) => (
                  <div key={i} className="bg-background/40 backdrop-blur-md p-6 flex flex-col justify-between gap-4 group hover:bg-primary/5 transition-colors">
                    <stat.icon className="size-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    <div>
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-xs font-bold text-white uppercase tracking-tight">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.header>

            {/* The Mission Objective */}
            <motion.section variants={item} className="space-y-10">
               <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                    <Terminal className="size-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mission Objective</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
               </div>
               <div className="prose prose-invert max-w-none">
                  <p className="text-2xl md:text-4xl text-zinc-300 leading-[1.2] font-medium tracking-tight">
                    {project.description}
                  </p>
                  <div className="mt-12 space-y-6 text-lg text-zinc-500 leading-relaxed font-light">
                    <p>
                        The challenge demanded a high-fidelity fusion of geospatial intelligence and predictive modeling. 
                        Raw data streams were ingested from multiple disparate sources, normalized, and processed through a custom analytical pipeline designed for maximum ROI.
                    </p>
                  </div>
               </div>
            </motion.section>

            {/* The Engineering deep dive */}
            <motion.section variants={item} className="space-y-10">
               <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                  <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                    <Layers className="size-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Architecture</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
               </div>
               
               <div className="rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-950/80 backdrop-blur-2xl shadow-3xl group">
                  <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                           <div className="size-2 rounded-full bg-primary" /> core_processing.py
                        </span>
                    </div>
                  </div>
                  
                  <div className="p-8 md:p-12 font-mono text-sm md:text-base leading-relaxed overflow-x-auto bg-zinc-950">
                    <div className="flex gap-6">
                        <div className="hidden md:block text-zinc-800 text-right select-none border-r border-white/5 pr-6 space-y-1">
                            {Array.from({length: 8}).map((_, i) => <div key={i}>{i+1}</div>)}
                        </div>
                        <div className="space-y-1 min-w-max">
                            <div className="flex gap-2">
                                <span className="text-primary italic">def</span>
                                <span className="text-blue-400 font-bold">initialize_tactical_node</span>
                                <span className="text-zinc-500">(parameters):</span>
                            </div>
                            <div className="pl-8 text-zinc-500">
                                <span className="text-zinc-600"># Extract spatial features with deep learning</span>
                            </div>
                            <div className="pl-8 flex gap-2">
                                <span className="text-zinc-400">engine = AI_Engine.connect(</span>
                                <span className="text-orange-400">"GEO_CORE"</span>
                                <span className="text-zinc-400">)</span>
                            </div>
                            <div className="pl-8 mt-4">
                                <span className="text-primary italic">for</span>
                                <span className="text-zinc-400"> data </span>
                                <span className="text-primary italic">in</span>
                                <span className="text-zinc-400"> stream:</span>
                            </div>
                            <div className="pl-16 flex gap-2 text-zinc-300">
                                <span>output = model.predict(data, threshold=</span>
                                <span className="text-orange-400">0.985</span>
                                <span>)</span>
                            </div>
                            <div className="pl-16 flex gap-2">
                                <span className="text-primary italic">return</span>
                                <span className="text-zinc-400"> output.dispatch_roi()</span>
                            </div>
                            <div className="mt-4">
                                <span className="text-green-500/50"># Success: Neural uplink verified.</span>
                            </div>
                        </div>
                    </div>
                  </div>
               </div>
            </motion.section>
          </div>

          {/* --- RIGHT COLUMN: VISUAL INTEL & ACTIONS --- */}
          <motion.div 
            variants={item}
            className="lg:col-span-4 space-y-8"
          >
            <div className="sticky top-32 space-y-8">
                <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/30">
                <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden">
                    <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"
                    priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="p-8 md:p-10 space-y-10">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Layers className="size-3" /> Technical Arsenal
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string) => (
                            <Badge key={tag} className="bg-white/5 text-zinc-400 border-white/10 py-1.5 px-4 rounded-xl text-[10px] font-bold hover:bg-primary hover:text-white transition-all cursor-default">
                                {tag}
                            </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-4">
                    {project.link && (
                        <Button asChild className="w-full h-16 rounded-2xl bg-white text-black hover:bg-primary hover:text-white font-black transition-all shadow-xl group">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            INITIALIZE SOURCE <Github className="ml-2 size-5 group-hover:rotate-12 transition-transform" />
                        </a>
                        </Button>
                    )}
                    <Button variant="outline" className="w-full h-16 rounded-2xl border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-[10px] group">
                        DOWNLOAD DOSSIER <ExternalLink className="ml-2 size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    </div>
                </div>
                </div>

                {/* Engineer's Observation */}
                <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                   <div className="relative z-10 space-y-4">
                      <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Field Observation</h5>
                      <p className="text-base text-zinc-400 leading-relaxed italic font-medium">
                        "The primary objective was not just analytical accuracy, but human-readable strategic impact."
                      </p>
                      <div className="pt-4 flex items-center gap-4">
                         <div className="size-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-[10px] text-primary">DS</div>
                         <div>
                            <div className="text-[10px] font-bold text-white uppercase">Abdelrahman Diaa</div>
                            <div className="text-[8px] font-mono text-zinc-600 uppercase">Lead GeoAI Engineer</div>
                         </div>
                      </div>
                   </div>
                </div>
            </div>
          </motion.div>

        </div>
      </motion.main>
      
      {/* --- FOOTER BRANDING --- */}
      <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col items-center justify-center gap-6 text-center">
         <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-primary/20" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">Transmission Terminated</span>
            <span className="h-px w-10 bg-primary/20" />
         </div>
         <div className="text-4xl font-black text-white/5 select-none tracking-tighter uppercase">Abdelrahman <span className="text-primary/10">Diaa</span></div>
      </footer>
    </div>
  )
}
