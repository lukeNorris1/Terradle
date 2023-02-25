import styles from './FinishedRow.module.css'

type prop = {
    word: string
}

export default function FinishedRow(props: prop) {
    const { word } = props
  return (
    <div className={styles.classes}>
        {[...word].map((letter, i) => (
            <div className={styles.cell} key={i}>{letter}</div>
        ))}
    </div>
  )
}
