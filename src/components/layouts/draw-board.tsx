'use client'

import useDraw from "@/hooks/useDraw"
import React from "react"


export default function DrawingBoard() {

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

    React.useEffect(() => {
        const canvas = canvasRef.current;

        function handleResize() {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            width={window.innerWidth}
            height={window.innerHeight}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            className="cursor-pointer"
        />
    )
}
