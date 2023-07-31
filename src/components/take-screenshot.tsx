'use client'

import React from 'react'
import { Camera } from 'lucide-react'
import { Button } from './ui/button'
import useWindowSize from '@/hooks/useWindowSize'

export default function TakeScreenShotButton() {

    const { windowSize } = useWindowSize();

    const canvasRef = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
        canvasRef.current = canvasElement
    }, [windowSize])

    function handleScreenShot() {
        if (!canvasRef.current) return;
        const linkEl = document.createElement('a');
        linkEl.download = 'playboard.png';
        linkEl.href = canvasRef.current.toDataURL();
        linkEl.click();
        linkEl.remove();
    };

    return (
        <Button variant="outline" size="icon" onClick={handleScreenShot}>
            <Camera className="h-4 w-4" />
        </Button>
    );
}
