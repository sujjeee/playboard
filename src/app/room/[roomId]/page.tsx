import DrawingBoard from "@/components/layouts/draw-board"

interface PageProps {
    params: {
        roomId: string
    }
}

const page = async ({ params }: PageProps) => {
    const { roomId } = params
    return (
        <DrawingBoard roomId={roomId} />
    )
}

export default page
