import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/admin-forms/event-form"
import styles from "./page.module.css"
import { api } from "@/app/utils/api"

export const dynamic = 'force-dynamic'

export default async  function CreateEventPage() {
  const categories = await api.getCategories()
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Crear Evento</h1>
            <EventForm categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
