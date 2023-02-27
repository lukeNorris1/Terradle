import { useEffect, useState } from "react";
import "./App.css";

import weaponData from './assets/terrariaWeapons.json';

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/gameSettings";
import CompleteGrid from "./components/grid/CompleteGrid/CompleteGrid";
import Keyboard from "./components/keyboard/Keyboard";
import Header from "./components/header/Header";

function App() {
  const [storageText, setstorageText] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("")

  useEffect(() => {
    setChosenWord(weaponData.weapons[Math.floor(Math.random() * weaponData.weapons.length)].name)
  }, [])

  console.log(`chosen: ${chosenWord}`)
  


  const addGuessList = () => {
    if (guessList.length < MAX_CHALLENGES && currentGuess.length === chosenWord.length){
      setGuessList([...guessList, currentGuess]);
      setCurrentGuess("")
    }
  };

  const addToGuess = (letter: string) => {
    if (currentGuess.length < chosenWord.length)
      setCurrentGuess(currentGuess + letter);
  };

  const removeFromGuess = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

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
      <Header />
      <div className="App">
        {/* <input value={storageText} onInput={e => handleInputText(e)} placeholder='Type text in here'></input>
      <button onClick={() => buttonHandler()}> Click me </button>
      <button onClick={() => loadState()}> Click me </button> */}
        <CompleteGrid currentGuess={currentGuess} completeGuesses={guessList} chosenWord={chosenWord} />
        <Keyboard
          addGuess={addToGuess}
          onDelete={removeFromGuess}
          onEnter={addGuessList}
        />
      </div>
    </div>
  );
}

export default App;
