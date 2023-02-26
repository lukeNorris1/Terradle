import { useState } from "react";
import styles from "./CurrentRow.module.css";

import { MAX_WORD_LENGTH } from "../../../constants/gameSettings";

type prop = {
  currentGuess: string;
};

export default function CurrentRow(props: prop) {
  const { currentGuess } = props;

  const splitGuess = [...currentGuess];
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length));

  return (
    <>
      <div className={styles.classes}>
        {splitGuess.map((letter, i) => {
          return (letter == " ") ? (
            <div className={styles.emptyCell} key={i}></div>
          ) : (
            <div className={styles.cell} key={i}>
              {letter}
            </div>
          );
        })}

        {emptyCells.map((_, i) => (
          <div className={styles.cell} key={i}></div>
        ))}
      </div>
    </>
  );
}
