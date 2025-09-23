export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-3">
        {/* Spinner */}
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

        {/* Texto */}
        <p className="text-gray-600 text-sm font-medium">Carregando...</p>
      </div>
    </div>
  )
}
