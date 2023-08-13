"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal } from "lucide-react"
import { LineWidthSelector } from "@/components/tools/linewidth-selector"
import ColorPicker from "@/components/tools/color-picker"
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes"
import { Drawer } from "vaul"
import { DrawerContent, DrawerTrigger } from "../ui/drawer"


export function MobileToolSettings() {

    const { setTheme, theme } = useTheme()

    return (
        <Drawer.Root>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[50%] p-6 pt-10">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium leading-none">Canvas Settings</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage your canvas settings here.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <LineWidthSelector />
                        <ColorPicker />
                        <div className="flex items-center justify-between ">
                            <Label htmlFor="necessary" className="flex flex-col space-y-1">
                                <span>Canvas Theme</span>
                            </Label>
                            <Switch
                                id="necessary"
                                checked={theme === "dark"}
                                onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
                            />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer.Root>
    )
}
