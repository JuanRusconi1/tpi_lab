"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"
import styles from "../styles/register-form.module.css"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, email, password } = formData
    const isValid = name.trim() !== "" && email.trim() !== "" && password.trim() !== ""
    setIsFormValid(isValid)
  }, [formData])

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
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ 
          nombre: formData.name,
          email: formData.email, 
          password: formData.password ,
          rol: 'Cliente',
          id: 0
        })
      })

      const body = await res.json()

      if (res.status === 422) {
        return setError(prev => ({...prev, email: body.message }))
      }

      return push('/ingresar')
    } catch (error) {
      alert("Error al registrarse")
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
        <h1 className={styles.title}>Crear cuenta</h1>
        <p className={styles.subtitle}>Únete y descubre eventos increíbles</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo Nombre */}
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Nombre completo
          </label>
          <div className={styles.inputContainer}>
            <User className={styles.inputIcon} />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
              className={styles.input}
              required
            />
          </div>
        </div>

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
           {error?.email && <div className={styles.error}>* {error.email}</div>}
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
              placeholder="Crea una contraseña segura"
              className={styles.input}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggle}>
              {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
            </button>
          </div>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`${styles.submitButton} ${!isFormValid ? styles.submitButtonDisabled : ""}`}
        >
          {isLoading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      {/* Enlaces adicionales */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          ¿Ya tienes una cuenta?{" "}
          <a href="/ingresar" className={styles.link}>
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}
