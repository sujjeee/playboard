'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { HexAlphaColorPicker } from 'react-colorful'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Pipette } from 'lucide-react'
import { useCanvasStore } from '@/lib/store/canvas.store'

const colorCode = [
    { name: "red", code: "#CE2B0A" },
    { name: "green", code: "#0AF502" },
    { name: "blue", code: "#0202F5" },
    { name: "purple", code: "#7905A7" },
]

export default function ColorPicker() {
    const color = useCanvasStore(state => state.strokeColor)
    const setColor = useCanvasStore(state => state.setStrokeColor)

    return (
        <div>
            <Label htmlFor='strokeColor' className='select-none'>
                Stroke Color
            </Label>

            <Popover>
                <div className='grid grid-cols-6 mt-3 w-full justify-center items-center gap-2 mx-auto'>

                    <PopoverTrigger asChild >
                        <Button variant="outline" size="icon" className='w-full' >
                            <Pipette className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>

                    <Button
                        variant={'outline'}
                        className="w-full p-0 focus:ring-2 ring-white">
                        <div
                            className='rounded-md h-full w-full '
                            style={{ background: color }}
                        />
                    </Button>

                    {colorCode.map((color) => {
                        return (
                            <Button
                                variant={'outline'}
                                key={color.name}
                                className={` w-full p-0 focus:ring-2 ring-white`}
                                onClick={() => setColor(color.code)}>
                                <div
                                    className='rounded-md h-full w-full'
                                    style={{ background: color.code }}
                                />
                            </Button>
                        )
                    })}
                </div>

                <PopoverContent className='w-fit p-0 mt-3' align='start'>
                    <HexAlphaColorPicker
                        id='strokeColor'
                        color={color}
                        onChange={setColor}
                    />
                </PopoverContent>
            </Popover>

        </div>
    )
}
