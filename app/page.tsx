import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { CodingActivity } from "@/components/coding-activity"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <CodingActivity />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
