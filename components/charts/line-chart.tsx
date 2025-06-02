"use client"

interface LineChartProps {
  data: number[]
  title: string
  color?: string
  height?: number
}

export default function LineChart({ data, title, color = "#06b6d4", height = 200 }: LineChartProps) {
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 300
      const y = height - ((value - minValue) / range) * (height - 40)
      return `${x},${y}`
    })
    .join(" ")

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <svg width="100%" height={height} viewBox={`0 0 300 ${height}`} className="border rounded">
        <defs>
          <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={20 + (i * (height - 40)) / 4}
            x2="300"
            y2={20 + (i * (height - 40)) / 4}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Area under curve */}
        <polygon points={`0,${height} ${points} 300,${height}`} fill={`url(#gradient-${title})`} />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 300
          const y = height - ((value - minValue) / range) * (height - 40)
          return <circle key={index} cx={x} cy={y} r="3" fill={color} stroke="white" strokeWidth="2" />
        })}

        {/* Y-axis labels */}
        <text x="5" y="25" fontSize="10" fill="#6b7280">
          {maxValue.toFixed(1)}
        </text>
        <text x="5" y={height - 5} fontSize="10" fill="#6b7280">
          {minValue.toFixed(1)}
        </text>
      </svg>
    </div>
  )
}
