import { motion } from 'motion/react';

export function Spaceship() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <motion.div
        className="absolute left-1/2"
        initial={{
          x: '-50%',
          y: '150%',
          scale: 0.1,
          rotateX: 75,
        }}
        animate={{
          y: [
            '150%',
            '80%',
            '50%',
            '20%',
            '-120%',  // Extended to ensure entire ship exits
          ],
          scale: [
            0.1,
            0.5,
            1,
            1.2,
            1.3,
          ],
          rotateX: [
            75,
            60,
            45,
            20,
            0,
          ],
        }}
        transition={{
          duration: 25,  // Increased duration for longer animation
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.2, 0.45, 0.7, 1],
          repeatDelay: 2,
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 blur-3xl opacity-60"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <SpaceshipGlow />
          </motion.div>

          <SpaceshipSVG />

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <EngineTrails />
          </motion.div>

          {/* Left Booster Engine Trails */}
          <motion.div
            className="absolute top-1/2"
            style={{ left: '18.75%' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BoosterTrails />
          </motion.div>

          {/* Right Booster Engine Trails */}
          <motion.div
            className="absolute top-1/2"
            style={{ left: '81.25%' }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BoosterTrails />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function SpaceshipSVG() {
  return (
    <svg
      width="800"
      height="800"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      {/* Main Hull - Detailed Structure */}
      
      {/* Back outer ring */}
      <ellipse cx="400" cy="600" rx="180" ry="40" fill="url(#hull-dark)" opacity="0.9" />
      <ellipse cx="400" cy="600" rx="160" ry="35" fill="url(#hull-metal)" />
      
      {/* Main body central structure */}
      <path
        d="M 400 150 L 480 250 L 500 400 L 480 550 L 400 650 L 320 550 L 300 400 L 320 250 Z"
        fill="url(#main-body)"
        stroke="rgba(100, 150, 200, 0.6)"
        strokeWidth="2"
      />
      
      {/* Side panels - left */}
      <path
        d="M 320 250 L 250 280 L 220 400 L 250 520 L 320 550 L 300 400 Z"
        fill="url(#side-panel)"
        stroke="rgba(80, 120, 180, 0.5)"
        strokeWidth="1.5"
      />
      
      {/* Side panels - right */}
      <path
        d="M 480 250 L 550 280 L 580 400 L 550 520 L 480 550 L 500 400 Z"
        fill="url(#side-panel)"
        stroke="rgba(80, 120, 180, 0.5)"
        strokeWidth="1.5"
      />
      
      {/* Wing extensions */}
      <ellipse cx="200" cy="400" rx="60" ry="180" fill="url(#wing-metal)" opacity="0.85" />
      <ellipse cx="600" cy="400" rx="60" ry="180" fill="url(#wing-metal)" opacity="0.85" />
      
      {/* Rocket Boosters - LEFT SIDE */}
      <g>
        {/* Left booster main body */}
        <ellipse cx="150" cy="400" rx="35" ry="200" fill="url(#booster-body)" 
                 stroke="rgba(80, 120, 180, 0.7)" strokeWidth="2" />
        <ellipse cx="150" cy="400" rx="28" ry="190" fill="url(#booster-inner)" />
        
        {/* Left booster nose cone */}
        <path d="M 150 200 L 165 230 L 165 250 L 150 245 L 135 250 L 135 230 Z" 
              fill="url(#booster-nose)" stroke="rgba(100, 150, 200, 0.6)" strokeWidth="1.5" />
        
        {/* Left booster engine nozzle */}
        <ellipse cx="150" cy="600" rx="32" ry="25" fill="url(#booster-nozzle)" 
                 stroke="rgba(60, 80, 120, 0.8)" strokeWidth="2" />
        <ellipse cx="150" cy="600" rx="25" ry="20" fill="url(#engine-core)" />
        <circle cx="150" cy="600" r="18" fill="rgba(34, 211, 238, 0.8)" />
        <circle cx="150" cy="600" r="12" fill="rgba(255, 255, 255, 0.9)" />
        
        {/* Left booster details */}
        <rect x="135" y="350" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="135" y="400" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="135" y="450" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        
        {/* Left booster stripes */}
        <line x1="150" y1="260" x2="150" y2="580" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" />
        <line x1="140" y1="270" x2="140" y2="570" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
        <line x1="160" y1="270" x2="160" y2="570" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
      </g>
      
      {/* Rocket Boosters - RIGHT SIDE */}
      <g>
        {/* Right booster main body */}
        <ellipse cx="650" cy="400" rx="35" ry="200" fill="url(#booster-body)" 
                 stroke="rgba(80, 120, 180, 0.7)" strokeWidth="2" />
        <ellipse cx="650" cy="400" rx="28" ry="190" fill="url(#booster-inner)" />
        
        {/* Right booster nose cone */}
        <path d="M 650 200 L 665 230 L 665 250 L 650 245 L 635 250 L 635 230 Z" 
              fill="url(#booster-nose)" stroke="rgba(100, 150, 200, 0.6)" strokeWidth="1.5" />
        
        {/* Right booster engine nozzle */}
        <ellipse cx="650" cy="600" rx="32" ry="25" fill="url(#booster-nozzle)" 
                 stroke="rgba(60, 80, 120, 0.8)" strokeWidth="2" />
        <ellipse cx="650" cy="600" rx="25" ry="20" fill="url(#engine-core)" />
        <circle cx="650" cy="600" r="18" fill="rgba(34, 211, 238, 0.8)" />
        <circle cx="650" cy="600" r="12" fill="rgba(255, 255, 255, 0.9)" />
        
        {/* Right booster details */}
        <rect x="635" y="350" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="635" y="400" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="635" y="450" width="30" height="4" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        
        {/* Right booster stripes */}
        <line x1="650" y1="260" x2="650" y2="580" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" />
        <line x1="640" y1="270" x2="640" y2="570" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
        <line x1="660" y1="270" x2="660" y2="570" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1.5" />
      </g>
      
      {/* Wing details and vents */}
      <g opacity="0.7">
        <rect x="170" y="320" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="170" y="340" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="170" y="360" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="170" y="440" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="170" y="460" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="170" y="480" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        
        <rect x="570" y="320" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="570" y="340" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="570" y="360" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="570" y="440" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="570" y="460" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
        <rect x="570" y="480" width="60" height="8" fill="rgba(34, 211, 238, 0.4)" rx="2" />
      </g>
      
      {/* Central spine/keel */}
      <rect x="390" y="150" width="20" height="500" fill="url(#spine-gradient)" rx="3" />
      <rect x="385" y="150" width="30" height="500" fill="url(#spine-glow)" opacity="0.3" rx="5" />
      
      {/* Underside hull panels */}
      <g opacity="0.85">
        <rect x="340" y="300" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
        <rect x="410" y="300" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
        
        <rect x="340" y="400" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
        <rect x="410" y="400" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
        
        <rect x="340" y="500" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
        <rect x="410" y="500" width="50" height="80" fill="url(#panel-underside)" rx="4" 
              stroke="rgba(100, 150, 200, 0.3)" strokeWidth="1" />
      </g>
      
      {/* Panel grid details */}
      <g opacity="0.4" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1">
        <line x1="350" y1="310" x2="350" y2="370" />
        <line x1="360" y1="310" x2="360" y2="370" />
        <line x1="370" y1="310" x2="370" y2="370" />
        <line x1="380" y1="310" x2="380" y2="370" />
        
        <line x1="420" y1="310" x2="420" y2="370" />
        <line x1="430" y1="310" x2="430" y2="370" />
        <line x1="440" y1="310" x2="440" y2="370" />
        <line x1="450" y1="310" x2="450" y2="370" />
      </g>
      
      {/* Main engines - rear */}
      <circle cx="350" cy="620" r="35" fill="url(#engine-core)" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
      <circle cx="400" cy="630" r="45" fill="url(#engine-core)" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
      <circle cx="450" cy="620" r="35" fill="url(#engine-core)" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="2" />
      
      {/* Engine inner glow */}
      <circle cx="350" cy="620" r="25" fill="rgba(34, 211, 238, 0.8)" />
      <circle cx="400" cy="630" r="32" fill="rgba(34, 211, 238, 0.8)" />
      <circle cx="450" cy="620" r="25" fill="rgba(34, 211, 238, 0.8)" />
      
      <circle cx="350" cy="620" r="15" fill="rgba(255, 255, 255, 0.9)" />
      <circle cx="400" cy="630" r="20" fill="rgba(255, 255, 255, 0.9)" />
      <circle cx="450" cy="620" r="15" fill="rgba(255, 255, 255, 0.9)" />
      
      {/* Maneuvering thrusters */}
      <circle cx="280" cy="350" r="12" fill="url(#thruster-glow)" />
      <circle cx="280" cy="450" r="12" fill="url(#thruster-glow)" />
      <circle cx="520" cy="350" r="12" fill="url(#thruster-glow)" />
      <circle cx="520" cy="450" r="12" fill="url(#thruster-glow)" />
      
      {/* Cockpit/Bridge section */}
      <ellipse cx="400" cy="180" rx="50" ry="35" fill="url(#cockpit-glass)" 
               stroke="rgba(100, 150, 200, 0.8)" strokeWidth="2" />
      <ellipse cx="400" cy="180" rx="40" ry="28" fill="rgba(34, 211, 238, 0.2)" />
      <ellipse cx="400" cy="180" rx="30" ry="20" fill="rgba(168, 85, 247, 0.3)" />
      
      {/* Cockpit frame */}
      <path d="M 360 180 Q 400 160 440 180" stroke="rgba(100, 150, 200, 0.6)" strokeWidth="3" fill="none" />
      <path d="M 360 180 Q 400 200 440 180" stroke="rgba(100, 150, 200, 0.6)" strokeWidth="3" fill="none" />
      
      {/* Technical details and vents */}
      <g opacity="0.6">
        <rect x="380" y="250" width="40" height="3" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="375" y="260" width="50" height="3" fill="rgba(34, 211, 238, 0.5)" rx="1" />
        <rect x="380" y="270" width="40" height="3" fill="rgba(34, 211, 238, 0.5)" rx="1" />
      </g>
      
      {/* Hull lights/windows */}
      <g>
        <circle cx="330" cy="300" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="330" cy="320" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="330" cy="340" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="330" cy="360" r="4" fill="rgba(255, 200, 100, 0.8)" />
        
        <circle cx="470" cy="300" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="470" cy="320" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="470" cy="340" r="4" fill="rgba(255, 200, 100, 0.8)" />
        <circle cx="470" cy="360" r="4" fill="rgba(255, 200, 100, 0.8)" />
      </g>
      
      {/* Alien markings */}
      <text x="400" y="520" fontSize="28" fill="rgba(168, 85, 247, 0.7)" textAnchor="middle" 
            fontFamily="monospace" fontWeight="bold">⌇⎍⌇⊑⟟⌰</text>
      <text x="400" y="555" fontSize="20" fill="rgba(34, 211, 238, 0.6)" textAnchor="middle" 
            fontFamily="monospace"> ⎅⏃⊑⏃⌰</text>
      
      {/* Energy conduits */}
      <g opacity="0.5">
        <line x1="400" y1="200" x2="400" y2="600" stroke="url(#energy-flow)" strokeWidth="4" />
        <line x1="350" y1="250" x2="350" y2="600" stroke="url(#energy-flow-side)" strokeWidth="2" />
        <line x1="450" y1="250" x2="450" y2="600" stroke="url(#energy-flow-side)" strokeWidth="2" />
      </g>
      
      {/* Armor plating highlights */}
      <g opacity="0.3" stroke="rgba(200, 200, 255, 0.4)" strokeWidth="1.5" fill="none">
        <path d="M 320 260 L 400 250 L 480 260" />
        <path d="M 310 350 L 400 340 L 490 350" />
        <path d="M 310 450 L 400 440 L 490 450" />
        <path d="M 320 540 L 400 530 L 480 540" />
      </g>
      
      <defs>
        {/* Gradients */}
        <linearGradient id="main-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(120, 140, 180, 0.95)" />
          <stop offset="30%" stopColor="rgba(80, 100, 140, 0.9)" />
          <stop offset="70%" stopColor="rgba(60, 80, 120, 0.92)" />
          <stop offset="100%" stopColor="rgba(40, 60, 100, 0.95)" />
        </linearGradient>
        
        <linearGradient id="hull-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(30, 40, 60, 0.95)" />
          <stop offset="100%" stopColor="rgba(20, 30, 50, 1)" />
        </linearGradient>
        
        <linearGradient id="hull-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(80, 100, 130, 0.9)" />
          <stop offset="50%" stopColor="rgba(100, 120, 150, 0.95)" />
          <stop offset="100%" stopColor="rgba(80, 100, 130, 0.9)" />
        </linearGradient>
        
        <linearGradient id="side-panel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(60, 80, 110, 0.85)" />
          <stop offset="50%" stopColor="rgba(80, 100, 130, 0.9)" />
          <stop offset="100%" stopColor="rgba(60, 80, 110, 0.85)" />
        </linearGradient>
        
        <linearGradient id="wing-metal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(70, 90, 120, 0.9)" />
          <stop offset="50%" stopColor="rgba(50, 70, 100, 0.95)" />
          <stop offset="100%" stopColor="rgba(40, 60, 90, 0.9)" />
        </linearGradient>
        
        <linearGradient id="spine-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(100, 120, 150, 0.9)" />
          <stop offset="50%" stopColor="rgba(60, 80, 110, 0.95)" />
          <stop offset="100%" stopColor="rgba(40, 60, 90, 0.9)" />
        </linearGradient>
        
        <linearGradient id="spine-glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.6)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0.6)" />
        </linearGradient>
        
        <linearGradient id="panel-underside" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(40, 50, 70, 0.95)" />
          <stop offset="50%" stopColor="rgba(30, 40, 60, 1)" />
          <stop offset="100%" stopColor="rgba(35, 45, 65, 0.95)" />
        </linearGradient>
        
        <radialGradient id="engine-core">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="30%" stopColor="rgba(34, 211, 238, 0.8)" />
          <stop offset="70%" stopColor="rgba(168, 85, 247, 0.6)" />
          <stop offset="100%" stopColor="rgba(60, 80, 120, 0.8)" />
        </radialGradient>
        
        <radialGradient id="thruster-glow">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.9)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0.3)" />
        </radialGradient>
        
        <linearGradient id="cockpit-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(150, 200, 255, 0.6)" />
          <stop offset="50%" stopColor="rgba(100, 150, 200, 0.7)" />
          <stop offset="100%" stopColor="rgba(80, 120, 180, 0.8)" />
        </linearGradient>
        
        <linearGradient id="energy-flow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
        
        <linearGradient id="energy-flow-side" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
          <stop offset="50%" stopColor="rgba(34, 211, 238, 0.5)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
        
        <linearGradient id="booster-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(50, 70, 100, 0.9)" />
          <stop offset="50%" stopColor="rgba(70, 90, 120, 0.95)" />
          <stop offset="100%" stopColor="rgba(50, 70, 100, 0.9)" />
        </linearGradient>
        
        <linearGradient id="booster-inner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(30, 50, 80, 0.95)" />
          <stop offset="50%" stopColor="rgba(50, 70, 100, 1)" />
          <stop offset="100%" stopColor="rgba(35, 55, 85, 0.95)" />
        </linearGradient>
        
        <linearGradient id="booster-nose" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(100, 120, 150, 0.9)" />
          <stop offset="50%" stopColor="rgba(60, 80, 110, 0.95)" />
          <stop offset="100%" stopColor="rgba(40, 60, 90, 0.9)" />
        </linearGradient>
        
        <linearGradient id="booster-nozzle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SpaceshipGlow() {
  return (
    <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
      <ellipse cx="400" cy="400" rx="200" ry="280" fill="rgba(34, 211, 238, 0.25)" />
      <ellipse cx="400" cy="400" rx="150" ry="220" fill="rgba(168, 85, 247, 0.2)" />
      <ellipse cx="400" cy="600" rx="120" ry="80" fill="rgba(34, 211, 238, 0.4)" />
      <circle cx="400" cy="630" r="60" fill="rgba(255, 255, 255, 0.3)" />
    </svg>
  );
}

function EngineTrails() {
  return (
    <svg width="300" height="500" viewBox="0 0 300 500" fill="none" className="absolute" style={{ top: '85%' }}>
      <motion.path
        d="M 80 0 Q 75 120 80 250 Q 85 380 80 500"
        stroke="url(#trail-gradient-1)"
        strokeWidth="14"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
      />
      
      <motion.path
        d="M 150 0 Q 150 120 150 250 Q 150 380 150 500"
        stroke="url(#trail-gradient-2)"
        strokeWidth="18"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.1 }}
      />
      
      <motion.path
        d="M 220 0 Q 225 120 220 250 Q 215 380 220 500"
        stroke="url(#trail-gradient-1)"
        strokeWidth="14"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.05 }}
      />
      
      <defs>
        <linearGradient id="trail-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="20%" stopColor="rgba(34, 211, 238, 0.8)" />
          <stop offset="60%" stopColor="rgba(168, 85, 247, 0.4)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
        
        <linearGradient id="trail-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="20%" stopColor="rgba(255, 150, 200, 0.9)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
          <stop offset="80%" stopColor="rgba(34, 211, 238, 0.3)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BoosterTrails() {
  return (
    <svg width="60" height="500" viewBox="0 0 60 500" fill="none" className="absolute" style={{ top: '85%' }}>
      {/* Single booster trail - centered */}
      <motion.path
        d="M 30 0 Q 30 120 30 250 Q 30 380 30 500"
        stroke="url(#booster-trail-gradient)"
        strokeWidth="12"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.85, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.05 }}
      />
      
      <defs>
        <linearGradient id="booster-trail-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="20%" stopColor="rgba(34, 211, 238, 0.8)" />
          <stop offset="60%" stopColor="rgba(168, 85, 247, 0.5)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
