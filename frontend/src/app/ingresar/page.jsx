import { LoginForm } from "@/components/login-form"
import styles from "./page.module.css"

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  )
}
