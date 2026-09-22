import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';

export const AdminLayout = ({ children }) => {
  const { isAuthenticated, isLoading, error, clearError } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] dark:bg-[#070d1e] text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      {/* Fixed Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area (offset by 16rem/256px for the fixed sidebar) */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-4 lg:ml-64">
        {/* Floating Top Navbar inside main-content area */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="mx-auto mt-1 flex w-full max-w-7xl flex-1 flex-col px-4 sm:mt-2 sm:px-6">
          {error && (
            <div role="alert" className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              <span>{error}</span>
              <button type="button" onClick={clearError} aria-label="Dismiss error" className="cursor-pointer font-bold">×</button>
            </div>
          )}
          {children}
        </main>
      </div>
      {isLoading && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#012475] px-4 py-2 text-xs font-bold text-white shadow-xl dark:bg-[#4b9efe] dark:text-[#070d1e]">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
          <span>Syncing with server…</span>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
