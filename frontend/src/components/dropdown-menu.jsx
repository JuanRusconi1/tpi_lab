'use client'

import { useState, useRef, useEffect } from 'react'
import styles from '../styles/dropdown-menu.module.css'
import { Menu, User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DropdownMenu() {
  const [open, setOpen] = useState(false)
  const { push } = useRouter()
  const menuRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button className={styles.menuButton} onClick={() => setOpen(!open)}>
        <Menu size={20} />
      </button>
      {open && (
        <div className={styles.menu}>
          <div className={styles.menuItem} onClick={() => push('/perfil')}>
            <User size={16} className={styles.icon} />
            Perfil
          </div>
          <div className={`${styles.menuItem} ${styles.logout}`} onClick={() => {
            fetch('/api/logout')
            return push("/ingresar")
            }}>
            <LogOut size={16} className={styles.icon} />
            Cerrar sesión
          </div>
        </div>
      )}
    </div>
  )
}
