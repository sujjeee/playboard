import React from 'react'
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Eraser } from "lucide-react"

export default function DrawHeader() {
    return (
        <div className=" flex justify-between items-center">
            <Card className="px-5 py-2 tracking-wide font-bold rounded-md">
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
    )
}
