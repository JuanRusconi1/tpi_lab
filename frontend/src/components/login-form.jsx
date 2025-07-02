"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import styles from "../styles/login-form.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { push } = useRouter()
  // Validar formulario cada vez que cambien los datos
  useEffect(() => {
    const { email, password } = formData
    const isValid = email.trim() !== "" && password.trim() !== ""
    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error?.message) setError({})
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsLoading(true)

    // Simular llamada a API
    try {
      const res = await fetch('/api/login', { 
        method: 'POST',
        body: JSON.stringify({ username: formData.email, password: formData.password}) 
      })
      if (res.status === 401) {
        return setError({ message: 'Credenciales Invalidas' })
      }
      const json = await res.json()
      return push(json.redirect)
    } catch (error) {
      alert("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image width={100} height={100} src="/logo.png?height=100&width=200" alt="Logo Velia" className={styles.logo} />
      </div>

      {/* Título */}
      <div className={styles.header}>
        <h1 className={styles.title}>Iniciar sesión</h1>

      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo electrónico
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
            Contraseña
          </label>
          <div className={styles.inputContainer}>
            <Lock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Ingresa tu contraseña"
              className={styles.input}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
            </button>
          </div>
        </div>

        {/* Enlace "¿Olvidaste tu contraseña?" */}
        {/* <div className={styles.forgotPassword}>
          <a href="/recuperar-contraseña" className={styles.forgotLink}>
            ¿Olvidaste tu contraseña?
          </a>
        </div> */}

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`${styles.submitButton} ${!isFormValid ? styles.submitButtonDisabled : ""}`}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
        {error?.message && <div className={styles.errorMessage}>* {error.message}</div>}
      </form>

      {/* Enlaces adicionales */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          ¿No tienes una cuenta?{" "}
          <a href="/registrarme" className={styles.link}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  )
}
