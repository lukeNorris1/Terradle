import { useState } from "react";
import styles from "./CurrentRow.module.css";

import { MAX_WORD_LENGTH } from "../../../constants/gameSettings";

type prop = {
  currentGuess: string;
  chosenWord: string;
};

export default function CurrentRow(props: prop) {
  const { currentGuess,  chosenWord } = props;

  const splitGuess = [...currentGuess];
  const emptyCells = Array.from(Array(chosenWord.length - splitGuess.length));

  return (
    <>
      <div className={styles.classes}>
        {splitGuess.map((letter, i) => 
            <div className={styles.current} key={i}>
              {letter}
            </div>
          
        )}

        {emptyCells.map((_, i) => (
          <div className={styles.cell} key={i}></div>
        ))}
      </div>
    </>
  );
}
