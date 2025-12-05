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
