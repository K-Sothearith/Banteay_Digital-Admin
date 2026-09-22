import { useState } from 'react';
import { useAdmin } from '../../context/useAdmin';
import Dropdown from '../common/Dropdown';

export const ScanActivityChart = () => {
  const { scanActivityData } = useAdmin();
  const [timeframe, setTimeframe] = useState('week');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const options = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];

  const currentData = scanActivityData[timeframe] || scanActivityData.week;

  // Compute chart bounds
  const values = currentData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.15 || 200;
  const chartMin = Math.max(0, Math.floor((minVal - padding) / 100) * 100);
  const chartMax = Math.ceil((maxVal + padding) / 100) * 100;

  // Balanced height to fit within 100vh while remaining full
  const width = 640;
  const height = 240;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 15;
  const padBottom = 32;

  const graphWidth = width - padLeft - padRight;
  const graphHeight = height - padTop - padBottom;

  // Calculate points
  const points = currentData.map((item, index) => {
    const x = padLeft + (index / (currentData.length - 1)) * graphWidth;
    const y = padTop + graphHeight - ((item.value - chartMin) / (chartMax - chartMin)) * graphHeight;
    return { ...item, x, y, index };
  });

  // Smooth SVG path curve using cubic bezier
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padTop + graphHeight} L ${points[0].x} ${padTop + graphHeight} Z`;

  // Format y-axis labels
  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks }, (_, i) => {
    const val = chartMin + ((chartMax - chartMin) / (yTicks - 1)) * i;
    return {
      val,
      y: padTop + graphHeight - (i / (yTicks - 1)) * graphHeight,
      label: val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${Math.round(val)}`
    };
  });

  // Summary metrics for timeframe
  const totalScansInPeriod = values.reduce((a, b) => a + b, 0);
  const avgScans = Math.round(totalScansInPeriod / values.length);
  const peakScans = maxVal;

  return (
    <div className="flex h-full min-h-[350px] flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-[#1e3568]/80 dark:bg-[#0c1733] sm:min-h-[390px] sm:p-5 lg:max-h-[460px]">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Scan Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Number of scans over time
            </p>
          </div>

          {/* Timeframe Dropdown */}
          <Dropdown
            options={options}
            value={timeframe}
            onChange={setTimeframe}
            buttonClassName="py-1 px-2.5 text-xs"
            align="right"
          />
        </div>

        {/* Highlight Metrics Strip */}
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-100 bg-slate-50 p-2 dark:border-[#1e3568]/40 dark:bg-[#091228] sm:gap-2">
          <div>
            <span className="block text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">
              Total in Period
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
              {totalScansInPeriod.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">
              Average Daily
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
              {avgScans.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:text-xs sm:tracking-wider">
              Peak Volume
            </span>
            <p className="text-xs sm:text-sm font-extrabold text-[#4b9efe]">
              {peakScans.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Expansive SVG Line Chart */}
      <div className="relative w-full flex-1 flex flex-col justify-center py-2 overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-full min-h-[220px] w-full overflow-visible sm:min-h-[260px]"
        >
          <defs>
            <linearGradient id="cyberGradientTall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4b9efe" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#012475" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4b9efe" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glowTall" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4b9efe" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {tickValues.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padLeft}
                y1={tick.y}
                x2={width - padRight}
                y2={tick.y}
                stroke="currentColor"
                className="text-slate-100 dark:text-[#1e3568]/50"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={padLeft - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="text-xs fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {tick.label}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#cyberGradientTall)" />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke="#4b9efe"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowTall)"
          />

          {/* Data Points */}
          {points.map((pt, idx) => {
            const isHovered = hoveredPoint?.index === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Hit area */}
                <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

                {/* Point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '7' : '4'}
                  fill="#ffffff"
                  stroke="#012475"
                  strokeWidth={isHovered ? '3.5' : '2.5'}
                  className="transition-all duration-150"
                />

                {/* X Axis Label */}
                <text
                  x={pt.x}
                  y={height - 12}
                  textAnchor="middle"
                  className={`text-xs font-medium transition-colors ${
                    isHovered
                      ? 'fill-[#012475] dark:fill-[#4b9efe] font-bold'
                      : 'fill-slate-400 dark:fill-slate-500'
                  }`}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-full mb-4 pointer-events-none z-10"
          >
            <div className="bg-[#012475] text-white text-xs px-3 py-1.5 rounded-xl shadow-xl border border-[#4b9efe]/40 flex flex-col items-center">
              <span className="font-mono font-bold text-[#4b9efe]">
                {hoveredPoint.value.toLocaleString()} scans
              </span>
              <span className="text-xs text-slate-300">{hoveredPoint.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info / Live Stream Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-[#1e3568]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live threat scanning telemetry</span>
        </span>
        <span className="font-mono text-xs">Updated 1m ago</span>
      </div>

    </div>
  );
};

export default ScanActivityChart;
