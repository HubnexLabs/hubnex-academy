
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  studentOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false, studentOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    if (studentOnly) {
      return <Navigate to="/student-login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (studentOnly && user.role !== 'student') {
    return <Navigate to="/student-dashboard" replace />;
  }

  // Redirect students trying to access admin/sales dashboard
  if (user.role === 'student' && !studentOnly) {
    return <Navigate to="/student-dashboard" replace />;
  }

  return <>{children}</>;
};
