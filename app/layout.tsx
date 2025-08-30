import type React from "react"
import { Montserrat } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { V0Provider } from "@/lib/v0-context"
import { AuthProvider } from "@/components/auth-provider"
import localFont from "next/font/local"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const rebelGrotesk = localFont({
  src: "../public/fonts/Rebels-Fett.woff2",
  variable: "--font-rebels",
  display: "swap",
})

const isV0 = process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false

export const metadata: Metadata = {
  title: {
    template: "%s – AntiPollution",
    default: "AntiPollution",
  },
  description: "Sistema de monitoramento de sensores de poluição em tempo real.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="/fonts/Rebels-Fett.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${rebelGrotesk.variable} ${montserrat.variable} antialiased`}>
        <V0Provider isV0={isV0}>
          <AuthProvider>{children}</AuthProvider>
        </V0Provider>
      </body>
    </html>
  )
}
