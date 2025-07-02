"use client"

import styles from "../styles/dashboard-header.module.css"

export function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Velia Administración</h1>
      </div>
    </header>
  )
}
