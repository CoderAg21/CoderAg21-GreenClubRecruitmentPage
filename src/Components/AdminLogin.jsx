import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token); // Store JWT
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-[#0f0f0f] border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        {/* --- BACK BUTTON ADDED HERE --- */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-all"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-lime-500/10 rounded-full border border-lime-500/20">
            <Lock className="w-8 h-8 text-lime-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-white text-center mb-8">Admin Access</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Username</label>
            <input 
              type="text" 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-lime-500 focus:outline-none transition-colors"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-lime-500 focus:outline-none transition-colors"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : <>Login <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}