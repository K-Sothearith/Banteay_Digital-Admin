import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import ReportReviewCard from '../components/reports/ReportReviewCard';
import ReportDetailsModal from '../components/reports/ReportDetailsModal';

export const ReportReview = () => {
  const {
    pendingReports,
    approveReport,
    rejectReport
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [activeModalReport, setActiveModalReport] = useState(null);

  const categoryOptions = [
    { value: 'All', label: 'All Categories' },
    { value: 'Investment Fraud', label: 'Investment Fraud' },
    { value: 'Online Shopping Scam', label: 'Online Shopping Scam' },
    { value: 'Phishing SMS/Email', label: 'Phishing SMS/Email' },
    { value: 'Fake Recruitment', label: 'Fake Recruitment' },
    { value: 'Impersonation', label: 'Impersonation' },
    { value: 'Lottery/Prize Scam', label: 'Lottery/Prize Scam' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Sort: Newest' },
    { value: 'oldest', label: 'Sort: Oldest' },
    { value: 'risk', label: 'Sort: Highest Risk' }
  ];

  // Filtering
  const filteredReports = pendingReports
    .filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.submitter?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || report.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (selectedSort === 'risk') {
        const riskRank = { Critical: 4, High: 3, Medium: 2, Unknown: 1, Low: 0 };
        return (riskRank[b.severity] || 0) - (riskRank[a.severity] || 0)
          || (b.indicatorScore ?? b.confidence ?? 0) - (a.indicatorScore ?? a.confidence ?? 0);
      }
      if (selectedSort === 'oldest') return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id); // newest by default
    });

  return (
    <div className="space-y-6">
      {/* Header & Pending Count Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Report Review
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review and moderate user-submitted reports with AI threat evaluation
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
          <i className="fa-regular fa-clock"></i>
          <span>{pendingReports.length} pending reports</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, submitter, or ID..."
          className="w-full sm:flex-1"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="flex-1 sm:flex-none"
            buttonClassName="w-full sm:w-auto min-w-[150px]"
          />

          <Dropdown
            options={sortOptions}
            value={selectedSort}
            onChange={setSelectedSort}
            className="flex-1 sm:flex-none"
            buttonClassName="w-full sm:w-auto min-w-[140px]"
            align="right"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportReviewCard
              key={report.id}
              report={report}
              onViewDetails={(rep) => setActiveModalReport(rep)}
              onApprove={approveReport}
              onReject={rejectReport}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-3">
              <i className="fa-solid fa-check text-xl"></i>
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No pending reports matching criteria
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              All reported scams have been verified and processed, or no items match your current filter.
            </p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      <ReportDetailsModal
        report={activeModalReport}
        isOpen={Boolean(activeModalReport)}
        onClose={() => setActiveModalReport(null)}
        onApprove={approveReport}
        onReject={rejectReport}
      />
    </div>
  );
};

export default ReportReview;
