import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import SearchInput from '../components/common/SearchInput';
import ManagedReportCard from '../components/reports/ManagedReportCard';
import EditReportModal from '../components/reports/EditReportModal';

export const ReportManagement = () => {
  const {
    managedReports,
    updateManagedReport,
    publishManagedReport
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [editingReport, setEditingReport] = useState(null);

  const tabs = ['All', 'Approved', 'Published'];

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
              onPublish={publishManagedReport}
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
    </div>
  );
};

export default ReportManagement;
