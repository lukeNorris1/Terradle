import React, { useEffect } from "react";
import styles from "./Keyboard.module.css";
import Error from "../error/Error";

type Props = {
  addGuess: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  correctGuesses: string[];
  errorMsg: string;
};

export default function Keyboard(props: Props) {
  const { addGuess, onDelete, onEnter, correctGuesses, errorMsg } = props;
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];

 

  function keyClickHandler(e: string) {
    if (e === "Enter") {
      onEnter();
    } else if (e === "Del") {
      onDelete();
    } else {
      addGuess(e.toUpperCase());
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace" || e.code === "Delete") {
        onDelete();
      } else if (keys.join().toLocaleLowerCase().includes(e.key)){
        addGuess(e.key.toUpperCase());
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [addGuess, onDelete, onEnter]);

  const colorCheck = (key: string) => {
    console.log(`correct guesses: ${correctGuesses}`)
    if (correctGuesses[0].includes(key)) return "#4ab336" //green
    else if (correctGuesses[1].includes(key)) return "#f2a246" //orange
    else if (correctGuesses[2].includes(key)) return "gray"
    return ""
  }

  return (
    <>
      <Error errMsg={errorMsg} />
      <div className={styles.keyboard}>
        {keys.map((row, index) => {
          return (
            <div className={styles.row} key={index}>
              {row.map((key, index) => {
                return !(key == "Enter" || key == "Del") ? (
                  <div
                    onClick={() => keyClickHandler(key)}
                    className={styles.key}
                    style={{backgroundColor: colorCheck(key)}}
                    key={index}
                  >
                    {key}
                  </div>
                ) : (
                  <div
                    onClick={() => keyClickHandler(key)}
                    className={styles.bigKey}
                    key={index}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
