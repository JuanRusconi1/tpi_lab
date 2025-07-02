import { DashboardHeader } from "@/components/dashboard-header"
import { EventForm } from "@/components/admin-forms/event-form"
import styles from "../crear/page.module.css"
import { api } from "@/app/utils/api"

export default async function UpdateEventPage({ params }) {
  const event = await api.getEventById(params.id)
  const categories = await api.getCategories()
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Modificar Evento</h1>
            <EventForm categories={categories} event={event} />
          </div>
        </div>
      </div>
    </div>
  )
}
