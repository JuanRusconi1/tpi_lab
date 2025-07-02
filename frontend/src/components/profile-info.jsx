import { User, Mail } from "lucide-react"
import styles from "../styles/profile-info.module.css"

export function ProfileInfo({ user }) {

  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          
        </div>
        <h2 className={styles.title}>Mis Datos</h2>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>
            <User className={styles.infoIcon} />
            <span>Nombre completo</span>
          </div>
            <span className={styles.infoValue}>{user.nombre}</span>
        </div>

        <div className={styles.infoItem}>
          <div className={styles.infoLabel}>
            <Mail className={styles.infoIcon} />
            <span>Correo electrónico</span>
          </div>
          <span className={styles.infoValue}>{user.email}</span>
        </div>
      </div>
    </div>
  )
}
