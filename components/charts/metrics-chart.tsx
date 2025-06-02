"use client"

interface MetricsChartProps {
  data: { label: string; value: number; target?: number; color: string }[]
  title: string
}

export default function MetricsChart({ data, title }: MetricsChartProps) {
  const width = 400
  const height = 300
  const padding = { top: 40, right: 60, bottom: 80, left: 80 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const barWidth = chartWidth / data.length - 20
  const maxValue = 100 // Assuming metrics are percentages

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-4">{title}</h4>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="border rounded bg-white">
        {/* Background */}
        <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#fafafa" />

        {/* Grid lines */}
        {[0, 20, 40, 60, 80, 100].map((value) => {
          const y = padding.top + chartHeight - (value / maxValue) * chartHeight
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray={value === 0 ? "none" : "2,2"}
              />
              <text x={padding.left - 10} y={y + 4} fontSize="10" fill="#6b7280" textAnchor="end">
                {value}%
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight
          const x = padding.left + index * (chartWidth / data.length) + 10
          const y = padding.top + chartHeight - barHeight

          // Target line if exists
          const targetY = item.target ? padding.top + chartHeight - (item.target / maxValue) * chartHeight : null

          return (
            <g key={index}>
              {/* Bar shadow */}
              <rect x={x + 2} y={y + 2} width={barWidth} height={barHeight} fill="rgba(0,0,0,0.1)" rx="4" />

              {/* Main bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color}
                rx="4"
                stroke="white"
                strokeWidth="2"
              />

              {/* Gradient overlay */}
              <defs>
                <linearGradient id={`bar-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={`url(#bar-gradient-${index})`} rx="4" />

              {/* Target line */}
              {targetY && (
                <line
                  x1={x - 5}
                  y1={targetY}
                  x2={x + barWidth + 5}
                  y2={targetY}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
              )}

              {/* Value label */}
              <text x={x + barWidth / 2} y={y - 8} fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">
                {item.value.toFixed(1)}%
              </text>

              {/* Metric label */}
              <text
                x={x + barWidth / 2}
                y={padding.top + chartHeight + 20}
                fontSize="10"
                fill="#6b7280"
                textAnchor="middle"
                transform={`rotate(-45, ${x + barWidth / 2}, ${padding.top + chartHeight + 20})`}
              >
                {item.label}
              </text>
            </g>
          )
        })}

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke="#374151"
          strokeWidth="2"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Y-axis label */}
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          fontWeight="500"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          Performance (%)
        </text>
      </svg>
    </div>
  )
}
