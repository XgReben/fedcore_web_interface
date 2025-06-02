"use client"

import { useState, useEffect } from "react"

interface RealTimeChartProps {
  title: string
  color?: string
  height?: number
}

export default function RealTimeChart({ title, color = "#10b981", height = 150 }: RealTimeChartProps) {
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev, Math.random() * 100 + 50]
        return newData.slice(-20) // Keep only last 20 points
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (data.length < 2) {
    return (
      <div className="w-full">
        <h4 className="text-sm font-medium mb-2">{title}</h4>
        <div className="border rounded h-[150px] flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </div>
    )
  }

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
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={20 + (i * (height - 40)) / 3}
            x2="300"
            y2={20 + (i * (height - 40)) / 3}
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

        {/* Current value indicator */}
        {data.length > 0 && (
          <circle
            cx="300"
            cy={height - ((data[data.length - 1] - minValue) / range) * (height - 40)}
            r="4"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        )}

        {/* Current value text */}
        <text x="280" y="15" fontSize="12" fill={color} fontWeight="bold">
          {data[data.length - 1]?.toFixed(1)}
        </text>
      </svg>
    </div>
  )
}
