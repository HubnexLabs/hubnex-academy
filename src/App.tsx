
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import { Login } from '@/pages/Login';
import { StudentLogin } from '@/pages/StudentLogin';
import { Dashboard } from '@/pages/Dashboard';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { LeadsManagement } from '@/pages/LeadsManagement';
import { UserManagement } from '@/pages/UserManagement';
import { StudentManagement } from '@/pages/StudentManagement';
import NotFound from '@/pages/NotFound';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import RefundPolicy from '@/pages/RefundPolicy';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            
            {/* Student Dashboard */}
            <Route path="/student-dashboard" element={
              <ProtectedRoute studentOnly>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/leads" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LeadsManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute adminOnly>
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/students" element={
              <ProtectedRoute adminOnly>
                <DashboardLayout>
                  <StudentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={<Navigate to="/login" replace />} />
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
