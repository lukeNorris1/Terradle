import styles  from './EmptyRow.module.css'

type prop = {
  chosenWord: string;
}

export default function EmptyRow(props: prop) {
  const { chosenWord } = props

  return (
    <>
        <div className={styles.classes}>
        {[...Array(chosenWord.length)].map((_, i) => (
            <div className={styles.cell} key={i}>{""}</div>
        ))}
        </div>
    </>
  )
}
