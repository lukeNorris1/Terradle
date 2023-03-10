import styles from './Header.module.css'
import logo from '../../assets/Terradle.png';
import { memo } from 'react';

export default memo(function Header() {
  return (
    <img className={styles.logo} src={logo} alt="default text"></img>
  )
})
