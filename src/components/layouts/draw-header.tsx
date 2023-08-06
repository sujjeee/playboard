"use client"

import React from 'react'
import { Card } from "@/components/ui/card"
import { ToolSettings } from '@/components/tools/tool-settings'
import ClearCanvasButton from '@/components/tools/clear-canvas'
import TakeScreenShotButton from '@/components/tools/take-screenshot'
import { MobileToolSettings } from '@/components/tools/mobile-tool-settings'
import useWindowSize from '@/hooks/useWindowSize'

export default function DrawBoardHeader() {
    const { isMobile, isDesktop } = useWindowSize();
    return (
        <div className="absolute top-5 w-full md:px-12 px-4">
            <div className=" flex justify-between items-center">
                <Card className="px-4 py-2 tracking-wide font-medium rounded-md select-none text-sm">
                    PlayBoard
                </Card>
                <div className="items-center flex gap-3">
                    <ClearCanvasButton />
                    <TakeScreenShotButton />
                    {isDesktop && <ToolSettings />}
                    {isMobile && <MobileToolSettings />}
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
