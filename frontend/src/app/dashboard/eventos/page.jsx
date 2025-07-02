import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { EventsTable } from "@/components/events-table"
import styles from "./page.module.css"
import Link from "next/link"
import { api } from "@/app/utils/api"

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const allEvents = await api.getEvents()

  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.layout}>
        <DashboardSidebar />
        <main className={styles.mainContent}>
          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Gestión de Eventos</h1>
              <Link href="/dashboard/eventos/crear" className={styles.addButton}>
                Agregar Evento
              </Link>
            </div>
            <EventsTable allEvents={allEvents} />
          </div>
        </main>
      </div>
    </div>
  )
}
