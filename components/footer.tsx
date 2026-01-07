export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-sidebar py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Abdelrahman Mohamed Diaa</p>
        </div>
      </div>
    </footer>
  )
}
