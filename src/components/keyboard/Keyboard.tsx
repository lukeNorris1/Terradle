import React, { useEffect } from 'react'
import styles from './Keyboard.module.css'


type Props = {
    addGuess: (value: string) => void
    onDelete?: () => void
    onEnter?: () => void
}

export default function Keyboard(props: Props) {
    const { addGuess } = props
    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"], 
        ["A","S","D","F","G","H","J","K","L"],
        ["Enter","Z","X","C","V","B","N","M",'Del']
    ]

    function keyClickHandler(e: string){
        if (e === 'Enter') {
            console.log("enter")
        } else if (e === 'Backspace') {
            console.log("delete") 
        } else {
            console.log(e)
            addGuess(e.toUpperCase())
        }

    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                console.log("enter")
            } else if (e.code === 'Backspace') {
                console.log("delete") 
            } else {
                console.log(e.key)
                addGuess(e.key.toUpperCase())

                // TODO: check this test if the range works with non-english letters
                // if (key.length === 1 && key >= 'A' && key <= 'Z') {
                //   onChar(key)
                // }
            }
            }
            window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
      }, [addGuess])


  return (
    <>
        <div className={styles.middle}></div>
        <div>Keyboard</div>
        <div className={styles.keyboard}>
            {keys.map((row) => {
                return (
                    <div className={styles.row}>
                        {
                            row.map((key) => {
                                return !(key == "Enter" || key == "Del") ? (<div onClick={() => keyClickHandler(key)} className={styles.key}>{key}</div>) 
                                : <div onClick={() => keyClickHandler(key)} className={styles.bigKey}>{key}</div>
                            })
                        }
                    </div>
                )
            })}
        </div>
    </>
  )
}
