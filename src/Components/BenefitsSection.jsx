import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Palette, TrendingUp, Briefcase } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Make a Real Impact',
    description: 'Be part of plantation and cleanliness drives that make a visible difference on campus and in the community.',
  },
  {
    icon: Palette,
    title: 'Showcase Your Creativity',
    description: 'Design posters, manage social media, click stunning photos, or edit engaging videos — let your talent shine!',
  },
  {
    icon: TrendingUp,
    title: 'Develop Soft Skills',
    description: 'Work in teams, handle real projects, and boost your communication, leadership, and event management skills.',
  },
  {
    icon: Briefcase,
    title: 'Build a Portfolio',
    description: 'From graphic designs to short films and campaign strategies — real content to show on your resume.',
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="py-40 bg-gradient-to-b from-black via-[#0A1F0D] to-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(132, 204, 22, 0.3) 1px, transparent 0)',
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                alt="Team"
                className="w-full h-[600px] object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              animate={{ y: [0, -15, 0] }}
              className="absolute -bottom-10 -right-10 bg-gradient-to-br from-lime-400 to-emerald-500 p-8 rounded-3xl shadow-2xl shadow-lime-500/50"
            >
              <div className="text-5xl font-black text-black">100+</div>
              <div className="text-black/80 font-bold">Active Members</div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-black text-white mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
               Why Join{' '}
              <span className="text-lime-400">Green Club</span>?
            </motion.h2>
            <p className="text-gray-400 text-xl mb-12">
              It&apos;s about{' '}
              <span className="text-lime-400 font-bold">growing yourself</span> while{' '}
              <span className="text-emerald-400 font-bold">growing green!</span>
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
                  whileHover={{ 
                    x: 15, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-lime-500/30 transition-all group backdrop-blur-xl"
                >
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <benefit.icon className="w-7 h-7 text-black" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-lime-400 transition-colors mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}