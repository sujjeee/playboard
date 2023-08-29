'use client'

import React from "react"
import useDraw from "@/hooks/useDraw"
import useWindowSize from "@/hooks/useWindowSize"
import { getRoomId, useCanvasStore } from "@/lib/store/canvas.store"
import { drawLine } from "@/lib/utils"
import axios from 'axios'

import { io } from 'socket.io-client'
import { useRouter } from "next/navigation"

// import NotFound from "@/app/room/[roomId]/[...not-found]/not-found"

const socket = io('http://localhost:3001')

export default function DrawingBoard({ roomId }: { roomId?: string }) {

    const { windowSize } = useWindowSize()
    const router = useRouter()

    // Set the room ID in the state using a custom store hook
    const setRoomId = getRoomId((state) => state.setRoomId);

    // Get color and newlineWidth from custom store hooks
    const color = useCanvasStore((state) => state.strokeColor);
    const newlineWidth = useCanvasStore((state) => state.lineWidth);

    // Get canvasRef and onInteractStart from the useDraw custom hook
    const { canvasRef, onInteractStart } = useDraw(onDraw);
    const [isRoomActive, setIsRoomActive] = React.useState<boolean>(false)


    function onDraw({ prevPoint, currentPoint, ctx }: Draw) {
        const drawOptions = {
            prevPoint,
            currentPoint,
            ctx,
            color,
            newlineWidth
        }
        drawLine(drawOptions)

        const roomDrawLineOptions = {
            prevPoint: prevPoint,
            currentPoint: currentPoint,
            color: color,
            newlineWidth: newlineWidth,
        };

        // Emit the "draw" event with the specified data
        socket.emit('start-draw', { roomDrawLineOptions, roomId });

    }

    React.useEffect(() => {
        if (!roomId) return;
        const hostServer = process.env.NEXT_PUBLIC_HOSTED_SERVER;

        async function checkRoomId({ roomId }: { roomId: string }) {
            try {
                const response = await axios.post(`${hostServer}/check-room`, { roomId });
                const isActive = response.data.active;

                if (!isActive) {
                    // todo:show 404 page
                    router.replace('/')
                }
            } catch (error: any) {
                console.error(error);
            }
        }
        checkRoomId({ roomId });
    }, [roomId]);

    const handleInteractStart = () => {
        const canvasElement = canvasRef.current
        if (!canvasElement) return
        onInteractStart()
    }

    React.useEffect(() => {
        if (!roomId) return;
        const canvasElement = canvasRef.current;
        const ctx = canvasElement?.getContext('2d');

        setRoomId(roomId);

        socket.emit('join-room', roomId);

        socket.on('get-canvas-state', () => {
            const canvasState = canvasRef.current?.toDataURL()
            if (!canvasState) return
            socket.emit('send-canvas-state', {
                state: canvasState,
                roomId,
            })
        })

        socket.on('canvas-state-from-server', (state: string) => {
            if (!ctx || !canvasElement) {
                console.log("ctx or canvasElement not found for canvas state");
                return;
            }

            const img = new Image();
            img.src = state;
            img.onload = () => {
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.drawImage(img, 0, 0);
            };
        });

        socket.on('get-draw-data', (roomDrawLineOptions: DrawLineOptionsProps) => {
            if (!ctx) {
                console.log("ctx not available");
                return;
            }

            const drawOptions = {
                prevPoint: roomDrawLineOptions.prevPoint,
                currentPoint: roomDrawLineOptions.currentPoint,
                ctx: ctx,
                color: roomDrawLineOptions.color,
                newlineWidth: roomDrawLineOptions.newlineWidth
            }
            drawLine(drawOptions)
        })

        return () => {
            // Clean up event listener
            socket.off('get-draw-data');
            socket.off('get-canvas-state');
            socket.off('canvas-state-from-server');
        };
    }, [canvasRef, windowSize, roomId])

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
