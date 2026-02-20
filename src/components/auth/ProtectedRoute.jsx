// ============================================================
// ProtectedRoute - Redirects unauthenticated users to /login
// ============================================================
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../layout/Layout';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
}
