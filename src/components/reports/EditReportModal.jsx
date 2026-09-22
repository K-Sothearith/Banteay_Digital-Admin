import { useState, useEffect } from 'react';

const EditReportForm = ({ report, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: report?.title || '',
    description: report?.description || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await onSave({
      ...report,
      ...formData
    });
    if (saved) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto p-4 sm:p-6">
      {/* Report Title */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Report Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          minLength={3}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#101e40] text-slate-900 dark:text-white focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          minLength={10}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#101e40] text-slate-900 dark:text-white focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 resize-none leading-relaxed"
        />
      </div>

      <p className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2.5 text-xs text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/30 dark:text-sky-300">
        Risk, category, and evidence values come from the original scan and cannot be rewritten by an administrator.
      </p>

      {/* Footer Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-[#1e3568]/60 sm:flex sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="justify-center px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568]
            bg-white dark:bg-[#0c1733] text-slate-700 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="justify-center px-3 py-2 text-xs font-bold rounded-xl sm:px-5
            bg-[#012475] hover:bg-[#012475]/90 text-white
            dark:bg-[#10b981] dark:hover:bg-[#10b981]/90 dark:text-white
            transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#012475]/20"
        >
          <i className="fa-solid fa-floppy-disk text-xs"></i>
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};

export const EditReportModal = ({
  report,
  isOpen,
  onClose,
  onSave
}) => {
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
      <div
        className="relative flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1e3568] dark:bg-[#0c1733] sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-[#1e3568]/60 sm:px-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Edit Report
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {report.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Form with key to reset state without effect-setState */}
        <EditReportForm
          key={report.id}
          report={report}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

export default EditReportModal;
