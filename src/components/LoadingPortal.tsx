import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface LoadingPortalProps {
  onComplete: () => void;
}

export function LoadingPortal({ onComplete }: LoadingPortalProps) {
  const [stage, setStage] = useState<'loading' | 'portal' | 'opening'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Stage transitions
    const stage1Timer = setTimeout(() => setStage('portal'), 1500);
    const stage2Timer = setTimeout(() => setStage('opening'), 2500);
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920;
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: randomX,
                y: randomY,
                opacity: Math.random(),
              }}
              animate={{
                opacity: [Math.random(), Math.random(), Math.random()],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* Portal container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Portal rings */}
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
          {/* Outer rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                width: `${80 + i * 15}%`,
                height: `${80 + i * 15}%`,
                borderColor: i % 2 === 0 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(168, 85, 247, 0.4)',
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: stage === 'opening' ? [1, 1.2, 1.5] : 1,
                opacity: stage === 'opening' ? [1, 0.5, 0] : 1,
              }}
              transition={{
                rotate: {
                  duration: 10 - i,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 1,
                  ease: "easeOut",
                },
                opacity: {
                  duration: 1,
                  ease: "easeOut",
                },
              }}
            />
          ))}

          {/* Center portal glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: stage === 'opening' ? [1, 2.5] : [0.8, 1.2, 0.8],
              opacity: stage === 'opening' ? [1, 0] : [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: stage === 'opening' ? 1 : 2,
              repeat: stage === 'opening' ? 0 : Infinity,
              ease: stage === 'opening' ? "easeOut" : "easeInOut",
            }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
          </motion.div>

          {/* Center portal circle */}
          <motion.div
            className="relative z-20 flex items-center justify-center"
            animate={{
              scale: stage === 'opening' ? [1, 15] : 1,
              opacity: stage === 'opening' ? [1, 1, 0] : 1,
            }}
            transition={{
              duration: stage === 'opening' ? 1 : 0,
              ease: "easeOut",
            }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-cyan-400/50 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
              {stage === 'loading' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12 text-cyan-400" />
                </motion.div>
              )}
              {stage === 'portal' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap className="w-12 h-12 text-purple-400" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Orbiting particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-cyan-400"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [
                  0,
                  Math.cos((i * Math.PI * 2) / 8) * 100,
                  Math.cos((i * Math.PI * 2) / 8 + Math.PI * 2) * 100,
                  0,
                ],
                y: [
                  0,
                  Math.sin((i * Math.PI * 2) / 8) * 100,
                  Math.sin((i * Math.PI * 2) / 8 + Math.PI * 2) * 100,
                  0,
                ],
                opacity: stage === 'opening' ? [1, 0] : [0, 1, 1, 0],
                scale: stage === 'opening' ? [1, 2] : [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: stage === 'opening' ? 0 : Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {stage === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Initializing Portal
              </h2>
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-cyan-300/60 mt-2">{progress}%</p>
            </motion.div>
          )}
          
          {stage === 'portal' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Portal Established
              </h2>
              <p className="text-purple-300/80">
                Connecting to Martian Network...
              </p>
            </motion.div>
          )}

          {stage === 'opening' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Opening Portal
              </h2>
            </motion.div>
          )}
        </motion.div>

        {/* Energy lines radiating outward */}
        {stage === 'opening' && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute w-1 bg-gradient-to-b from-cyan-400 to-transparent"
                style={{
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top center',
                  rotate: `${(i * 360) / 12}deg`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Screen flash effect */}
      {stage === 'opening' && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1, times: [0, 0.5, 1] }}
        />
      )}
    </motion.div>
  );
}
