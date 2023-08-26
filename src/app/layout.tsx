import { ThemeProvider } from '@/components/theme-provider'
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DrawBoardHeader from '@/components/layouts/draw-header'
import { DrawBoardFooter } from '@/components/layouts/draw-footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlayBoard',
  description: 'Draw your creative thinking!',
  verification: {
    google: "5z2lDnQ6mdG9S2qZm74DNfOk3xdwLR-orzDHc5XiJxs"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto">
            <DrawBoardHeader />
          </div>
          {children}
          <DrawBoardFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
