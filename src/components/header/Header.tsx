import styles from './Header.module.css'
import logo from '../../assets/Terradle.png';

export default function Header() {
  return (
    <img className={styles.logo} src={logo} alt="default text"></img>
  )
}
