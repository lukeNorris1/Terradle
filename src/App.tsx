import { useEffect, useState } from 'react'
import './App.css'

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import CurrentRow from './components/grid/CurrentRow'
import Keyboard from './components/keyboard/Keyboard'

function App() {
  const [storageText, setstorageText] = useState("")
  const [currentGuess, setCurrentGuess] = useState("sword".toUpperCase())


  function handleInputText(e: any){
    e.preventDefault();
    setstorageText(e.target.value)

  }

  const addToGuess = (letter: string) => {
    console.log(`Added letter: ${letter}`)
    console.log(`Current guess before change = ${currentGuess}`)
    setCurrentGuess(currentGuess + letter)
  }
  
  function buttonHandler(){
    console.log('clicked')
    saveGameStateToLocalStorage({ obfSolution: storageText })
  }

  function loadState(){
    const loaded = loadGameStateFromLocalStorage()
    console.log(`Loaded date = ${loaded?.obfSolution}`)
  }

  

  

  return (
    <div className="App">
      {/* <input value={storageText} onInput={e => handleInputText(e)} placeholder='Type text in here'></input>
      <button onClick={() => buttonHandler()}> Click me </button>
      <button onClick={() => loadState()}> Click me </button> */}
      <CurrentRow
        currentGuess={currentGuess}
      />
      <Keyboard
        addGuess={addToGuess}
      />
    </div>
  )
}

export default App
