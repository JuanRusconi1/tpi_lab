"use client"

import { useState, useEffect } from "react"
import { Tag, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../../styles/category-form.module.css"

export function CategoryForm({ category = null }) {
  const router = useRouter()
  const isEditing = !!category

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Si estamos editando, cargar los datos de la categoría
  useEffect(() => {
    if (category) {
      setFormData({
        nombre: category.nombre || "",
        descripcion: category.descripcion || "",
      })
    }
  }, [category])

  // Validar formulario
  useEffect(() => {
    const { nombre, descripcion } = formData
    const isValid = nombre.trim() !== "" && descripcion.trim() !== ""
    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    try {
      const method = isEditing ? 'PUT' : 'POST'
      const res = await fetch("/api/category", {
        method,
        body: JSON.stringify({ ...formData, id: category?.id || 0 })
      })

      if (res.status === 200) {
        alert(isEditing ? "Categoría actualizada exitosamente!" : "Categoría creada exitosamente!")
        return router.push("/dashboard/categorias")
      }
      alert("Ocurrio un error")
    } catch (error) {
      console.error("Error:", error)
      alert(isEditing ? "Error al actualizar categoría" : "Error al crear categoría")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo Nombre */}
        <div className={styles.inputGroup}>
          <label htmlFor="nombre" className={styles.label}>
            Nombre de la categoría *
          </label>
          <div className={styles.inputContainer}>
            <Tag className={styles.inputIcon} />
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Conciertos, Teatro, Deportes..."
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Campo Descripción */}
        <div className={styles.inputGroup}>
          <label htmlFor="descripcion" className={styles.label}>
            Descripción *
          </label>
          <div className={styles.inputContainer}>
            <FileText className={styles.inputIcon} />
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe qué tipo de eventos incluye esta categoría..."
              className={styles.textarea}
              rows={4}
              required
            />
          </div>
        </div>

        {/* Botones */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => router.push("/dashboard/categorias")}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`${styles.submitButton} ${!isFormValid ? styles.submitButtonDisabled : ""}`}
          >
            {isLoading
              ? isEditing
                ? "Actualizando..."
                : "Creando..."
              : isEditing
                ? "Actualizar Categoría"
                : "Crear Categoría"}
          </button>
        </div>
      </form>
    </div>
  )
}
