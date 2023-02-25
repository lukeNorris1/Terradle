import styles  from './EmptyRow.module.css'

import { MAX_WORD_LENGTH } from '../../../constants/gameSettings'
//Swap this over to the length of the word user is trying to guess


export default function EmptyRow() {


  return (
    <>
        <div className={styles.classes}>
        {[...Array(MAX_WORD_LENGTH)].map((letter, i) => (
            <div className={styles.cell} key={i}>{""}</div>
        ))}
        </div>
    </>
  )
}
