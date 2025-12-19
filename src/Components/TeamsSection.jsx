import { motion } from 'framer-motion';
import { Users, Code, Camera, Palette, Video, Megaphone } from 'lucide-react';

const teams = [
  { icon: Users, name: 'Core Team', tagline: 'The heart and head of the Green Club', color: 'from-amber-500 to-orange-500' },
  { icon: Code, name: 'Web Team', tagline: 'Building digital roots', color: 'from-blue-500 to-cyan-500' },
  { icon: Camera, name: 'Media Team', tagline: 'Voicing the green message', color: 'from-purple-500 to-pink-500' },
  { icon: Palette, name: 'Design Team', tagline: 'Creativity meets cause', color: 'from-rose-500 to-red-500' },
  { icon: Video, name: 'Videography Team', tagline: 'Capturing change', color: 'from-violet-500 to-purple-500' },
  { icon: Megaphone, name: 'Marketing Team', tagline: 'Spreading the word', color: 'from-lime-500 to-green-500' },
];

export default function TeamsSection() {
  return (
    <section className="py-40 bg-gradient-to-b from-black via-[#0A1F0D] to-black relative overflow-hidden">
      {/* Animated grid */}
      <motion.div 
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
          >
             Our <span className="text-lime-400">TEAMS</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Where Do You Fit In?
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: 'spring',
                bounce: 0.5
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="h-full p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden relative transform-gpu">
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
                  className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${team.color} mb-6 relative`}
                  whileHover={{ 
                    rotate: [0, -15, 15, -15, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(132, 204, 22, 0.3)',
                        '0 0 40px rgba(132, 204, 22, 0.6)',
                        '0 0 20px rgba(132, 204, 22, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <team.icon className="w-10 h-10 text-white relative z-10" />
                </motion.div>

                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {team.name}
                </h3>
                <p className={`text-sm font-bold bg-gradient-to-r ${team.color} bg-clip-text text-transparent mb-4`}>
                  {team.tagline}
                </p>

                {/* Glow on hover */}
                <motion.div
                  className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${team.color} opacity-0 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}