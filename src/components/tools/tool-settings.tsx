'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useWindowSize from "@/hooks/useWindowSize";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import { LineWidthSelector } from "./linewidth-selector";
import ColorPicker from "./color-picker";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Drawer } from "vaul";
import { DrawerContent, DrawerTrigger } from "../ui/drawer";


export function ToolSettings() {
    const { setTheme, theme } = useTheme()
    const { isDesktop } = useWindowSize();

    return (
        <>
            {
                isDesktop
                    ? (
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
                            </PopoverContent>
                        </Popover>
                    ) : (
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
        </>
    )
}
