import React from "react";
import styles from "./StartInfo.module.css";
import FinishedRow from "../grid/FinishedRow/FinishedRow";

export default function StartInfo(props: any) {
    const { screenState } = props

    const toggleScreen = () => {
        screenState(false)
    }
  return (
    <div className={styles.info}>
      <h1>How to Play</h1>
      <p className={styles.paragraph}>
        LoredaUhbdauewjdnwqdqwdqwdqwdw wijdfweifjwfijewfiwejfwfiewjfi
        weifjwifjewfiewjfwiefjie
      </p>
      <FinishedRow chosenWord={"SandS"} word={"SWORD"} />
      <p>Green = "Test"</p>
      <p>Yellow = "wow"</p>
      <button onClick={toggleScreen}>Finish</button>
    </div>
  );
}
