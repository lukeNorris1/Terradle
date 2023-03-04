const gameStateKey = 'gameState'

export type StoredGameState = {
  currentGuesses: string[],
  gameSolution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(
    gameStateKey,
    JSON.stringify({
      currentGuesses: gameState.currentGuesses,
      gameSolution: gameState.gameSolution
    })
  )
}



export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  if (state) {
      let nextState: StoredGameState = JSON.parse(state)
    nextState = {
      currentGuesses: nextState.currentGuesses,
      gameSolution: nextState.gameSolution
    }
    return nextState
  }
  return null
}

export const resetGameStateToLocalStorage = () => {
  localStorage.setItem(
    gameStateKey,
    JSON.stringify({
      currentGuesses: undefined,
      gameSolution: undefined
    })
  )
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}
