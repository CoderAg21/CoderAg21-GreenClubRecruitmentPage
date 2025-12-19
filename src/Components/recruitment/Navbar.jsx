import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Teams', href: '#teams' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Apply', href: '#form' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A1F0D]/90 backdrop-blur-xl border-b border-white/10 py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="p-2 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-xl">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Green Club</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-lime-400 transition-colors font-medium"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('#form')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-gradient-to-r from-lime-500 to-emerald-600 rounded-full text-[#0A1F0D] font-semibold"
            >
              Join Now
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0A1F0D]/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-gray-300 hover:text-lime-400 py-3 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('#form')}
                className="w-full py-3 bg-gradient-to-r from-lime-500 to-emerald-600 rounded-xl text-[#0A1F0D] font-semibold mt-4"
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}