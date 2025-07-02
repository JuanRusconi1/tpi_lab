"use client"

import { useState, useEffect } from "react"
import { User, Mail, Lock, Shield, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../../styles/user-form.module.css"

export function UserForm({ user = null }) {
  const router = useRouter()
  const isEditing = !!user

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "Cliente",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const roles = ["Cliente", "Administrador"]

  // Si estamos editando, cargar los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        password: "",
        rol: user.rol,
      })
    }
  }, [user])

  // Validar formulario
  useEffect(() => {
    const { nombre, email, password, rol } = formData
    // todos los campos son obligatorios
    const isValid = nombre.trim() !== "" && email.trim() !== "" && password.trim() !== "" && rol.trim() !== ""
    setIsFormValid(isValid)

  }, [formData, isEditing])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    try {
      const method = isEditing ? "PUT" : "POST"
      const dataToSend = { ...formData }

      const res = await fetch("/api/user",{
        method,
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({ ...dataToSend, id: user?.id || 0 })
      })

      if (res.status === 422) {
        return alert("Este mail ya esta en uso, intenta con otro")
      }

      router.replace("/dashboard/usuarios")
      return router.refresh()

    } catch (error) {
      alert(isEditing ? "Error al actualizar usuario" : "Error al crear usuario")
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
            Nombre completo *
          </label>
          <div className={styles.inputContainer}>
            <User className={styles.inputIcon} />
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre completo"
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Campo Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico *
          </label>
          <div className={styles.inputContainer}>
            <Mail className={styles.inputIcon} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ejemplo@correo.com"
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Campo Contraseña */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Contraseña {isEditing ? "(dejar vacío para mantener actual)" : "*"}
          </label>
          <div className={styles.inputContainer}>
            <Lock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={isEditing ? "Nueva contraseña" : "Crea una contraseña segura"}
              className={styles.input}
              required={!isEditing}
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
            </button>
          </div>
        </div>

        {/* Campo Rol */}
        <div className={styles.inputGroup}>
          <label htmlFor="rol" className={styles.label}>
            Rol *
          </label>
          <div className={styles.inputContainer}>
            <Shield className={styles.inputIcon} />
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => {
              router.replace("/dashboard/usuarios")
              router.refresh()
            }}
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
                ? "Actualizar Usuario"
                : "Crear Usuario"}
          </button>
        </div>
      </form>
    </div>
  )
}