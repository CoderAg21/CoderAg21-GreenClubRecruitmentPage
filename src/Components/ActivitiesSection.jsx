import { motion, useScroll, useTransform } from 'framer-motion';
import { TreePine, Sparkles, Users } from 'lucide-react';
import { useRef } from 'react';
const activities = [
  {
    icon: TreePine,
    title: 'Plantation Drives',
    description: 'Tree plantation drives on Republic Day and Independence Day for a greener campus.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
  },
  {
    icon: Sparkles,
    title: 'Cleanliness Drives',
    description: 'Regular campaigns promoting hygiene, sustainability, and awareness.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
  },
  {
    icon: Users,
    title: 'Personality Development',
    description: 'Interactive sessions and workshops to grow confidence and leadership.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
  },
];

export default function ActivitiesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={ref} className="py-40 bg-black relative overflow-hidden">
      {/* Aggressive background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.15) 0%, transparent 50%)',
          scale: useTransform(scrollYProgress, [0, 1], [1.5, 1]),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          >
            What We <span className="text-lime-400">DO</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            We are not just a club; we are a <span className="text-lime-400 font-bold">movement</span>
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 100, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: 'spring',
                bounce: 0.4
              }}
              whileHover={{ 
                y: -20,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative perspective-1000"
            >
              <div className="relative h-full bg-gradient-to-br from-lime-500/10 to-emerald-500/5 backdrop-blur-xl rounded-3xl border border-lime-500/20 overflow-hidden transform-gpu">
                {/* Explosive hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-lime-400/0 to-emerald-400/0 group-hover:from-lime-400/20 group-hover:to-emerald-400/20 transition-all duration-500"
                />

                {/* Image with parallax */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.2, rotate: 2 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Floating icon */}
                  <motion.div
                    className="absolute bottom-4 left-4 p-4 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-500 shadow-2xl"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <activity.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-lime-400 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Glow effect */}
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-lime-400/0 blur-3xl group-hover:bg-lime-400/30 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}