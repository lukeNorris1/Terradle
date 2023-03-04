import React from "react";
import styles from "./StartInfo.module.css";
import FinishedRow from "../grid/FinishedRow/FinishedRow";

export default function StartInfo(props: any) {
  const { screenState } = props;

  const toggleScreen = () => {
    screenState(false);
  };
  return (
    <div className={styles.info}>
      <h1>How to Play</h1>
      <p className={styles.paragraph}>
        Terradle is an adaptation of Wordle using weapons from the game
        Terraria. The objective of the game is to try and guess a random
        weapon before you run out of guesses.
      </p>
      <p> By default the guess can be any arrangement of characters, however this can be changed using the button on the top left to only be valid weapons </p>
      <p> Below is an example of a complete guess</p>
      <FinishedRow chosenWord={"SandS"} word={"SWORD"} />
      <p className={styles.colors}>Green = Correct position and letter</p>
      <p className={styles.colors}>Orange = Correct letter but incorrect position</p>
      <p className={styles.colors}>Gray = The letter isn't in the word at all</p>
      <button className={styles.toggleButton} onClick={toggleScreen}>Finish</button>
    </div>
  );
}
