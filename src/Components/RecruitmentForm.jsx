import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Send, Loader2, CheckCircle2, Leaf, Sparkles, Zap } from 'lucide-react';

const branches = [
  'Computer Science and Engineering', 'Chemical Engineering', 'Mechanical Engineering',
  'Biotech Engineering', 'Civil Engineering', 'Electrical Engineering',
  'Electronics and Communication Engineering', 'Other',
];

const teams = ['Marketing Team', 'Media Team', 'Web Team', 'Design Team', 'Videography Team', 'Core Team'];

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    name: '', mobile_number: '', college_email: '', branch: '', other_branch: '',
    team: '', why_join: '', wildlife_opinion: '', balance_opinion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.Recruitment.create({ ...formData, status: 'pending' });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="form" className="py-40 bg-black relative overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <motion.div
            className="p-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 backdrop-blur-2xl rounded-3xl border-2 border-lime-400/50 relative overflow-hidden"
            animate={{ boxShadow: ['0 0 30px rgba(132, 204, 22, 0.3)', '0 0 60px rgba(132, 204, 22, 0.6)', '0 0 30px rgba(132, 204, 22, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-2xl"
            >
              <CheckCircle2 className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4">Application Submitted! 🎉</h2>
            <p className="text-gray-300 text-lg">We will review your application and get back to you soon!</p>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="form" className="py-40 bg-gradient-to-b from-black via-[#0A1F0D] to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-white mb-4"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Join <span className="text-lime-400">NOW</span>
          </motion.h2>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl transition-all ${
                  currentStep >= step ? 'bg-gradient-to-br from-lime-400 to-emerald-500 text-black shadow-lg shadow-lime-500/50' : 'bg-white/10 text-gray-500'
                }`}
                animate={{ scale: currentStep === step ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5, repeat: currentStep === step ? Infinity : 0, repeatDelay: 1 }}
              >
                {step}
              </motion.div>
              {step < 3 && <div className={`w-20 h-1 rounded-full ${currentStep > step ? 'bg-lime-400' : 'bg-white/10'}`} />}
            </React.Fragment>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-lime-500/20 p-10 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-6">
                <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-lime-400" />
                  Personal Info
                </h3>
                {['name', 'mobile_number', 'college_email'].map((field) => (
                  <div key={field}>
                    <label className="text-gray-300 font-semibold mb-2 block">{field.replace('_', ' ').toUpperCase()} *</label>
                    <input
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-lime-400 focus:outline-none transition-all"
                      required
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-6">
                <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-lime-400" />
                  Branch & Team
                </h3>
                <div>
                  <label className="text-gray-300 font-semibold mb-3 block">BRANCH *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {branches.map((branch) => (
                      <motion.div
                        key={branch}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.branch === branch ? 'bg-lime-500/20 border-lime-400' : 'bg-white/5 border-white/10'
                        }`}
                        onClick={() => handleChange('branch', branch)}
                      >
                        <p className="text-white text-sm">{branch}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {formData.branch === 'Other' && (
                  <input
                    value={formData.other_branch}
                    onChange={(e) => handleChange('other_branch', e.target.value)}
                    placeholder="Specify your branch"
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white"
                  />
                )}
                <div>
                  <label className="text-gray-300 font-semibold mb-3 block">TEAM *</label>
                  <select
                    value={formData.team}
                    onChange={(e) => handleChange('team', e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white"
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => <option key={team} value={team}>{team}</option>)}
                  </select>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="space-y-6">
                <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-lime-400" />
                  Tell Us More
                </h3>
                {[
                  { field: 'why_join', label: 'Why join Green Club?' },
                  { field: 'wildlife_opinion', label: 'Wildlife deaths & habitat loss - your thoughts?' },
                  { field: 'balance_opinion', label: 'Balance growth with environment?' },
                ].map(({ field, label }) => (
                  <div key={field}>
                    <label className="text-gray-300 font-semibold mb-2 block">{label} *</label>
                    <textarea
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white min-h-[120px] resize-none focus:border-lime-400 focus:outline-none"
                      required
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
            {currentStep > 1 && (
              <button type="button" onClick={() => setCurrentStep(s => s - 1)} className="px-8 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-bold hover:bg-white/20 transition-all">
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={() => setCurrentStep(s => s + 1)} className="ml-auto px-8 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-lime-500/50 transition-all">
                Next
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="ml-auto px-8 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-xl text-black font-bold flex items-center gap-2 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Submit</>}
              </button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}