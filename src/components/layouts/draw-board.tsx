'use client'

import sendDrawData from "@/actions/sendDrawData"
import useDraw from "@/hooks/useDraw"
import useWindowSize from "@/hooks/useWindowSize"
import { pusherClient } from "@/lib/pusher"
import { getRoomId, useCanvasStore } from "@/lib/store/canvas.store"
import { drawLine } from "@/lib/utils"
import React from "react"

export default function DrawingBoard({ roomId }: { roomId?: string }) {

    const { windowSize } = useWindowSize()
    if (roomId) {
        const setRoomId = getRoomId(state => state.setRoomId)
        setRoomId(roomId)
    }

    const { canvasRef, onInteractStart } = useDraw(onDraw)

    const socket_id = pusherClient.connection.socket_id
    const color = useCanvasStore(state => state.strokeColor)
    const newlineWidth = useCanvasStore(state => state.lineWidth)

    async function onDraw({ prevPoint, currentPoint, ctx }: Draw) {
        const drawOptions = {
            prevPoint,
            currentPoint,
            ctx,
            color,
            newlineWidth
        }

        drawLine(drawOptions)

        const drawLineOptions = {
            prevPoint,
            currentPoint,
            color,
            newlineWidth,
        }
        if (roomId) {
            await sendDrawData({ drawLineOptions, socket_id, roomId })
        }
    }

    const handleInteractStart = () => {
        const canvasElement = canvasRef.current
        if (!canvasElement) return
        onInteractStart()
    }

    React.useEffect(() => {
        const canvasElement = canvasRef.current
        const ctx = canvasElement?.getContext('2d')

        if (roomId) {
            pusherClient.subscribe(roomId)

            pusherClient.bind('draw', (data: DrawWithColorAndWidth) => {
                if (!ctx) {
                    console.log("ctx not available");
                    return;
                }

                const drawOptions = {
                    prevPoint: data.prevPoint,
                    currentPoint: data.currentPoint,
                    ctx: ctx,
                    color: data.color,
                    newlineWidth: data.newlineWidth
                }
                drawLine(drawOptions)
            });

            return () => {
                pusherClient.unbind('draw');
                pusherClient.unsubscribe(roomId);
            };
        }
    }, [canvasRef, windowSize]);

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
