"use client"

import { Menu, User, LogOut } from "lucide-react"
import styles from "../styles/navbar.module.css"
import DropdownMenu from "./dropdown-menu"

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.companyContainer}>
        <h2 className={styles.companyName}>Velia</h2>
      </div>

      <DropdownMenu />
    </nav>
  )
}
