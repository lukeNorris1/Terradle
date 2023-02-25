import { useState } from "react"
import styles  from './CurrentRow.module.css'

import { MAX_WORD_LENGTH } from '../../constants/gameSettings'

export default function CurrentRow(props: any) {
  const {currentGuess} = props


    const splitGuess = [...currentGuess]
    const emptyCells = Array.from(
      Array(MAX_WORD_LENGTH - splitGuess.length)
    )
    const classes = `flex justify-center mb-1 ${"className"}`


  return (
    <>
        <div className={styles.classes}>
        {splitGuess.map((letter, i) => (
            <div className={styles.cell} key={i}>{letter}</div>
        ))}
        {emptyCells.map((_, i) => (
            <div className={styles.cell} key={i}></div>
        ))}
        </div>
    </>
  )
}
