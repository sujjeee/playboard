
import DrawingBoard from "@/components/layouts/draw-board"
import { ThemeToggle } from "@/components/layouts/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Eraser } from "lucide-react"

export default function Home() {
  return (
    <>
      <div className="absolute top-5 w-full px-12 ">
        <div className=" flex justify-between items-center">
          <Card className="px-5 py-2 tracking-wide font-semibold rounded-md select-none">
            PlayBoard
          </Card>
          <div className="items-center flex gap-3">
            <Button variant="outline" size="icon">
              <Eraser className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Camera className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div>
        </div>
      </div>
      <DrawingBoard />
    </>
  )
}
