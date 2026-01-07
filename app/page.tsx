
import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { Journey } from "@/components/journey"
import { Certifications } from "@/components/certifications"
import { TechStack } from "@/components/tech-stack"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { getPortfolioData } from "@/app/actions/public"

// Force dynamic rendering so new DB entries appear on refresh
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { projects, certificates } = await getPortfolioData();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-20 lg:ml-64 transition-all duration-300 ease-in-out">
        <Hero />
        <Services />
        {/* Pass fetched data to components */}
        <Projects initialProjects={projects} />
        <Journey />
        <Certifications initialCertificates={certificates} />
        <TechStack />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}
