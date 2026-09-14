import { useState } from 'react';
import { useAdmin } from '../context/useAdmin';
import StatCard from '../components/common/StatCard';
import SearchInput from '../components/common/SearchInput';
import Dropdown from '../components/common/Dropdown';
import UserTable from '../components/users/UserTable';

export const Users = () => {
  const { users, userStats } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('reports');

  const statusTabs = ['All', 'Active', 'Suspended', 'Banned'];

  const sortOptions = [
    { value: 'reports', label: 'Sort: Most Reports' },
    { value: 'published', label: 'Sort: Most Published' },
    { value: 'name', label: 'Sort: Alphabetical' }
  ];

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || user.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'reports') return b.reports - a.reports;
      if (sortBy === 'published') return b.published - a.published;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Users
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Registered user overview and community reporter activity
        </p>
      </div>

      {/* 3 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        <StatCard
          title="Total Users"
          value={userStats.totalUsers}
          icon="fa-solid fa-user-group"
          iconBgColor="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />

        <StatCard
          title="Users Who Submitted Reports"
          value={userStats.submittedReports}
          icon="fa-regular fa-file-lines"
          iconBgColor="bg-[#4b9efe]/10 text-[#012475] dark:bg-[#4b9efe]/20 dark:text-[#4b9efe]"
        />

        <StatCard
          title="Users With Published Reports"
          value={userStats.publishedReports}
          icon="fa-regular fa-circle-check"
          iconBgColor="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
        />
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users by name or email..."
          className="w-full sm:max-w-md"
        />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#0c1733] border border-slate-200/80 dark:border-[#1e3568] flex-1 sm:flex-none">
            {statusTabs.map((tab) => {
              const isActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

          {/* Sort Dropdown */}
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            buttonClassName="py-1.5 px-3 text-xs"
            align="right"
          />
        </div>
      </div>

      {/* Table of Users */}
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default Users;
