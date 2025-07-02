'use client'
import styles from '../styles/back-button.module.css'
import { ArrowLeft } from "lucide-react"

export default function BackButton () {
  const handleGoBack = () => {
    window.history.back()
  }
  return (
    <button onClick={handleGoBack} className={styles.backButton}>
      <ArrowLeft className={styles.backIcon} />
        Volver
    </button>

  )
}