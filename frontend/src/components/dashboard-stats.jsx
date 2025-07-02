"use client"

import { Calendar, Users, TrendingUp, Award } from "lucide-react"
import styles from "../styles/dashboard-stats.module.css"

export function DashboardStats({ totalEventos, totalInscripciones, promedioInscripciones, eventoPopular }) {
  const stats = [
    {
      title: "Total de Eventos",
      value: totalEventos || 0,
      description: "Eventos activos",
      icon: Calendar,
      color: "blue",
    },
    {
      title: "Inscripciones Activas",
      value: totalInscripciones || 0,
      description: "Usuarios inscriptos",
      icon: Users,
      color: "green",
    },
    {
      title: "Promedio por Evento",
      value: promedioInscripciones || 0,
      description: "Usuarios por evento",
      icon: TrendingUp,
      color: "orange",
    },
    {
      title: "Evento Más Popular",
      value: eventoPopular || 'Sin eventos populares',
      description: "",
      icon: Award,
      color: "purple",
    },
  ]

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`${styles.statCard} ${styles[stat.color]}`}>
              <div className={styles.statHeader}>
                <div className={styles.statIconContainer}>
                  <Icon className={styles.statIcon} />
                </div>
              </div>

              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statTitle}>{stat.title}</p>
                <p className={styles.statDescription}>{stat.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
