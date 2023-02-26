import styles from "./CompleteGrid.module.css";
import CurrentRow from "../CurrentRow/CurrentRow";
import EmptyRow from "../EmptyRow/EmptyRow";
import FinishedRow from "../FinishedRow/FinishedRow";
import { MAX_CHALLENGES } from "../../../constants/gameSettings";

export default function CompleteGrid(props: any) {
  const { currentGuess, completeGuesses } = props;

  const remainingRows = Math.max(MAX_CHALLENGES - completeGuesses.length, 0);
  
  return (
    <>
      {completeGuesses.map((guess: string, key: number) => (
        <FinishedRow key={key} word={guess} />
      ))}
      {remainingRows > 0 ? <CurrentRow currentGuess={currentGuess} /> : null}
      {[...Array(Math.max(remainingRows - 1, 0))].map((row) => (
        <EmptyRow />
      ))}
    </>
  );
}
