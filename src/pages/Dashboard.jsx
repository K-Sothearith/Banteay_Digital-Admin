import { useAdmin } from '../context/useAdmin';
import StatCard from '../components/common/StatCard';
import ScanActivityChart from '../components/dashboard/ScanActivityChart';
import ReportDistributionChart from '../components/dashboard/ReportDistributionChart';

export const Dashboard = () => {
  const { stats } = useAdmin();

  return (
    <div className="space-y-3.5 flex flex-col flex-1">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Platform overview and digital threat activity insights
        </p>
      </div>

      {/* 4 Statistic Cards (No percentage change indicators per handbook) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Scans"
          value={stats.totalScans}
          icon="fa-solid fa-expand"
          iconBgColor="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />

        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon="fa-regular fa-file-lines"
          iconBgColor="bg-[#4b9efe]/10 text-[#012475] dark:bg-[#4b9efe]/20 dark:text-[#4b9efe]"
        />

        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          icon="fa-regular fa-clock"
          iconBgColor="bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
        />

        <StatCard
          title="Approved Reports"
          value={stats.approvedReports}
          icon="fa-regular fa-circle-check"
          iconBgColor="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />
      </div>

      {/* Charts Row: Side-by-side on desktop with matching spans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch flex-1">
        {/* Scan Activity Line Chart (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <ScanActivityChart />
        </div>

        {/* Report Distribution Donut Chart (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <ReportDistributionChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
