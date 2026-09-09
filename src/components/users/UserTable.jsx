import StatusBadge from '../common/StatusBadge';

export const UserTable = ({ users = [] }) => {
  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 p-12 text-center">
        <i className="fa-solid fa-user-slash text-3xl text-slate-300 dark:text-slate-600 mb-3"></i>
        <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">No users found</h4>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or status filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-[#1e3568]/60 bg-slate-50/75 dark:bg-[#0a142d]/75 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <th className="py-3.5 px-6">User</th>
              <th className="py-3.5 px-6 text-center">Reports</th>
              <th className="py-3.5 px-6 text-center">Published</th>
              <th className="py-3.5 px-6">Joined</th>
              <th className="py-3.5 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1e3568]/40 text-sm">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-slate-50/60 dark:hover:bg-[#132248]/50 transition-colors"
              >
                {/* User Info */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-[#1e3568]"
                    />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Reports Count */}
                <td className="py-4 px-6 text-center font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {user.reports}
                </td>

                {/* Published Count */}
                <td className="py-4 px-6 text-center font-mono font-bold text-[#10b981]">
                  {user.published}
                </td>

                {/* Joined Date */}
                <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {user.joined}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <StatusBadge status={user.status} size="xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
