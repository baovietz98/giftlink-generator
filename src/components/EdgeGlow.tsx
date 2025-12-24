import { motion } from 'framer-motion';

export const EdgeGlow = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {/* Animated border glow that travels around the edge */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="hsl(43, 74%, 70%)" />
            <stop offset="50%" stopColor="hsl(43, 74%, 85%)" />
            <stop offset="60%" stopColor="hsl(43, 74%, 70%)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Traveling glow effect */}
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth="3"
          rx="12"
          ry="12"
          strokeDasharray="200 800"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -1000 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </svg>
      
      {/* Corner sparkles */}
      {[
        { left: '5%', top: '5%', delay: 0 },
        { right: '5%', top: '5%', delay: 0.5 },
        { left: '5%', bottom: '5%', delay: 1 },
        { right: '5%', bottom: '5%', delay: 1.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3"
          style={pos}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: pos.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gold-light rounded-full blur-[1px]" 
               style={{ boxShadow: '0 0 10px hsl(43, 74%, 70%), 0 0 20px hsl(43, 74%, 60%)' }} />
        </motion.div>
      ))}
      
      {/* Moving sparkle particles along edge */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-gold-light rounded-full"
          style={{
            boxShadow: '0 0 8px hsl(43, 74%, 70%), 0 0 16px hsl(43, 74%, 60%)',
          }}
          initial={{ 
            left: '0%', 
            top: '0%',
            opacity: 0,
          }}
          animate={{
            left: ['0%', '100%', '100%', '0%', '0%'],
            top: ['0%', '0%', '100%', '100%', '0%'],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            delay: i * 1.5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
