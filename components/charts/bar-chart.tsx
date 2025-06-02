"use client"

interface BarChartProps {
  data: { label: string; value: number; color?: string }[]
  title: string
  height?: number
}

export default function BarChart({ data, title, height = 200 }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const barWidth = 300 / data.length - 10

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <svg width="100%" height={height + 40} viewBox={`0 0 300 ${height + 40}`} className="border rounded">
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

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40)
          const x = index * (300 / data.length) + 5
          const y = height - barHeight

          return (
            <g key={index}>
              <rect x={x} y={y} width={barWidth} height={barHeight} fill={item.color || "#06b6d4"} rx="2" />
              <text x={x + barWidth / 2} y={height + 15} fontSize="10" fill="#6b7280" textAnchor="middle">
                {item.label}
              </text>
              <text x={x + barWidth / 2} y={y - 5} fontSize="10" fill="#374151" textAnchor="middle">
                {item.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
