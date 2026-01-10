
export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-sidebar py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase">© {new Date().getFullYear()} Abdelrahman Diaa</p>
          <p className="text-[10px] text-zinc-600 font-mono tracking-[0.3em]">GEOSPATIAL AI ENGINEER</p>
        </div>
      </div>
    </footer>
  )
}
