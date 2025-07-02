import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UsersTable } from "@/components/users-table"
import styles from "./page.module.css"
import { api } from "@/app/utils/api"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const users = await api.getUsers()

  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.layout}>
        <DashboardSidebar />
        <main className={styles.mainContent}>
          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Gestión de Usuarios</h1>
              <Link href={"/dashboard/usuarios/crear"} className={styles.addButton}>
                Agregar Usuario
              </Link>
            </div>
            <UsersTable allUsers={users || []} />
          </div>
        </main>
      </div>
    </div>
  )
}