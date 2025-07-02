"use client"

import { ChevronDown } from "lucide-react"
import styles from "../styles/hero-section.module.css"
import Image from "next/image"

export function HeroSection() {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events-section")
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={styles.heroSection}>
      {/* Background color amarillo-blanco */}
      <div className={styles.backgroundOverlay} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left side - Text */}
          <div className={styles.textContainer}>
            <h1 className={styles.mainHeading}>
              Tu lugar asegurado, <span className={styles.headingBreak}>con un solo clic.</span>
            </h1>

            {/* Scroll Button */}
            <button onClick={scrollToEvents} className={styles.scrollButton}>
              Ver Eventos
              <ChevronDown className={styles.chevronIcon} />
            </button>
          </div>

          <div className={styles.cardsContainer}>
            <div className={`${styles.eventCard} ${styles.cardLarge}`} >
              <Image className={styles.img} src="/imagen1.jpeg?height=200&width=100" width={100} height={100} alt="imagen de muestra 1" />
            </div>
            <div className={`${styles.eventCard} ${styles.cardSmall}`}> 
              <Image className={styles.img} src="/imagen2.jpeg?height=200&width=100" width={100} height={100} alt="imagen de muestra 2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
