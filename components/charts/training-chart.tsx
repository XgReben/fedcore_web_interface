"use client"

interface TrainingChartProps {
  title: string
  trainData: number[]
  valData: number[]
  epochs: number[]
  yLabel: string
  color1?: string
  color2?: string
}

export default function TrainingChart({
  title,
  trainData,
  valData,
  epochs,
  yLabel,
  color1 = "#06b6d4",
  color2 = "#ef4444",
}: TrainingChartProps) {
  const maxValue = Math.max(...trainData, ...valData)
  const minValue = Math.min(...trainData, ...valData)
  const range = maxValue - minValue || 1
  const width = 400
  const height = 250
  const padding = { top: 20, right: 80, bottom: 60, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const getPoints = (data: number[]) => {
    return data
      .map((value, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth
        const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight
        return `${x},${y}`
      })
      .join(" ")
  }

  const trainPoints = getPoints(trainData)
  const valPoints = getPoints(valData)

  // Generate grid lines
  const yGridLines = Array.from({ length: 6 }, (_, i) => {
    const value = minValue + (range * i) / 5
    const y = padding.top + chartHeight - (i / 5) * chartHeight
    return { y, value }
  })

  const xGridLines = Array.from({ length: 6 }, (_, i) => {
    const epochIndex = Math.floor(((epochs.length - 1) * i) / 5)
    const x = padding.left + (i / 5) * chartWidth
    return { x, epoch: epochs[epochIndex] }
  })

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-4">{title}</h4>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="border rounded bg-white">
        <defs>
          <linearGradient id={`gradient-train-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color1} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id={`gradient-val-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color2} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color2} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#fafafa" />

        {/* Grid lines - Y axis */}
        {yGridLines.map((line, i) => (
          <g key={`y-${i}`}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={padding.left + chartWidth}
              y2={line.y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray={i === 0 ? "none" : "2,2"}
            />
            <text x={padding.left - 10} y={line.y + 4} fontSize="10" fill="#6b7280" textAnchor="end">
              {line.value.toFixed(3)}
            </text>
          </g>
        ))}

        {/* Grid lines - X axis */}
        {xGridLines.map((line, i) => (
          <g key={`x-${i}`}>
            <line
              x1={line.x}
              y1={padding.top}
              x2={line.x}
              y2={padding.top + chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <text x={line.x} y={padding.top + chartHeight + 15} fontSize="10" fill="#6b7280" textAnchor="middle">
              {line.epoch}
            </text>
          </g>
        ))}

        {/* Area under training curve */}
        <polygon
          points={`${padding.left},${padding.top + chartHeight} ${trainPoints} ${padding.left + chartWidth},${padding.top + chartHeight}`}
          fill={`url(#gradient-train-${title})`}
        />

        {/* Area under validation curve */}
        <polygon
          points={`${padding.left},${padding.top + chartHeight} ${valPoints} ${padding.left + chartWidth},${padding.top + chartHeight}`}
          fill={`url(#gradient-val-${title})`}
        />

        {/* Training line */}
        <polyline
          points={trainPoints}
          fill="none"
          stroke={color1}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Validation line */}
        <polyline
          points={valPoints}
          fill="none"
          stroke={color2}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5,5"
        />

        {/* Data points */}
        {trainData.map((value, index) => {
          const x = padding.left + (index / (trainData.length - 1)) * chartWidth
          const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight
          return <circle key={`train-${index}`} cx={x} cy={y} r="3" fill={color1} stroke="white" strokeWidth="2" />
        })}

        {valData.map((value, index) => {
          const x = padding.left + (index / (valData.length - 1)) * chartWidth
          const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight
          return <circle key={`val-${index}`} cx={x} cy={y} r="3" fill={color2} stroke="white" strokeWidth="2" />
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

        {/* Axis labels */}
        <text
          x={padding.left + chartWidth / 2}
          y={height - 20}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          fontWeight="500"
        >
          Epoch
        </text>
        <text
          x={20}
          y={padding.top + chartHeight / 2}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          fontWeight="500"
          transform={`rotate(-90, 20, ${padding.top + chartHeight / 2})`}
        >
          {yLabel}
        </text>

        {/* Legend */}
        <g transform={`translate(${padding.left + chartWidth + 10}, ${padding.top + 20})`}>
          <rect x="0" y="0" width="60" height="40" fill="white" stroke="#e5e7eb" rx="4" />
          <line x1="5" y1="12" x2="15" y2="12" stroke={color1} strokeWidth="2" />
          <circle cx="10" cy="12" r="2" fill={color1} />
          <text x="20" y="16" fontSize="9" fill="#374151">
            Train
          </text>

          <line x1="5" y1="28" x2="15" y2="28" stroke={color2} strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="10" cy="28" r="2" fill={color2} />
          <text x="20" y="32" fontSize="9" fill="#374151">
            Val
          </text>
        </g>

        {/* Current values */}
        <g transform={`translate(${padding.left + chartWidth + 10}, ${padding.top + 70})`}>
          <rect x="0" y="0" width="60" height="50" fill="#f8fafc" stroke="#e5e7eb" rx="4" />
          <text x="30" y="12" fontSize="8" fill="#6b7280" textAnchor="middle">
            Current
          </text>
          <text x="30" y="25" fontSize="11" fill={color1} textAnchor="middle" fontWeight="600">
            {trainData[trainData.length - 1]?.toFixed(3)}
          </text>
          <text x="30" y="38" fontSize="11" fill={color2} textAnchor="middle" fontWeight="600">
            {valData[valData.length - 1]?.toFixed(3)}
          </text>
        </g>
      </svg>
    </div>
  )
}
