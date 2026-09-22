import StatusBadge from '../common/StatusBadge';
import UserCaseEditor from './UserCaseEditor';

export const ReportReviewCard = ({
  report,
  onViewDetails,
  onApprove,
  onReject,
  onSaveUserCase
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-200 hover:shadow-md dark:border-[#1e3568]/80 dark:bg-[#0c1733] sm:p-5 md:flex-row md:gap-6 md:p-6">
      
      {/* Evidence Thumbnail with ID Badge */}
      <div className="relative h-44 shrink-0 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100 dark:border-[#1e3568] dark:bg-[#132248] sm:h-56 md:h-auto md:w-64">
        {report.evidenceImage ? (
          <img
            src={report.evidenceImage}
            alt={report.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-linear-to-br from-[#012475] to-[#4b9efe] text-white">
            <i className="fa-solid fa-shield-halved text-3xl"></i>
            <span className="text-xs font-bold uppercase tracking-widest">Digital evidence</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-[#012475]/90 backdrop-blur-xs text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg shadow-sm border border-[#4b9efe]/30">
          {report.id}
        </div>
      </div>

      {/* Report Info & Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <StatusBadge status={report.status} />
            <StatusBadge status={report.severity} />
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-[#132248] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e3568]">
              {report.category}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2">
            {report.title}
          </h4>

          {/* Submitter & Metadata row */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <img
                src={report.submitter?.avatar}
                alt={report.submitter?.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {report.submitter?.name}
              </span>
            </div>

            <span className="flex items-center gap-1">
              <i className="fa-regular fa-clock text-xs"></i>
              <span>{report.submitter?.time}</span>
            </span>

            {report.submitter?.location && (
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-location-dot text-xs text-red-500"></i>
                <span>{report.submitter?.location}</span>
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-4">
            <section>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                Report Description &amp; Evidence Summary
              </h4>
              <p className="m-0 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {report.description}
              </p>
            </section>

            <UserCaseEditor
              compact
              reportId={report.id}
              value={report.userCase}
              onSave={onSaveUserCase}
            />

            {report.riskSignals?.length > 0 ? (
              <section>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                  Grounded AI risk signals
                </h4>
                <ul className="m-0 grid gap-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {report.riskSignals.slice(0, 3).map((signal, index) => (
                    <li key={`${signal.category}-${index}`}>{signal.message}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        {/* Bottom Evaluation & Action Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#1e3568]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* AI risk and deterministic rule score */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-xs text-[#4b9efe]"></i>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {report.aiResult}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Rule score</span>
              <div className="w-20 h-2 bg-slate-100 dark:bg-[#132248] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${report.indicatorScore ?? report.confidence ?? 0}%`,
                    backgroundColor: (report.indicatorScore ?? report.confidence ?? 0) > 90 ? '#ef4444' : '#f59e0b'
                  }}
                ></div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {report.indicatorScore ?? report.confidence ?? 0}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:items-center sm:gap-2.5">
            <button
              type="button"
              onClick={() => onViewDetails(report)}
              className="justify-center px-2 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568] sm:px-3.5
                bg-white dark:bg-[#0c1733] 
                hover:bg-slate-50 dark:hover:bg-[#132248] 
                text-slate-700 dark:text-slate-200 
                transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <i className="fa-regular fa-eye text-xs text-[#4b9efe]"></i>
              <span>View Details</span>
            </button>

            <button
              type="button"
              onClick={() => onReject(report.id)}
              className="justify-center px-2 py-2 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-900/40 sm:px-3.5
                bg-red-50/50 dark:bg-red-950/20 
                hover:bg-red-100 dark:hover:bg-red-950/40 
                text-red-600 dark:text-red-400 
                transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
              <span>Reject</span>
            </button>

            <button
              type="button"
              onClick={() => onApprove(report.id)}
              className="justify-center px-2 py-2 text-xs font-bold rounded-xl sm:px-4
                bg-[#012475] hover:bg-[#012475]/90 
                text-white dark:bg-[#10b981] dark:hover:bg-[#10b981]/90 dark:text-white
                transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#012475]/20"
            >
              <i className="fa-solid fa-check text-xs"></i>
              <span>Approve</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportReviewCard;
