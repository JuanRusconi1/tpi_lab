import { RegisterForm } from "@/components/register-form"
import styles from "./page.module.css"

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  )
}
