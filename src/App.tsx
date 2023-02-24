import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

function App(this: any) {
  const [count, setCount] = useState(0)
  const [storageText, setstorageText] = useState("")
  


  function handleInputText(e: any){
    e.preventDefault();
    setstorageText(e.target.value)

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
      <input value={storageText} onInput={e => handleInputText(e)} placeholder='Type text in here'></input>
      <button onClick={() => buttonHandler()}> Click me </button>
      <button onClick={() => loadState()}> Click me </button>
    </div>
  )
}

export default App
