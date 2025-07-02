"use client"

import { Users, Calendar, Tag, BarChart3, LogOutIcon } from "lucide-react"
import styles from "../styles/dashboard-sidebar.module.css"
import { usePathname, useRouter } from "next/navigation"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { push } = useRouter()
  const menuItems = [
    {
      name: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      name: "Usuarios",
      icon: Users,
      href: "/dashboard/usuarios",
    },
    {
      name: "Eventos",
      icon: Calendar,
      href: "/dashboard/eventos",
    },
    {
      name: "Categorías",
      icon: Tag,
      href: "/dashboard/categorias",
    },
  ]

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <a href={item.href} className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`}>
                  <Icon className={styles.menuIcon} />
                  <span className={styles.menuText}>{item.name}</span>
                </a>
              </li>
            )
          })}
          <li key={"logout"} style={{ cursor: 'pointer' }}>
              <div className={styles.menuItem} onClick={() => {
                fetch("/api/logout")
                  .then(res => res.json())
                  .then(res => { 
                      return push("/ingresar")
                  })
              }}>
                <LogOutIcon className={styles.menuIcon} />
                <span className={styles.menuText}>Cerrar Sesion</span>
              </div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
