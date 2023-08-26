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
    // console.log("room id in sevr action", roomId)
    pusherServer.trigger(roomId, 'draw', drawLineOptions, { socket_id })
    return { success: true }
}