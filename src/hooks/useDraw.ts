import React from 'react';

export default function useDraw(onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const prevPoint = React.useRef<null | Point>(null);

    const [isDrawing, setIsDrawing] = React.useState(false);

    const canvas = canvasRef.current;

    function onInteractStart() {
        setIsDrawing(true);
    }

    const computePointInCanvas = (e: MouseEvent | TouchEvent) => {
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
        const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

        return { x, y };
    };

    const startDrawing = React.useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;

        const ctx = canvas?.getContext('2d');
        const currentPoint = computePointInCanvas(e);

        if (!ctx || !currentPoint) return;

        onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
        prevPoint.current = currentPoint;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing, onDraw, canvas]);

    const stopDrawing = React.useCallback(() => {
        setIsDrawing(false);
        prevPoint.current = null;
    }, []);


    React.useEffect(() => {
        window.addEventListener('mouseup', stopDrawing);
        canvas?.addEventListener('mousemove', startDrawing);
        window.addEventListener('mousedown', startDrawing);

        return () => {
            window.removeEventListener('mouseup', stopDrawing);
            canvas?.removeEventListener('mousemove', startDrawing);
            window.removeEventListener('mousedown', startDrawing);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDrawing, stopDrawing]);


    const onTouchStart = React.useCallback((event: TouchEvent) => {
        event.preventDefault();
        setIsDrawing(true);
    }, []);

    const onTouchMove = React.useCallback((event: TouchEvent) => {
        startDrawing(event);
    }, [startDrawing]);

    const onTouchEnd = React.useCallback(() => {
        stopDrawing();
    }, [stopDrawing]);

    React.useEffect(() => {
        canvas?.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas?.addEventListener('touchend', onTouchEnd);
        canvas?.addEventListener('touchstart', onTouchStart, { passive: false });

        return () => {
            canvas?.removeEventListener('touchmove', onTouchMove);
            canvas?.removeEventListener('touchend', onTouchEnd);
            canvas?.removeEventListener('touchstart', onTouchStart);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onTouchMove, onTouchEnd, onTouchStart]);

    return { canvasRef, onInteractStart };
}
