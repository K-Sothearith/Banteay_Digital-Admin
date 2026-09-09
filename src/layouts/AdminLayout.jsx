import { useAdmin } from '../context/useAdmin';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';

export const AdminLayout = ({ children }) => {
  const { isAuthenticated, navigateTo } = useAdmin();

  if (!isAuthenticated) {
    // If not authenticated in mock state, redirect to login
    setTimeout(() => navigateTo('/admin/login'), 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] dark:bg-[#070d1e] text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main Content Area (offset by 16rem/256px for the fixed sidebar) */}
      <div className="flex-1 ml-64 flex flex-col min-w-0 min-h-screen pb-3">
        {/* Floating Top Navbar inside main-content area */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="px-6 flex-1 max-w-7xl w-full mx-auto flex flex-col mt-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
