'use client'

import React from 'react'
import useWindowSize from '@/hooks/useWindowSize'
import { Eraser } from 'lucide-react'
import { Button } from './ui/button'

export default function ClearCanvasButton() {

    const { windowSize } = useWindowSize();

    const canvasRef = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
        canvasRef.current = canvasElement
    }, [windowSize])

    function handleClear() {
        console.log("clicked")
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    };

    return (
        <Button variant="outline" size="icon" onClick={handleClear}>
            <Eraser className="h-4 w-4" />
        </Button>
    );
}
