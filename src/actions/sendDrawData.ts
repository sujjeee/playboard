'use server'

import { pusherServer } from '@/lib/pusher'

type DrawLineOptionsProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
    newlineWidth: number;
};

export default async function sendDrawData({
    drawLineOptions,
    socket_id,
}: {
    drawLineOptions: DrawLineOptionsProps;
    socket_id: string;
}) {
    pusherServer.trigger('canvas', 'draw', drawLineOptions, { socket_id })
    return { success: true }
}