import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import SearchInput from '../components/common/SearchInput';
import ManagedReportCard from '../components/reports/ManagedReportCard';
import EditReportModal from '../components/reports/EditReportModal';

const ConfirmationModal = ({ action, isLoading, onCancel, onConfirm }) => {
  if (!action) return null;

  const isDelete = action.type === 'delete';
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="report-confirmation-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-[#1e3568] dark:bg-[#0c1733]"
      >
        <div className="p-6">
          <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${isDelete ? 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
            <i className={`fa-solid ${isDelete ? 'fa-trash-can' : 'fa-eye-slash'}`}></i>
          </div>
          <h2 id="report-confirmation-title" className="text-lg font-extrabold text-slate-900 dark:text-white">
            {isDelete ? 'Permanently delete this report?' : 'Unpublish this report?'}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {isDelete
              ? 'The approved report and its community post, likes, shares, and comments will be permanently deleted. This cannot be undone.'
              : 'The report will disappear from the community feed. All of its likes and comments will be permanently removed, but the report will remain here and can be published again.'}
          </p>
          <div className="mt-4 rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-[#101e40]">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{action.report.title}</p>
            <p className="mt-1 font-mono text-xs text-slate-400">{action.report.id}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 dark:border-[#1e3568]/60 dark:bg-[#091228]/50">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#1e3568] dark:bg-[#0c1733] dark:text-slate-300 dark:hover:bg-[#132248]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${isDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}
          >
            {isLoading && <i className="fa-solid fa-circle-notch fa-spin"></i>}
            <span>{isDelete ? 'Delete permanently' : 'Unpublish and clear activity'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReportManagement = () => {
  const {
    managedReports,
    updateManagedReport,
    setManagedReportPublication,
    deleteManagedReport,
    isLoading
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [editingReport, setEditingReport] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const tabs = ['All', 'Approved', 'Unpublished', 'Published'];

  const filteredReports = managedReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.category && report.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab =
      activeTab === 'All' || report.status.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  const handlePublicationChange = (report, isPublished) => {
    if (isPublished) {
      setManagedReportPublication(report.id, true);
      return;
    }
    setConfirmation({ type: 'unpublish', report });
  };

  const confirmAction = async () => {
    if (!confirmation) return;
    const succeeded = confirmation.type === 'delete'
      ? await deleteManagedReport(confirmation.report.id)
      : await setManagedReportPublication(confirmation.report.id, false);
    if (succeeded) setConfirmation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Report Management
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage approved reports and prepare them for publication to community feeds
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search reports by title, description, or ID..."
          className="w-full sm:max-w-md"
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#0c1733] border border-slate-200/80 dark:border-[#1e3568] self-stretch sm:self-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#012475] text-white shadow-xs dark:bg-[#4b9efe] dark:text-[#070d1e]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Facebook-style Community Post Cards */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <ManagedReportCard
              key={report.id}
              report={report}
              onEdit={(rep) => setEditingReport(rep)}
              onPublicationChange={handlePublicationChange}
              onRequestDelete={(rep) => setConfirmation({ type: 'delete', report: rep })}
              disabled={isLoading}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 p-12 text-center">
          <i className="fa-regular fa-folder-open text-3xl text-slate-300 dark:text-slate-600 mb-3"></i>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No managed reports found
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search criteria or switching filter tabs.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditReportModal
        report={editingReport}
        isOpen={Boolean(editingReport)}
        onClose={() => setEditingReport(null)}
        onSave={updateManagedReport}
      />

      <ConfirmationModal
        action={confirmation}
        isLoading={isLoading}
        onCancel={() => setConfirmation(null)}
        onConfirm={confirmAction}
      />
    </div>
  );
};

export default ReportManagement;
