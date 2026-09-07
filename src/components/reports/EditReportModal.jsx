import { useState, useEffect } from 'react';
import Dropdown from '../common/Dropdown';

const categoryOptions = [
  'Online Shopping Scam',
  'Investment Fraud',
  'Phishing SMS/Email',
  'Fake Recruitment',
  'Impersonation',
  'Charity Fraud',
  'Lottery/Prize Scam'
];

const severityOptions = ['Critical', 'High', 'Medium', 'Low'];
const statusOptions = ['Approved', 'Published'];

const EditReportForm = ({ report, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: report?.title || '',
    description: report?.description || '',
    category: report?.category || 'Online Shopping Scam',
    severity: report?.severity || 'High',
    status: report?.status || 'Approved',
    location: report?.location || 'Phnom Penh'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...report,
      ...formData
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
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
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#101e40] text-slate-900 dark:text-white focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20 resize-none leading-relaxed"
        />
      </div>

      {/* Category & Severity Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Category
          </label>
          <Dropdown
            options={categoryOptions}
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            className="w-full"
            buttonClassName="w-full justify-between"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Severity
          </label>
          <Dropdown
            options={severityOptions}
            value={formData.severity}
            onChange={(val) => setFormData({ ...formData, severity: val })}
            className="w-full"
            buttonClassName="w-full justify-between"
          />
        </div>
      </div>

      {/* Status & Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Status
          </label>
          <Dropdown
            options={statusOptions}
            value={formData.status}
            onChange={(val) => setFormData({ ...formData, status: val })}
            className="w-full"
            buttonClassName="w-full justify-between"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. Phnom Penh"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#101e40] text-slate-900 dark:text-white focus:outline-none focus:border-[#4b9efe] focus:ring-2 focus:ring-[#4b9efe]/20"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 mt-6 border-t border-slate-100 dark:border-[#1e3568]/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568]
            bg-white dark:bg-[#0c1733] text-slate-700 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-[#132248] transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 text-xs font-bold rounded-xl
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200 dark:border-[#1e3568] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-[#1e3568]/60">
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
