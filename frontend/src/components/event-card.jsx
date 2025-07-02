"use client"

import { Calendar, Users, GPS, MapPin } from "lucide-react"
import styles from "../styles/event-card.module.css"
import { dateToString } from "@/app/utils/transformDate"
import { useRouter } from "next/navigation"

export function EventCard({ event }) {
  const router = useRouter()
  const handleInscription = () => {
    router.push(`/evento/${event.id}`)
  }

  return (
    <div className={styles.eventCard}>

      {/* Información del evento - Lado derecho */}
      <div className={styles.contentContainer}>
        <div className={styles.eventInfo}>
          <h3 className={styles.eventTitle}>{event.nombre}</h3>

          <div className={styles.detailsContainer}>
            <div className={styles.detail}>
              <Users className={styles.detailIcon} />
              <span className={styles.detailText}>{event.cupos} cupos disponibles</span>
            </div>

            <div className={styles.detail}>
              <Calendar className={styles.detailIcon} />
              <span className={styles.detailText}>Inicio: {dateToString(event.fecha_inicio)}</span>
            </div>

            <div className={styles.detail}>
              <Calendar className={styles.detailIcon} />
              <span className={styles.detailText}>Fin: {dateToString(event.fecha_fin)}</span>
            </div>

            <div className={styles.detail}>
              <MapPin className={styles.detailIcon} />
              <span className={styles.detailText}>Ubicación: {event.lugar}</span>
            </div>
          </div>
        </div>

        <button onClick={handleInscription} className={styles.inscriptionButton}>
          Ver Evento
        </button>
      </div>
    </div>
  )
}
