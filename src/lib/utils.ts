import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const drawLine = ({ prevPoint, currentPoint, ctx, color, newlineWidth }: DrawWithColorAndWidth) => {
  const { x: currX, y: currY } = currentPoint
  let startPoint = prevPoint ?? currentPoint

  const lineColor = color
  const lineWidth = newlineWidth

  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.fillStyle = lineColor

  ctx.beginPath()
  ctx.moveTo(startPoint.x, startPoint.y)
  ctx.lineTo(currX, currY)
  ctx.stroke()
  ctx.fill()
}