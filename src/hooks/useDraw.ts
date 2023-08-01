import React from 'react';

export default function useDraw(onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const prevPoint = React.useRef<null | Point>(null);

    const [isDrawing, setIsDrawing] = React.useState(false);

    const canvas = canvasRef.current;

    function onMouseDown() {
        setIsDrawing(true);
    }

    function onTouchStart(event: TouchEvent) {
        event.preventDefault();
        setIsDrawing(true);
    }

    React.useEffect(() => {
        function startDrawing(e: MouseEvent | TouchEvent) {
            if (!isDrawing) return;

            const ctx = canvas?.getContext('2d');
            const currentPoint = computePointInCanvas(e);

            if (!ctx || !currentPoint) return;

            onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
            prevPoint.current = currentPoint;
        }

        const computePointInCanvas = (e: MouseEvent | TouchEvent) => {
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
            const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top;

            return { x, y };
        };

        function stopDrawing() {
            setIsDrawing(false);
            prevPoint.current = null;
        }

        window.addEventListener('mouseup', stopDrawing);
        canvas?.addEventListener('mousemove', startDrawing);
        window.addEventListener('mousedown', startDrawing);

        canvas?.addEventListener('touchmove', startDrawing, { passive: false });
        canvas?.addEventListener('touchend', stopDrawing);
        canvas?.addEventListener('touchstart', onTouchStart, { passive: false });

        return () => {
            window.removeEventListener('mouseup', stopDrawing);
            canvas?.removeEventListener('mousemove', startDrawing);
            window.removeEventListener('mousedown', startDrawing);

            canvas?.removeEventListener('touchmove', startDrawing);
            canvas?.removeEventListener('touchend', stopDrawing);
            canvas?.removeEventListener('touchstart', onTouchStart);
        };
    }, [isDrawing, onDraw]);

    return { canvasRef, onMouseDown };
}
