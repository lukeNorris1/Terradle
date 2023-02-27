import { useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
}

export default function FinishedRow(props: prop) {
    const { word, chosenWord } = props
    let chosenChanged = ""
   


    function guessLetterExactChosen(guess: string, index: number){
      console.log(`chosen: ${chosenChanged[index]} guess = ${guess}`)
      if (guess == (chosenChanged[index].toUpperCase())) {
        
        return styles.green
      }
      else if (chosenChanged.includes(guess)) return styles.yellow
      return
    }

    const finishedWords = () => 
    { chosenChanged = chosenWord
      return (
      [...word].map((letter, i) => 
        <div className={`${styles.cell} ${guessLetterExactChosen(letter, i)}`} key={i}>{letter}</div>
      )
    )}
    

  return (
    <div className={styles.classes}>
        {finishedWords()}
    </div>
  )
}
