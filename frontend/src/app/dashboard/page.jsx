import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import styles from "./page.module.css"
import { api } from "../utils/api"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const totalEvents = await api.getCountAllEvent()
  const totalInscripciones = await api.getInscripcionesActivas()
  const promedioInscripciones = await api.getPromedioInscripciones()
  const idMasInscripciones = await api.getEventoMasInscriptos()
  const eventMasInscripciones = await api.getEventById(idMasInscripciones)
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.layout}>
        <DashboardSidebar />
        <main className={styles.mainContent}>
          <div className={styles.content}>
            <h1 className={styles.pageTitle}>Panel de Control</h1>
            <DashboardStats 
              totalEventos={totalEvents} 
              totalInscripciones={totalInscripciones} 
              promedioInscripciones={promedioInscripciones}
              eventoPopular={eventMasInscripciones?.nombre}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
