import { Metadata } from 'next'
import DrawingBoard from "@/components/layouts/draw-board"
import { DrawBoardFooter } from "@/components/layouts/draw-footer"
import DrawBoardHeader from "@/components/layouts/draw-header"

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
      <div className="mx-auto">
        <DrawBoardHeader />
      </div>
      <DrawingBoard />
      <DrawBoardFooter />
    </>
  )
}
