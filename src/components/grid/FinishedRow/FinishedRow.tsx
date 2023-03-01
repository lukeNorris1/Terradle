import { useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
    correctGuess: string[][];
    addtoCorrectGuess?: (value: string) => void;
}

export default function FinishedRow(props: prop) {
    const { word, chosenWord, correctGuess, addtoCorrectGuess } = props
    let chosenChanged = ""
   


    function guessLetterExactChosen(guess: string, index: number){
      if (guess == (chosenChanged[index].toUpperCase())) {
        if (addtoCorrectGuess){
          addtoCorrectGuess(guess)
        }
        return styles.green
      }
      else if (chosenChanged.toUpperCase().includes(guess)) return styles.yellow
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
