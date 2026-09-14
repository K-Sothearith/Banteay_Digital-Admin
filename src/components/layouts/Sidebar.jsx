import { useAdmin } from '../../context/useAdmin';
import {
  BanteayDigital_Logo,
  Dashboard_Icon,
  Report_Icon,
  ReportManagement_Icon,
  Users_Icon
} from '../../assets';

export const Sidebar = () => {
  const { currentPath, navigateTo, admin, pendingReports } = useAdmin();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      iconSrc: Dashboard_Icon,
      faIcon: 'fa-solid fa-gauge'
    },
    {
      name: 'Report Review',
      path: '/admin/reports/review',
      iconSrc: Report_Icon,
      faIcon: 'fa-solid fa-clipboard-check',
      badge: pendingReports.length > 0 ? pendingReports.length : null
    },
    {
      name: 'Report Management',
      path: '/admin/reports/manage',
      iconSrc: ReportManagement_Icon,
      faIcon: 'fa-solid fa-folder-open'
    },
    {
      name: 'Users',
      path: '/admin/users',
      iconSrc: Users_Icon,
      faIcon: 'fa-solid fa-users'
    },
    {
      name: 'Community Safety',
      path: '/admin/community-safety',
      iconSrc: ReportManagement_Icon,
      faIcon: 'fa-solid fa-shield-halved'
    }
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-30 flex flex-col justify-between
      bg-white dark:bg-[#0c1733] 
      border-r border-slate-200 dark:border-[#1e3568] 
      transition-colors duration-200">
      
      {/* Top Branding Section */}
      <div>
        <div className="p-6 flex items-center gap-3.5 border-b border-slate-100 dark:border-[#1e3568]/60">
          <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-[#012475]/15 border border-[#012475]/20 flex items-center justify-center bg-[#012475] shrink-0">
            <img
              src={BanteayDigital_Logo}
              alt="Banteay Digital Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-base tracking-tight text-[#012475] dark:text-white truncate">
              Banteay Digital
            </span>
            <span className="text-xs font-semibold text-[#4b9efe] tracking-wide uppercase">
              Admin Console
            </span>
          </div>
        </div>

        {/* Navigation Items (Exactly 4 items per handbook) */}
        <nav className="p-4 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigateTo(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer text-left
                  ${
                    isActive
                      ? 'bg-[#012475] text-white shadow-md shadow-[#012475]/20 dark:bg-[#4b9efe] dark:text-[#070d1e]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#132248] hover:text-[#012475] dark:hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {/* SVG Icon with CSS invert/filter for active contrast */}
                    <img
                      src={item.iconSrc}
                      alt={item.name}
                      className={`w-5 h-5 object-contain transition-all duration-150 ${
                        isActive
                          ? 'brightness-0 invert dark:brightness-0'
                          : 'dark:brightness-0 dark:invert'
                      }`}
                    />
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      isActive
                        ? 'bg-white text-[#012475] dark:bg-[#070d1e] dark:text-[#4b9efe]'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Admin Profile Section */}
      <div className="p-4 border-t border-slate-100 dark:border-[#1e3568]/60 bg-slate-50/50 dark:bg-[#091228]/50">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div className="relative">
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-[#4b9efe]/50"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0c1733]"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
              {admin.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {admin.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
