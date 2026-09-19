import { useCallback, useEffect, useState } from 'react';
import { BanteayDigital_Logo } from '../assets';
import { api } from '../services/api';
import authService from '../services/authService';
import { AdminContext } from './createAdminContext';

const emptyStats = { totalScans: 0, totalReports: 0, pendingReports: 0, approvedReports: 0 };
const emptyActivity = {
  week: Array.from({ length: 7 }, (_, index) => ({ label: `${index + 1}`, value: 0 })),
  month: Array.from({ length: 30 }, (_, index) => ({ label: `${index + 1}`, value: 0 })),
  year: Array.from({ length: 12 }, (_, index) => ({ label: `${index + 1}`, value: 0 })),
};
const emptyDistribution = [
  { id: 'pending', name: 'Pending', count: 0, percent: '0%', color: '#f59e0b' },
  { id: 'approved', name: 'Approved', count: 0, percent: '0%', color: '#10b981' },
  { id: 'rejected', name: 'Rejected', count: 0, percent: '0%', color: '#ef4444' },
];

const displayName = (user, fallback = 'Unknown user') => user?.name || user?.email || user?.phoneNumber || fallback;
const titleCase = (value = '') => value.toLowerCase().replace(/(^|_)([a-z])/g, (_match, prefix, letter) => `${prefix ? ' ' : ''}${letter.toUpperCase()}`);
const formatDate = (value, options = { dateStyle: 'medium' }) => value
  ? new Intl.DateTimeFormat('en', options).format(new Date(value))
  : 'Not available';

const inlineAvatar = (name) => {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'BD';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="20" fill="#012475"/><text x="48" y="57" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const avatarFor = (user, fallbackName) => inlineAvatar(displayName(user, fallbackName));

const riskFor = (assessment) => ({
  STRONG_SCAM_INDICATORS: 'Critical',
  SUSPICIOUS: 'High',
  CAUTION: 'Medium',
  INSUFFICIENT_EVIDENCE: 'Unknown',
  NO_STRONG_WARNING_SIGNS: 'Low',
  UNABLE_TO_ASSESS: 'Unknown',
}[assessment] || 'Unknown');

const reportView = (report) => {
  const scan = report.scan || {};
  const submitterName = displayName(report.user, 'Anonymous reporter');
  const category = scan.scamCaseMatches?.[0]?.scamCase?.scamType || titleCase(scan.inputType || 'Scam report');
  const hasCommunityPost = Boolean(report.communityPost);
  const isPublished = Boolean(report.communityPost?.isPublished);
  const status = isPublished ? 'Published' : hasCommunityPost ? 'Unpublished' : titleCase(report.status);
  return {
    ...report,
    title: report.title || `Scam Report #${report.id.slice(-6)}`,
    description: report.content || scan.normalizedInput || 'No report description was provided.',
    userCase: report.details || '',
    category,
    severity: riskFor(scan.assessment),
    status,
    hasCommunityPost,
    isPublished,
    aiResult: titleCase(scan.assessment || 'Pending analysis'),
    indicatorScore: Math.max(0, Math.min(100, Number(scan.score) || 0)),
    riskSignals: Array.isArray(scan.analysisSignals) ? scan.analysisSignals : [],
    evidenceSufficiency: scan.evidenceSufficiency || 'INSUFFICIENT',
    evidenceImage: null,
    publishedDate: isPublished
      ? `Published ${formatDate(report.communityPost.publishedAt)}`
      : hasCommunityPost
        ? `Unpublished ${formatDate(report.communityPost.updatedAt)}`
        : `Approved ${formatDate(report.reviewedAt)}`,
    location: null,
    submitter: {
      name: submitterName,
      avatar: avatarFor(report.user, submitterName),
      time: formatDate(report.createdAt, { dateStyle: 'medium', timeStyle: 'short' }),
      timestamp: formatDate(report.createdAt, { dateStyle: 'medium', timeStyle: 'short' }),
    },
  };
};

const userView = (user) => {
  const name = displayName(user);
  return {
    ...user,
    name,
    email: user.email || user.phoneNumber || 'No contact information',
    avatar: avatarFor(user, name),
    reports: user.reportCount || 0,
    published: user.publishedReportCount || 0,
    joined: formatDate(user.createdAt),
    status: titleCase(user.status),
  };
};

const auditView = (log) => {
  const occurredAt = new Date(log.occurredAt);
  const elapsedMinutes = Math.max(0, Math.round((Date.now() - occurredAt.getTime()) / 60000));
  const timeAgo = elapsedMinutes < 1 ? 'Just now'
    : elapsedMinutes < 60 ? `${elapsedMinutes}m ago`
      : elapsedMinutes < 1440 ? `${Math.floor(elapsedMinutes / 60)}h ago`
        : `${Math.floor(elapsedMinutes / 1440)}d ago`;
  return {
    ...log,
    admin: displayName(log.admin, 'Administrator'),
    role: titleCase(log.admin?.role || 'ADMIN'),
    timestamp: formatDate(log.occurredAt, { dateStyle: 'medium', timeStyle: 'short' }),
    timeAgo,
  };
};

export const AdminProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('bd-admin-theme') === 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('bd-admin-lang') || 'en');
  const [admin, setAdmin] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/admin/dashboard');
  const [stats, setStats] = useState(emptyStats);
  const [scanActivityData, setScanActivityData] = useState(emptyActivity);
  const [reportDistributionData, setReportDistributionData] = useState(emptyDistribution);
  const [pendingReports, setPendingReports] = useState([]);
  const [managedReports, setManagedReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({ totalUsers: 0, submittedReports: 0, publishedReports: 0 });
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('bd-admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/admin/dashboard');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((path) => {
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  const loadAdminData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dashboard, pending, approved, userResponse, auditResponse] = await Promise.all([
        api.admin.dashboard(),
        api.admin.reports('PENDING'),
        api.admin.reports('APPROVED'),
        api.admin.users(),
        api.admin.auditLogs(),
      ]);
      setStats(dashboard.stats);
      setScanActivityData(dashboard.scanActivityData);
      setReportDistributionData(dashboard.reportDistributionData);
      setPendingReports(pending.reports.map(reportView));
      setManagedReports(approved.reports.map(reportView));
      setUsers(userResponse.users.map(userView));
      setUserStats(userResponse.stats);
      setAuditLogs(auditResponse.logs.map(auditView));
      setError('');
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const initialize = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user?.role !== 'ADMIN') {
          return;
        }
        if (active) setAdmin(user);
        await loadAdminData();
      } catch (requestError) {
        if (active && requestError.status !== 401) setError(requestError.message);
      } finally {
        if (active) setAuthReady(true);
      }
    };
    initialize();
    return () => { active = false; };
  }, [loadAdminData]);

  useEffect(() => {
    const expireSession = () => {
      setAdmin(null);
      setAuthReady(true);
      navigateTo('/admin/login');
    };
    window.addEventListener('bd:auth-expired', expireSession);
    return () => window.removeEventListener('bd:auth-expired', expireSession);
  }, [navigateTo]);

  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await authService.login(email, password);
      if (!result.success) {
        setError(result.message);
        return result;
      }
      setAdmin(result.user);
      await loadAdminData();
      return result;
    } catch (requestError) {
      const message = requestError.message || 'Unable to sign in.';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
      setAuthReady(true);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Clear the local session even if the server is temporarily unavailable.
    } finally {
      setAdmin(null);
      navigateTo('/admin/login');
    }
  };

  const refreshDashboardAndAudit = async () => {
    const [dashboard, auditResponse, userResponse] = await Promise.all([
      api.admin.dashboard(),
      api.admin.auditLogs(),
      api.admin.users(),
    ]);
    setStats(dashboard.stats);
    setScanActivityData(dashboard.scanActivityData);
    setReportDistributionData(dashboard.reportDistributionData);
    setAuditLogs(auditResponse.logs.map(auditView));
    setUsers(userResponse.users.map(userView));
    setUserStats(userResponse.stats);
  };

  const runAction = async (action) => {
    setIsLoading(true);
    setError('');
    try {
      await action();
      return true;
    } catch (requestError) {
      setError(requestError.message || 'The action could not be completed.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const approveReport = (reportId) => runAction(async () => {
    const { report } = await api.admin.approveReport(reportId);
    setPendingReports((current) => current.filter(({ id }) => id !== reportId));
    setManagedReports((current) => [reportView(report), ...current]);
    await refreshDashboardAndAudit();
  });

  const rejectReport = (reportId, reason = 'Rejected after administrator review') => runAction(async () => {
    await api.admin.rejectReport(reportId, reason);
    setPendingReports((current) => current.filter(({ id }) => id !== reportId));
    await refreshDashboardAndAudit();
  });

  const updateManagedReport = (updatedReport) => runAction(async () => {
    const summary = updatedReport.description.trim().slice(0, 500);
    const { report } = await api.admin.updateReport(updatedReport.id, {
      title: updatedReport.title,
      content: updatedReport.description,
      ...(summary.length >= 10 && { summary }),
    });
    setManagedReports((current) => current.map((item) => item.id === report.id ? reportView(report) : item));
  });

  const updateReportUserCase = async (reportId, details) => {
    setIsLoading(true);
    setError('');
    try {
      const { report } = await api.admin.updateReport(reportId, { details });
      const updated = reportView(report);
      setPendingReports((current) => current.map((item) => item.id === reportId ? updated : item));
      setManagedReports((current) => current.map((item) => item.id === reportId ? updated : item));
      return updated;
    } catch (requestError) {
      setError(requestError.message || 'The user case could not be updated.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const setManagedReportPublication = (reportId, isPublished) => runAction(async () => {
    const report = managedReports.find(({ id }) => id === reportId);
    if (!report || report.isPublished === isPublished) return;

    let response;
    if (isPublished && !report.hasCommunityPost) {
      const content = report.description.trim();
      const summary = content.slice(0, 500);
      response = await api.admin.publishReport(reportId, { title: report.title, summary, content });
    } else {
      response = await api.admin.setReportPublication(reportId, isPublished);
    }

    setManagedReports((current) => current.map((item) => item.id === reportId ? reportView(response.report) : item));
    await refreshDashboardAndAudit();
  });

  const deleteManagedReport = (reportId) => runAction(async () => {
    await api.admin.deleteReport(reportId);
    setManagedReports((current) => current.filter(({ id }) => id !== reportId));
    await refreshDashboardAndAudit();
  });

  const contextValue = {
    isDarkMode,
    toggleTheme: () => setIsDarkMode((value) => !value),
    language,
    changeLanguage: (value) => { setLanguage(value); localStorage.setItem('bd-admin-lang', value); },
    isAuthenticated: Boolean(admin),
    authReady,
    isLoading,
    error,
    clearError: () => setError(''),
    admin: admin ? { ...admin, avatar: admin.avatarUrl || BanteayDigital_Logo, role: titleCase(admin.role) } : null,
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
    updateReportUserCase,
    setManagedReportPublication,
    deleteManagedReport,
    refresh: loadAdminData,
  };

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
