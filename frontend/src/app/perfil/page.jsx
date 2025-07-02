import { Navbar } from "@/components/navbar"
import { ProfileInfo } from "@/components/profile-info"
import { EventsLists } from "@/components/events-lists"
import styles from "./page.module.css"
import BackButton from "@/components/back-button"
import { api } from "../utils/api"
import { separarEventosPorFecha } from "../utils/events"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const user = await api.getUser()
  const history = await api.getUserInscripciones()
  const allEvents = await api.getEvents()
  const mappedEvents = history.map((event) => ({...event, evento: allEvents.find(e => e.id === event.evento_id)}))
  const { pasados, futuros } = separarEventosPorFecha(mappedEvents)
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <BackButton />
        <div className={styles.profileLayout}>
          <ProfileInfo user={user}/>
          <EventsLists activeEvents={futuros} historyEvents={pasados}/>
        </div>
      </div>
    </div>
  )
}
