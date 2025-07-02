"use client"

import { useState, useEffect } from "react"
import { Calendar, FileText, MapPin, Users, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../../styles/event-form.module.css"

export function EventForm({ event = null, categories }) {
  const router = useRouter()
  const isEditing = !!event

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    lugar: "",
    cupos: "",
    categoria_id: "",
  })

  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Datos de ejemplo de categorías (en producción vendrían de una API)

  // Si estamos editando, cargar los datos del evento
  useEffect(() => {
    if (event) {
      setFormData({
        nombre: event.nombre || "",
        descripcion: event.descripcion || "",
        fecha_inicio: event.fecha_inicio || "",
        fecha_fin: event.fecha_fin || "",
        lugar: event.lugar || "",
        cupos: event.cupos?.toString() || "",
        categoria_id: event?.categoria_id || "",
      })
    }
  }, [event])

  // Validar formulario
  useEffect(() => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupos, categoria_id } = formData
    const isValid =
      nombre.trim() !== "" &&
      descripcion.trim() !== "" &&
      fecha_inicio !== "" &&
      fecha_fin !== "" &&
      lugar.trim() !== "" &&
      cupos !== "" &&
      categoria_id !== ""
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
      const method = isEditing ? "PUT" : "POST" 
      const res = await fetch("/api/event", {
        method,
        body: JSON.stringify({ ...formData, id: event?.id || 0 })
      })

      if (res.status === 200) {
        alert(isEditing ? "Evento actualizado exitosamente!" : "Evento creado exitosamente!")
        return router.push("/dashboard/eventos")
      }
      alert("Ocurrio un error, intenta mas tarde")
    } catch (error) {
      alert(isEditing ? "Error al actualizar evento" : "Error al crear evento")
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
            Nombre del evento *
          </label>
          <div className={styles.inputContainer}>
            <Calendar className={styles.inputIcon} />
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Concierto de Rock, Conferencia Tech..."
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
              placeholder="Describe el evento, qué incluye, qué pueden esperar los asistentes..."
              className={styles.textarea}
              rows={4}
              required
            />
          </div>
        </div>

        {/* Fechas */}
        <div className={styles.dateGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="fecha_inicio" className={styles.label}>
              Fecha de inicio *
            </label>
            <div className={styles.inputContainer}>
              <Calendar className={styles.inputIcon} />
              <input
                type="datetime"
                id="fecha_inicio"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fecha_fin" className={styles.label}>
              Fecha de fin *
            </label>
            <div className={styles.inputContainer}>
              <Calendar className={styles.inputIcon} />
              <input
                type="datetime"
                id="fecha_fin"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Campo Lugar */}
        <div className={styles.inputGroup}>
          <label htmlFor="lugar" className={styles.label}>
            Lugar *
          </label>
          <div className={styles.inputContainer}>
            <MapPin className={styles.inputIcon} />
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleInputChange}
              placeholder="Ej: Teatro Principal, Centro de Convenciones..."
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Cupos y Categoría */}
        <div className={styles.numberGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="cupos" className={styles.label}>
              Cupos disponibles *
            </label>
            <div className={styles.inputContainer}>
              <Users className={styles.inputIcon} />
              <input
                type="number"
                id="cupos"
                name="cupos"
                value={formData.cupos}
                onChange={handleInputChange}
                placeholder="100"
                min="1"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="categoria_id" className={styles.label}>
              Categoría *
            </label>
            <div className={styles.inputContainer}>
              <Tag className={styles.inputIcon} />
              <select
                id="categoria_id"
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => router.push("/dashboard/eventos")}
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
                ? "Actualizar Evento"
                : "Crear Evento"}
          </button>
        </div>
      </form>
    </div>
  )
}
