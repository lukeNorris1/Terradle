import { memo, useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
    addToCorrectGuess?: (value: string, index: number) => void;
}

export default memo(function FinishedRow(props: prop) {
    const { word, chosenWord } = props

    //Apply styling my checking if the guessed letter is in the solution
    function guessLetterExactChosen(letter: string, index: number){
      if (letter == (chosenWord[index].toUpperCase())) return styles.green
      else if (chosenWord.toUpperCase().includes(letter)) return styles.yellow
      else return styles.gray
    }

    const finishedWords = () => {
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
});
