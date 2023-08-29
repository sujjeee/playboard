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

type DrawLineOptionsProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
    newlineWidth: number;
};

export interface User {
    id: string
    username: string
    roomId: string
}
