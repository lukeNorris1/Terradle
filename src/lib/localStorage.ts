import { Buffer } from 'buffer'
const gameStateKey = 'gameState'

export type StoredGameState = {
  obfSolution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(
    gameStateKey,
    JSON.stringify({
      obfSolution: Buffer.from(gameState.obfSolution, 'utf-8').toString(
        'base64'
      ),
    })
  )
}



export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  if (state) {
      let nextState: StoredGameState = JSON.parse(state)
    nextState = {
      obfSolution: Buffer.from(nextState.obfSolution, 'base64').toString(
        'utf-8'
      ),
    }
    return nextState
  }
  return null
}

export const resetGameStateToLocalStorage = () => {
  localStorage.setItem(
    gameStateKey,
    JSON.stringify({
      obfSolution: undefined
    })
  )
}
