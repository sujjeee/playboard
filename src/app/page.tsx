import { Metadata } from 'next'
import DrawingBoard from "@/components/layouts/draw-board"

export const metadata: Metadata = {
  title: 'PlayBoard',
  description: 'Draw your creative thinking!',
  verification: {
    google: "5z2lDnQ6mdG9S2qZm74DNfOk3xdwLR-orzDHc5XiJxs"
  }
}

export default function Home() {
  return (
    <>
      <DrawingBoard />
    </>
  )
}
