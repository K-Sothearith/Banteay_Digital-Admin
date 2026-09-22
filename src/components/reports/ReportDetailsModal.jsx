import { useEffect } from 'react';
import StatusBadge from '../common/StatusBadge';
import UserCaseEditor from './UserCaseEditor';

export const ReportDetailsModal = ({
  report,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onSaveUserCase
}) => {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-xs animate-in fade-in duration-150 sm:items-center sm:p-6">
      
      {/* Modal Card */}
      <div
        className="relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1e3568] dark:bg-[#0c1733] sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-[#1e3568]/60 sm:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-base font-bold text-[#012475] dark:text-[#4b9efe]">
              {report.id}
            </span>
            <StatusBadge status={report.status} size="xs" />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="space-y-5 overflow-y-auto p-4 sm:p-6">
          {/* Large Evidence Image */}
          {report.evidenceImage && (
            <div className="h-48 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 dark:border-[#1e3568] sm:h-64">
              <img
                src={report.evidenceImage}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            <StatusBadge status={report.severity} />
            <StatusBadge status={report.aiResult} />
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-[#132248] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e3568]">
              {report.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            {report.title}
          </h3>

          {/* Submitter & Location Details */}
          <div className="flex flex-wrap items-center gap-4 py-2 px-3.5 rounded-xl bg-slate-50 dark:bg-[#101e40] border border-slate-100 dark:border-[#1e3568]/40 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <img
                src={report.submitter?.avatar}
                alt={report.submitter?.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-bold text-slate-900 dark:text-white">
                {report.submitter?.name}
              </span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="flex items-center gap-1.5">
              <i className="fa-regular fa-clock text-slate-400"></i>
              <span>{report.submitter?.timestamp || report.submitter?.time}</span>
            </span>

            {report.submitter?.location && (
              <>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-location-dot text-red-500"></i>
                  <span>{report.submitter?.location}</span>
                </span>
              </>
            )}

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="flex items-center gap-1.5 font-semibold text-[#4b9efe]">
              <i className="fa-solid fa-brain"></i>
              <span>Rule indicator score: {report.indicatorScore ?? report.confidence ?? 0}</span>
            </span>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Report Description & Evidence Summary
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0c1733] p-4 rounded-xl border border-slate-200/80 dark:border-[#1e3568]/80 whitespace-pre-wrap">
              {report.description}
            </p>
          </div>

          <UserCaseEditor
            reportId={report.id}
            value={report.userCase}
            onSave={onSaveUserCase}
          />

          {report.riskSignals?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Grounded AI risk signals
              </h4>
              <ul className="space-y-2">
                {report.riskSignals.map((signal, index) => (
                  <li
                    key={`${signal.category}-${index}`}
                    className="rounded-xl border border-slate-200/80 dark:border-[#1e3568]/80 p-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={signal.severity} size="xs" />
                      <span className="font-semibold">{signal.message}</span>
                    </div>
                    <q className="mt-2 block text-xs text-slate-500 dark:text-slate-400">
                      {signal.evidence}
                    </q>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-4 dark:border-[#1e3568]/60 dark:bg-[#091228]/50 sm:flex sm:items-center sm:justify-end sm:gap-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="justify-center px-2 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568] sm:px-4
              bg-white dark:bg-[#0c1733] text-slate-700 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onReject(report.id);
              onClose();
            }}
            className="justify-center px-2 py-2 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-900/40 sm:px-4
              bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400
              hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
            <span>Reject</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onApprove(report.id);
              onClose();
            }}
            className="justify-center px-2 py-2 text-xs font-bold rounded-xl sm:px-5
              bg-[#012475] hover:bg-[#012475]/90 text-white
              dark:bg-[#10b981] dark:hover:bg-[#10b981]/90 dark:text-white
              transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#012475]/20"
          >
            <i className="fa-solid fa-check text-xs"></i>
            <span>Approve Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportDetailsModal;
