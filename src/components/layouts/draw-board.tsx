'use client'

import useDraw from "@/hooks/useDraw"
import useWindowSize from "@/hooks/useWindowSize"
import React from "react"


export default function DrawingBoard() {
    const { windowSize } = useWindowSize()

    const { canvasRef, onMouseDown } = useDraw(drawLine)

    function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
        const { x: currX, y: currY } = currentPoint
        const lineColor = 'yellow'
        const lineWidth = 5

        let startPoint = prevPoint ?? currentPoint
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = lineColor
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(currX, currY)
        ctx.stroke()

        ctx.fillStyle = lineColor
        ctx.beginPath()
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
        ctx.fill()
    }

    if (windowSize.height && windowSize.width !== undefined) {
        return (
            <canvas
                width={windowSize.width}
                height={windowSize.height}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                className="cursor-pointer"
            />
        )
    }
}
