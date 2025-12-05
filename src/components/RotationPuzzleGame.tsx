import { X, Sparkles, Trophy, Gamepad2, ArrowLeft } from 'lucide-react';

export function RotationPuzzleGame({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black backdrop-blur-md animate-in fade-in duration-300 overflow-auto py-8">
      <div className="relative w-full max-w-3xl mx-4">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:top-4 md:right-4 bg-red-500/90 hover:bg-red-600 p-3 rounded-full shadow-2xl transition-all hover:scale-110 z-20 border-2 border-red-400 shadow-red-500/50"
          aria-label="Close game"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Game Title Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Alien Rotation Puzzle
            </h2>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
          </div>
          <p className="text-cyan-300/80 text-lg">
            Solve the cosmic rotation challenge
          </p>
        </div>

        {/* Main Game Container */}
        <div className="relative">
          {/* Glassmorphic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30 rounded-3xl backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20" />
          
          {/* Content */}
          <div className="relative p-8 md:p-12">
            {/* Decorative Header */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <Gamepad2 className="w-8 h-8 text-purple-400" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
            </div>

            {/* Game Iframe Container */}
            <div className="relative mx-auto" style={{ width: '504px', maxWidth: '100%' }}>
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-40 blur-lg"></div>
              
              {/* Iframe Wrapper */}
              <div className="relative bg-black/60 backdrop-blur-sm border-2 border-cyan-400/40 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/30">
                <iframe
                  src="https://kdata1.com/2019/06/rotate1/"
                  className="block"
                  style={{ width: '504px', height: '504px', maxWidth: '100%' }}
                  title="Alien Rotation Game"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Decorative Footer */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              <Trophy className="w-6 h-6 text-cyan-400" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            </div>

            {/* Instructions */}
            <div className="mt-6 text-center">
              <p className="text-cyan-300/70 text-sm">
                Use your cosmic intuition to solve the puzzle
              </p>
            </div>
          </div>
        </div>

        {/* Back to Translator Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400/80 transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            <ArrowLeft className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 tracking-wider">Back to Translator</span>
          </button>
        </div>

        {/* Bottom Accent */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full border border-cyan-400/30">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-cyan-300/60 text-xs tracking-wider">TRANSMISSION ACTIVE</span>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
