import DrawingBoard from "@/components/layouts/draw-board"
import { DrawBoardFooter } from "@/components/layouts/draw-footer"
import DrawBoardHeader from "@/components/layouts/draw-header"

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
