import { useState } from 'react';
import { useAdmin } from '../../context/useAdmin';

export const ReportDistributionChart = () => {
  const { reportDistributionData } = useAdmin();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const total = reportDistributionData.reduce((acc, item) => acc + item.count, 0);

  // Donut SVG geometry parameters
  const size = 160;
  const center = size / 2;
  const radius = 58;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  // Compute SVG stroke-dasharray and stroke-dashoffset immutably
  const slices = reportDistributionData.reduce((acc, item, index) => {
    const prevOffset = acc.currentOffset;
    const ratio = total > 0 ? item.count / total : 0;
    const strokeDasharray = `${ratio * circumference} ${circumference}`;
    const strokeDashoffset = -prevOffset * circumference;

    return {
      items: [
        ...acc.items,
        {
          ...item,
          strokeDasharray,
          strokeDashoffset,
          ratio,
          idx: index
        }
      ],
      currentOffset: prevOffset + ratio
    };
  }, { items: [], currentOffset: 0 }).items;

  return (
    <div className="bg-white dark:bg-[#0c1733] p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-[#1e3568]/80 shadow-xs flex flex-col justify-between h-full min-h-[390px] max-h-[460px]">
      
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          Report Distribution
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Current status of all reports
        </p>
      </div>

      {/* Top Half: Donut Graphic & Summary */}
      <div className="flex flex-col items-center justify-center my-auto py-1">
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full -rotate-90 select-none overflow-visible"
          >
            {slices.map((slice) => {
              const isHovered = hoveredIndex === slice.idx;
              return (
                <circle
                  key={slice.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 6px ${slice.color})` : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(slice.idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              {hoveredIndex !== null
                ? slices[hoveredIndex].count.toLocaleString()
                : total.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              {hoveredIndex !== null
                ? slices[hoveredIndex].name
                : 'TOTAL'}
            </span>
          </div>
        </div>

        {/* Status Pills row below donut */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          {reportDistributionData.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${
                hoveredIndex === idx
                  ? 'bg-slate-100 dark:bg-[#132248] border-[#4b9efe]/40 scale-105'
                  : 'bg-transparent border-slate-200/70 dark:border-[#1e3568]/60 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Half: 4 Detailed Horizontal Distribution Bars */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-[#1e3568]/60 space-y-1.5">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Status Breakdown & Quotas
        </h4>

        <div className="space-y-1.5">
          {slices.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const percentage = Math.round(item.ratio * 100);

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer ${
                  isHovered
                    ? 'bg-slate-50 dark:bg-[#132248] shadow-2xs'
                    : 'hover:bg-slate-50/60 dark:hover:bg-[#132248]/40'
                }`}
              >
                {/* Header row: Status Name + Count & Percent */}
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {item.count.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[10px] min-w-7 text-right">
                      ({item.percent})
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#101e40] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default ReportDistributionChart;
