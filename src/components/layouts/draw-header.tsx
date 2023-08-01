import React from 'react'
import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import ClearCanvasButton from '../clear-canvas'
import TakeScreenShotButton from '../take-screenshot'

export default function DrawBoardHeader() {
    return (
        <div className="absolute top-5 w-full md:px-12 px-4">
            <div className=" flex justify-between items-center">
                <Card className="px-4 py-2 tracking-wide font-medium rounded-md select-none text-sm">
                    PlayBoard
                </Card>
                <div className="items-center flex gap-3">
                    <ClearCanvasButton />
                    <TakeScreenShotButton />
                    <ThemeToggle />
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
