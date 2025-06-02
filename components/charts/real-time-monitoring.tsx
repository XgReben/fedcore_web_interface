"use client"

import { useState, useEffect } from "react"

interface RealTimeMonitoringProps {
  title: string
  unit: string
  color?: string
  maxValue?: number
  minValue?: number
  updateInterval?: number
}

export default function RealTimeMonitoring({
  title,
  unit,
  color = "#10b981",
  maxValue = 100,
  minValue = 0,
  updateInterval = 1000,
}: RealTimeMonitoringProps) {
  const [data, setData] = useState<{ timestamp: Date; value: number }[]>([])
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const newValue = minValue + Math.random() * (maxValue - minValue)

      setData((prev) => {
        const newData = [...prev, { timestamp: now, value: newValue }]
        return newData.slice(-30) // Keep last 30 points (30 seconds)
      })
      setCurrentValue(newValue)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [maxValue, minValue, updateInterval])

  if (data.length < 2) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">{title}</h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        <div className="border rounded h-[200px] flex items-center justify-center text-muted-foreground bg-white">
          Initializing...
        </div>
      </div>
    )
  }

  const width = 400
  const height = 200
  const padding = { top: 20, right: 80, bottom: 40, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const range = maxValue - minValue
  const points = data
    .map((point, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((point.value - minValue) / range) * chartHeight
      return `${x},${y}`
    })
    .join(" ")

  // Generate time labels
  const timeLabels = data
    .filter((_, index) => index % 10 === 0)
    .map((point, index) => {
      const x = padding.left + ((index * 10) / (data.length - 1)) * chartWidth
      return { x, time: point.timestamp.toLocaleTimeString().slice(0, 5) }
    })

  // Calculate statistics
  const values = data.map((d) => d.value)
  const avg = values.reduce((sum, val) => sum + val, 0) / values.length
  const max = Math.max(...values)
  const min = Math.min(...values)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
          <div className="text-lg font-bold" style={{ color }}>
            {currentValue.toFixed(1)} {unit}
          </div>
        </div>
      </div>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="border rounded bg-white">
        <defs>
          <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#fafafa" />

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percentage) => {
          const value = minValue + (range * percentage) / 100
          const y = padding.top + chartHeight - (percentage / 100) * chartHeight
          return (
            <g key={percentage}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text x={padding.left - 10} y={y + 4} fontSize="9" fill="#6b7280" textAnchor="end">
                {value.toFixed(0)}
              </text>
            </g>
          )
        })}

        {/* Time grid lines */}
        {timeLabels.map((label, index) => (
          <g key={index}>
            <line
              x1={label.x}
              y1={padding.top}
              x2={label.x}
              y2={padding.top + chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <text x={label.x} y={padding.top + chartHeight + 15} fontSize="9" fill="#6b7280" textAnchor="middle">
              {label.time}
            </text>
          </g>
        ))}

        {/* Area under curve */}
        <polygon
          points={`${padding.left},${padding.top + chartHeight} ${points} ${padding.left + chartWidth},${padding.top + chartHeight}`}
          fill={`url(#gradient-${title})`}
        />

        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Current value indicator */}
        <circle
          cx={padding.left + chartWidth}
          cy={padding.top + chartHeight - ((currentValue - minValue) / range) * chartHeight}
          r="4"
          fill={color}
          stroke="white"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke="#374151"
          strokeWidth="1"
        />
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Statistics panel */}
        <g transform={`translate(${padding.left + chartWidth + 10}, ${padding.top})`}>
          <rect x="0" y="0" width="65" height="80" fill="white" stroke="#e5e7eb" rx="4" />
          <text x="32" y="12" fontSize="8" fill="#6b7280" textAnchor="middle" fontWeight="500">
            Statistics
          </text>

          <text x="5" y="25" fontSize="8" fill="#6b7280">
            Current:
          </text>
          <text x="60" y="25" fontSize="8" fill={color} textAnchor="end" fontWeight="600">
            {currentValue.toFixed(1)}
          </text>

          <text x="5" y="38" fontSize="8" fill="#6b7280">
            Avg:
          </text>
          <text x="60" y="38" fontSize="8" fill="#374151" textAnchor="end" fontWeight="500">
            {avg.toFixed(1)}
          </text>

          <text x="5" y="51" fontSize="8" fill="#6b7280">
            Max:
          </text>
          <text x="60" y="51" fontSize="8" fill="#ef4444" textAnchor="end" fontWeight="500">
            {max.toFixed(1)}
          </text>

          <text x="5" y="64" fontSize="8" fill="#6b7280">
            Min:
          </text>
          <text x="60" y="64" fontSize="8" fill="#10b981" textAnchor="end" fontWeight="500">
            {min.toFixed(1)}
          </text>
        </g>
      </svg>
    </div>
  )
}
