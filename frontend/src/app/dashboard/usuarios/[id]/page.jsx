import { DashboardHeader } from "@/components/dashboard-header"
import { UserForm } from "@/components/admin-forms/user-form"
import styles from "../crear/page.module.css"
import { api } from "@/app/utils/api"

export default async function UpdateUserPage({ params }) {
  const user = await api.getUser(params.id)
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Modificar Usuario</h1>
            <UserForm user={user}/>
          </div>
        </div>
      </div>
    </div>
  )
}