import { useState } from "react"
import styles  from './CurrentRow.module.css'

import { MAX_WORD_LENGTH } from '../../constants/gameSettings'

export default function CurrentRow() {
    const [guess, setGuess] = useState("swords")


    const splitGuess = [...guess]
    const emptyCells = Array.from(
      Array(MAX_WORD_LENGTH - splitGuess.length)
    )
    const classes = `flex justify-center mb-1 ${"className"}`


  return (
    <>
        <div className={styles.classes}>
        {splitGuess.map((letter, i) => (
            <input key={i} value={letter} />
        ))}
        {emptyCells.map((_, i) => (
            <input key={i} />
        ))}
        </div>
    </>
  )
}
