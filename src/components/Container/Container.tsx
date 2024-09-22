import styles from './Container.module.css'
import { ContainerProps } from './interface'

function Container({ children }: ContainerProps) {
  return <main className={styles.container}>{children}</main>
}

export default Container
