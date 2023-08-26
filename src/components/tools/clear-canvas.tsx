'use client'

import React from 'react'
import { Eraser } from 'lucide-react'
import useWindowSize from '@/hooks/useWindowSize'
import { Button } from '@/components/ui/button'
import { pusherClient } from '@/lib/pusher'
import { getRoomId } from '@/lib/store/canvas.store'
import clearCanvasAction from '@/actions/clearCanvasAction'

export default function ClearCanvasButton() {
    const { windowSize } = useWindowSize();
    const canvasRef = React.useRef<HTMLCanvasElement>();
    const roomId = getRoomId(state => state.roomId);

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (roomId) {
            clearCanvasAction({ roomId });
        }
    };

    React.useEffect(() => {
        const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        canvasRef.current = canvasElement;
    }, [windowSize]);

    React.useEffect(() => {
        const handleClear = () => {
            clearCanvas();
        };

        if (roomId) {
            pusherClient.subscribe(roomId);
            pusherClient.bind('clear', handleClear);

            return () => {
                pusherClient.unbind('clear');
                pusherClient.unsubscribe(roomId);
            };
        }

    }, [roomId]);

    return (
        <Button variant="outline" size="icon" onClick={clearCanvas}>
            <Eraser className="h-4 w-4" />
        </Button>
    );
}

