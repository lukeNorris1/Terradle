import { useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
    addtoCorrectGuess?: (value: string, index: number) => void;
}

export default function FinishedRow(props: prop) {
    const { word, chosenWord, addtoCorrectGuess } = props
    let chosenChanged = ""

    


    function guessLetterExactChosen(guess: string, index: number){
      console.log(index)
      if (guess == (chosenChanged[index].toUpperCase())) {
        if (addtoCorrectGuess){
          setTimeout(() => addtoCorrectGuess(guess, 0))
        }
        return styles.green
      }
      else if (chosenChanged.toUpperCase().includes(guess)) {
        if (addtoCorrectGuess){
          setTimeout(() => addtoCorrectGuess(guess, 1))
        }
        return styles.yellow
      } else {
        if (addtoCorrectGuess){
          setTimeout(() => addtoCorrectGuess(guess, 2))
        }
        return styles.gray
      }
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
