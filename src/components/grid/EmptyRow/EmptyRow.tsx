import styles  from './EmptyRow.module.css'

import { MAX_WORD_LENGTH } from '../../../constants/gameSettings'
//Swap this over to the length of the word user is trying to guess
type prop = {
  chosenWord: string;
}


export default function EmptyRow(props: prop) {
  const { chosenWord } = props


  return (
    <>
        <div className={styles.classes}>
        {[...Array(chosenWord.length)].map((letter, i) => (
            <div className={styles.cell} key={i}>{""}</div>
        ))}
        </div>
    </>
  )
}
