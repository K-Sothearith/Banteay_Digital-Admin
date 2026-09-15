import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import StatusBadge from '../components/common/StatusBadge';

export const AuditLog = () => {
  const { auditLogs, navigateTo } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('All');
  const [selectedAction, setSelectedAction] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');
  const [filterNow] = useState(() => Date.now());

  const adminOptions = [
    { value: 'All', label: 'Admin: All Admins' },
    ...[...new Set(auditLogs.map((log) => log.admin))].map((admin) => ({ value: admin, label: admin }))
  ];

  const actionOptions = [
    { value: 'All', label: 'Action: All Actions' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' },
    { value: 'Published', label: 'Published' }
  ];

  const dateOptions = [
    { value: 'All', label: 'Date: All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past 7 Days' }
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.admin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAdmin =
      selectedAdmin === 'All' || log.admin === selectedAdmin;

    const matchesAction =
      selectedAction === 'All' || log.action.toLowerCase() === selectedAction.toLowerCase();

    const occurredAt = new Date(log.occurredAt);
    const cutoff = selectedDate === 'today'
      ? new Date(new Date(filterNow).setHours(0, 0, 0, 0))
      : selectedDate === 'week'
        ? new Date(filterNow - 7 * 24 * 60 * 60 * 1000)
        : null;
    const matchesDate = !cutoff || occurredAt >= cutoff;

    return matchesSearch && matchesAdmin && matchesAction && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigateTo('/admin/dashboard')}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-[#1e3568]
            bg-white dark:bg-[#0c1733] 
            hover:bg-slate-50 dark:hover:bg-[#132248] 
            text-slate-700 dark:text-slate-200 
            flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="Back to Dashboard"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Audit Log
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Chronological record of report review and publication events
          </p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col lg:flex-row items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by description, reference, or admin..."
          className="w-full lg:flex-1"
        />

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <Dropdown
            options={adminOptions}
            value={selectedAdmin}
            onChange={setSelectedAdmin}
            className="flex-1 sm:flex-none"
            buttonClassName="w-full sm:w-auto min-w-[150px]"
          />

          <Dropdown
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            className="flex-1 sm:flex-none"
            buttonClassName="w-full sm:w-auto min-w-[150px]"
          />

          <Dropdown
            options={dateOptions}
            value={selectedDate}
            onChange={setSelectedDate}
            className="flex-1 sm:flex-none"
            buttonClassName="w-full sm:w-auto min-w-[130px]"
            align="right"
          />
        </div>
      </div>

      {/* Activity Log List */}
      <div className="space-y-3">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex items-start gap-4"
            >
              {/* Event Icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#132248] text-slate-500 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200/60 dark:border-[#1e3568]">
                <i className="fa-solid fa-file-shield text-base text-[#012475] dark:text-[#4b9efe]"></i>
              </div>

              {/* Event Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {log.admin}
                    </span>
                    <StatusBadge status={log.action} size="xs" />
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {log.reference}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
                    <i className="fa-regular fa-clock text-xs"></i>
                    <span>{log.timeAgo}</span>
                    <span className="hidden sm:inline">• {log.timestamp}</span>
                  </div>
                </div>

                {log.description && (
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {log.description}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 p-12 text-center">
            <i className="fa-solid fa-list-check text-3xl text-slate-300 dark:text-slate-600 mb-3"></i>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No audit records match filters
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Try resetting your search query or selecting "All Actions".
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AuditLog;
