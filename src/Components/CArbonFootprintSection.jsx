import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TreePine, Droplets, Wind, Leaf } from 'lucide-react';
import PropTypes from 'prop-types';

const stats = [
  { 
    icon: TreePine, 
    value: 500, 
    label: 'Trees Planted', 
    suffix: '+',
    color: 'from-green-400 to-emerald-500',
    impact: '12.5 tons CO₂ absorbed annually'
  },
  { 
    icon: Droplets, 
    value: 2500, 
    label: 'Liters of Water Saved', 
    suffix: '+',
    color: 'from-blue-400 to-cyan-500',
    impact: 'Through conservation drives'
  },
  { 
    icon: Wind, 
    value: 85, 
    label: 'Waste Reduced', 
    suffix: '%',
    color: 'from-purple-400 to-pink-500',
    impact: 'In campus waste management'
  },
  { 
    icon: Leaf, 
    value: 15, 
    label: 'Tons Carbon Offset', 
    suffix: '+',
    color: 'from-lime-400 to-green-500',
    impact: 'Since 2020'
  },
];

function CountUpAnimation({ value, suffix }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function CarbonFootprintSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);

  return (
    <section ref={ref} className="py-20 md:py-40 bg-black relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Leaf className="w-8 h-8 text-lime-400" />
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            Our <span className="text-lime-400">Impact</span>
          </motion.h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Real numbers. Real change. Real impact on our environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.4
              }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="relative h-full p-6 md:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden">
                {/* Glow effect */}
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} opacity-0 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} mb-4 md:mb-6`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                {/* Value */}
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-3">
                  <CountUpAnimation value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-base md:text-lg font-bold text-gray-300 mb-2 md:mb-3">
                  {stat.label}
                </h3>

                {/* Impact */}
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                  {stat.impact}
                </p>

                {/* Animated border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(132, 204, 22, 0.3), transparent)`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-lime-500/10 backdrop-blur-xl border border-lime-500/30 rounded-full">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-lime-400" />
            </motion.div>
            <span className="text-xs md:text-sm text-lime-300 font-bold">
              Join us in making a bigger impact this year!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

CountUpAnimation.propTypes = {
  suffix: PropTypes.string.isRequired,
  value: PropTypes.string,
};