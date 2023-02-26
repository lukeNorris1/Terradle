import React, { useEffect } from "react";
import styles from "./Keyboard.module.css";
import Error from "../error/Error";

type Props = {
  addGuess: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
};

export default function Keyboard(props: Props) {
  const { addGuess, onDelete, onEnter } = props;
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

  return (
    <>
      <Error errMsg={"Too many characters"} />
      <div className={styles.keyboard}>
        {keys.map((row, index) => {
          return (
            <div className={styles.row} key={index}>
              {row.map((key, index) => {
                return !(key == "Enter" || key == "Del") ? (
                  <div
                    onClick={() => keyClickHandler(key)}
                    className={styles.key}
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
