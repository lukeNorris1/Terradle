import { useState } from 'react'
import styles from './Error.module.css'

export default function Error(props: any) {
    const { errMsg } = props;
    const [showError, setShowError] = useState(false)

    function toggleError(){
        setShowError(!showError)
    }

    
  return (
    <>
        {showError ? <div className={styles.errMsg}>{errMsg}</div> : <></>}
        <button className="showHidden" onClick={toggleError}>Click To show error</button>
    </>
  )
}
