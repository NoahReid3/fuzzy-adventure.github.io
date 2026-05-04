import { GameType } from '../types'
import { gameTitles } from '../data/gameConfig'

const ENABLED_GAMES: Exclude<GameType, null>[] = [
  'solubility',
  'game2',
  'game4',
  'game5',
  'game6',
]

interface GameMenuProps {
  onGameSelect: (game: GameType) => void
}

export const GameMenu = ({ onGameSelect }: GameMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Select a Game
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {ENABLED_GAMES.map((game) => (
            <button
              key={game}
              type="button"
              onClick={() => onGameSelect(game)}
              className="px-6 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all transform bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
            >
              {gameTitles[game]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
