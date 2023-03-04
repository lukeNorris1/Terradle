import { useEffect, useState } from "react";
import weaponData from "./assets/terrariaWeapons.json";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  resetGameStateToLocalStorage,
  saveStatsToLocalStorage,
  loadStatsFromLocalStorage,
  StoredGameState,
  GameStats,
} from "./lib/localStorage";
import { loadStats, addStatsForCompletedGame } from "./lib/stats";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/gameSettings";
import CompleteGrid from "./components/grid/CompleteGrid/CompleteGrid";
import Keyboard from "./components/keyboard/Keyboard";
import Header from "./components/header/Header";
import StartInfo from "./components/startInfo/StartInfo";
import "./App.css";
import GameEnd from "./components/gameEnd/GameEnd";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [chosenWord, setChosenWord] = useState<string>("");
  const [correctGuesses, setCorrectGuesses] = useState<string[]>(["", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [endModalOpen, setEndModalOpen] = useState(false)
  const [stats, setStats] = useState(() => loadStats())
  const [guessList, setGuessList] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    setChosenWord(loaded?.gameSolution ? loaded?.gameSolution : chooseSolution())
    return loaded?.currentGuesses || []
  });
  const [startScreen, setStartScreen] = useState((guessList.length == 0 ? true: false));

  function chooseSolution(){
    const tempChosen = Object.values(weaponData.weapons).filter(
      (e) => e.name.length <= MAX_WORD_LENGTH
    );
    return tempChosen[Math.floor(Math.random() * tempChosen.length)].name
  }

  useEffect(() => {
    saveGameStateToLocalStorage({currentGuesses: guessList, gameSolution: chosenWord})
    if (guessList.includes(chosenWord?.toUpperCase())) setGameWon(true)
    else if (guessList.length == MAX_CHALLENGES && !gameWon) setGameLost(true)
  }, [guessList])

  useEffect(() => {
    if (gameWon || gameLost) {
      setStats(addStatsForCompletedGame(stats, guessList.length))
      setEndModalOpen(true)
      resetGameStateToLocalStorage()
    }
  }, [gameWon, gameLost])
  
  

  function checkGuess(guess: string) {
    if (
      weaponData.weapons.filter((e) => e.name.toUpperCase() == guess).length ==
      1
    )
      return true;
    return false;
  }

  const addGuessList = () => {
    if (
      guessList.length < MAX_CHALLENGES &&
      currentGuess.length === chosenWord.length
    ) {
      // if (checkGuess(currentGuess)){
      setGuessList([...guessList, currentGuess]);
      setCurrentGuess("");
      // }
    } else if (!gameWon) {
      setErrorMsg("Not enough letters");
    }
  };

  const addToGuess = (letter: string) => {
    if (currentGuess.length < chosenWord.length && !gameWon)
      setCurrentGuess(currentGuess + letter);
  };

  const removeFromGuess = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const addtoCorrectGuess = (letter: string, index: number) => {
    if (index == 0) {
      if (!correctGuesses[0].includes(letter)) {
        let tempArray = correctGuesses;
        tempArray[0] += letter;
        setCorrectGuesses(tempArray);
      }
    } else if (index == 1) {
      if (!correctGuesses[1].includes(letter)) {
        let tempArray = correctGuesses;
        tempArray[1] += letter;
        setCorrectGuesses(tempArray);
      }
    } else if (index == 2) {
      if (!correctGuesses[2].includes(letter)) {
        let tempArray = correctGuesses;
        tempArray[2] += letter;
        setCorrectGuesses(tempArray);
      }
    }
  };

  function resetHandler(){
    setEndModalOpen(false)
    setGuessList([])
    setCorrectGuesses(["", "", ""])
    setChosenWord(chooseSolution())
    setGameWon(false)
    setGameLost(false)
  }

  return (
    <div className={"container"}>
      {startScreen && (!gameWon && !gameLost) ? <StartInfo screenState={setStartScreen} /> : null}
      {endModalOpen ? <GameEnd outcome={gameWon ? "won" : "lost"} handleReset={() => resetHandler()} solution={chosenWord} /> : null}
      <Header />
      <div className="App">
        <CompleteGrid
          currentGuess={currentGuess}
          completeGuesses={guessList}
          chosenWord={chosenWord}
          addtoCorrectGuess={addtoCorrectGuess}
        />
        <Keyboard
          addGuess={addToGuess}
          onDelete={removeFromGuess}
          onEnter={addGuessList}
          correctGuesses={correctGuesses}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
}

export default App;
