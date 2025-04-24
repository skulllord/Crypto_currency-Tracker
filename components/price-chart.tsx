"use client"

import { useEffect, useRef } from "react"

interface PriceChartProps {
  data: number[]
  change: number
}

export function PriceChart({ data, change }: PriceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const color = change >= 0 ? "#16a34a" : "#dc2626"

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        // Find min and max values
        const max = Math.max(...data)
        const min = Math.min(...data)
        const range = max - min || 1 // Avoid division by zero

        // Draw the line
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 1.5

        data.forEach((value, index) => {
          const x = (index / (data.length - 1)) * canvasWidth
          const y = canvasHeight - ((value - min) / range) * canvasHeight

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Fill area under the line
        ctx.lineTo(canvasWidth, canvasHeight)
        ctx.lineTo(0, canvasHeight)
        ctx.closePath()
        ctx.fillStyle = `${color}20` // Add transparency
        ctx.fill()
      }
    }
  }, [data, color])

  return (
    <div className="w-32 h-16 inline-block">
      <canvas ref={canvasRef} width={128} height={64} />
    </div>
  )
}
