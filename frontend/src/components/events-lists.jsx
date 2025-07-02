"use client"

import { Calendar, MapPin, CheckCircle } from "lucide-react"
import styles from "../styles/events-lists.module.css"
import { dateToString } from "@/app/utils/transformDate"
import { useRouter } from "next/navigation"

export function EventsLists({ activeEvents, historyEvents }) {
  const { push } = useRouter()
  return (
    <div className={styles.eventsContainer}>
      {/* Eventos próximos */}
      <div className={styles.eventsList}>
        <h3 className={styles.listTitle}>
          <Calendar className={styles.titleIcon} />
          Próximos Eventos
        </h3>
        <div className={styles.eventsGrid}>
          {!activeEvents || activeEvents.length === 0 ? (
            <div>No tienes inscripciones a eventos</div>
          ) : (
            activeEvents.map(({ evento }) => (
              <div key={evento.id} className={styles.eventCard}>
                <div className={styles.eventHeader}>
                  <h4 className={styles.eventTitle}>{evento.nombre}</h4>
                </div>
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <Calendar className={styles.detailIcon} />
                    <div>
                      {dateToString(evento.fecha_inicio)} - {dateToString(evento.fecha_fin)}
                    </div>
                  </div>
                  <div className={styles.eventDetail}>
                    <MapPin className={styles.detailIcon} />
                    <span>{evento.lugar}</span>
                  </div>
                  <div className={styles.eventDetail}></div>
                </div>
                <button className={styles.viewButton} onClick={() => push(`/evento/${evento.id}`)}>
                  Ver detalles
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Eventos pasados */}
      <div className={styles.eventsList}>
        <h3 className={styles.listTitle}>
          <CheckCircle className={styles.titleIcon} />
          Eventos Anteriores
        </h3>
        <div className={styles.eventsGrid}>
          {!historyEvents || historyEvents.length === 0 ? (
            <div>No tienes eventos</div>
          ) : (
            historyEvents.map(({ evento }) => (
              <div key={evento.id} className={`${styles.eventCard} ${styles.pastEvent}`}>
                <div className={styles.eventHeader}>
                  <h4 className={styles.eventTitle}>{evento.nombre}</h4>
                </div>
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetail}>
                    <Calendar className={styles.detailIcon} />
                    <span>
                      {dateToString(evento.fecha_inicio)} - {dateToString(evento.fecha_fin)}
                    </span>
                  </div>
                  <div className={styles.eventDetail}>
                    <MapPin className={styles.detailIcon} />
                    <span>{evento.lugar}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
