"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Loader2, Radio, Square } from "lucide-react"
import React from "react"
import { nanoid } from 'nanoid'
import { useRouter } from "next/navigation"
import axios from "axios"

export function LiveCollab() {
    const router = useRouter()

    const hostServer = process.env.NEXT_PUBLIC_HOSTED_SERVER;

    const [inputLink, setInputLink] = React.useState<string>("")
    const [showLinkDialog, setShowLinkDialog] = React.useState<boolean>(false)
    const [hasCopied, setHasCopied] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState<string>('');

    const copyToClipboard = React.useCallback(() => {
        if (inputLink) {
            navigator.clipboard.writeText(inputLink);
            setHasCopied(true);
        }
    }, [inputLink]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const startSession = async () => {
        try {
            setIsLoading(true)
            const trimmedValue = inputValue.trim();

            if (trimmedValue === '') {
                setIsLoading(false)
                return;
            }
            const roomId = nanoid()
            const response = await axios.post(`${hostServer}/add-room`, { roomId });
            if (response)
                setInputLink(`https://playboard.vercel.app/room/${roomId}`)
            router.push(`room/${roomId}`)
            setIsLoading(false)
            setShowLinkDialog(true)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Radio className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            {!showLinkDialog
                ? (
                    <>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center">
                                    <Radio className="mr-2 h-4 w-4" />
                                    Live collaboration...
                                </DialogTitle>
                                <DialogDescription>
                                    You can invite people to your current scene to collaborate with you.
                                </DialogDescription>
                            </DialogHeader>
                            <Input
                                placeholder="Enter your name"
                                value={inputValue}
                                onChange={handleInputChange}
                                required
                            />
                            <DialogFooter>
                                <Button className="w-full" onClick={startSession}>
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "Start session"
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </>
                )
                : (
                    <>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Share this playborad</DialogTitle>
                                <DialogDescription>
                                    Anyone with the link can view this playboard.
                                </DialogDescription>
                            </DialogHeader>
                            <Input value={inputLink} readOnly className="text-muted-foreground" />
                            <div className="flex gap-3 w-full justify-between items-center">
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => router.push('/')
                                    }
                                >
                                    <Square className="mr-2 h-4 w-4" />
                                    stop session
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={copyToClipboard}
                                >
                                    {
                                        hasCopied
                                            ? "Copied"
                                            : "Copy Link"
                                    }

                                </Button>
                            </div>
                        </DialogContent>
                    </>
                )}
        </Dialog>
    )
}
