import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coverImage from '@/assets/cover.jpg';
import insideImage from '@/assets/inside.png';
import { Confetti } from './Confetti';
import { Sparkles } from './Sparkles';
import { EdgeGlow } from './EdgeGlow';

interface BirthdayCardProps {
  recipientName: string;
}

export const BirthdayCard = ({ recipientName }: BirthdayCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(222,47%,5%)] to-[hsl(230,50%,3%)]" />
      
      {/* Radial glow effects */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(43, 74%, 40%) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(220, 60%, 40%) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      
      <Sparkles />
      
      {showConfetti && <Confetti />}

      <div className="perspective-1000 w-full max-w-lg relative z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                rotateY: -180,
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
              className="relative cursor-pointer group"
              onClick={handleOpen}
            >
              {/* Card cover with edge glow effect */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gold/40">
                {/* Edge glow effect */}
                <EdgeGlow />
                
                <img 
                  src={coverImage} 
                  alt="Bìa thiệp sinh nhật"
                  className="w-full h-auto relative z-0"
                />
                
                {/* Glowing tap effect overlay */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Pulsing glow border effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        'inset 0 0 30px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)',
                        'inset 0 0 50px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.4)',
                        'inset 0 0 30px rgba(212, 175, 55, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)',
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  
                  {/* Tap icon in center */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="bg-background/60 backdrop-blur-sm rounded-full p-4 border border-gold/50"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <svg 
                        className="w-10 h-10 text-gold" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Click hint at bottom */}
                <motion.div 
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-2 bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-gold text-sm font-medium">Nhấn để mở thiệp</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inside"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ 
                rotateY: 0, 
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" }
              }}
              className="relative"
            >
              {/* Card inside */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gold/30">
                <img 
                  src={insideImage} 
                  alt="Nội dung thiệp sinh nhật"
                  className="w-full h-auto"
                />
                
                {/* Name overlay - centered below "Birthday" and above red line */}
                <motion.div
                  className="absolute inset-x-0 top-[68%] flex justify-center pl-[45%] sm:pl-[48%] md:pl-[50%]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <p
                    className="font-script text-sm sm:text-base md:text-lg text-gold text-left"
                    style={{
                      textShadow: '1px 1px 2px rgba(0,0,0,0.12)',
                    }}
                  >
                    {recipientName}
                  </p>
                </motion.div>
              </div>

              {/* Close button */}
              <motion.button
                className="mt-6 w-full py-3 rounded-lg bg-secondary border border-gold/50 text-gold font-medium hover:bg-gold hover:text-primary-foreground transition-all duration-300"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Đóng thiệp
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
