type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}

type Point = {
    x: number;
    y: number
}

export interface DrawWithColorAndWidth extends Draw {
    color: string;
    newlineWidth: number;
}

export type DrawLineOptionsProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
    newlineWidth: number;
};
