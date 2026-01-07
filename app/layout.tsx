
import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"
import { MouseSpotlight } from "@/components/MouseSpotlight"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Preloader } from "@/components/preloader"

export const metadata: Metadata = {
  title: "AI Engineer & Tech Creator | Portfolio",
  description:
    "Crafting intelligent systems and innovative digital experiences. Specializing in AI, ML, and full-stack development.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={["light", "dark", "diaa-theme"]}
        >
          {/* 👇 الـ Preloader في الأول خالص عشان يظهر قبل أي حاجة */}
          <Preloader />
          
          <MouseSpotlight />
          
          <SmoothScroll>
            {children}
          </SmoothScroll>
          
          <Analytics />
          
          <div className="fixed bottom-5 right-5 z-50">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
