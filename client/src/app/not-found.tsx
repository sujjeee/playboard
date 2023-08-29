import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className="grid h-screen px-4 bg-background place-content-center">
            <div className="text-center">
                <h1 className="font-black text-muted-foreground text-9xl">404</h1>
                <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
                <Button asChild className='mt-3'>
                    <Link href="/login">Back to PlayBoard</Link>
                </Button>
            </div>
        </div>

    )
}
