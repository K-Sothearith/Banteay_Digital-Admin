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
import SafetyKnowledge from './pages/SafetyKnowledge';
import AlertsManagement from './pages/AlertsManagement';

const AppRoutes = () => {
  const { currentPath, isAuthenticated, authReady, navigateTo } = useAdmin();

  // Redirect root or empty path to /admin/dashboard
  useEffect(() => {
    if (!authReady) return;
    if (currentPath === '/' || currentPath === '') {
      navigateTo(isAuthenticated ? '/admin/dashboard' : '/admin/login');
    } else if (currentPath === '/admin/login' && isAuthenticated) {
      navigateTo('/admin/dashboard');
    } else if (currentPath !== '/admin/login' && !isAuthenticated) {
      navigateTo('/admin/login');
    }
    window.scrollTo(0, 0);
  }, [authReady, currentPath, isAuthenticated, navigateTo]);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#fbfbfb] dark:bg-[#070d1e] flex items-center justify-center text-[#012475] dark:text-[#4b9efe]">
        <div className="flex items-center gap-3 text-sm font-bold">
          <i className="fa-solid fa-shield-halved fa-pulse text-xl"></i>
          <span>Verifying administrator session…</span>
        </div>
      </div>
    );
  }

  // Login page has its own standalone full-screen layout
  if (currentPath === '/admin/login') {
    return <Login />;
  }

  if (!isAuthenticated) return null;

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
      case '/admin/community-safety':
        return <SafetyKnowledge />;
      case '/admin/alerts':
        return <AlertsManagement />;
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
