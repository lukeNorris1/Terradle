import styles from "./CompleteGrid.module.css";
import CurrentRow from "../CurrentRow/CurrentRow";
import EmptyRow from "../EmptyRow/EmptyRow";
import FinishedRow from "../FinishedRow/FinishedRow";
import { MAX_CHALLENGES } from "../../../constants/gameSettings";

export default function CompleteGrid(props: any) {
  const { currentGuess, completeGuesses } = props;

  const remainingRows = MAX_CHALLENGES - completeGuesses.length - 1;
  
  return (
    <>
      {completeGuesses.map((guess: string, key: number) => (
        <FinishedRow key={key} word={guess} />
      ))}
      <CurrentRow currentGuess={currentGuess} />
      {[...Array(remainingRows)].map((row) => (
        <EmptyRow />
      ))}
    </>
  );
}