interface ScoreDisplayProps {
  score: number
  totalAnswered: number
}

export const ScoreDisplay = ({ score, totalAnswered }: ScoreDisplayProps) => {
  if (totalAnswered === 0) return null

  return (
    <div className="mb-4 text-center">
      <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
        Score: {score} / {totalAnswered} ({Math.round((score / totalAnswered) * 100)}%)
      </div>
    </div>
  )
}

