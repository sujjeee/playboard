'use client'

import useDraw from "@/hooks/useDraw"
import useWindowSize from "@/hooks/useWindowSize"
import { useCanvasStore } from "@/lib/store/canvas.store"
import { drawLine } from "@/lib/utils"
import React from "react"

export default function DrawingBoard() {
    const { windowSize } = useWindowSize()
    const { canvasRef, onInteractStart } = useDraw(onDraw)

    const color = useCanvasStore(state => state.strokeColor)

    const newlineWidth = useCanvasStore(state => state.lineWidth)

    function onDraw({ prevPoint, currentPoint, ctx }: Draw) {
        console.log("check fun ic callinfg with callback")
        const drawOptions = {
            prevPoint,
            currentPoint,
            ctx,
            color,
            newlineWidth
        }
        console.log("checking", drawOptions)
        drawLine(drawOptions)
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
    return null;
}
