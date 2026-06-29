import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import ResultEntry from '@/pages/ResultEntry';
import Login from '@/pages/Login';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardLayout><Dashboard /></DashboardLayout> : <Navigate to="/login" />} 
          />
          <Route 
            path="/result-entry" 
            element={isAuthenticated ? <DashboardLayout><ResultEntry /></DashboardLayout> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  );
}
export default App;
