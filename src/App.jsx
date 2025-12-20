import Recruitment from "./Pages/Recruitment";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        {/* The Main Landing Page */}
        <Route path="/" element={<Recruitment />} />

        {/* The Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;