"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Tag, FileText } from "lucide-react"
import styles from "../styles/categories-table.module.css"

export function CategoriesTable({ allCategories }) {
  const router = useRouter()
  const [categories, setCategories] = useState(allCategories)

  const handleEditCategory = (categoryId) => {
    router.push(`/dashboard/categorias/${categoryId}`)
  }

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      fetch("/api/category", {
        method: "DELETE",
        body: JSON.stringify({ id: categoryId })
      }).then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            setCategories(categories.filter((category) => category.id !== categoryId))
            alert('Categoria eliminada!')
          }
        })
    }
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Tag className={styles.headerIcon} />
                  Nombre
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <FileText className={styles.headerIcon} />
                  Descripción
                </div>
              </th>
              <th className={styles.headerCell}>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {categories.map((category) => (
              <tr key={category.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryIcon}>
                      <Tag className={styles.iconTag} />
                    </div>
                    <span className={styles.categoryName}>{category.nombre}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.categoryDescription}>{category.descripcion}</span>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                      title="Editar categoría"
                    >
                      <Edit className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      title="Eliminar categoría"
                    >
                      <Trash2 className={styles.actionIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Información adicional */}
      <div className={styles.tableFooter}>
        <p className={styles.footerText}>Mostrando {categories.length} categorías</p>
      </div>
    </div>
  )
}
