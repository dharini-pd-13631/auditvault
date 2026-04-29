import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Audits from './pages/Audits';
import AuditDetail from './pages/AuditDetail';
import CreateAudit from './pages/CreateAudit';
import Templates from './pages/Templates';
import Deadlines from './pages/Deadlines';
import Sectors from './pages/Sectors';
import Users from './pages/Users';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin()) return <Navigate to="/dashboard" />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="audits" element={<Audits />} />
        <Route path="audits/new" element={<CreateAudit />} />
        <Route path="audits/:id" element={<AuditDetail />} />
        <Route path="templates" element={<Templates />} />
        <Route path="deadlines" element={<Deadlines />} />
        <Route path="sectors" element={<Sectors />} />
        <Route path="users" element={<AdminRoute><Users /></AdminRoute>} />
      </Route>
    </Routes>
  );
}
