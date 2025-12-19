import { motion } from 'framer-motion';
import { FileText, Filter, Users, Trophy, PartyPopper } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Application', description: 'Fill out and submit the application form' },
  { icon: Filter, title: 'Selection', description: 'Initial shortlisting and eligibility check' },
  { icon: Users, title: 'Decision', description: 'Committee reviews and evaluates applicants' },
  { icon: Trophy, title: 'Result', description: 'Final result and announcements shared' },
  { icon: PartyPopper, title: 'Welcome!', description: 'Your journey begins with Green Club' },
];

export default function TimelineSection() {
  return (
    <section className="py-32 bg-[#0A1F0D] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            📌 Recruitment <span className="text-lime-400">Timeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Your journey from applicant to team member in 5 simple steps
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line connecting steps */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-lime-500/20 via-lime-500/50 to-lime-500/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step number circle */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="relative mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-lime-500/30">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-lime-500/30"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  
                  {/* Step number */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0A1F0D] border-2 border-lime-500 flex items-center justify-center">
                    <span className="text-lime-400 font-bold text-sm">{index + 1}</span>
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}