import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import styles from "./page.module.css"
import { api } from "./utils/api"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const events = await api.getActiveEvents()
  const categories = await api.getCategories()

  return (
    <div className={styles.container}>
      <Navbar />
      <HeroSection />
      <EventsSection events={events} categories={categories} />
    </div>
  )
}
