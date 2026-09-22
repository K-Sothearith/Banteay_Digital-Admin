import { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../../context/useAdmin';
import {
  AuditLog_Icon,
  Language_Icon,
  LightMode_Icon,
  DarkMode_Icon
} from '../../assets';

export const Navbar = ({ onMenuClick = () => {} }) => {
  const {
    isDarkMode,
    toggleTheme,
    language,
    changeLanguage,
    admin,
    logout,
    currentPath,
    navigateTo
  } = useAdmin();

  // Dropdown states
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const langRef = useRef(null);
  const adminRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setIsAdminOpen(false);
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const getPageTitle = () => {
    switch (currentPath) {
      case '/admin/dashboard':
        return 'Admin Console';
      case '/admin/reports/review':
        return 'Report Review';
      case '/admin/reports/manage':
        return 'Report Management';
      case '/admin/users':
        return 'Users';
      case '/admin/audit-log':
        return 'Audit Log';
      case '/admin/community-safety':
        return 'Community Safety';
      case '/admin/alerts':
        return 'Alerts';
      default:
        return 'Admin Console';
    }
  };

  return (
    <header className="sticky top-2 z-20 mx-4 mb-4 sm:top-3 sm:mx-6 sm:mb-3">
      <div className="flex min-h-14 items-center justify-between gap-2 rounded-2xl px-2.5 sm:px-5
        bg-white/90 dark:bg-[#0c1733]/90 
        backdrop-blur-md 
        border border-slate-200/80 dark:border-[#1e3568]/80 
        shadow-sm shadow-[#012475]/5">
        
        {/* Left Side: Context / Title */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            aria-controls="admin-navigation"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-[#012475] transition-colors hover:bg-slate-50 dark:border-[#1e3568] dark:bg-[#0c1733] dark:text-[#4b9efe] dark:hover:bg-[#132248] lg:hidden"
          >
            <i className="fa-solid fa-bars" aria-hidden="true"></i>
          </button>
          <span className="hidden text-sm font-semibold text-slate-500 dark:text-slate-400 sm:inline">
            Admin Console
          </span>
          {currentPath !== '/admin/dashboard' && (
            <>
              <i className="hidden fa-solid fa-chevron-right text-xs text-slate-300 dark:text-slate-600 sm:inline"></i>
              <span className="truncate text-sm font-bold text-[#012475] dark:text-[#4b9efe]">
                {getPageTitle()}
              </span>
            </>
          )}
        </div>

        {/* Right Side: Tools & Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          
          {/* Language Switch */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(prev => !prev)}
              aria-label="Change language"
              className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-2 sm:px-3 dark:border-[#1e3568]
                bg-white dark:bg-[#0c1733] 
                hover:border-[#4b9efe]/50 text-slate-700 dark:text-slate-200 text-xs font-semibold
                transition-all cursor-pointer shadow-2xs"
            >
              <img
                src={Language_Icon}
                alt="Language"
                className="w-4 h-4 object-contain dark:brightness-0 dark:invert"
              />
              <span className="hidden md:inline">{language === 'km' ? 'ភាសាខ្មែរ' : 'English'}</span>
              <i className={`hidden fa-solid fa-chevron-down text-xs text-slate-400 transition-transform md:inline ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isLangOpen && (
              <div
                style={{ marginTop: '5px' }}
                className="custom-dropdown-menu absolute right-0 z-50 w-36 p-1.5
                  bg-white dark:bg-[#0c1733] 
                  border border-slate-200 dark:border-[#1e3568] 
                  rounded-xl shadow-lg backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => {
                    changeLanguage('en');
                    setIsLangOpen(false);
                  }}
                  className={`custom-dropdown-item w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer
                    ${
                      language === 'en'
                        ? 'bg-[#012475]/10 dark:bg-[#4b9efe]/20 text-[#012475] dark:text-[#4b9efe] border-[#4b9efe]/40'
                        : 'text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#132248]'
                    }`}
                >
                  <span>English</span>
                  {language === 'en' && <i className="fa-solid fa-check text-xs text-[#012475] dark:text-[#4b9efe]"></i>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    changeLanguage('km');
                    setIsLangOpen(false);
                  }}
                  className={`custom-dropdown-item w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer mt-1
                    ${
                      language === 'km'
                        ? 'bg-[#012475]/10 dark:bg-[#4b9efe]/20 text-[#012475] dark:text-[#4b9efe] border-[#4b9efe]/40'
                        : 'text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#132248]'
                    }`}
                >
                  <span>ភាសាខ្មែរ (Khmer)</span>
                  {language === 'km' && <i className="fa-solid fa-check text-xs text-[#012475] dark:text-[#4b9efe]"></i>}
                </button>
              </div>
            )}
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-[#1e3568]
              bg-white dark:bg-[#0c1733] 
              hover:border-[#4b9efe]/50 text-slate-700 dark:text-slate-200
              transition-all cursor-pointer shadow-2xs"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <img
                src={LightMode_Icon}
                alt="Light Mode"
                className="w-4 h-4 object-contain brightness-0 invert"
              />
            ) : (
              <img
                src={DarkMode_Icon}
                alt="Dark Mode"
                className="w-4 h-4 object-contain"
              />
            )}
          </button>

          {/* Audit Log Button (accessed via Navbar per handbook) */}
          <button
            type="button"
            onClick={() => navigateTo('/admin/audit-log')}
            aria-label="Audit log"
            className={`flex h-9 items-center gap-2 rounded-xl border px-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs sm:px-3
              ${
                currentPath === '/admin/audit-log'
                  ? 'bg-[#012475] text-white border-[#012475] dark:bg-[#4b9efe] dark:text-[#070d1e] dark:border-[#4b9efe]'
                  : 'bg-white dark:bg-[#0c1733] border-slate-200 dark:border-[#1e3568] text-slate-700 dark:text-slate-200 hover:border-[#4b9efe]/50'
              }`}
          >
            <img
              src={AuditLog_Icon}
              alt="Audit Log"
              className={`w-4 h-4 object-contain ${
                currentPath === '/admin/audit-log'
                  ? 'brightness-0 invert dark:brightness-0'
                  : 'dark:brightness-0 dark:invert'
              }`}
            />
            <span className="hidden xl:inline">Audit Log</span>
          </button>

          {/* Admin Dropdown with Logout */}
          <div className="relative" ref={adminRef}>
            <button
              type="button"
              onClick={() => setIsAdminOpen(prev => !prev)}
              aria-label="Open administrator menu"
              className="flex h-9 items-center gap-2.5 rounded-xl border border-slate-200 p-1 pr-1 sm:pr-2.5 dark:border-[#1e3568]
                bg-white dark:bg-[#0c1733] 
                hover:border-[#4b9efe]/50 transition-all cursor-pointer shadow-2xs"
            >
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-7 h-7 rounded-lg object-cover"
              />
              <span className="hidden text-xs font-bold text-slate-800 dark:text-slate-200 xl:inline">
                {admin.name?.split(' ')[0] || 'Admin'}
              </span>
              <i className={`hidden fa-solid fa-chevron-down text-xs text-slate-400 transition-transform xl:inline ${isAdminOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isAdminOpen && (
              <div
                style={{ marginTop: '5px' }}
                className="custom-dropdown-menu absolute right-0 z-50 w-44 p-1.5
                  bg-white dark:bg-[#0c1733] 
                  border border-slate-200 dark:border-[#1e3568] 
                  rounded-xl shadow-lg backdrop-blur-md"
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-[#1e3568]/60 mb-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {admin.name}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {admin.email}
                  </p>
                </div>

                {/* Exactly Logout only, no Profile or Settings per handbook */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminOpen(false);
                    logout();
                  }}
                  className="custom-dropdown-item w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 rounded-lg border border-transparent hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-200 dark:hover:border-red-900/50 transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
