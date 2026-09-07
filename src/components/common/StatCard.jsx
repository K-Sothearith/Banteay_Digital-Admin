
export const StatCard = ({
  title,
  value,
  icon,
  iconBgColor = 'bg-[#012475]/10 text-[#012475] dark:bg-[#4b9efe]/20 dark:text-[#4b9efe]',
  className = ''
}) => {
  return (
    <div
      className={`cyber-card relative overflow-hidden bg-white dark:bg-[#0c1733] 
        p-4 rounded-xl border border-slate-200/80 dark:border-[#1e3568]/80 
        shadow-xs hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>
        </div>

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 transition-colors ${iconBgColor}`}>
          {typeof icon === 'string' && icon.startsWith('http') ? (
            <img src={icon} alt={title} className="w-6 h-6 object-contain" />
          ) : typeof icon === 'string' && icon.includes('<svg') ? (
            <div dangerouslySetInnerHTML={{ __html: icon }} className="w-6 h-6" />
          ) : typeof icon === 'string' ? (
            <i className={`${icon} text-lg`}></i>
          ) : (
            icon
          )}
        </div>
      </div>

      {/* Subtle bottom cyber accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#4b9efe]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default StatCard;
