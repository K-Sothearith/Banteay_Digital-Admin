import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import { BanteayDigital_Logo } from '../assets';

export const Login = () => {
  const { login, navigateTo, error, clearError } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    try {
      const result = await login(email, password);
      if (result.success) navigateTo('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#fbfbfb] dark:bg-[#070d1e] relative overflow-hidden transition-colors duration-200">
      
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4b9efe]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#012475]/15 dark:bg-[#012475]/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#0c1733] rounded-3xl border border-slate-200/80 dark:border-[#1e3568]/80 shadow-xl p-8 md:p-10 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#012475] shadow-lg shadow-[#012475]/25 border border-[#012475]/30 flex items-center justify-center mb-4">
            <img
              src={BanteayDigital_Logo}
              alt="Banteay Digital"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-[#012475] dark:text-white tracking-tight">
            Banteay Digital
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Digital scam detection & community reporting
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Admin Login
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter administrative credentials to access the console.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <i className="fa-regular fa-envelope text-sm"></i>
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@banteay.digital"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568]
                  bg-white dark:bg-[#101e40] text-slate-800 dark:text-slate-100
                  focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 transition-all"
              />
            </div>
          </div>

          {/* Password with Show/Hide Toggle button (per handbook update) */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <i className="fa-solid fa-lock text-sm"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568]
                  bg-white dark:bg-[#101e40] text-slate-800 dark:text-slate-100
                  focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md
              bg-[#012475] hover:bg-[#012475]/90 text-white
              dark:bg-[#4b9efe] dark:hover:bg-[#4b9efe]/90 dark:text-[#070d1e]
              shadow-[#012475]/25 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </>
            )}
          </button>

          {/* Forgot Password visual link */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => alert('Password reset requests must be handled via internal organization admin channel.')}
              className="text-xs font-semibold text-[#012475] dark:text-[#4b9efe] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        </form>

      </div>

      {/* Footer Security Notice */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-500 text-center">
        Authorized personnel only. All actions are logged.
      </p>

    </div>
  );
};

export default Login;
