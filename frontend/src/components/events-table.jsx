"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Calendar, MapPin, Users } from "lucide-react"
import styles from "../styles/events-table.module.css"

export function EventsTable({ allEvents }) {
  const router = useRouter()
  const [events, setEvents] = useState(allEvents)

  const handleEditEvent = (eventId) => {
    router.push(`/dashboard/eventos/${eventId}`)
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      fetch("/api/event", {
      method: 'DELETE',
      body: JSON.stringify({ id: eventId })
    }).then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          return setEvents(events.filter((event) => event.id !== eventId))
        }
      })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Calendar className={styles.headerIcon} />
                  Nombre
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Calendar className={styles.headerIcon} />
                  Fecha Inicio
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Calendar className={styles.headerIcon} />
                  Fecha Fin
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <MapPin className={styles.headerIcon} />
                  Lugar
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Users className={styles.headerIcon} />
                  Cupos
                </div>
              </th>
              <th className={styles.headerCell}>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {events.map((event) => (
              <tr key={event.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.eventInfo}>
                    <div className={styles.eventIcon}>
                      <Calendar className={styles.iconCalendar} />
                    </div>
                    <span className={styles.eventName}>{event.nombre}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.eventDate}>{formatDate(event.fecha_inicio)}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.eventDate}>{formatDate(event.fecha_fin)}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.eventLocation}>{event.lugar}</span>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.cuposBadge}>
                    <Users className={styles.cuposIcon} />
                    <span>{event.cupos}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                      title="Editar evento"
                    >
                      <Edit className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      title="Eliminar evento"
                    >
                      <Trash2 className={styles.actionIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Información adicional */}
      <div className={styles.tableFooter}>
        <p className={styles.footerText}>Mostrando {events.length} eventos</p>
      </div>
    </div>
  )
}
