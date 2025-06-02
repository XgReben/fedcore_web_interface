"use client"

interface ConfusionMatrixProps {
  matrix: number[][]
  labels: string[]
  title: string
}

export default function ConfusionMatrix({ matrix, labels, title }: ConfusionMatrixProps) {
  const total = matrix.flat().reduce((sum, val) => sum + val, 0)
  const maxValue = Math.max(...matrix.flat())

  const getColor = (value: number) => {
    const intensity = value / maxValue
    if (intensity > 0.8) return "#1f2937" // Very dark
    if (intensity > 0.6) return "#374151" // Dark
    if (intensity > 0.4) return "#6b7280" // Medium
    if (intensity > 0.2) return "#9ca3af" // Light
    return "#e5e7eb" // Very light
  }

  const getTextColor = (value: number) => {
    const intensity = value / maxValue
    return intensity > 0.5 ? "white" : "#374151"
  }

  const cellSize = 60
  const width = labels.length * cellSize + 120
  const height = labels.length * cellSize + 120

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-4">{title}</h4>
      <div className="border rounded bg-white p-4">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Title */}
          <text x={width / 2} y={20} fontSize="14" fill="#374151" textAnchor="middle" fontWeight="600">
            Confusion Matrix
          </text>

          {/* Predicted labels (top) */}
          <text x={width / 2} y={40} fontSize="12" fill="#6b7280" textAnchor="middle" fontWeight="500">
            Predicted
          </text>

          {/* Actual label (left) */}
          <text
            x={20}
            y={height / 2}
            fontSize="12"
            fill="#6b7280"
            textAnchor="middle"
            fontWeight="500"
            transform={`rotate(-90, 20, ${height / 2})`}
          >
            Actual
          </text>

          {/* Column headers */}
          {labels.map((label, i) => (
            <text
              key={`col-${i}`}
              x={80 + i * cellSize + cellSize / 2}
              y={65}
              fontSize="10"
              fill="#374151"
              textAnchor="middle"
              fontWeight="500"
            >
              {label}
            </text>
          ))}

          {/* Row headers */}
          {labels.map((label, i) => (
            <text
              key={`row-${i}`}
              x={70}
              y={85 + i * cellSize + cellSize / 2 + 4}
              fontSize="10"
              fill="#374151"
              textAnchor="end"
              fontWeight="500"
            >
              {label}
            </text>
          ))}

          {/* Matrix cells */}
          {matrix.map((row, i) =>
            row.map((value, j) => {
              const x = 80 + j * cellSize
              const y = 80 + i * cellSize
              const percentage = ((value / total) * 100).toFixed(1)
              const isCorrect = i === j

              return (
                <g key={`cell-${i}-${j}`}>
                  {/* Cell background */}
                  <rect
                    x={x}
                    y={y}
                    width={cellSize}
                    height={cellSize}
                    fill={isCorrect ? "#10b981" : "#ef4444"}
                    fillOpacity={value / maxValue}
                    stroke="white"
                    strokeWidth="2"
                  />

                  {/* Cell border for correct predictions */}
                  {isCorrect && (
                    <rect x={x} y={y} width={cellSize} height={cellSize} fill="none" stroke="#059669" strokeWidth="3" />
                  )}

                  {/* Value text */}
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2 - 5}
                    fontSize="14"
                    fill={getTextColor(value)}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {value}
                  </text>

                  {/* Percentage text */}
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2 + 10}
                    fontSize="9"
                    fill={getTextColor(value)}
                    textAnchor="middle"
                    opacity="0.8"
                  >
                    ({percentage}%)
                  </text>
                </g>
              )
            }),
          )}

          {/* Legend */}
          <g transform={`translate(${80 + labels.length * cellSize + 20}, 80)`}>
            <rect x="0" y="0" width="80" height="100" fill="white" stroke="#e5e7eb" rx="4" />
            <text x="40" y="15" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="600">
              Legend
            </text>

            <rect x="10" y="25" width="15" height="15" fill="#10b981" fillOpacity="0.8" />
            <text x="30" y="37" fontSize="9" fill="#374151">
              Correct
            </text>

            <rect x="10" y="45" width="15" height="15" fill="#ef4444" fillOpacity="0.8" />
            <text x="30" y="57" fontSize="9" fill="#374151">
              Incorrect
            </text>

            <text x="5" y="75" fontSize="8" fill="#6b7280">
              Total: {total}
            </text>
            <text x="5" y="88" fontSize="8" fill="#6b7280">
              Accuracy: {((matrix.reduce((sum, row, i) => sum + row[i], 0) / total) * 100).toFixed(1)}%
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
