import React, { useEffect, useState } from "react";
import styles from "./Keyboard.module.css";
import Error from "../error/Error";

type Props = {
  addGuess: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  solution: string;
  guessList: string[];
  errorMsg: string;
};

export default function Keyboard(props: Props) {
  const { addGuess, onDelete, onEnter, solution, guessList, errorMsg } = props;
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];
  const [correctGuesses, setCorrectGuesses] = useState<string[]>(["", "", ""]);

  console.log(`keyboard update: solution: ${solution}`);

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
      } else if (keys.join().toLocaleLowerCase().includes(e.key)) {
        console.log(`keyboard pressed key: ${e.key}`);
        addGuess(e.key.toUpperCase());
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [addGuess, onDelete, onEnter]);

  

  useEffect(() => {
    console.log(
      `keyboard useEffect guessList: ${guessList[guessList.length - 1]}`
    );
    if (guessList[guessList.length - 1] != undefined) {
       let tempCorrect = correctGuesses;
      // guessList[guessList.length - 1].split("").forEach((letter, index) => {
      //   if (letter == solution[index].toUpperCase()) {
      //     tempCorrect[0] += letter;
      //   }else if (solution.toUpperCase().includes(letter)) {
      //     tempCorrect[1] += letter;
      //   } else {
      //     tempCorrect[2] += letter;
      //   }
      // });
      tempCorrect[0] += "ABCDEFG"
      setCorrectGuesses(tempCorrect); 
    }
  }, [guessList, correctGuesses]);

  
  useEffect(() => {
    console.log(`correct updated to: ${correctGuesses}`)
  }, [correctGuesses])


  function colorHandler(key: string) {
    //console.log(`color update: ${key}, correct = ${correctGuesses}`)
    if (correctGuesses[0].includes(key.toUpperCase())) return styles.green
    else if (correctGuesses[1].includes(key.toUpperCase())) return styles.yellow
    else if (correctGuesses[2].includes(key.toUpperCase())) return styles.gray
    else return ""
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
                    className={`${styles.key} ${colorHandler(key)}`}
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
