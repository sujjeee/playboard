"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useCanvasStore } from "@/lib/store/canvas.store"

export function LineWidthSelector() {
    const [lineWidth, setLineWidth] = useCanvasStore(state => [
        state.lineWidth,
        state.setLineWidth
    ])

    return (
        <div className="grid gap-2 pt-2">
            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Line Width</Label>
                    <span className="w-12 px-2 py-0.5 text-right text-sm text-muted-foreground ">
                        {lineWidth}
                    </span>
                </div>
                <Slider
                    id="temperature"
                    max={20}
                    value={[lineWidth]}
                    step={1}
                    onValueChange={(newValue: number[]) => setLineWidth(newValue[0])}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Temperature"
                />
            </div>
        </div>
    )
}