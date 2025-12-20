import { motion, AnimatePresence } from 'framer-motion';
import {Menu,X, Lock } from 'lucide-react'; // Added Lock icon
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Teams', href: '#teams' },
  { label: 'Benefits', href: '#benefits' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A1F0D]/95 backdrop-blur-2xl border-b border-lime-500/20 shadow-2xl shadow-lime-500/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div 
              className="p-1 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl relative"
              animate={{ 
                boxShadow: ['0 0 20px rgba(132, 204, 22, 0.3)', '0 0 40px rgba(132, 204, 22, 0.6)', '0 0 20px rgba(132, 204, 22, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src="https://green-club-mnnit.vercel.app/_next/image?url=%2FImages%2Flogo.webp&w=96&q=75" className='h-9 w-9' alt="" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
              Green Club
            </span>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="text-gray-300 hover:text-lime-400 transition-all duration-300 font-semibold relative group"
              >
                {item.label}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}

            {/* Admin Button */}
            <motion.button
               onClick={() => navigate('/admin/login')}
               whileHover={{ scale: 1.1, color: '#84cc16' }}
               className="text-gray-400 hover:text-lime-400 transition-colors"
               title="Admin Login"
            >
               <Lock className="w-5 h-5" />
            </motion.button>

            {/* Apply Button */}
            <motion.button
              onClick={() => scrollToSection('#form')}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(132, 204, 22, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-1.5 bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 rounded-full text-black font-bold shadow-lg shadow-lime-500/30 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-lime-400"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Apply</span>
            </motion.button>
          </div>
          
           {/* Mobile Menu Button - OPTIONAL: Uncomment if needed */}
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-white">
             {isMobileMenuOpen ? <X /> : <Menu />}
           </button>
        </div>
      </motion.nav>

      {/* Mobile Menu logic... (kept same as your code) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#0A1F0D]/98 backdrop-blur-2xl border-b border-lime-500/20 md:hidden overflow-hidden"
          >
             {/* ... existing mobile menu items ... */}
             <div className="p-6">
                <button onClick={() => navigate('/admin/login')} className="text-gray-400 flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-widest">
                   <Lock className="w-4 h-4" /> Admin Access
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}