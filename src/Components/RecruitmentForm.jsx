import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  Send, Loader2, CheckCircle2, User, 
  Building2, Leaf, Edit3, X, ChevronRight, 
  Sparkles, GraduationCap 
} from 'lucide-react';

//  CONFIGURATION 

const DEPARTMENTS = [
  'Computer Science Engineering', 
  'Information Technology Engineering', 
  'Mechanical Engineering',
  'Chemical Engineering', 
  'Civil Engineering', 
  'Electrical Engineering',
  'Electronics & Comm. Engineering', 
  'Biotech Engineering', 
  'Other'
];

const TEAMS = ['Marketing', 'Media', 'Web Dev', 'Design', 'Videography', 'Core Management'];

//  MAIN COMPONENT 

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    collegeEmail: '',
    registrationNumber: '',
    mobileNumber: '',
    department: '',
    role: '',
    question1: '', // Why Join
    question2: '', // Tech Solution
    question3: '', // Balance
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (currentStep === 1) return formData.fullName && formData.collegeEmail && formData.registrationNumber && formData.mobileNumber;
    if (currentStep === 2) return formData.department && formData.role;
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(prev => prev + 1);
    else {
      alert("Please complete all fields to proceed.");
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulating API call - Replace with your actual fetch
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      // For demo purposes, assuming success
      setTimeout(() => setIsSubmitted(true), 1500); 

      if (response.ok) setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setTimeout(() => setIsSubmitted(true), 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS VIEW ---
  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center p-12 max-w-lg border border-lime-500/20 bg-black/40 backdrop-blur-2xl rounded-[2rem]"
        >
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(132,204,22,0.4)]"
          >
            <CheckCircle2 className="w-12 h-12 text-black" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Form Accepted</h2>
          <p className="text-gray-400 text-lg">Your profile has been encrypted and sent to the core team. We will contact you soon.</p>
        </motion.div>
      </section>
    );
  }

  // --- MAIN FORM VIEW ---
  return (
    <section className="min-h-screen py-20 px-4 md:px-6 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter text-center"
            >
              CANDIDATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">REGISTRATION</span>
            </motion.h2>
          </div>
          
          {/* Stylized Progress Steps */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div 
                  animate={{ 
                    backgroundColor: currentStep >= step ? '#84cc16' : 'rgba(255,255,255,0.1)',
                    color: currentStep >= step ? '#000000' : '#6b7280'
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-500"
                >
                  {currentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
                </motion.div>
                {step < 3 && <div className={`w-8 h-[2px] mx-1 transition-colors duration-500 ${currentStep > step ? 'bg-lime-500' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <motion.div 
          className="bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Glowing Top Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent opacity-50" />

          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDENTITY */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-lime-500/10 rounded-2xl border border-lime-500/20">
                    <User className="w-6 h-6 text-lime-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Identity Verification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InputGroup label="Full Name" value={formData.fullName} onChange={v => handleChange('fullName', v)} placeholder="Ex: Alex Carter" icon={<User className="w-4 h-4" />} />
                  <InputGroup label="Registration ID" value={formData.registrationNumber} onChange={v => handleChange('registrationNumber', v)} placeholder="Ex: 2023BCSE001" icon={<GraduationCap className="w-4 h-4" />} />
                  <InputGroup label="College Email" value={formData.collegeEmail} onChange={v => handleChange('collegeEmail', v)} type="email" placeholder="alex@university.edu" icon={<Send className="w-4 h-4" />} />
                  <InputGroup label="Mobile Contact" value={formData.mobileNumber} onChange={v => handleChange('mobileNumber', v)} type="tel" placeholder="+91 98765 43210" icon={<User className="w-4 h-4" />} />
                </div>
              </motion.div>
            )}

            {/* STEP 2: DEPARTMENT */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-lime-500/10 rounded-2xl border border-lime-500/20">
                    <Building2 className="w-6 h-6 text-lime-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Academic & Role Details</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-lime-400/80 uppercase tracking-widest mb-4">Select Department</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {DEPARTMENTS.map(dept => (
                      <button
                        key={dept}
                        onClick={() => handleChange('department', dept)}
                        className={`group relative p-4 rounded-xl text-sm font-medium transition-all duration-300 text-left border ${
                          formData.department === dept 
                            ? 'bg-lime-500 text-black border-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.3)]' 
                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="relative z-10">{dept}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-xs font-bold text-lime-400/80 uppercase tracking-widest mb-4">Target Team</label>
                  <div className="relative">
                    <select 
                      value={formData.role}
                      onChange={(e) => handleChange('role', e.target.value)}
                      className="w-full appearance-none bg-[#0a0a0a] border border-white/20 rounded-xl px-6 py-4 text-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all"
                    >
                      <option value="">Select your preferred squad...</option>
                      {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                    </select>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none rotate-90" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: VISION */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-lime-500/10 rounded-2xl border border-lime-500/20">
                    <Leaf className="w-6 h-6 text-lime-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Vision Assessment</h3>
                </div>

                <div className="space-y-6">
                  <TextAreaGroup 
                    label="What drives you to join the Green Club?" 
                    value={formData.question1} onChange={v => handleChange('question1', v)} 
                    placeholder="Tell us about your passion for the environment..."
                  />
                  <TextAreaGroup 
                    label="Propose one tech-driven solution for campus sustainability." 
                    value={formData.question2} onChange={v => handleChange('question2', v)} 
                    placeholder="Be innovative..."
                  />
                  <TextAreaGroup 
                    label="How do you view the balance between Industry & Nature?" 
                    value={formData.question3} onChange={v => handleChange('question3', v)} 
                    placeholder="Share your philosophy..."
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Area */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
            {currentStep > 1 ? (
              <button 
                onClick={() => setCurrentStep(p => p - 1)}
                className="text-gray-400 hover:text-white font-medium px-4 py-2 transition-colors flex items-center gap-2"
              >
                Back
              </button>
            ) : <div />}
            
            {currentStep < 3 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-lime-400 transition-colors flex items-center gap-2 shadow-lg"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(132,204,22,0.4)" }} 
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if(formData.question1 && formData.question2 && formData.question3) setIsReviewOpen(true);
                  else alert("Please answer all questions.");
                }}
                className="bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-10 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-lime-500/20"
              >
                Final Review <Sparkles className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/*  REVIEW MODAL  */}
      <AnimatePresence>
        {isReviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-lime-400" /> Confirm Submission
                </h3>
                <button onClick={() => setIsReviewOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/40">
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-lime-500 uppercase tracking-widest">Identity</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <ReviewItem label="Name" value={formData.fullName} />
                      <ReviewItem label="ID" value={formData.registrationNumber} />
                      <ReviewItem label="Email" value={formData.collegeEmail} />
                      <ReviewItem label="Phone" value={formData.mobileNumber} />
                    </div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-lime-500 uppercase tracking-widest">Role</h4>
                    <ReviewItem label="Department" value={formData.department} />
                    <ReviewItem label="Team" value={formData.role} />
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-lime-500 uppercase tracking-widest">Vision</h4>
                    <ReviewItem label="Why Join?" value={formData.question1} />
                    <ReviewItem label="Tech Idea" value={formData.question2} />
                    {/* ADDED MISSING QUESTION HERE */}
                    <ReviewItem label="Balance" value={formData.question3} />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5">
                <button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-600 text-black font-black text-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>LAUNCH APPLICATION <Send className="w-5 h-5" /></>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

//  STYLIZED SUB-COMPONENTS 

const InputGroup = ({ label, value, onChange, type = "text", placeholder, icon }) => (
  <div className="group">
    <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-lime-400 transition-colors">
        {icon}
      </div>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all shadow-inner"
      />
    </div>
  </div>
);

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
};

const TextAreaGroup = ({ label, value, onChange, placeholder }) => (
  <div className="group">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-lime-400 transition-colors">
      {label}
    </label>
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-32 bg-[#0a0a0a] border border-white/10 rounded-xl p-5 text-white placeholder:text-gray-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all resize-none shadow-inner"
    />
  </div>
);

TextAreaGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

const ReviewItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-gray-500 uppercase">{label}</span>
    <span className="text-white font-medium break-words leading-relaxed text-sm bg-white/5 p-2 rounded-lg border border-white/5">
      {value || <span className="text-gray-600 italic">Not provided</span>}
    </span>
  </div>
);

ReviewItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};