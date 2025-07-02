import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { CategoriesTable } from "@/components/categories-table"
import styles from "./page.module.css"
import Link from "next/link"
import { api } from "@/app/utils/api"

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await api.getCategories()
  
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.layout}>
        <DashboardSidebar />
        <main className={styles.mainContent}>
          <div className={styles.content}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Gestión de Categorías</h1>
              <Link href="/dashboard/categorias/crear" className={styles.addButton}>
                Agregar Categoría
              </Link>
            </div>
            <CategoriesTable allCategories={categories} />
          </div>
        </main>
      </div>
    </div>
  )
}
