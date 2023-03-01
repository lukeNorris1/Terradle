import { useEffect, useState } from "react";
import "./App.css";

import weaponData from './assets/terrariaWeapons.json';

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,resetGameStateToLocalStorage, StoredGameState,
} from "./lib/localStorage";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/gameSettings";
import CompleteGrid from "./components/grid/CompleteGrid/CompleteGrid";
import Keyboard from "./components/keyboard/Keyboard";
import Header from "./components/header/Header";
import StartInfo from "./components/startInfo/StartInfo";

function App() {
  const [storageText, setstorageText] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("")
  const [correctGuesses, setCorrectGuesses] = useState<string[][]>()
  const [localGameState, setLocalGameState] = useState<StoredGameState | null>()
  const [startScreen, setStartScreen] = useState(true)

  useEffect(() => {
    resetGameStateToLocalStorage()
    setChosenWord(weaponData.weapons[Math.floor(Math.random() * weaponData.weapons.length)].name)
    // LOAD after first screen setLocalGameState(loadGameStateFromLocalStorage())
  }, [])

  useEffect(() => {
    console.log(chosenWord)
    console.log(`Local Storage: ${localGameState?.obfSolution}`)
    setCorrectGuesses(Array(3).fill(Array(chosenWord!.length).fill(null)))
  }, [chosenWord])

  useEffect(() => {
    console.log(`current correct guesses: ${correctGuesses}`)
  }, [correctGuesses])
  
  
  

  function checkGuess(guess: string){
    if (weaponData.weapons.filter((e) => e.name.toUpperCase() == guess).length == 1) return true
    return false
  }

  const addGuessList = () => {
    if (guessList.length < MAX_CHALLENGES && currentGuess.length === chosenWord.length){
     // if (checkGuess(currentGuess)){
        setGuessList([...guessList, currentGuess]);
        setCurrentGuess("")
     // }
    }
  };

  const addToGuess = (letter: string) => {
    if (currentGuess.length < chosenWord.length)
      setCurrentGuess(currentGuess + letter);
  };

  const removeFromGuess = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const addtoCorrectGuess = (letter:string) => {
    console.log(letter)

  }

  function handleInputText(e: any) {
    e.preventDefault();
    setstorageText(e.target.value);
  }

  function buttonHandler() {
    console.log("clicked");
    saveGameStateToLocalStorage({ obfSolution: storageText });
  }

  function loadState() {
    const loaded = loadGameStateFromLocalStorage();
    console.log(`Loaded date = ${loaded?.obfSolution}`);
  }

  return (
    <div className={"container"}>
      {startScreen ? <StartInfo screenState={setStartScreen}/> : null}
      <Header />
      <div className="App">
        {/* <input value={storageText} onInput={e => handleInputText(e)} placeholder='Type text in here'></input>
      <button onClick={() => buttonHandler()}> Click me </button>
      <button onClick={() => loadState()}> Click me </button> */}
        <CompleteGrid currentGuess={currentGuess} completeGuesses={guessList} chosenWord={chosenWord} correctGuess={correctGuesses} addtoCorrectGuess={addtoCorrectGuess} />
        <Keyboard
          addGuess={addToGuess}
          onDelete={removeFromGuess}
          onEnter={addGuessList}
          correctGuesses={correctGuesses}
        />
      </div>
    </div>
  );
}

export default App;
