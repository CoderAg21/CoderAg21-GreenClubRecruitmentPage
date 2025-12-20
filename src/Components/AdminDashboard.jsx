import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, LogOut, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) return navigate('/admin/login');

      try {
        const res = await fetch('http://localhost:5000/api/admin/stats', {
          headers: { 'Authorization': token }
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050505] p-8 font-sans text-white">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black tracking-tight">Admin<span className="text-lime-500">Dashboard</span></h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Candidates Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#0f0f0f] border border-lime-500/20 p-8 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
              <Users className="w-32 h-32 text-lime-500" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-lime-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-lime-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Applications</h3>
              </div>
              <div className="text-6xl font-black text-white">
                {stats.total}
              </div>
              <p className="text-gray-500 mt-2 text-sm">Live candidates in database</p>
            </div>
          </motion.div>

          {/* You can add more cards here later (e.g. Reviewed, Accepted) */}
        </div>
      </main>
    </div>
  );
}