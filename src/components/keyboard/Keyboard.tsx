import React, { useEffect } from 'react'
import styles from './Keyboard.module.css'

export default function Keyboard() {
    const keys = [
        ["Q","W","E","R","T","Y","U","I","O","P"], 
        ["A","S","D","F","G","H","J","K","L"],
        ["Enter","Z","X","C","V","B","N","M",'Del']
    ]

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                console.log("enter")
            } else if (e.code === 'Backspace') {
                console.log("delete") 
            } else {
                console.log(e.key)

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
      }, [])


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
                                return !(key == "Enter" || key == "Del") ? (<div className={styles.key}>{key}</div>) 
                                : <div className={styles.bigKey}>{key}</div>
                            })
                        }
                    </div>
                )
            })}
        </div>
    </>
  )
}
