import { useEffect, useState } from "react";
import "./App.css";
import weaponData from "./assets/terrariaWeapons.json";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  resetGameStateToLocalStorage,
} from "./lib/localStorage";
import { loadStats, addStatsForCompletedGame } from "./lib/stats";
import { findWeapon } from './lib/findWeapon'
import { MAX_CHALLENGES } from "./constants/gameSettings";
import { CompleteGrid, Keyboard, Header, StartInfo, GameEnd, Switch } from "./components";

function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [chosenWord, setChosenWord] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [difficultySetting, setDifficultySetting] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [endModalOpen, setEndModalOpen] = useState(false)
  const [stats, setStats] = useState(() => loadStats())
  const [guessList, setGuessList] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    setChosenWord(loaded?.gameSolution ? loaded?.gameSolution : findWeapon())
    return loaded?.currentGuesses || []
  });
  const [startScreen, setStartScreen] = useState((guessList.length == 0 ? true: false));

//! ALL GOOD !
  useEffect(() => {
    console.log(`guessList updated: ${guessList[guessList.length - 1]}`)
    saveGameStateToLocalStorage({currentGuesses: guessList, gameSolution: chosenWord})
    if (guessList.includes(chosenWord?.toUpperCase())) setGameWon(true)
    else if (guessList.length == MAX_CHALLENGES && !gameWon) setGameLost(true)
    //console.log(`App guessList: ${guessList}`)
    //! ADDED THIS - NOT SURe IF IT WORKS
  }, [guessList])


  useEffect(() => {
    if (gameWon || gameLost) {
      setStats(addStatsForCompletedGame(stats, guessList.length))
      setEndModalOpen(true)
      resetGameStateToLocalStorage()
    }
  }, [gameWon, gameLost])
  
  function checkGuess(guess: string) {
    if (weaponData.weapons.filter((e) => e.name.toUpperCase() == guess).length == 1) return true;
    return false;
  }

  const addGuessList = () => {
    if (
      guessList.length < MAX_CHALLENGES &&
      currentGuess.length === chosenWord.length
    ) {
       if (difficultySetting) {
        if (checkGuess(currentGuess)) {
          setGuessList([...guessList, currentGuess]);
          setCurrentGuess("");
        } else {
          setErrorMsg("Word is not valid")
        }
       } else {
          setGuessList([...guessList, currentGuess]);
          setCurrentGuess("");
       }
    } else if (!gameWon) {
      setErrorMsg("Not enough letters");
    }
  };

  const addToGuess = (letter: string) => {
    console.log(`keyboard added letter: ${letter}`)
    if (currentGuess.length < chosenWord.length && !gameWon)
      setCurrentGuess(currentGuess + letter);
  };

  const removeFromGuess = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const changeDifficulty = () => {
    setDifficultySetting(!difficultySetting)
  }

  function resetHandler(){
    setEndModalOpen(false)
    setGuessList([])
    setChosenWord(findWeapon())
    setGameWon(false)
    setGameLost(false)
  }

  return (
    <div className={"container"}>
      <Switch difficultySetting={changeDifficulty}/>
      {startScreen && (!gameWon && !gameLost) ? <StartInfo screenState={setStartScreen} /> : null}
      {endModalOpen ? <GameEnd outcome={gameWon ? "won" : "lost"} handleReset={() => resetHandler()} solution={chosenWord} /> : null}
      <button onClick={() => resetGameStateToLocalStorage()}>Reset local state</button>
      <Header />
      <div className="App">
        <CompleteGrid
          currentGuess={currentGuess}
          completeGuesses={guessList}
          chosenWord={chosenWord}
        />
        <Keyboard
          addGuess={addToGuess}
          onDelete={removeFromGuess}
          onEnter={addGuessList}
          solution={chosenWord}
          guessList={guessList}
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
}

export default App;
