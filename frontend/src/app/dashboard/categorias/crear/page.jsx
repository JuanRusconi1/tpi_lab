import { DashboardHeader } from "@/components/dashboard-header"
import { CategoryForm } from "@/components/admin-forms/category-form"
import styles from "./page.module.css"

export default function CreateCategoryPage() {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Crear Categoría</h1>
            <CategoryForm />
          </div>
        </div>
      </div>
    </div>
  )
}
