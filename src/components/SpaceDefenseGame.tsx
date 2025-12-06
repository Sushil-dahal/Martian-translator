import { useState, useEffect, useRef, useCallback } from 'react';
import { Rocket, X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  letter: string; // Add alien letter
}

interface Laser {
  id: number;
  x: number;
  y: number;
}

export default function SpaceDefenseGame() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Position>({ x: 0, y: 0 });
  const asteroidsRef = useRef<Asteroid[]>([]);
  const lasersRef = useRef<Laser[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const animationRef = useRef<number>();
  const lastAsteroidSpawn = useRef<number>(0);
  const nextLaserId = useRef<number>(0);
  const nextAsteroidId = useRef<number>(0);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PLAYER_SIZE = 48; // Slightly larger for detail
  const PLAYER_SPEED = 9; // Increased speed for better feel
  const LASER_SPEED = 10;
  const ASTEROID_SPAWN_INTERVAL = 1000;
  
  // Alien alphabet for asteroids
  const ALIEN_LETTERS = ['⏃', '⏚', '☊', '⎅', '⟒', '⎎', '⊑', '⟟', '⟊', '☍', '⌰', '⋔', '⋏', '⍜', '⌿', '⍾', '⍀', '⌇', '⏁', '⎍', '⎐', '⍙', '⌖', '⊬', '⋉'];

  // Initialize player position
  const initGame = useCallback(() => {
    playerRef.current = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 80 };
    asteroidsRef.current = [];
    lasersRef.current = [];
    setScore(0);
    setIsGameOver(false);
    setGameStarted(true);
    lastAsteroidSpawn.current = Date.now();
  }, []);

  // Draw Upgrade: Detailed Spaceship
  const drawPlayer = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = playerRef.current;
    
    ctx.save();
    ctx.translate(x, y);
    
    // 1. Dynamic Engine Thruster (Flickering effect)
    const flicker = Math.random() * 0.4 + 0.8;
    ctx.fillStyle = '#ff4d00'; // Orange core
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff4d00';
    ctx.beginPath();
    ctx.moveTo(-6, PLAYER_SIZE / 2);
    ctx.lineTo(6, PLAYER_SIZE / 2);
    ctx.lineTo(0, PLAYER_SIZE / 2 + 25 * flicker);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // 2. Wings (Deep Purple/Metal)
    ctx.fillStyle = '#2d1b4e';
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Left Wing
    ctx.moveTo(0, -PLAYER_SIZE / 2);
    ctx.lineTo(-PLAYER_SIZE / 1.5, PLAYER_SIZE / 2);
    ctx.lineTo(-PLAYER_SIZE / 4, PLAYER_SIZE / 2 - 10);
    // Right Wing
    ctx.lineTo(PLAYER_SIZE / 4, PLAYER_SIZE / 2 - 10);
    ctx.lineTo(PLAYER_SIZE / 1.5, PLAYER_SIZE / 2);
    ctx.lineTo(0, -PLAYER_SIZE / 2);
    ctx.fill();
    ctx.stroke();

    // 3. Main Fuselage (Sleek body)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(0, -PLAYER_SIZE / 2 - 10); // Nose tip
    ctx.lineTo(PLAYER_SIZE / 4, PLAYER_SIZE / 2);
    ctx.lineTo(-PLAYER_SIZE / 4, PLAYER_SIZE / 2);
    ctx.fill();
    
    // Fuselage Highlights
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Cockpit (Glowing Glass)
    ctx.fillStyle = '#ccfbf1'; // Light cyan
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.ellipse(0, -5, 6, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Weapon Pods (Pink glow tips)
    ctx.fillStyle = '#d946ef';
    ctx.beginPath();
    ctx.rect(-PLAYER_SIZE/1.5, PLAYER_SIZE/2 - 5, 4, 8);
    ctx.rect(PLAYER_SIZE/1.5 - 4, PLAYER_SIZE/2 - 5, 4, 8);
    ctx.fill();
    
    ctx.restore();
  };

  // Draw asteroid
  const drawAsteroid = (ctx: CanvasRenderingContext2D, asteroid: Asteroid) => {
    ctx.save();
    ctx.translate(asteroid.x, asteroid.y);
    ctx.rotate(asteroid.rotation);
    
    // Asteroid shape
    ctx.fillStyle = '#3f3f46'; // Zinc-700
    ctx.strokeStyle = '#71717a'; // Zinc-500
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    const sides = 8;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const radius = asteroid.size * (0.8 + Math.sin(i * 3) * 0.1); // Irregular shape
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Craters (Detail)
    ctx.fillStyle = '#27272a'; // Zinc-800
    ctx.beginPath();
    ctx.arc(asteroid.size / 4, -asteroid.size / 4, asteroid.size / 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Alien Letter
    ctx.fillStyle = '#ff4d00'; // Orange
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(asteroid.letter, 0, 0);
    
    ctx.restore();
  };

  // Draw laser
  const drawLaser = (ctx: CanvasRenderingContext2D, laser: Laser) => {
    // Laser Core
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(laser.x - 2, laser.y - 25, 4, 25);
    
    // Laser Glow (Outer)
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#d946ef'; // Fuchsia glow
    ctx.fillStyle = '#d946ef';
    ctx.fillRect(laser.x - 4, laser.y - 25, 8, 25);
    ctx.shadowBlur = 0;
  };

  // Spawn asteroid
  const spawnAsteroid = () => {
    const asteroid: Asteroid = {
      id: nextAsteroidId.current++,
      x: Math.random() * (CANVAS_WIDTH - 60) + 30,
      y: -50,
      size: 20 + Math.random() * 25,
      speed: 1.5 + Math.random() * 2 + (score * 0.01), // Decreased speed (was 2 + 3)
      rotation: 0,
      letter: ALIEN_LETTERS[Math.floor(Math.random() * ALIEN_LETTERS.length)] // Random alien letter
    };
    asteroidsRef.current.push(asteroid);
  };

  // Shoot laser
  const shootLaser = () => {
    const laser: Laser = {
      id: nextLaserId.current++,
      x: playerRef.current.x,
      y: playerRef.current.y - PLAYER_SIZE / 2
    };
    lasersRef.current.push(laser);
  };

  // Check collision between laser and asteroid
  const checkCollision = (laser: Laser, asteroid: Asteroid): boolean => {
    const dx = laser.x - asteroid.x;
    const dy = laser.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < asteroid.size + 5;
  };

  // Check collision between player and asteroid
  const checkPlayerCollision = (asteroid: Asteroid): boolean => {
    const dx = playerRef.current.x - asteroid.x;
    const dy = playerRef.current.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (asteroid.size + PLAYER_SIZE / 2.5);
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isGameOver) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update player position
    if (keysRef.current['ArrowLeft'] && playerRef.current.x > PLAYER_SIZE) {
      playerRef.current.x -= PLAYER_SPEED;
    }
    if (keysRef.current['ArrowRight'] && playerRef.current.x < CANVAS_WIDTH - PLAYER_SIZE) {
      playerRef.current.x += PLAYER_SPEED;
    }

    // Spawn asteroids
    const currentSpawnRate = Math.max(200, ASTEROID_SPAWN_INTERVAL - (score * 2)); // Spawn faster as score goes up
    if (Date.now() - lastAsteroidSpawn.current > currentSpawnRate) {
      spawnAsteroid();
      lastAsteroidSpawn.current = Date.now();
    }

    // Update asteroids
    asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
      asteroid.y += asteroid.speed;
      asteroid.rotation += 0.02;
      
      // Check collision with player
      if (checkPlayerCollision(asteroid)) {
        setIsGameOver(true);
        return false;
      }
      
      return asteroid.y < CANVAS_HEIGHT + 100;
    });

    // Update lasers and check collisions
    lasersRef.current = lasersRef.current.filter(laser => {
      laser.y -= LASER_SPEED;
      
      let hit = false;
      asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
        if (checkCollision(laser, asteroid)) {
          hit = true;
          setScore(prev => prev + 100);
          return false; // Remove asteroid
        }
        return true;
      });
      
      return !hit && laser.y > -50;
    });

    // Draw everything
    asteroidsRef.current.forEach(asteroid => drawAsteroid(ctx, asteroid));
    lasersRef.current.forEach(laser => drawLaser(ctx, laser));
    drawPlayer(ctx);

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [isGameOver, score]);

  // Keyboard controls
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        shootLaser();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted]);

  // Touch controls for mobile
  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const scaledX = (touchX / rect.width) * CANVAS_WIDTH;
      
      if (scaledX < CANVAS_WIDTH / 3) {
        keysRef.current['ArrowLeft'] = true;
      } else if (scaledX > (2 * CANVAS_WIDTH) / 3) {
        keysRef.current['ArrowRight'] = true;
      } else {
        shootLaser();
      }
    };

    const handleTouchEnd = () => {
      keysRef.current['ArrowLeft'] = false;
      keysRef.current['ArrowRight'] = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gameStarted]);

  // Start game loop
  useEffect(() => {
    if (gameStarted && !isGameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, isGameOver, gameLoop]);

  const handleStart = () => {
    setIsGameActive(true);
    initGame();
  };

  const handleClose = () => {
    setIsGameActive(false);
    setGameStarted(false);
    setIsGameOver(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleRestart = () => {
    initGame();
  };

  return (
    <>
      {/* Trigger Button - Bottom Right */}
      {!isGameActive && (
        <button
          onClick={handleStart}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Launch Space Defense Game"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse" />
            <div className="relative bg-gradient-to-br from-purple-600 to-cyan-500 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-white/20">
              <Rocket className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>
        </button>
      )}

      {/* Game Modal */}
      {isGameActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl mx-4">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 md:-right-12 bg-red-500/80 hover:bg-red-600 p-2 rounded-full shadow-lg transition-colors z-20 border border-red-400"
              aria-label="Close game"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Score Display */}
            <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <div className="text-cyan-400 font-mono text-xl tracking-wider font-bold">
                SCORE: <span className="text-white">{score.toString().padStart(6, '0')}</span>
              </div>
            </div>

            {/* Game Canvas Container */}
            <div className="relative bg-[#09090b] rounded-2xl border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden">
              
              {/* Starfield Background Effect (CSS) */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                 <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#000] to-black"></div>
              </div>

              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="w-full h-auto block relative z-10"
                style={{ maxHeight: '80vh', cursor: 'none' }}
              />

              {/* Game Over Overlay */}
              {isGameOver && (
                <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in zoom-in duration-300">
                  <div className="text-center space-y-6 p-8 border border-red-500/30 rounded-2xl bg-black/60 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <h2 className="text-red-500 text-6xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                      MISSION FAILED
                    </h2>
                    <div className="text-cyan-300 text-2xl font-mono">
                      FINAL SCORE: <span className="text-white font-bold">{score}</span>
                    </div>
                    <button
                      onClick={handleRestart}
                      className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 px-10 py-4 rounded-xl text-white font-bold text-lg tracking-wide transition-all transform hover:scale-105 shadow-xl border border-white/10"
                    >
                      RELAUNCH SHIP
                    </button>
                  </div>
                </div>
              )}

              {/* Controls Info */}
              {!isGameOver && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 text-center z-20 pointer-events-none">
                  <p className="text-sm text-cyan-200/80 font-mono">
                    <span className="hidden md:inline">← → MOVE | SPACE TO FIRE</span>
                    <span className="md:hidden">TAP SIDES TO MOVE | TAP CENTER TO FIRE</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
