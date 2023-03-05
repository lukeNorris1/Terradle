import { memo, useEffect } from 'react';
import styles from './FinishedRow.module.css'

type prop = {
    word: string
    chosenWord: string;
    addToCorrectGuess?: (value: string, index: number) => void;
}

export default memo(function FinishedRow(props: prop) {
    const { word, chosenWord } = props
    let chosenChanged = ""

    
  console.log(`re-render finishedRow`)

    function guessLetterExactChosen(guess: string, index: number){
      if (guess == (chosenChanged[index].toUpperCase())) return styles.green
      else if (chosenChanged.toUpperCase().includes(guess)) return styles.yellow
      else return styles.gray
      
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
});
