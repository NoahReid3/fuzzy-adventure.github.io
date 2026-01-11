import { GameType } from '../types'
import { gameTitles } from '../data/gameConfig'

interface GameMenuProps {
  onGameSelect: (game: GameType) => void
}

export const GameMenu = ({ onGameSelect }: GameMenuProps) => {
  const handleGameSelect = (game: GameType) => {
    if (game === 'solubility' || game === 'game2' || game === 'game3') {
      onGameSelect(game)
    }
    // Other games will be implemented later
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Select a Game
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {(['solubility', 'game2', 'game3', 'game4', 'game5', 'game6'] as Exclude<GameType, null>[]).map((game) => (
            <button
              key={game}
              onClick={() => handleGameSelect(game)}
              disabled={game !== 'solubility' && game !== 'game2' && game !== 'game3'}
              className={`px-6 py-4 text-xl font-semibold rounded-xl shadow-lg transition-all transform ${
                game === 'solubility' || game === 'game2' || game === 'game3'
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              }`}
            >
              {gameTitles[game as Exclude<GameType, null>]}
              {game !== 'solubility' && game !== 'game2' && game !== 'game3' && (
                <span className="block text-sm mt-1 font-normal">Coming Soon</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

