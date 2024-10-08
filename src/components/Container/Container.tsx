import styles from './Container.module.css'
import { ContainerProps } from './interface'

export function Container({ children }: ContainerProps) {
  return <main className={styles.container}>{children}</main>
}
