import { memo, useEffect, useState } from "react";
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

export default memo(function Keyboard(props: Props) {
  const { addGuess, onDelete, onEnter, solution, guessList, errorMsg } = props;
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"],
  ];
  const [greenColors, setGreenColors] = useState("")
  const [yellowColors, setYellowColors] = useState("")
  const [grayColors, setGrayColors] = useState("")

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
      }  else if (keys.join().toLocaleLowerCase().includes(e.key) && e.code !="Comma") {
        addGuess(e.key.toUpperCase());
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [addGuess, onDelete, onEnter]);

  useEffect(() => {
    if (guessList[guessList.length -1 ] != undefined){
      guessList[guessList.length -1 ].split("").forEach((letter, index) => {
        if (letter == solution[index].toUpperCase()) setGreenColors(prev => prev + letter)
        else if (solution.toUpperCase().includes(letter)) setYellowColors(prev => prev + letter)
        else  setGrayColors(prev => prev + letter)
      })
    } else {
      setGreenColors("")
      setYellowColors("")
      setGrayColors("")
    }
  },[guessList] )

  function colorFinder(key: string){
    if (greenColors.includes(key)) return styles.green
    else if (yellowColors.includes(key)) return styles.yellow
    else if (grayColors.includes(key)) return styles.gray
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
                    className={`${styles.key} ${colorFinder(key)}`}
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
})