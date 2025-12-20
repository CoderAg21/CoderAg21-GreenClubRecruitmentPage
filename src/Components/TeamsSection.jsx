import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { Code, Camera, Megaphone } from 'lucide-react';

const teams = [
  { 
    icon: Code, 
    name: 'Web Team', 
    tagline: 'Building digital roots', 
    color: 'from-blue-500 to-cyan-500',
    description: 'Develop and maintain our website, create digital tools for campaigns, and manage online presence. Perfect for tech enthusiasts.'
  },
  { 
    icon: Camera, 
    name: 'Media Team', 
    tagline: 'Voicing the green message', 
    color: 'from-purple-500 to-pink-500',
    description: 'Manage social media, create engaging content, and handle PR. Turn environmental stories into viral moments.'
  },
  { 
    icon: Megaphone, 
    name: 'Marketing Team', 
    tagline: 'Spreading the word', 
    color: 'from-lime-500 to-green-500',
    description: 'Promote events, reach new audiences, and build partnerships. Master the art of impact communication.'
  },
];

export default function TeamsSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={ref} className="py-20 md:py-40 bg-gradient-to-b from-black via-[#0A1F0D] to-black relative overflow-hidden">
      {/* Animated grid */}
      <motion.div 
      onScroll={scrollYProgress}
        className="absolute inset-0 opacity-10"
        animate={{ 
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: 'linear-gradient(rgba(132, 204, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(132, 204, 22, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-24"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 px-4"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
          >
             Our <span className="text-lime-400">TEAMS</span>
          </motion.h2>
          <motion.p 
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Where Do You Fit In?
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.5
              }}
              whileHover={{ 
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="h-full p-6 md:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden relative transform-gpu">
                {/* Lightning effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 0%, rgba(132, 204, 22, 0.2), transparent)',
                      'radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.2), transparent)',
                      'radial-gradient(circle at 0% 0%, rgba(132, 204, 22, 0.2), transparent)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Explosive icon */}
                <motion.div
                  className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${team.color} mb-4 md:mb-6 relative`}
                  whileHover={{ 
                    rotate: [0, -15, 15, -15, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl md:rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(132, 204, 22, 0.3)',
                        '0 0 40px rgba(132, 204, 22, 0.6)',
                        '0 0 20px rgba(132, 204, 22, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <team.icon className="w-7 h-7 md:w-10 md:h-10 text-white relative z-10" />
                </motion.div>

                <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {team.name}
                </h3>
                <p className={`text-xs md:text-sm font-bold bg-gradient-to-r ${team.color} bg-clip-text text-transparent mb-3 md:mb-4`}>
                  {team.tagline}
                </p>

                {/* Team description */}
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {team.description}
                </p>

                {/* Glow on hover */}
                <motion.div
                  className={`absolute -bottom-20 -right-20 w-40 md:w-60 h-40 md:h-60 rounded-full bg-gradient-to-br ${team.color} opacity-0 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}