import { motion } from 'motion/react';
import { Delete } from 'lucide-react';

interface AlienKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

export function AlienKeyboard({ onKeyPress, onBackspace }: AlienKeyboardProps) {
  // The alien alphabet
  const alienKeys = [
    { letter: '⏃', label: 'A' },
    { letter: '⏚', label: 'B' },
    { letter: '☊', label: 'C' },
    { letter: '⎅', label: 'D' },
    { letter: '⟒', label: 'E' },
    { letter: '⎎', label: 'F' },
    { letter: '☌', label: 'G' },
    { letter: '⊑', label: 'H' },
    { letter: '⟟', label: 'I' },
    { letter: '⟊', label: 'J' },
    { letter: '☍', label: 'K' },
    { letter: '⌰', label: 'L' },
    { letter: '⋔', label: 'M' },
    { letter: '⋏', label: 'N' },
    { letter: '⍜', label: 'O' },
    { letter: '⌿', label: 'P' },
    { letter: '⍾', label: 'Q' },
    { letter: '⍀', label: 'R' },
    { letter: '⌇', label: 'S' },
    { letter: '⏁', label: 'T' },
    { letter: '⎍', label: 'U' },
    { letter: '⎐', label: 'V' },
    { letter: '⍙', label: 'W' },
    { letter: '⌖', label: 'X' },
    { letter: '⊬', label: 'Y' },
    { letter: '⋉', label: 'Z' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <div className="relative">
        {/* The Glassmorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20 rounded-2xl backdrop-blur-md border border-cyan-500/20 shadow-xl shadow-cyan-500/10" />
        
        {/* Content */}
        <div className="relative p-4 md:p-6">
          {/* The Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-cyan-300 text-sm md:text-base">Alien Keyboard</h3>
            <div className="h-px flex-1 ml-4 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>

          {/* The Keyboard Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-2 mb-3">
            {alienKeys.map(({ letter, label }) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onKeyPress(letter)}
                className="group relative bg-gradient-to-br from-purple-600/30 to-cyan-600/30 hover:from-purple-500/50 hover:to-cyan-500/50 border border-cyan-400/30 hover:border-cyan-400/60 rounded-lg p-2 md:p-3 transition-all shadow-lg hover:shadow-cyan-500/30"
                aria-label={`Type alien letter ${label}`}
              >
                {/* The Glow effect */}
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-lg blur transition-all" />
                
                {/* Letter */}
                <div className="relative flex flex-col items-center gap-0.5">
                  <span className="text-cyan-300 text-lg md:text-2xl">{letter}</span>
                  <span className="text-cyan-500/60 text-[10px] md:text-xs">{label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* The Special Keys Row */}
          <div className="grid grid-cols-3 gap-2">
            {/* The space Bar */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onKeyPress(' ')}
              className="col-span-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-500/50 hover:to-pink-500/50 border border-purple-400/30 hover:border-purple-400/60 rounded-lg p-3 transition-all shadow-lg hover:shadow-purple-500/30"
              aria-label="Space"
            >
              <span className="text-purple-300 text-sm md:text-base">(⌇⌿⏃☊⟒)SPACE</span>
            </motion.button>

            {/* Backspace */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackspace}
              className="bg-gradient-to-r from-red-600/30 to-orange-600/30 hover:from-red-500/50 hover:to-orange-500/50 border border-red-400/30 hover:border-red-400/60 rounded-lg p-3 transition-all shadow-lg hover:shadow-red-500/30 flex items-center justify-center"
              aria-label="Backspace"
            >
              <Delete className="w-5 h-5 text-red-300" />
            </motion.button>
          </div>

          {/* The helper Text */}
          <div className="mt-3 text-center">
            <p className="text-cyan-400/60 text-xs">
              Click any alien letter to type it
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
