"use client"
import { Calendar, Users, MapPin } from "lucide-react"
import styles from "../styles/event-detail.module.css"
import BackButton from "./back-button"
import { dateToString } from "@/app/utils/transformDate"
import { useRouter } from "next/navigation"

export function EventDetail({ event, hasInscripcion }) {
  const { push } = useRouter()
  const handleInscription = async () => {
    try {
      const res = await fetch("/api/inscribir", {
        method: 'POST',
        body: JSON.stringify({ evento_id: event.id, id: 0 })
      })
      if (res.status === 200) return push("/perfil")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      {/* Botón volver atrás */}
      <BackButton />

      {/* Contenido principal */}
      <div className={styles.mainContent}>

        {/* Información del evento - Lado derecho */}
        <div className={styles.infoSection}>
          <div className={styles.eventInfo}>
            <h1 className={styles.eventTitle}>{event.nombre}</h1>

            <p className={styles.eventDescription}>{event.descripcion}</p>

            <div className={styles.detailsContainer}>
              <div className={styles.detail}>
                <Users className={styles.detailIcon} />
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Cupos disponibles:</span>
                  <span className={styles.detailValue}>
                    {event.cupos}
                  </span>
                </div>
              </div>

              <div className={styles.detail}>
                <Calendar className={styles.detailIcon} />
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Fecha de inicio:</span>
                  <span className={styles.detailValue}>
                    {dateToString(event.fecha_inicio)}
                  </span>
                </div>
              </div>

              <div className={styles.detail}>
                <Calendar className={styles.detailIcon} />
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Fecha de fin:</span>
                  <span className={styles.detailValue}>
                    {dateToString(event.fecha_fin)}
                  </span>
                </div>
              </div>

              <div className={styles.detail}>
                <MapPin className={styles.detailIcon} />
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>Ubicación:</span>
                  <span className={styles.detailValue}>{event.lugar}</span>
                </div>
              </div>

            </div>
          </div>
          <button onClick={handleInscription} className={styles.inscriptionButton} disabled={hasInscripcion}>
            { hasInscripcion ? 'Ya estas inscripto' : 'Inscribirse al evento'}
          </button>
        </div>
      </div>
    </div>
  )
}
