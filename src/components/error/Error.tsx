import { useEffect, useState } from 'react'
import styles from './Error.module.css'

export default function Error(props: any) {
    const { errMsg } = props;
    const [showError, setShowError] = useState(false)
    const classes = showError ? styles.errMsg : styles.hide

    function toggleError(){
        setShowError(!showError)
    }

    useEffect(() => {
      if (errMsg !== "") {
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
        }, 4000)
      }
    }, [errMsg])
    

    
  return (
    <>
        {<div className={classes} >{errMsg}</div>}
        <button  onClick={toggleError}>Click To show error</button>
    </>
  )
}
