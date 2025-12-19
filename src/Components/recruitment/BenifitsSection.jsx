import { motion } from 'framer-motion';
import { Zap, Palette, TrendingUp, Briefcase } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Make a Real Impact',
    description: 'Be part of plantation and cleanliness drives that make a visible difference on campus and in the community.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Palette,
    title: 'Showcase Your Creativity',
    description: 'Design posters, manage social media, click stunning photos, or edit engaging videos — let your talent shine!',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Develop Soft Skills',
    description: 'Work in teams, handle real projects, and boost your communication, leadership, and event management skills.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Briefcase,
    title: 'Build a Portfolio',
    description: 'From graphic designs to short films and campaign strategies — real content to show on your resume.',
    color: 'text-lime-400',
    bgColor: 'bg-lime-500/10',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#0A1F0D] via-[#132E15] to-[#0A1F0D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <motion.img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0D] via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              animate={{ y: [0, -10, 0] }}
              className="absolute -bottom-6 -right-6 md:right-6 bg-gradient-to-br from-lime-500 to-emerald-600 p-6 rounded-2xl shadow-2xl"
            >
              <div className="text-4xl font-bold text-white">100+</div>
              <div className="text-lime-100 text-sm">Active Members</div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🌱 Why Should You Join{' '}
              <span className="text-lime-400">Green Club</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Joining the Green Club isnt just about the environment — its about{' '}
              <span className="text-lime-400 font-semibold">growing yourself</span> while{' '}
              <span className="text-emerald-400 font-semibold">growing green!</span>
            </p>

            {/* Benefits list */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-lime-500/30 transition-colors group"
                >
                  <div className={`p-3 rounded-xl ${benefit.bgColor}`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{benefit.description}</p>
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