import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "talksabout.tech - Curated Tech Talks",
  description: "Learn something new from a curated list of conference talks",
  generator: "v0.app",
  openGraph: {
    title: "talksabout.tech - Curated Tech Talks",
    description: "",
    url: "https://talksabout.tech",
    siteName: "talksabout.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "talksabout.tech - Curated Tech Talks",
    description: "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  )
}
