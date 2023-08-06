'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SlidersHorizontal } from 'lucide-react';
import { LineWidthSelector } from "./linewidth-selector";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes"

export function ToolSettings() {
    const { setTheme, theme } = useTheme()
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium leading-none">Canvas Settings</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage your canvas settings here.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <LineWidthSelector defaultValue={[0.56]} />
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="necessary" className="flex flex-col space-y-1">
                                <span>Dark Mode</span>

                            </Label>
                            <Switch
                                id="necessary"
                                defaultChecked
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            />
                        </div>
                    </div>


                </div>
            </PopoverContent>
        </Popover>
    )
}
