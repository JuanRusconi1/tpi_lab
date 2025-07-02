import { DashboardHeader } from "@/components/dashboard-header"
import { UserForm } from "@/components/admin-forms/user-form"
import styles from "./page.module.css"

export default function CreateUserPage() {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Crear Usuario</h1>
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  )
}