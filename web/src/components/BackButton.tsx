interface BackButtonProps {
  onClick: () => void
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mb-4 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
    >
      ← Back to Menu
    </button>
  )
}

