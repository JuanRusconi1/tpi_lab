import { DashboardHeader } from "@/components/dashboard-header"
import { UserForm } from "@/components/admin-forms/user-form"
import styles from "../crear/page.module.css"
import { api } from "@/app/utils/api"
import { CategoryForm } from "@/components/admin-forms/category-form"

export default async function UpdateCategoryPage({ params }) {
  const category = await api.getCategoryById(params.id)
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.content}>
        <div className={styles.pageContent}>
          <div className={styles.formContainer}>
            <h1 className={styles.pageTitle}>Modificar Categoria</h1>
            <CategoryForm category={category}/>
          </div>
        </div>
      </div>
    </div>
  )
}