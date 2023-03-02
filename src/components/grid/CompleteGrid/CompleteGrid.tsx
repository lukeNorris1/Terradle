//import styles from "./CompleteGrid.module.css";
import CurrentRow from "../CurrentRow/CurrentRow";
import EmptyRow from "../EmptyRow/EmptyRow";
import FinishedRow from "../FinishedRow/FinishedRow";
import { MAX_CHALLENGES } from "../../../constants/gameSettings";

type prop = {
  currentGuess: string;
  completeGuesses: string[];
  chosenWord: string;
  addtoCorrectGuess: (value: string, index: number) => void;
}

export default function CompleteGrid(props: any) {
  const { currentGuess, completeGuesses, chosenWord,  addtoCorrectGuess }: prop = props;

  const remainingRows = Math.max(MAX_CHALLENGES - completeGuesses.length, 0);
  
  return (
    <>
      {completeGuesses.map((guess: string, key: number) => (
        <FinishedRow key={key} word={guess} chosenWord={chosenWord} addtoCorrectGuess={addtoCorrectGuess} />
      ))}
      {remainingRows > 0 ? <CurrentRow currentGuess={currentGuess}  chosenWord={chosenWord} /> : null}
      {[...Array(Math.max(remainingRows - 1, 0))].map((row, index) => (
        <EmptyRow key={index}  chosenWord={chosenWord} />
      ))}
    </>
  );
}
