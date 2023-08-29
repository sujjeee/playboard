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
    roomId
}: {
    drawLineOptions: DrawLineOptionsProps;
    socket_id: string;
    roomId: string
}) {
    pusherServer.trigger(roomId, 'draw', drawLineOptions, { socket_id })
    return { success: true }
}