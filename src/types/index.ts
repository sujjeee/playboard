type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}

type Point = {
    x: number;
    y: number
}

interface DrawWithColorAndWidth extends Draw {
    color: string;
    newlineWidth: number;
}