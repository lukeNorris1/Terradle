import { useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
    correctGuess: string[];
    addtoCorrectGuess?: (value: string, index: number) => void;
}

export default function FinishedRow(props: prop) {
    const { word, chosenWord, correctGuess, addtoCorrectGuess } = props
    let chosenChanged = ""
   


    function guessLetterExactChosen(guess: string, index: number){
      console.log(index)
      if (guess == (chosenChanged[index].toUpperCase())) {
        if (addtoCorrectGuess){
          addtoCorrectGuess(guess, 0)
        }
        return styles.green
      }
      else if (chosenChanged.toUpperCase().includes(guess)) {
        if (addtoCorrectGuess){
          addtoCorrectGuess(guess, 1)
        }
        return styles.yellow
      } else {
        if (addtoCorrectGuess){
          addtoCorrectGuess(guess, 2)
        }
        return styles.gray
      }
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
