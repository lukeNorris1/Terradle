import styles from './GameEnd.module.css'
import { loadStats } from "../../lib/stats";
import { useState } from 'react';
import { GameStats } from "../../lib/localStorage";

type props = {
  handleReset: Function,
  outcome: string,
  solution: string,
}

export default function GameEnd(props: props) {
  const { handleReset, outcome, solution } = props
    const [stats, setStats] = useState(() => loadStats())
    let totalCount = 0

    //Calculate the mean score over all games. Between 1 and 6
    function getMeanPosition(){
      stats.winDistribution.forEach((position, index) => {
        totalCount += position * (index + 1)
      })
      return (totalCount / stats.totalGames).toFixed(2)
    }

  return (
    <div className={styles.info}>
      <h1>Game {outcome}!</h1>
      <p className={styles.outcome}>Anwer was <b className={styles.solution}>{solution}</b></p>
      <p className={styles.colors}>
        Average place {getMeanPosition()}
      </p>
      <p className={styles.colors}>
        {`Total Games: ${stats.totalGames}`}
        </p>
      <p className={styles.colors}>
        Win percentage = {stats.successRate}%
      </p>
      <button className={styles.toggleButton} onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
}
