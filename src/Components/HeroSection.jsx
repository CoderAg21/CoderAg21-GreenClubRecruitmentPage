import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Leaf, Sparkles, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

export default function HeroSection({ onScrollToForm }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    // Changed h-screen to h-[100dvh] for perfect mobile fit
    <section ref={ref} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1F0D] via-[#132E15] to-[#0A1F0D]">
      
      {/* Aggressive background effects */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        {/* Lightning bolts effect */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-b from-lime-400/40 via-lime-400/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${100 + Math.random() * 200}px`,
              rotate: `${Math.random() * 30 - 15}deg`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 0.3 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: 3 + Math.random() * 7,
              ease: "easeInOut" // Smooths the entry/exit
            }}
          />
        ))}

        {/* Explosive particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#84CC16' : '#10B981'}, transparent)`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut", // Smooths the float
            }}
          />
        ))}
      </motion.div>

      {/* Massive gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-60"
        style={{ y }}
        animate={{ 
          background: [
            'radial-gradient(circle, rgba(132, 204, 22, 0.3), transparent)',
            'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)',
            'radial-gradient(circle, rgba(132, 204, 22, 0.3), transparent)',
          ],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-60"
        animate={{ 
          background: [
            'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)',
            'radial-gradient(circle, rgba(132, 204, 22, 0.4), transparent)',
            'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)',
          ],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 md:px-6 max-w-6xl mx-auto mt-0 md:mt-10 flex flex-col items-center justify-center h-full">
        
        {/* Explosive badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/20 backdrop-blur-md border border-lime-400/50 rounded-full mb-6 relative mt-15 overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-lime-400/20 to-emerald-400/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-lime-400" />
          </motion.div>
          <span className="text-lime-300 text-sm font-bold tracking-widest uppercase relative z-10">Recruitment 2025</span>
          <Zap className="w-4 h-4 text-yellow-400" />
        </motion.div>

        {/* Explosive heading */}
        <motion.h1
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring', bounce: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
        >
          <motion.span 
            className="block mb-2"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(132, 204, 22, 0.5)',
                '0 0 40px rgba(132, 204, 22, 0.8)',
                '0 0 20px rgba(132, 204, 22, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Welcome to
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent relative pb-2"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% auto' }}
          >
            GREEN CLUB
          </motion.span>
        </motion.h1>

        {/* Spinning leaf with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.5 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="p-4 bg-gradient-to-br from-lime-400/30 to-emerald-500/30 rounded-full backdrop-blur-sm border-2 border-lime-400/50 relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(132, 204, 22, 0.5)',
                  '0 0 60px rgba(132, 204, 22, 0.8)',
                  '0 0 30px rgba(132, 204, 22, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Leaf className="w-12 h-12 text-lime-300 relative z-10" />
          </motion.div>
        </motion.div>

        {/* Subtitle with effects */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed px-4"
        >
          Are you passionate about the environment? Join us where{' '}
          <motion.span 
            className="text-lime-400 font-bold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            environmental action
          </motion.span>{' '}
          meets{' '}
          <motion.span 
            className="text-emerald-400 font-bold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          >
            creativity
          </motion.span>{' '}
          and{' '}
          <motion.span 
            className="text-green-400 font-bold"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          >
            leadership
          </motion.span>
        </motion.p>

        {/* CTA with explosion effect - ADJUSTED SIZE */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, type: 'spring', bounce: 0.6 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 40px rgba(132, 204, 22, 0.6)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToForm}
          // Smaller button padding and font size
          className="group relative px-8 py-3 bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 rounded-full text-black font-bold text-base md:text-lg overflow-hidden shadow-2xl shadow-lime-500/50"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-lime-300"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Join the Movement
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </motion.div>

      {/* Aggressive scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pb-safe"
      >
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-lime-400"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

HeroSection.propTypes = {
  onScrollToForm: PropTypes.func.isRequired,
};