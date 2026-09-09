import { useEffect } from 'react';
import { AdminProvider } from './context/AdminContext';
import { useAdmin } from './context/useAdmin';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReportReview from './pages/ReportReview';
import ReportManagement from './pages/ReportManagement';
import Users from './pages/Users';
import AuditLog from './pages/AuditLog';

const AppRoutes = () => {
  const { currentPath, isAuthenticated, navigateTo } = useAdmin();

  // Redirect root or empty path to /admin/dashboard
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      navigateTo(isAuthenticated ? '/admin/dashboard' : '/admin/login');
    }
    window.scrollTo(0, 0);
  }, [currentPath, isAuthenticated, navigateTo]);

  // Login page has its own standalone full-screen layout
  if (currentPath === '/admin/login') {
    return <Login />;
  }

  // All other pages are rendered inside the AdminLayout
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/admin/dashboard':
        return <Dashboard />;
      case '/admin/reports/review':
        return <ReportReview />;
      case '/admin/reports/manage':
        return <ReportManagement />;
      case '/admin/users':
        return <Users />;
      case '/admin/audit-log':
        return <AuditLog />;
      default:
        return <Dashboard />;
    }
  };

  return <AdminLayout>{renderCurrentPage()}</AdminLayout>;
};

function App() {
  return (
    <AdminProvider>
      <AppRoutes />
    </AdminProvider>
  );
}

export default App;
