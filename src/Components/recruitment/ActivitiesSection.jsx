import { motion } from 'framer-motion';
import { TreePine, Sparkles, Users, Heart } from 'lucide-react';

const activities = [
  {
    icon: TreePine,
    title: 'Plantation Drives',
    description: 'We organize tree plantation drives on national days like Republic Day and Independence Day to contribute to a greener campus.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    accent: 'from-lime-500 to-green-500',
  },
  {
    icon: Sparkles,
    title: 'Cleanliness Drives',
    description: 'Our regular cleanliness campaigns promote hygiene, sustainability, and awareness among students and community.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Personality Development',
    description: 'We host interactive sessions, workshops, and speaker events to help members grow in confidence and leadership.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
    accent: 'from-green-500 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ActivitiesSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#1A3D1A] to-[#0A1F0D] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A1F0D] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full mb-6"
          >
            <Heart className="w-4 h-4 text-lime-400" />
            <span className="text-lime-300 text-sm font-medium">Our Initiatives</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What We <span className="text-lime-400">Do</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            At Green Club, we believe in sustainability, creativity, and personal growth. 
            We're not just a club; we're a movement.
          </p>
        </motion.div>

        {/* Activities grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative h-full bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F0D] via-transparent to-transparent" />
                  
                  {/* Icon overlay */}
                  <motion.div
                    className={`absolute bottom-4 left-4 p-3 rounded-2xl bg-gradient-to-br ${activity.accent} shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <activity.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                {/* Hover gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${activity.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}