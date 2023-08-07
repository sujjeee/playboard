"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { LineWidthSelector } from "@/components/tools/linewidth-selector"
import ColorPicker from "@/components/tools/color-picker"
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes"


export function MobileToolSettings() {

    const { setTheme, theme } = useTheme()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side='bottom' className="grid gap-4" showCrossIcon={false}>
                <SheetHeader>
                    <SheetTitle className="space-y-2">
                        <h3 className="font-medium leading-none">Canvas Settings</h3>
                    </SheetTitle>
                    <SheetDescription className="text-sm text-muted-foreground">
                        Manage your canvas settings here.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 mb-2">
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
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="w-full">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
