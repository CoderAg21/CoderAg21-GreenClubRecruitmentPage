import { motion } from 'framer-motion';
import { ChevronDown, Leaf, Sparkles } from 'lucide-react';

export default function HeroSection({ onScrollToForm }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A1F0D] via-[#132E15] to-[#1A3D1A]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-lime-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 backdrop-blur-md border border-lime-500/20 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span className="text-lime-300 text-sm font-medium tracking-wide">Recruitment Drive 2025</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">Welcome to</span>
          <motion.span
            className="block bg-gradient-to-r from-lime-400 via-emerald-400 to-green-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            Green Club
          </motion.span>
        </motion.h1>

        {/* Leaf icon with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="p-4 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-full backdrop-blur-sm border border-lime-500/20"
          >
            <Leaf className="w-12 h-12 text-lime-400" />
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Are you passionate about the environment? Join us where{' '}
          <span className="text-lime-400 font-semibold">environmental action</span> meets{' '}
          <span className="text-emerald-400 font-semibold">creativity</span> and{' '}
          <span className="text-green-400 font-semibold">leadership</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onScrollToForm}
          className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full text-[#0A1F0D] font-bold text-lg overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Join the Movement
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-lime-400"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}