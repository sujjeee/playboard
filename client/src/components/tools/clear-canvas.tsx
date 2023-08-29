'use client'

import React from 'react'
import { Eraser } from 'lucide-react'
import useWindowSize from '@/hooks/useWindowSize'
import { Button } from '@/components/ui/button'
import { getRoomId } from '@/lib/store/canvas.store'
import { io } from 'socket.io-client'

const productionServer = process.env.NEXT_PUBLIC_HOSTED_SERVER;
const hostServer = productionServer != undefined ? [productionServer] : ['http://localhost:3001'];
const socket = io(`${hostServer}`)

export default function ClearCanvasButton() {
    const { windowSize } = useWindowSize();
    const canvasRef = React.useRef<HTMLCanvasElement>();
    const roomId = getRoomId(state => state.roomId);
    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    function handleClearButton() {
        clearCanvas()
        if (roomId) {
            socket.emit('calling-clear-canvas', { roomId });
        }
    }

    React.useEffect(() => {
        const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        canvasRef.current = canvasElement;
    }, [windowSize]);

    React.useEffect(() => {
        const handleClear = () => {
            clearCanvas();
        };

        if (roomId) {
            socket.emit('join-room', roomId)
            socket.on('clear-canvas', handleClear)
        }
        return () => {
            socket.off('clear-canvas');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    return (
        <Button variant="outline" size="icon" onClick={handleClearButton}>
            <Eraser className="h-4 w-4" />
        </Button>
    );
}
