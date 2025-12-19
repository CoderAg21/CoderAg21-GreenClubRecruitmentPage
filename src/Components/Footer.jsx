import { motion } from 'framer-motion';
import { Leaf, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-8 relative overflow-hidden border-t border-lime-500/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">Green Club</span>
            </div>
            <p className="text-gray-400 mb-6">MNNIT Allahabad, India</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Get Involved</h3>
            <ul className="space-y-4">
              {['Join a Team', 'Events', 'Volunteer'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {['Guide', 'Gallery', 'Reports'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/greenclub_mnnit' },
                { icon: Youtube, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 hover:bg-lime-500/20 border border-white/10 hover:border-lime-400/30 rounded-xl text-gray-400 hover:text-lime-400 transition-all"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Green Club MNNIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}