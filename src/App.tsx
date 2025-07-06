
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Index from '@/pages/Index';
import { StudentLogin } from '@/pages/StudentLogin';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { Dashboard } from '@/pages/Dashboard';
import { LeadsManagement } from '@/pages/LeadsManagement';
import { UserManagement } from '@/pages/UserManagement';
import { StudentManagement } from '@/pages/StudentManagement';
import { Login } from '@/pages/Login';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - User:', user, 'Loading:', loading, 'Allowed roles:', allowedRoles);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log('User role not allowed:', user.role, 'Allowed:', allowedRoles);
    if (user.role === 'student') {
      return <Navigate to="/student-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  console.log('Access granted for user:', user.role);
  return <>{children}</>;
};

const ThemedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Admin Panel Routes - with Theme Provider */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ThemeProvider defaultTheme="system" storageKey="admin-theme">
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ThemeProvider>
        </ProtectedRoute>
      } />

      <Route path="/admin/leads" element={
        <ProtectedRoute allowedRoles={['admin', 'sales_person']}>
          <ThemeProvider defaultTheme="system" storageKey="admin-theme">
            <DashboardLayout>
              <LeadsManagement />
            </DashboardLayout>
          </ThemeProvider>
        </ProtectedRoute>
      } />

      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ThemeProvider defaultTheme="system" storageKey="admin-theme">
            <DashboardLayout>
              <UserManagement />
            </DashboardLayout>
          </ThemeProvider>
        </ProtectedRoute>
      } />

      <Route path="/admin/students" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ThemeProvider defaultTheme="system" storageKey="admin-theme">
            <DashboardLayout>
              <StudentManagement />
            </DashboardLayout>
          </ThemeProvider>
        </ProtectedRoute>
      } />

      {/* Legacy dashboard routes - redirect to admin */}
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="/leads" element={<Navigate to="/admin/leads" replace />} />
      <Route path="/users" element={<Navigate to="/admin/users" replace />} />
      <Route path="/students" element={<Navigate to="/admin/students" replace />} />

      {/* Student Panel Routes - with Theme Provider */}
      <Route path="/student-dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <ThemeProvider defaultTheme="system" storageKey="student-theme">
            <StudentDashboard />
          </ThemeProvider>
        </ProtectedRoute>
      } />

      {/* Auth Routes - No Theme Provider (Light Only) */}
      <Route path="/login" element={<Login />} />
      <Route path="/student-login" element={<StudentLogin />} />

      {/* Public Routes - No Theme Provider (Light Only) */}
      <Route path="/" element={<Index />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemedRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
