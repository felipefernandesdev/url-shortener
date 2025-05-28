'use client'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={() => window.location.href = "/urls"}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold text-lg"
      >
        🚀 Clique aqui para encurtar URL!
      </button>
    </div>
  );
}
