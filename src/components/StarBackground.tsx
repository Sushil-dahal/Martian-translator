import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    interface Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    const stars: Star[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.5,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Animation
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        // Twinkling effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        star.opacity = 0.3 + twinkle * 0.7;

        // Slow downward movement
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Gradient for glow effect
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3
        );
        
        const colors = [
          `rgba(100, 255, 255, ${star.opacity})`,
          `rgba(200, 100, 255, ${star.opacity * 0.7})`,
          `rgba(255, 100, 200, ${star.opacity * 0.7})`,
        ];
        const color = colors[Math.floor(star.x * 3 / canvas.width)];
        
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
      
      {/* Floating nebula clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-1/3 w-[25rem] h-[25rem] bg-pink-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
        const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000;
        const randomX2 = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
        const randomY2 = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000;
        const randomX3 = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
        const randomY3 = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000;
        
        return (
          <motion.div
            key={i}
            className="fixed w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: randomX,
              y: randomY,
            }}
            animate={{
              y: [randomY, randomY2, randomY3],
              x: [randomX, randomX2, randomX3],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </>
  );
}