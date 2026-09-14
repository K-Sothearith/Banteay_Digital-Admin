
export const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20';
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'published':
        return 'bg-[#4b9efe]/10 text-[#012475] dark:text-[#4b9efe] border border-[#4b9efe]/30';
      case 'critical':
        return 'bg-red-600/10 text-red-600 dark:text-red-400 border border-red-500/30 font-semibold';
      case 'high':
      case 'high risk':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/25';
      case 'medium':
      case 'medium risk':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20';
      case 'low':
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20';
      case 'active':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
      case 'suspended':
      case 'banned':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20';
      case 'edited':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20';
    }
  };

  const getDotColor = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-500';
      case 'approved':
      case 'active':
        return 'bg-emerald-500';
      case 'rejected':
      case 'critical':
      case 'suspended':
      case 'banned':
        return 'bg-red-500';
      case 'published':
        return 'bg-[#4b9efe]';
      case 'high':
      case 'high risk':
        return 'bg-orange-500';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClass = size === 'xs' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'md' 
    ? 'px-3 py-1 text-sm' 
    : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${sizeClass} ${getBadgeStyle()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}></span>
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
