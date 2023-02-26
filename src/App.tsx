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
  const [currentGuess, setCurrentGuess] = useState("long sword".toUpperCase());
  const [guessList, setGuessList] = useState<string[]>([]);

  console.log(`weapon data: ${weaponData.weapons.map((e) => {console.log(e.name)})}`)

  const addGuessList = () => {
    if (guessList.length < MAX_CHALLENGES - 1)
      setGuessList([...guessList, currentGuess]);
      setCurrentGuess("")
  };

  const addToGuess = (letter: string) => {
    if (currentGuess.length < MAX_WORD_LENGTH)
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
        <CompleteGrid currentGuess={currentGuess} completeGuesses={guessList} />
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
