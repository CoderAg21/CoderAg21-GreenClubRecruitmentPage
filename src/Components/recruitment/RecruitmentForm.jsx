import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Send, Loader2, CheckCircle2, Leaf, Sparkles } from 'lucide-react';

const branches = [
  'Computer Science and Engineering',
  'Chemical Engineering',
  'Mechanical Engineering',
  'Biotech Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Electronics and Communication Engineering',
  'Other',
];

const teams = [
  'Marketing Team',
  'Media Team',
  'Web Team',
  'Design Team',
  'Videography Team',
  'Core Team',
];

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    college_email: '',
    branch: '',
    other_branch: '',
    team: '',
    why_join: '',
    wildlife_opinion: '',
    balance_opinion: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await base44.entities.Recruitment.create({
      ...formData,
      status: 'pending',
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStep1Valid = formData.name && formData.mobile_number && formData.college_email;
  const isStep2Valid = formData.branch && formData.team && (formData.branch !== 'Other' || formData.other_branch);
  const isStep3Valid = formData.why_join && formData.wildlife_opinion && formData.balance_opinion;

  if (isSubmitted) {
    return (
      <section id="form" className="py-32 bg-gradient-to-b from-[#0A1F0D] to-[#132E15] relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 bg-gradient-to-br from-lime-500/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl border border-lime-500/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted! 🎉</h2>
            <p className="text-gray-300 text-lg">
              Thank you for applying to Green Club MNNIT. We will review your application and get back to you soon!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="form" className="py-32 bg-gradient-to-b from-[#0A1F0D] to-[#132E15] relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span className="text-lime-300 text-sm font-medium">Join Our Team</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recruitment <span className="text-lime-400">Form</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Fill in your details below to apply for Green Club MNNIT
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step
                    ? 'bg-gradient-to-br from-lime-500 to-emerald-600 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
                animate={{ scale: currentStep === step ? 1.1 : 1 }}
              >
                {step}
              </motion.div>
              {step < 3 && (
                <div className={`w-16 h-1 rounded-full transition-all ${
                  currentStep > step ? 'bg-lime-500' : 'bg-white/10'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-lime-400" />
                  Personal Information
                </h3>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Name <span className="text-red-400">*</span></Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Mobile Number (WhatsApp) <span className="text-red-400">*</span></Label>
                  <Input
                    value={formData.mobile_number}
                    onChange={(e) => handleChange('mobile_number', e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">College Email ID <span className="text-red-400">*</span></Label>
                  <Input
                    type="email"
                    value={formData.college_email}
                    onChange={(e) => handleChange('college_email', e.target.value)}
                    placeholder="yourname@mnnit.ac.in"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 h-12"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Branch & Team */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-lime-400" />
                  Academic & Team Preference
                </h3>

                <div className="space-y-3">
                  <Label className="text-gray-300">Which branch are you from? <span className="text-red-400">*</span></Label>
                  <RadioGroup
                    value={formData.branch}
                    onValueChange={(value) => handleChange('branch', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {branches.map((branch) => (
                      <motion.div
                        key={branch}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                          formData.branch === branch
                            ? 'bg-lime-500/10 border-lime-500/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <RadioGroupItem value={branch} id={branch} className="border-lime-500 text-lime-500" />
                        <Label htmlFor={branch} className="text-gray-300 cursor-pointer flex-1">{branch}</Label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </div>

                {formData.branch === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <Label className="text-gray-300">Please specify your branch</Label>
                    <Input
                      value={formData.other_branch}
                      onChange={(e) => handleChange('other_branch', e.target.value)}
                      placeholder="Enter your branch"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 h-12"
                    />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-gray-300">Which team do you want to join? <span className="text-red-400">*</span></Label>
                  <Select value={formData.team} onValueChange={(value) => handleChange('team', value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 focus:ring-lime-500">
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A3D1A] border-white/10">
                      {teams.map((team) => (
                        <SelectItem key={team} value={team} className="text-white hover:bg-lime-500/20 focus:bg-lime-500/20">
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {/* Step 3: Essay Questions */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-lime-400" />
                  Tell Us More About Yourself
                </h3>

                <div className="space-y-2">
                  <Label className="text-gray-300">Why do you want to join Green Club? <span className="text-red-400">*</span></Label>
                  <Textarea
                    value={formData.why_join}
                    onChange={(e) => handleChange('why_join', e.target.value)}
                    placeholder="Share your motivation and passion..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">
                    What do you think are the main reasons behind increasing wildlife deaths and habitat loss in India? <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    value={formData.wildlife_opinion}
                    onChange={(e) => handleChange('wildlife_opinion', e.target.value)}
                    placeholder="Share your thoughts..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">
                    Cases like Hasdeo forests and industrial pollution show the conflict between development and environment. How can we balance economic growth with protecting our forests? <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    value={formData.balance_opinion}
                    onChange={(e) => handleChange('balance_opinion', e.target.value)}
                    placeholder="Share your perspective..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-lime-500 min-h-[120px] resize-none"
                    required
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Previous
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white hover:from-lime-600 hover:to-emerald-700 disabled:opacity-50"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !isStep3Valid}
                className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white hover:from-lime-600 hover:to-emerald-700 disabled:opacity-50 min-w-[140px]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}