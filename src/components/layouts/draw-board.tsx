'use client'

import useDraw from "@/hooks/useDraw"
import useWindowSize from "@/hooks/useWindowSize"
import React from "react"


export default function DrawingBoard() {
    const { windowSize } = useWindowSize()

    const { canvasRef, onInteractStart } = useDraw(drawLine)

    function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
        const { x: currX, y: currY } = currentPoint
        let startPoint = prevPoint ?? currentPoint

        const lineColor = 'yellow'
        const lineWidth = 10

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

    const handleInteractStart = () => {
        const canvasElement = canvasRef.current
        if (!canvasElement) return
        onInteractStart()
    }

    if (windowSize.height && windowSize.width !== undefined) {
        return (
            <canvas
                id="canvas"
                width={windowSize.width}
                height={windowSize.height}
                ref={canvasRef}
                onMouseDown={handleInteractStart}
                onTouchStart={handleInteractStart}
                className="cursor-pointer"
            />
        )
    }
}
