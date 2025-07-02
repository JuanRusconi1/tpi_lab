"use client"

import { useState } from "react"
import { Edit, Trash2, User, Mail, Shield } from "lucide-react"
import styles from "../styles/users-table.module.css"
import { useRouter } from "next/navigation"

export function UsersTable({ allUsers }) {
  const [users, setUsers] = useState(allUsers)
  const { push, refresh, replace } = useRouter()
  const handleEditUser = (userId) => {
    push(`/dashboard/usuarios/${userId}`)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      fetch("/api/user", {
      method: 'DELETE',
      body: JSON.stringify({ id: userId })
    }).then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          return setUsers(users.filter((user) => user.id !== userId))
        }
      })
    }
    
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Administrador":
        return styles.roleAdmin
      case "Cliente":
        return styles.roleUser
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "Administrador":
        return <Shield className={styles.roleIcon} />
      case "Cliente":
        return <User className={styles.roleIcon} />
    }
  }

  if (!users || users.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#888",
          fontSize: "1.2rem",
          background: "#f9f9f9",
          borderRadius: "8px",
          margin: "2rem 0"
        }}
      >
        No hay usuarios para mostrar.
      </div>
    )
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <User className={styles.headerIcon} />
                  Nombre
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Mail className={styles.headerIcon} />
                  Email
                </div>
              </th>
              <th className={styles.headerCell}>
                <div className={styles.headerContent}>
                  <Shield className={styles.headerIcon} />
                  Rol
                </div>
              </th>
              <th className={styles.headerCell}>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {users.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      <User className={styles.avatarIcon} />
                    </div>
                    <span className={styles.userName}>{user.nombre}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.userEmail}>{user.email}</span>
                </td>
                <td className={styles.tableCell}>
                  <div className={`${styles.roleBadge} ${getRoleColor(user.rol)}`}>
                    {getRoleIcon(user.rol)}
                    <span>{user.rol}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                      title="Editar usuario"
                    >
                      <Edit className={styles.actionIcon} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      title="Eliminar usuario"
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
        <p className={styles.footerText}>Mostrando {users.length} usuarios</p>
      </div>
    </div>
  )
}
