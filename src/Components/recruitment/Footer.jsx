import { motion } from 'framer-motion';
import { Leaf, Instagram, Youtube, Linkedin, ExternalLink, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  getInvolved: [
    { label: 'Join a Team', href: '#' },
    { label: 'Upcoming Events', href: '#' },
    { label: 'Volunteer Opportunities', href: '#' },
    { label: 'Campus Initiatives', href: '#' },
  ],
  resources: [
    { label: 'Sustainability Guide', href: '#' },
    { label: 'Project Gallery', href: '#' },
    { label: 'Annual Reports', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/greenclub_mnnit', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0A1F0D] to-[#071209] pt-20 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Green Club</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Where environmental action meets creativity and leadership. Join us in making a greener tomorrow.
            </p>
            <div className="flex items-center gap-3 text-gray-400 mb-3">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span className="text-sm">MNNIT Allahabad, India</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail className="w-4 h-4 text-lime-400" />
              <span className="text-sm">greenclub@mnnit.ac.in</span>
            </div>
          </motion.div>

          {/* Get Involved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Get Involved</h3>
            <ul className="space-y-4">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500/50 group-hover:bg-lime-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-lime-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500/50 group-hover:bg-lime-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Submit Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-semibold text-lg mb-6">Submit an Issue</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              If you have encountered an issue or have a concern related to our community, please let us know.
            </p>
            <motion.a
              href="https://docs.google.com/forms/d/1QRl0IHGZVcix46v5Rg20wfJQ6JwrOlx0XZGfceSrUWE/edit"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-lime-500/10 to-emerald-500/10 border border-lime-500/30 rounded-xl text-lime-400 hover:border-lime-500/50 transition-colors"
            >
              Submit Feedback
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Green Club MNNIT. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-lime-500/20 border border-white/10 hover:border-lime-500/30 rounded-xl text-gray-400 hover:text-lime-400 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}