import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  size: number;
  type: 'star' | 'dot' | 'glow';
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
}

export const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // Create various sparkles
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 60; i++) {
      const types: ('star' | 'dot' | 'glow')[] = ['star', 'dot', 'glow'];
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        size: 2 + Math.random() * 6,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    setSparkles(newSparkles);

    // Create shooting stars
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < 4; i++) {
      newShootingStars.push({
        id: i,
        startX: 10 + Math.random() * 40,
        startY: 5 + Math.random() * 30,
        delay: i * 3 + Math.random() * 2,
      });
    }
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs in background */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(43, 74%, 50%) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '60%', '-20%'],
          y: ['10%', '50%', '10%'],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(220, 70%, 50%) 0%, transparent 70%)',
          filter: 'blur(50px)',
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          x: ['20%', '-40%', '20%'],
          y: ['-10%', '30%', '-10%'],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: sparkle.type === 'glow' ? 3 : 2,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          {sparkle.type === 'star' ? (
            <svg 
              width={sparkle.size * 2} 
              height={sparkle.size * 2} 
              viewBox="0 0 24 24" 
              fill="hsl(43, 74%, 75%)"
              style={{ filter: 'drop-shadow(0 0 4px hsl(43, 74%, 70%))' }}
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          ) : sparkle.type === 'glow' ? (
            <div
              style={{
                width: sparkle.size * 2,
                height: sparkle.size * 2,
                background: 'radial-gradient(circle, hsl(43, 74%, 80%) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }}
            />
          ) : (
            <div
              style={{
                width: sparkle.size,
                height: sparkle.size,
                backgroundColor: 'hsl(43, 74%, 75%)',
                borderRadius: '50%',
                boxShadow: '0 0 8px hsl(43, 74%, 70%)',
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-[2px] w-16 origin-left"
          style={{
            background: 'linear-gradient(90deg, hsl(43, 74%, 80%), transparent)',
            boxShadow: '0 0 10px hsl(43, 74%, 70%)',
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            rotate: '35deg',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
            x: [0, 200],
            y: [0, 120],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            delay: star.delay,
            repeatDelay: 8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute w-1 h-1 rounded-full bg-gold-light/60"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: '-5%',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 6,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
