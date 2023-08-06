import React from 'react'
import { Card } from "@/components/ui/card"
import { ToolSettings } from '../tools/tool-settings'
import ClearCanvasButton from '@/components/tools/clear-canvas'
import TakeScreenShotButton from '@/components/tools/take-screenshot'
import { MobileToolSettings } from '../tools/mobile-tool-settings'

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
                    <ToolSettings />
                    {/* under development */}
                    {/* <MobileToolSettings /> */}
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
