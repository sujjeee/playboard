'use server'

import { pusherServer } from '@/lib/pusher'

export default async function clearCanvasAction({
    roomId
}: {
    roomId: string
}) {
    console.log("room id in sevr actioncclaer data", roomId)
    pusherServer.trigger(roomId, 'clear', "clearCanvas")
}