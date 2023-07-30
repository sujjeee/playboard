import React from 'react'

export default function useDraw(onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) {
    const [mouseDown, setMouseDown] = React.useState(false)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const prevPoint = React.useRef<null | Point>(null)

    function onMouseDown() {
        setMouseDown(true)
    }

    function clear() {
        const canvas = canvasRef.current;
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
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
            const canvas = canvasRef.current
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

        // window.addEventListener('mousemove', startDrawing);
        canvasRef.current?.addEventListener('mousemove', startDrawing);
        window.addEventListener("mouseup", mouseUpHandler)
        window.addEventListener('mousedown', startDrawing);


        return () => {
            // window.removeEventListener('mousemove', startDrawing);
            canvasRef.current?.removeEventListener('mousemove', startDrawing);
            window.removeEventListener("mouseup", mouseUpHandler)
            window.removeEventListener('mousedown', startDrawing);
        };

    }, [onDraw])

    return { canvasRef, onMouseDown, clear }
}
