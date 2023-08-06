"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

type SliderProps = React.ComponentProps<typeof Slider>


interface LineWidthSelectorProps {
    defaultValue: SliderProps["defaultValue"]
}

export function LineWidthSelector({
    defaultValue,
}: LineWidthSelectorProps) {
    const [value, setValue] = React.useState(defaultValue)

    return (
        <div className="grid gap-2 pt-2">
            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Line Width</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {value}
                    </span>
                </div>
                <Slider
                    id="temperature"
                    max={1}
                    defaultValue={value}
                    step={0.1}
                    onValueChange={setValue}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Temperature"
                />
            </div>
        </div>
    )
}