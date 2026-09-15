import StatusBadge from '../common/StatusBadge';
import { BanteayDigital_Logo } from '../../assets';

export const ManagedReportCard = ({ report, onEdit, onPublish }) => {
  return (
    <div className="bg-white dark:bg-[#0c1733] rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between">
      
      <div>
        {/* Post Header (Facebook-style community post header) */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#012475] border border-[#012475]/30 flex items-center justify-center shrink-0">
              <img
                src={BanteayDigital_Logo}
                alt="Banteay Digital"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Banteay Digital
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono">{report.id}</span>
                <span>•</span>
                <span>{report.publishedDate}</span>
              </div>
            </div>
          </div>

          {/* Actions: Publish button (#012475) to the left of Edit button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onPublish && onPublish(report.id)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#012475] hover:bg-[#012475]/90 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#012475] hover:shadow-sm"
              title={report.status === 'Published' ? 'Already published' : 'Publish to community feed'}
            >
              <i className={`fa-solid ${report.status === 'Published' ? 'fa-check' : 'fa-paper-plane'} text-xs text-[#4b9efe]`}></i>
              <span>Publish</span>
            </button>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => onEdit(report)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568]
                bg-white dark:bg-[#0c1733] 
                hover:bg-slate-50 dark:hover:bg-[#132248] 
                text-slate-700 dark:text-slate-200 
                transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <i className="fa-regular fa-pen-to-square text-[#4b9efe]"></i>
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-2.5">
          {report.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {report.description}
        </p>

        {/* Evidence Image */}
        {report.evidenceImage && (
          <div className="w-full h-52 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#132248] mb-4 border border-slate-200/60 dark:border-[#1e3568]">
            <img
              src={report.evidenceImage}
              alt={report.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Footer Badges & Metadata */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#1e3568]/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={report.status} />
          <StatusBadge status={report.severity} />
          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-[#132248] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1e3568]">
            {report.category}
          </span>
        </div>

        {report.location && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <i className="fa-solid fa-location-dot text-xs text-slate-400"></i>
            {report.location}
          </span>
        )}
      </div>

    </div>
  );
};

export default ManagedReportCard;
