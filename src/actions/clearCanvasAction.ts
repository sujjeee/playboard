'use server'

import { pusherServer } from '@/lib/pusher'

export default async function clearCanvasAction({
    roomId
}: {
    roomId: string
}) {
    pusherServer.trigger(roomId, 'clear', "clearCanvas")
}