import { useEffect, useRef, useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { BanteayDigital_Logo } from '../../assets';

export const ManagedReportCard = ({ report, onEdit, onPublicationChange, onRequestDelete, disabled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

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

          {/* Destructive actions stay in an overflow menu away from frequent controls. */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              disabled={disabled}
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#0c1733] hover:bg-slate-50 dark:hover:bg-[#132248] text-slate-500 dark:text-slate-300 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`More actions for ${report.title}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-[#1e3568] dark:bg-[#0c1733]" role="menu">
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onRequestDelete(report);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  role="menuitem"
                >
                  <i className="fa-regular fa-trash-can w-4 text-center"></i>
                  <span>Delete report</span>
                </button>
              </div>
            )}
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

      {/* Footer metadata and responsive action row */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#1e3568]/60 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={report.status} />
            <StatusBadge status={report.severity} />
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 dark:bg-[#132248] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#1e3568]">
              {report.category}
            </span>
          </div>

          {report.location && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-[10px] text-slate-400"></i>
              {report.location}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(report)}
            disabled={disabled}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#1e3568] bg-white dark:bg-[#0c1733] hover:bg-slate-50 dark:hover:bg-[#132248] text-slate-700 dark:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="fa-regular fa-pen-to-square text-[#4b9efe]"></i>
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => onPublicationChange(report, !report.isPublished)}
            disabled={disabled}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:cursor-not-allowed disabled:opacity-50 ${report.isPublished
              ? 'border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800/70 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-950/50'
              : 'border border-[#012475] bg-[#012475] text-white hover:bg-[#012475]/90 hover:shadow-sm'
            }`}
            title={report.isPublished ? 'Hide from the community feed' : 'Publish to the community feed'}
          >
            <i className={`fa-solid ${report.isPublished ? 'fa-eye-slash' : 'fa-paper-plane'} text-[11px] ${report.isPublished ? '' : 'text-[#4b9efe]'}`}></i>
            <span>{report.isPublished ? 'Unpublish' : 'Publish'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ManagedReportCard;
