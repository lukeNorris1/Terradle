import { useEffect, useState } from "react";
import weaponData from "./assets/terrariaWeapons.json";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  resetGameStateToLocalStorage,
  StoredGameState,
} from "./lib/localStorage";
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from "./constants/gameSettings";
import CompleteGrid from "./components/grid/CompleteGrid/CompleteGrid";
import Keyboard from "./components/keyboard/Keyboard";
import Header from "./components/header/Header";
import StartInfo from "./components/startInfo/StartInfo";
import "./App.css";

function App() {
  const [storageText, setstorageText] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessList, setGuessList] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("");
  const [correctGuesses, setCorrectGuesses] = useState<string[]>(["", "", ""]);
  const [localGameState, setLocalGameState] =
    useState<StoredGameState | null>();
  const [startScreen, setStartScreen] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    resetGameStateToLocalStorage();
    const tempChosen = Object.values(weaponData.weapons).filter(
      (e) => e.name.length <= MAX_WORD_LENGTH
    );
    setChosenWord(
      tempChosen[Math.floor(Math.random() * tempChosen.length)].name
    );
    // LOAD after first screen setLocalGameState(loadGameStateFromLocalStorage())
  }, []);

  useEffect(() => {
    console.log(chosenWord);
    console.log(`Local Storage: ${localGameState?.obfSolution}`);
  }, [chosenWord]);

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
    } else {
      setErrorMsg("Not enough letters");
    }
  };

  const addToGuess = (letter: string) => {
    if (currentGuess.length < chosenWord.length)
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
      {startScreen ? <StartInfo screenState={setStartScreen} /> : null}
      <Header />
      <div className="App">
        {/* <input value={storageText} onInput={e => handleInputText(e)} placeholder='Type text in here'></input>
      <button onClick={() => buttonHandler()}> Click me </button>
      <button onClick={() => loadState()}> Click me </button> */}
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
