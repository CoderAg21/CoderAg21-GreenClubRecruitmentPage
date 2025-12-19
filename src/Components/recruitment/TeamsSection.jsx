import { motion } from 'framer-motion';
import { Users, Code, Camera, Palette, Video, Megaphone } from 'lucide-react';

const teams = [
  {
    icon: Users,
    name: 'Core Team',
    tagline: 'The heart and head of the Green Club',
    description: 'The leadership engine that drives the Green Club forward. Responsible for ideating, planning, and executing all major initiatives.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Code,
    name: 'Web Team',
    tagline: 'Building digital roots for a greener future',
    description: 'Help us maintain, design, and update our platforms. Build a digital presence that represents our green mission.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Camera,
    name: 'Media Team',
    tagline: 'Voicing the green message to the world',
    description: 'The communication powerhouse managing social media, documenting events, and spreading awareness far and wide.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Palette,
    name: 'Design Team',
    tagline: 'Where creativity meets cause',
    description: 'The creative backbone bringing our mission to life through visual storytelling, posters, and event branding.',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: Video,
    name: 'Videography Team',
    tagline: 'Capturing change, one frame at a time',
    description: 'Visual storytellers turning every moment into an impactful narrative through reels and video content.',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Megaphone,
    name: 'Marketing Team',
    tagline: 'Spreading the word, growing the cause',
    description: 'Strategic minds crafting campaigns and outreach programs to expand our environmental movement.',
    color: 'from-lime-500 to-green-500',
    bgColor: 'bg-lime-500/10',
  },
];

export default function TeamsSection() {
  return (
    <section className="py-32 bg-[#0A1F0D] relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            👥 Our <span className="text-lime-400">Teams</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Where Do You Fit In? Choose the team that best fits your skills and interests!
          </p>
        </motion.div>

        {/* Teams grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="h-full p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${team.color} mb-6`}
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <team.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {team.name}
                </h3>
                <p className={`text-sm font-medium bg-gradient-to-r ${team.color} bg-clip-text text-transparent mb-4`}>
                  "{team.tagline}"
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {team.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${team.color} opacity-0 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}