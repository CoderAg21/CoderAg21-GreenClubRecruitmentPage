import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, User, Building2, Leaf, Edit3, X } from 'lucide-react';

// Constants
const DEPARTMENTS = [
  'Computer Science', 'Information Tech', 'Mechanical',
  'Chemical', 'Civil', 'Electrical',
  'Electronics & Comm', 'Biotech', 'Other',
];

const TEAMS = ['Marketing', 'Media', 'Web Dev', 'Design', 'Videography', 'Core Management'];

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    collegeEmail: '',
    registrationNumber: '', // New field
    mobileNumber: '',
    department: '',
    role: '',
    question1: '', // Why join?
    question2: '', // Greenery idea
    question3: '', // Sustainability opinion
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(false); // Controls the Modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Simple validation to prevent skipping empty steps
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.collegeEmail || !formData.registrationNumber || !formData.mobileNumber) return false;
    }
    if (currentStep === 2) {
      if (!formData.department || !formData.role) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep(prev => prev + 1);
    else alert("Please fill in all required fields.");
  };

  const handleOpenReview = () => {
    if (!formData.question1 || !formData.question2) {
      alert("Please answer the questions.");
      return;
    }
    setIsReviewOpen(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // ---------------------------------------------------------
      // BACKEND CONNECTION
      // Replace 'YOUR_API_ENDPOINT' with your actual backend URL
      // ---------------------------------------------------------
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending raw JSON object
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- SUCCESS SCREEN ----------------
  if (isSubmitted) {
    return (
      <section className="py-40 bg-black min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 max-w-lg bg-gradient-to-br from-lime-900/20 to-emerald-900/20 border border-lime-500/30 rounded-3xl backdrop-blur-xl"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 bg-lime-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.6)]"
          >
            <CheckCircle2 className="w-12 h-12 text-black" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-2">Welcome Aboard!</h2>
          <p className="text-gray-400">Your application has been successfully sent to our server.</p>
        </motion.div>
      </section>
    );
  }

  // ---------------- MAIN FORM ----------------
  return (
    <section className="py-32 min-h-screen bg-gradient-to-b from-black via-[#0A1F0D] to-black relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-3xl px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
            JOIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">THE FORCE</span>
          </h2>
          <p className="text-gray-400">Step {currentStep} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
          <motion.div 
            className="h-full bg-lime-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Form Card */}
        <motion.div 
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="text-lime-400" /> Identity Protocol
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Full Name" value={formData.fullName} onChange={v => handleChange('fullName', v)} placeholder="John Doe" />
                  <InputGroup label="Registration Number" value={formData.registrationNumber} onChange={v => handleChange('registrationNumber', v)} placeholder="2023BCSE..." />
                  <InputGroup label="College Email" value={formData.collegeEmail} onChange={v => handleChange('collegeEmail', v)} type="email" placeholder="john@college.edu" />
                  <InputGroup label="Mobile Number" value={formData.mobileNumber} onChange={v => handleChange('mobileNumber', v)} type="tel" placeholder="+91 98765..." />
                </div>
              </motion.div>
            )}

            {/* STEP 2: DEPARTMENT & ROLE */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Building2 className="text-lime-400" /> Assignment Vector
                </h3>

                <div>
                  <label className="block text-xs font-bold text-lime-400 uppercase tracking-widest mb-2">Department</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DEPARTMENTS.map(dept => (
                      <button
                        key={dept}
                        onClick={() => handleChange('department', dept)}
                        className={`p-3 rounded-lg border text-sm transition-all text-left ${
                          formData.department === dept 
                            ? 'bg-lime-500 border-lime-500 text-black font-bold shadow-[0_0_15px_rgba(132,204,22,0.4)]' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-bold text-lime-400 uppercase tracking-widest mb-2">Preferred Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-4 text-white focus:border-lime-500 focus:outline-none"
                  >
                    <option value="">Select a Team...</option>
                    {TEAMS.map(team => <option key={team} value={team} className="bg-black text-white">{team}</option>)}
                  </select>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GREENERY QUESTIONS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Leaf className="text-lime-400" /> Vision Assessment
                </h3>

                <TextAreaGroup 
                  label="Why do you want to join the Green Club?" 
                  value={formData.question1} 
                  onChange={v => handleChange('question1', v)} 
                />
                
                <TextAreaGroup 
                  label="Share one innovative idea for campus greenery." 
                  value={formData.question2} 
                  onChange={v => handleChange('question2', v)} 
                />

                 <TextAreaGroup 
                  label="How do you balance development with sustainability?" 
                  value={formData.question3} 
                  onChange={v => handleChange('question3', v)} 
                />
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(p => p - 1)}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                onClick={handleNext}
                className="ml-auto px-8 py-3 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-bold hover:shadow-[0_0_20px_rgba(132,204,22,0.4)] transition-all"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleOpenReview}
                className="ml-auto px-8 py-3 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-bold hover:shadow-[0_0_20px_rgba(132,204,22,0.4)] transition-all flex items-center gap-2"
              >
                Review & Submit <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ---------------- REVIEW MODAL ---------------- */}
          <AnimatePresence>
            {isReviewOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl p-6 md:p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-white">Confirm Details</h3>
                  <button onClick={() => setIsReviewOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  <ReviewItem label="Full Name" value={formData.fullName} />
                  <ReviewItem label="Registration No." value={formData.registrationNumber} />
                  <ReviewItem label="Email" value={formData.collegeEmail} />
                  <ReviewItem label="Mobile" value={formData.mobileNumber} />
                  <div className="h-px bg-white/10 my-2" />
                  <ReviewItem label="Department" value={formData.department} />
                  <ReviewItem label="Role" value={formData.role} />
                  <div className="h-px bg-white/10 my-2" />
                  <ReviewItem label="Why Join?" value={formData.question1} />
                  <ReviewItem label="Green Idea" value={formData.question2} />
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button 
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-600 text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Confirm & Launch Application <Send className="w-5 h-5" /></>}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}

// ---------------- SUB-COMPONENTS ----------------

const InputGroup = ({ label, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-lime-500 focus:ring-1 focus:ring-lime-500 focus:outline-none transition-all"
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</label>
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-24 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lime-500 focus:ring-1 focus:ring-lime-500 focus:outline-none transition-all resize-none"
    />
  </div>
);

const ReviewItem = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
    <span className="text-sm font-bold text-gray-500 uppercase">{label}</span>
    <span className="text-white font-medium text-right break-words max-w-full sm:max-w-[70%]">{value || "-"}</span>
  </div>
);