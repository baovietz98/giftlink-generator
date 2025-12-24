import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coverImage from '@/assets/cover.jpg';
import insideImage from '@/assets/inside.png';
import { Confetti } from './Confetti';
import { Sparkles } from './Sparkles';

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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-background" />
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
              {/* Card cover */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gold/30 animate-pulse-glow">
                <img 
                  src={coverImage} 
                  alt="Bìa thiệp sinh nhật"
                  className="w-full h-auto"
                />
                
                {/* Recipient name overlay */}
                <motion.div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.p
                    className="text-gold-light text-lg mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Gửi tới
                  </motion.p>
                  <motion.h2
                    className="font-script text-4xl md:text-5xl text-gold animate-float text-center px-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    style={{ textShadow: '0 0 20px hsl(43, 74%, 53%)' }}
                  >
                    {recipientName}
                  </motion.h2>
                </motion.div>

                {/* Click hint */}
                <motion.div 
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="text-gold text-sm font-medium">Nhấn để mở thiệp</span>
                    <svg 
                      className="w-6 h-6 text-gold" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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
                  className="absolute right-[6%] sm:right-[8%] md:right-[10%] top-[68%] w-[48%] sm:w-[46%] md:w-[44%] flex justify-start"
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
