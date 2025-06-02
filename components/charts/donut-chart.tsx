"use client"

interface DonutChartProps {
  data: { label: string; value: number; color: string }[]
  title: string
  size?: number
}

export default function DonutChart({ data, title, size = 200 }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const center = size / 2
  const radius = size / 2 - 20
  const innerRadius = radius * 0.6

  let currentAngle = 0

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="flex items-center gap-4">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => {
            const angle = (item.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle

            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180)
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180)
            const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180)
            const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180)

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M ${center} ${center}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              "Z",
            ].join(" ")

            currentAngle += angle

            return <path key={index} d={pathData} fill={item.color} stroke="white" strokeWidth="2" />
          })}

          {/* Inner circle */}
          <circle cx={center} cy={center} r={innerRadius} fill="white" />

          {/* Center text */}
          <text x={center} y={center - 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#374151">
            {total}
          </text>
          <text x={center} y={center + 10} textAnchor="middle" fontSize="10" fill="#6b7280">
            Total
          </text>
        </svg>

        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
