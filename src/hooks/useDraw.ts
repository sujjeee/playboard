import React from 'react'

export default function useDraw(onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) {

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const prevPoint = React.useRef<null | Point>(null)

    const [mouseDown, setMouseDown] = React.useState(false)

    const canvas = canvasRef.current;

    function onMouseDown() {
        setMouseDown(true)
    }

    React.useEffect(() => {

        function startDrawing(e: MouseEvent) {

            if (!mouseDown) return

            const ctx = canvasRef.current?.getContext('2d');
            const currentPoint = computePointInCanvas(e)

            if (!ctx || !currentPoint) return

            onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
            prevPoint.current = currentPoint
        }

        const computePointInCanvas = (e: MouseEvent) => {
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            return { x, y }
        }

        function mouseUpHandler() {
            setMouseDown(false)
            prevPoint.current = null
        }

        canvas?.addEventListener('mousemove', startDrawing);
        window.addEventListener("mouseup", mouseUpHandler)
        window.addEventListener('mousedown', startDrawing);

        return () => {
            canvas?.removeEventListener('mousemove', startDrawing);
            window.removeEventListener("mouseup", mouseUpHandler)
            window.removeEventListener('mousedown', startDrawing);
        };

    }, [onDraw]) // eslint-disable-line react-hooks/exhaustive-deps

    return { canvasRef, onMouseDown }
}
