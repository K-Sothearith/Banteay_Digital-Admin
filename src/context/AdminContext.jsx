import { useState, useEffect } from 'react';
import { AdminContext } from './createAdminContext';
import {
  initialStats,
  scanActivityData,
  reportDistributionData,
  initialPendingReports,
  initialManagedReports,
  initialUsers,
  userStats,
  initialAuditLogs,
  currentAdmin
} from '../data/mockData';

export const AdminProvider = ({ children }) => {
  // Theme state: dark mode vs light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bd-admin-theme');
    if (saved) return saved === 'dark';
    return false; // Default light mode as user requested #fbfbfb/#ffffff majority in light mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bd-admin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bd-admin-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Language state: 'en' | 'km'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('bd-admin-lang') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('bd-admin-lang', lang);
  };

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('bd-admin-auth') !== 'false';
  });
  const admin = currentAdmin;

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('bd-admin-auth', 'true');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('bd-admin-auth', 'false');
    navigateTo('/admin/login');
  };

  // Client Routing State
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return '/admin/dashboard';
    return path;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/admin/dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Data states
  const [pendingReports, setPendingReports] = useState(initialPendingReports);
  const [managedReports, setManagedReports] = useState(initialManagedReports);
  const users = initialUsers;
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [stats, setStats] = useState({
    ...initialStats,
    pendingReports: initialPendingReports.length
  });

  // Action: Add audit log entry
  const addAuditLog = (action, reference, description) => {
    const now = new Date();
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      admin: admin.name,
      role: admin.role,
      action,
      reference,
      timeAgo: 'Just now',
      timestamp: `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      description
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Action: Approve Report
  const approveReport = (reportId) => {
    const report = pendingReports.find(r => r.id === reportId);
    if (!report) return;

    // Remove from pending
    setPendingReports(prev => prev.filter(r => r.id !== reportId));

    // Add to managed reports
    const newManaged = {
      id: report.id,
      title: report.title,
      author: 'Banteay Digital',
      publishedDate: `Approved ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      timestamp: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      description: report.description,
      evidenceImage: report.evidenceImage,
      category: report.category,
      severity: report.severity,
      status: 'Approved',
      location: report.submitter?.location || 'Cambodia'
    };
    setManagedReports(prev => [newManaged, ...prev]);

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingReports: Math.max(0, prev.pendingReports - 1),
      approvedReports: prev.approvedReports + 1
    }));

    // Log action
    addAuditLog('Approved', report.id, `Approved report "${report.title.slice(0, 40)}..." after verification`);
  };

  // Action: Reject Report
  const rejectReport = (reportId, reason = 'Insufficient evidence or invalid report') => {
    const report = pendingReports.find(r => r.id === reportId);
    if (!report) return;

    // Remove from pending
    setPendingReports(prev => prev.filter(r => r.id !== reportId));

    // Update stats
    setStats(prev => ({
      ...prev,
      pendingReports: Math.max(0, prev.pendingReports - 1)
    }));

    // Log action
    addAuditLog('Rejected', report.id, `Rejected report: ${reason}`);
  };

  // Action: Edit Managed Report
  const updateManagedReport = (updatedReport) => {
    setManagedReports(prev =>
      prev.map(r => (r.id === updatedReport.id ? updatedReport : r))
    );

    // Log action
    addAuditLog(
      'Edited',
      updatedReport.id,
      `Updated details, severity (${updatedReport.severity}), and status (${updatedReport.status})`
    );
  };

  // Action: Publish Managed Report
  const publishManagedReport = (reportId) => {
    setManagedReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: 'Published' } : r))
    );

    addAuditLog('Published', reportId, `Published report to community public feed`);
  };

  return (
    <AdminContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        language,
        changeLanguage,
        isAuthenticated,
        admin,
        login,
        logout,
        currentPath,
        navigateTo,
        stats,
        scanActivityData,
        reportDistributionData,
        pendingReports,
        managedReports,
        users,
        userStats,
        auditLogs,
        approveReport,
        rejectReport,
        updateManagedReport,
        publishManagedReport
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
