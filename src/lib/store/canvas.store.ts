import { create } from 'zustand'

interface CanvasState {
    strokeColor: string
    lineWidth: number
    setStrokeColor: (strokeColor: string) => void
    setLineWidth: (strokeWidth: number) => void
}

export const useCanvasStore = create<CanvasState>(set => ({
    strokeColor: '#ffff00',
    lineWidth: 4,
    setStrokeColor: (newStrokeColor) => set({ strokeColor: newStrokeColor }),
    setLineWidth: (newLineWidth) => set({ lineWidth: newLineWidth })
}))


interface RoomIdState {
    roomId: string
    setRoomId: (strokeColor: string) => void
}

export const getRoomId = create<RoomIdState>(set => ({
    roomId: '',
    setRoomId: (newRoomId) => set({ roomId: newRoomId }),
}))