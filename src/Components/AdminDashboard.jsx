import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Search, Filter, Trash2, 
  CheckCircle, X, MessageCircle, 
  User, BookOpen, Target, Clock, Check, Loader2 
} from 'lucide-react';
import PropTypes from 'prop-types';

export default function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({ total: 0, reviewed: 0, pending: 0 });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  
  // Filters
  const [filterDept, setFilterDept] = useState('All');
  const [filterRole, setFilterRole] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();

  //  FETCH DATA 
  const fetchData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return navigate('/admin/login');

    try {
      const resCand = await fetch('https://coderag21-greenclubrecruitmentpage.onrender.com/api/admin/candidates', {
        headers: { 'Authorization': token }
      });
      const resStats = await fetch('https://coderag21-greenclubrecruitmentpage.onrender.com/api/admin/stats', {
        headers: { 'Authorization': token }
      });

      if (resCand.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const dataCand = await resCand.json();
      const dataStats = await resStats.json();

      setCandidates(dataCand);
      setStats(dataStats);
      
      if (selectedCandidate) {
        const updatedSelected = dataCand.find(c => c._id === selectedCandidate._id);
        if (updatedSelected) setSelectedCandidate(updatedSelected);
      }

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false); // Stop loading after fetch (success or fail)
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Live polling
    return () => clearInterval(interval);
  }, [navigate, selectedCandidate?._id]);

  //  ACTIONS 
  const handleDelete = async (e, id) => {
    e.stopPropagation(); 
    if(!window.confirm("Are you sure you want to delete this candidate?")) return;
    
    const token = localStorage.getItem('adminToken');
    await fetch(`https://coderag21-greenclubrecruitmentpage.onrender.com/api/admin/candidate/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    });
    
    if (selectedCandidate?._id === id) setSelectedCandidate(null);
    fetchData();
  };

  const toggleStatus = async (e, id, currentStatus) => {
    if(e) e.stopPropagation();
    
    //Toggle
    const newStatus = currentStatus === 'reviewed' ? 'pending' : 'reviewed';
    const token = localStorage.getItem('adminToken');
    
    await fetch(`https://coderag21-greenclubrecruitmentpage.onrender.com/api/admin/candidate/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token 
      },
      body: JSON.stringify({ status: newStatus })
    });
    fetchData();
  };

  const openWhatsApp = (e, mobile) => {
    e.stopPropagation();
    let cleanNumber = mobile.replace(/\D/g, '');
    if (cleanNumber.length === 10) cleanNumber = '91' + cleanNumber; 
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  //  FILTERING 
  const filteredCandidates = candidates.filter(c => {
    const matchesDept = filterDept === 'All' || c.department === filterDept;
    const matchesRole = filterRole === 'All' || c.role === filterRole;
    const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesRole && matchesSearch;
  });

  // LOADING VIEW
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
         <div className="flex flex-col items-center gap-4 z-10">
            <Loader2 className="w-12 h-12 text-lime-500 animate-spin" />
            <p className="text-gray-400 font-mono text-sm animate-pulse">Establishing Secure Connection...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6 font-sans text-gray-200 relative">
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0f0f0f] p-6 rounded-3xl border border-white/5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin <span className="text-lime-500">Dashboard</span></h1>
          <p className="text-gray-500 text-xs mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"/> Live Data Feed
          </p>
        </div>
        
        <div className="flex gap-4 text-sm font-bold">
            <StatBadge label="Total" value={stats.total} color="text-white" />
            <StatBadge label="Reviewed" value={stats.reviewed} color="text-lime-400" />
            <StatBadge label="Pending" value={stats.pending} color="text-yellow-400" />
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20 transition-colors text-sm font-bold">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      {/* FILTERS & SEARCH */}
      <div className="max-w-7xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
            />
        </div>
        <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none cursor-pointer">
                <option value="All">All Departments</option>
                <option value="Computer Science Engineering">CSE</option>
                <option value="Information Technology Engineering">IT</option>
                <option value="Mechanical Engineering">Mechanical</option>
                <option value="Electrical Engineering">Electrical</option>
                <option value="Electronics & Comm. Engineering">ECE</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none cursor-pointer">
                <option value="All">All Roles</option>
                <option value="Web Dev">Web Dev</option>
                <option value="Design">Design</option>
                <option value="Core Management">Management</option>
                <option value="Media">Media</option>
            </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto bg-[#0f0f0f] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold">Candidate</th>
                <th className="p-6 font-bold">Dept</th>
                <th className="p-6 font-bold">Role</th>
                <th className="p-6 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredCandidates.map((candidate) => (
                  <motion.tr 
                    key={candidate._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  >
                    {/* 1. Status Display Badge */}
                    <td className="p-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                            candidate.status === 'reviewed' 
                            ? 'bg-lime-500/10 text-lime-400 border-lime-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                            {candidate.status === 'reviewed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {candidate.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                        </span>
                    </td>

                    <td className="p-6">
                        <div className="font-bold text-white text-base mb-1">{candidate.fullName}</div>
                        <div className="text-xs text-gray-500 font-mono">{candidate.registrationNumber}</div>
                    </td>
                    <td className="p-6 text-sm text-gray-300">{candidate.department}</td>
                    <td className="p-6"><span className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10">{candidate.role}</span></td>
                    
                    {/* 2. Actions Column */}
                    <td className="p-6">
                        <div className="flex items-center justify-center gap-2">
                            
                            {/* MARK REVIEWED BUTTON */}
                            <button 
                                onClick={(e) => toggleStatus(e, candidate._id, candidate.status)} 
                                className={`p-2 rounded-lg border transition-all ${
                                    candidate.status === 'reviewed'
                                    ? 'bg-lime-500 text-black border-lime-500 hover:brightness-110'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-lime-400 hover:border-lime-400'
                                }`}
                                title={candidate.status === 'reviewed' ? "Mark Pending" : "Mark Reviewed"}
                            >
                                <Check className="w-4 h-4" />
                            </button>

                            {/* WhatsApp Button */}
                            <button onClick={(e) => openWhatsApp(e, candidate.mobileNumber)} className="p-2 bg-green-600/10 text-green-500 rounded-lg hover:bg-green-600/20 border border-green-600/20 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                            </button>
                            
                            {/* Delete Button */}
                            <button onClick={(e) => handleDelete(e, candidate._id)} className="p-2 bg-red-600/10 text-red-500 rounded-lg hover:bg-red-600/20 border border-red-600/20 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL  */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f0f] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-start sticky top-0 bg-[#0f0f0f]/95 backdrop-blur-md z-10">
                <div>
                    <h2 className="text-2xl font-black text-white">{selectedCandidate.fullName}</h2>
                    <div className="flex gap-3 text-sm text-gray-400 mt-2">
                        <span className="flex items-center gap-1"><User className="w-3 h-3"/> {selectedCandidate.registrationNumber}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> {selectedCandidate.department}</span>
                        <span className="flex items-center gap-1"><Target className="w-3 h-3"/> {selectedCandidate.role}</span>
                    </div>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                    <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="p-8 space-y-8">
                <DetailBlock label="Why Join Green Club?" value={selectedCandidate.question1} />
                <DetailBlock label="Tech Solution Idea" value={selectedCandidate.question2} />
                <DetailBlock label="Industry vs Nature Balance" value={selectedCandidate.question3} />
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-xs font-bold text-gray-500 uppercase">Email</span>
                        <div className="text-white mt-1">{selectedCandidate.collegeEmail}</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                        <span className="text-xs font-bold text-gray-500 uppercase">Mobile</span>
                        <div className="text-white mt-1 flex items-center gap-2">
                            {selectedCandidate.mobileNumber}
                            <button onClick={(e) => openWhatsApp(e, selectedCandidate.mobileNumber)} className="text-green-500 hover:text-green-400"><MessageCircle className="w-4 h-4"/></button>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const StatBadge = ({ label, value, color }) => (
    <div className="flex flex-col items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5 min-w-[80px]">
        <span className={`text-xl font-black ${color}`}>{value}</span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
);

const DetailBlock = ({ label, value }) => (
    <div>
        <h4 className="text-xs font-bold text-lime-500 uppercase tracking-widest mb-3">{label}</h4>
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
            {value}
        </div>
    </div>
);

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};  
DetailBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};