export default function Loading() {
  return (
    <div className="min-h-screen bg-pure-black flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-20 h-20 border-4 border-royal-blue/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-royal-blue rounded-full animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="font-heading font-bold text-2xl text-royal-blue animate-pulse mb-4">Carregando...</div>
        <div className="font-body text-gray-300">Preparando uma experiência extraordinária</div>
      </div>
    </div>
  )
}
