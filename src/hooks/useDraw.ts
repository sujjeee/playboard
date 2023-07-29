import React from 'react'

export default function useDraw(onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) {
    const [mouseDown, setMouseDown] = React.useState(false)

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const prevPoint = React.useRef<null | Point>(null)

    function onMouseDown() {
        setMouseDown(true)
    }

    React.useEffect(() => {
        function startDrawing(e: MouseEvent) {

            if (!mouseDown) return

            const ctx = canvasRef.current?.getContext('2d');
            const currentPoint = computePointInCanvas(e)

            if (!ctx || !currentPoint) return
            console.log(ctx)
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
        canvasRef.current?.addEventListener('mousedown', startDrawing);


        return () => {
            // window.removeEventListener('mousemove', startDrawing);
            canvasRef.current?.removeEventListener('mousemove', startDrawing);
            window.removeEventListener("mouseup", mouseUpHandler)
            canvasRef.current?.removeEventListener('mousedown', startDrawing);
        };

    }, [onDraw])

    return { canvasRef, onMouseDown }
}
