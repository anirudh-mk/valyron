import React, { useState, useRef, useMemo } from "react";

// Formatting helpers
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

// ----------------------------------------------------
// 1. Sales Trend Line Chart (This Month vs Last Month)
// ----------------------------------------------------
export interface TrendDataPoint {
  label: string;
  thisMonth: number;
  lastMonth: number;
}

interface SalesTrendChartProps {
  data: TrendDataPoint[];
}

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<SVGSVGElement | null>(null);

  const width = 600;
  const height = 240;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 2000000; // 20 Lakhs
  const minVal = 0;

  // X coordinate calculation
  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  // Y coordinate calculation
  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  // Compute smooth bezier path d for a set of values
  const getBezierPath = (values: number[]) => {
    if (values.length === 0) return "";
    let d = `M ${getX(0)} ${getY(values[0])}`;
    for (let i = 0; i < values.length - 1; i++) {
      const x1 = getX(i);
      const y1 = getY(values[i]);
      const x2 = getX(i + 1);
      const y2 = getY(values[i + 1]);
      // Control points for smooth spline
      const cpX1 = x1 + (x2 - x1) / 3;
      const cpY1 = y1;
      const cpX2 = x1 + (2 * (x2 - x1)) / 3;
      const cpY2 = y2;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`;
    }
    return d;
  };

  // Compute closed path for gradient fill under the line
  const getAreaPath = (values: number[]) => {
    const linePath = getBezierPath(values);
    if (!linePath) return "";
    const startX = getX(0);
    const endX = getX(values.length - 1);
    const bottomY = paddingTop + chartHeight;
    return `${linePath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  const pathThisMonth = useMemo(() => getBezierPath(data.map((d) => d.thisMonth)), [data]);
  const areaThisMonth = useMemo(() => getAreaPath(data.map((d) => d.thisMonth)), [data]);
  const pathLastMonth = useMemo(() => getBezierPath(data.map((d) => d.lastMonth)), [data]);

  // Handle Mouse Hover relative index calculation
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    // Map clientX back to the nearest data point index
    const relativeX = clientX - (rect.width * paddingLeft) / width;
    const relativeChartWidth = (rect.width * chartWidth) / width;
    const pct = relativeX / relativeChartWidth;
    let idx = Math.round(pct * (data.length - 1));
    idx = Math.max(0, Math.min(data.length - 1, idx));
    setHoveredIdx(idx);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <svg
        ref={containerRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
          </linearGradient>
        </defs>

        {/* Y Axis Grid Lines & Labels */}
        {[0, 500000, 1000000, 1500000, 2000000].map((val, i) => {
          const y = getY(val);
          const label = val === 0 ? "₹ 0" : `₹ ${val / 100000}L`;
          return (
            <g key={i} className="opacity-40">
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth={1}
                strokeDasharray={val === 0 ? "0" : "4 4"}
              />
              <text
                x={paddingLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] font-medium fill-muted-foreground"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
          const x = getX(i);
          return (
            <text
              key={i}
              x={x}
              y={height - 15}
              textAnchor="middle"
              className="text-[10px] font-medium fill-muted-foreground opacity-80"
            >
              {d.label}
            </text>
          );
        })}

        {/* Last Month Line (Dotted, lighter blue/grey) */}
        <path
          d={pathLastMonth}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          className="opacity-70 transition-all duration-300"
        />

        {/* This Month Area Gradient */}
        <path d={areaThisMonth} fill="url(#areaGradient)" />

        {/* This Month Line (Solid Blue) */}
        <path
          d={pathThisMonth}
          fill="none"
          stroke="#2563eb"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover Grid Guideline */}
        {hoveredIdx !== null && (
          <line
            x1={getX(hoveredIdx)}
            y1={paddingTop}
            x2={getX(hoveredIdx)}
            y2={paddingTop + chartHeight}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="2 2"
            className="opacity-80"
          />
        )}

        {/* Circle Dots on Lines */}
        {data.map((d, i) => {
          const x = getX(i);
          const yThis = getY(d.thisMonth);
          const yLast = getY(d.lastMonth);
          const isHovered = hoveredIdx === i;

          return (
            <g key={i}>
              {/* Last month markers (only on hover or subtle outline) */}
              {isHovered && (
                <circle
                  cx={x}
                  cy={yLast}
                  r={4}
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth={2}
                />
              )}
              {/* This month markers */}
              <circle
                cx={x}
                cy={yThis}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "#2563eb" : "#ffffff"}
                stroke="#2563eb"
                strokeWidth={2}
                className="transition-all duration-150 cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip Box */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-20 bg-background/95 backdrop-blur-sm border shadow-lg rounded-lg p-2.5 text-xs pointer-events-none flex flex-col gap-1 transition-all duration-150"
          style={{
            left: `${Math.min(
              width - 150,
              Math.max(20, (getX(hoveredIdx) / width) * 100 - 10)
            )}%`,
            top: `${Math.min(
              height - 100,
              Math.max(10, (getY(data[hoveredIdx].thisMonth) / height) * 100 - 55)
            )}%`,
          }}
        >
          <div className="font-semibold border-b pb-1 text-card-foreground">
            {data[hoveredIdx].label} 2026
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-muted-foreground">This Month:</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(data[hoveredIdx].thisMonth)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
            <span className="text-muted-foreground">Last Month:</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(data[hoveredIdx].lastMonth)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. Donut Chart (Segment-based Ring with Hover states)
// ----------------------------------------------------
export interface DonutDataPoint {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface DonutChartProps {
  data: DonutDataPoint[];
  centerLabel: string;
  centerSublabel: string;
}

export function DonutChart({ data, centerLabel, centerSublabel }: DonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute accumulated angle offset segments
  let accumulatedPercent = 0;
  const segments = data.map((d, index) => {
    const strokeLength = (d.percentage / 100) * circumference;
    const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
    accumulatedPercent += d.percentage;

    return {
      ...d,
      strokeLength,
      strokeOffset,
      index,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative w-[160px] h-[160px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          {/* Base Background Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />

          {/* Color Segments */}
          {segments.map((seg) => {
            const isHovered = hoveredIdx === seg.index;
            return (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${seg.strokeLength} ${circumference}`}
                strokeDashoffset={seg.strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer"
                style={{
                  transformOrigin: "center",
                  filter: isHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" : "none",
                }}
                onMouseEnter={() => setHoveredIdx(seg.index)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center Text Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
            {hoveredIdx !== null ? data[hoveredIdx].label : centerSublabel}
          </span>
          <span className="text-sm font-extrabold text-foreground mt-0.5 font-mono">
            {hoveredIdx !== null
              ? formatCurrency(data[hoveredIdx].value)
              : centerLabel}
          </span>
          {hoveredIdx !== null && (
            <span className="text-[10px] font-bold text-muted-foreground">
              {data[hoveredIdx].percentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Legend Block Grid layout */}
      <div className="w-full mt-4 flex flex-col gap-1.5 text-xs text-card-foreground">
        {data.map((item, index) => {
          const isHovered = hoveredIdx === index;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-between p-1 rounded-md transition-colors cursor-pointer ${
                isHovered ? "bg-accent/40 font-semibold" : ""
              }`}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate max-w-[120px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <div className="text-right whitespace-nowrap shrink-0">
                <span className="font-medium mr-1 text-foreground font-mono">
                  {formatCurrency(item.value)}
                </span>
                <span className="text-muted-foreground text-[10px]">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Sales Comparison Dual Bar Chart
// ----------------------------------------------------
export interface BarDataPoint {
  label: string;
  thisYear: number;
  lastYear: number;
}

interface SalesComparisonChartProps {
  data: BarDataPoint[];
}

export function SalesComparisonChart({ data }: SalesComparisonChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<SVGSVGElement | null>(null);

  const width = 600;
  const height = 240;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 2000000; // 20 Lakhs
  const minVal = 0;

  // X position calculation for each group
  const getGroupX = (index: number) => {
    if (data.length === 0) return paddingLeft;
    return paddingLeft + (index / data.length) * chartWidth;
  };

  const groupWidth = chartWidth / data.length;
  const barWidth = groupWidth * 0.28; // width of each individual bar

  // Y coordinate calculation
  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const relativeX = clientX - (rect.width * paddingLeft) / width;
    const relativeChartWidth = (rect.width * chartWidth) / width;
    const pct = relativeX / relativeChartWidth;
    let idx = Math.floor(pct * data.length);
    idx = Math.max(0, Math.min(data.length - 1, idx));
    setHoveredIdx(idx);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <svg
        ref={containerRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Y Axis Grid Lines & Labels */}
        {[0, 500000, 1000000, 1500000, 2000000].map((val, i) => {
          const y = getY(val);
          const label = val === 0 ? "₹ 0" : `₹ ${val / 100000}L`;
          return (
            <g key={i} className="opacity-40">
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth={1}
                strokeDasharray={val === 0 ? "0" : "4 4"}
              />
              <text
                x={paddingLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] font-medium fill-muted-foreground"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, i) => {
          const x = getGroupX(i) + groupWidth / 2;
          return (
            <text
              key={i}
              x={x}
              y={height - 15}
              textAnchor="middle"
              className="text-[10px] font-medium fill-muted-foreground opacity-80"
            >
              {d.label}
            </text>
          );
        })}

        {/* Bar Drawing Loop */}
        {data.map((d, i) => {
          const groupX = getGroupX(i);
          const isHovered = hoveredIdx === i;

          // Positions for the side-by-side bars
          const xThisYear = groupX + groupWidth * 0.18;
          const xLastYear = xThisYear + barWidth + groupWidth * 0.05;

          const yThisYear = getY(d.thisYear);
          const yLastYear = getY(d.lastYear);

          const bottomY = paddingTop + chartHeight;

          const hThisYear = Math.max(2, bottomY - yThisYear);
          const hLastYear = Math.max(2, bottomY - yLastYear);

          return (
            <g key={i} className="transition-all duration-300">
              {/* Highlight Background Zone for hovered column */}
              {isHovered && (
                <rect
                  x={groupX + groupWidth * 0.05}
                  y={paddingTop - 5}
                  width={groupWidth * 0.9}
                  height={chartHeight + 10}
                  fill="#f1f5f9"
                  rx={6}
                  className="opacity-60 pointer-events-none"
                />
              )}

              {/* Last Year Bar (Grey) */}
              <rect
                x={xLastYear}
                y={yLastYear}
                width={barWidth}
                height={hLastYear}
                fill={isHovered ? "#cbd5e1" : "#e2e8f0"}
                rx={3}
                className="transition-all duration-200 cursor-pointer"
              />

              {/* This Year Bar (Blue) */}
              <rect
                x={xThisYear}
                y={yThisYear}
                width={barWidth}
                height={hThisYear}
                fill={isHovered ? "#1d4ed8" : "#2563eb"}
                rx={3}
                className="transition-all duration-200 cursor-pointer"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip Box */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-20 bg-background/95 backdrop-blur-sm border shadow-lg rounded-lg p-2.5 text-xs pointer-events-none flex flex-col gap-1 transition-all duration-150"
          style={{
            left: `${Math.min(
              width - 155,
              Math.max(20, ((getGroupX(hoveredIdx) + groupWidth / 2) / width) * 100 - 12)
            )}%`,
            top: `${Math.min(
              height - 100,
              Math.max(10, (getY(data[hoveredIdx].thisYear) / height) * 100 - 55)
            )}%`,
          }}
        >
          <div className="font-semibold border-b pb-1 text-card-foreground">
            {data[hoveredIdx].label} 2026
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
            <span className="text-muted-foreground">This Year:</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(data[hoveredIdx].thisYear)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span className="text-muted-foreground">Last Year:</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(data[hoveredIdx].lastYear)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
